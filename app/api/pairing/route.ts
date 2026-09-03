/*
  Shopify webhook endpoint — pairing near-real-time updates.

  Subscribe in Shopify admin (Settings → Notifications → Webhooks) with:
    - Event: products/create, products/update
    - URL: https://<your-domain>/api/pairing
    - Secret: value of SHOPIFY_WEBHOOK_SECRET (HMAC-SHA256, base64)

  Every request is HMAC-verified before any work runs.
*/

import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { refreshProductPairs } from "@/lib/pairing/pipeline";

export const runtime = "nodejs";

function verifyHmac(rawBody: string, header: string | null): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret || !header) return false;
  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(digest),
      Buffer.from(header),
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const hmac = request.headers.get("x-shopify-hmac-sha256");
  if (!verifyHmac(rawBody, hmac)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody) as { id?: number; admin_graphql_api_id?: string };

  /* Prefer the admin GraphQL gid; fall back to numeric id prefix. */
  const gid =
    body.admin_graphql_api_id ??
    (body.id ? `gid://shopify/Product/${body.id}` : null);
  if (!gid) {
    return NextResponse.json({ error: "Missing product id" }, { status: 400 });
  }
  const productId = gid.replace("gid://shopify/Product/", "");

  try {
    await refreshProductPairs(productId);
    return NextResponse.json({ ok: true, productId });
  } catch (err) {
    console.error("[pairing] webhook refresh failed", err);
    return NextResponse.json({ error: "Refresh failed" }, { status: 500 });
  }
}

/** Health/status check — confirms endpoint + config wiring. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    shopifyAdminEnabled: process.env.SHOPIFY_ADMIN_TOKEN ? true : false,
    webhookSecretSet: Boolean(process.env.SHOPIFY_WEBHOOK_SECRET),
  });
}
