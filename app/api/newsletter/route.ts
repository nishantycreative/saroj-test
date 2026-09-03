import { NextResponse } from "next/server";

/*
  POST /api/newsletter — email capture for the promo popups (10% codes).

  Klaviyo is the intended provider (lib/newsletter.ts is the client seam).
  When KLAVIYO_PRIVATE_KEY / KLAVIYO_LIST_ID are not configured the route
  answers `{ configured: false }` and the UI shows the coupon code without
  claiming the email was subscribed anywhere — no fake success states.

  Requires "Dynamic" runtime (env access at request time):
    export const dynamic = "force-dynamic";
*/

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface NewsletterResponse {
  ok: boolean;
  configured: boolean;
  invalid?: boolean;
}

export async function POST(request: Request): Promise<NextResponse<NewsletterResponse>> {
  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    email = "";
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, configured: false, invalid: true },
      { status: 400 },
    );
  }

  const apiKey = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;
  if (!apiKey || !listId) {
    return NextResponse.json({ ok: false, configured: false });
  }

  try {
    const res = await fetch(
      `https://a.klaviyo.com/api/v2/list/${encodeURIComponent(listId)}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({ profiles: [{ email }] }),
      },
    );
    if (!res.ok) {
      return NextResponse.json({ ok: false, configured: true }, { status: 502 });
    }
    return NextResponse.json({ ok: true, configured: true });
  } catch {
    return NextResponse.json({ ok: false, configured: true }, { status: 502 });
  }
}
