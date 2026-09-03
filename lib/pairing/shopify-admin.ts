/*
  PAIRING — Shopify Admin API client.

  Used by the pairing pipeline to:
    - create the attribute metafield definitions once (validated enums)
    - fetch the full product catalogue
    - write extracted attributes + computed paired_product_ids back

  Admin API access requires a custom app with read_products + write_products
  scopes (read_orders added later for Stage 4 behavioural signals).
*/

import { ATTR_KEYS, ATTR_NAMESPACE } from "./attributes";

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

export const SHOPIFY_ADMIN_ENABLED = Boolean(SHOPIFY_DOMAIN && ADMIN_TOKEN);

const API_VERSION = "2024-10";

export interface ShopifyAdminProduct {
  id: string;
  title: string;
  handle: string;
  body_html?: string | null;
  /** custom metafields we already stored (e.g. garment_role) */
  metafields?: { key: string; value: string }[];
  updated_at: string;
}

async function adminFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  if (!SHOPIFY_ADMIN_ENABLED) throw new Error("Shopify Admin not configured");
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}/${path}`,
    {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ADMIN_TOKEN as string,
        ...(init?.headers ?? {}),
      },
    },
  );
  if (!res.ok) throw new Error(`Shopify Admin ${path} failed: ${res.status}`);
  return (await res.json()) as T;
}

/**
 * Create the formal metafield definitions (once per store) so attribute
 * values are typed/validated instead of loose key-value pairs.
 */
export async function ensureMetafieldDefinitions(): Promise<void> {
  const ownerType = "PRODUCT";
  const definitions: { key: string; type: string; name: string }[] = [
    { key: "garment_role", type: "single_line_text_field", name: "Garment role" },
    { key: "primary_color_family", type: "single_line_text_field", name: "Primary colour family" },
    { key: "secondary_color_family", type: "single_line_text_field", name: "Secondary colour family" },
    { key: "pattern_motif", type: "single_line_text_field", name: "Pattern motif" },
    { key: "fabric_type", type: "single_line_text_field", name: "Fabric type" },
    { key: "occasion_tags", type: "list.single_line_text_field", name: "Occasion tags" },
    { key: "weight_class", type: "single_line_text_field", name: "Weight class" },
    { key: "paired_product_ids", type: "list.single_line_text_field", name: "Paired product IDs" },
  ];
  for (const def of definitions) {
    await adminFetch("metafield_definitions.json", {
      method: "POST",
      body: JSON.stringify({
        metafield_definition: {
          key: def.key,
          namespace: ATTR_NAMESPACE,
          name: def.name,
          type: def.type,
          owner_type: ownerType,
        },
      }),
    });
  }
}

/** Fetch all products (with our metafields) for the extraction pass. */
export async function fetchAllProducts(): Promise<ShopifyAdminProduct[]> {
  const products: ShopifyAdminProduct[] = [];
  let url = `products.json?limit=250&fields=id,title,handle,body_html,updated_at,metafields`;
  while (true) {
    const res = await adminFetch<{
      products: ShopifyAdminProduct[];
    }>(url);
    products.push(...res.products);
    // Link-header pagination: follow `next` if present.
    const raw = res as unknown as { link?: string };
    const nextMatch = raw.link?.match(/<([^>]+)>;\s*rel="next"/);
    if (!nextMatch) break;
    url = nextMatch[1].replace(`https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}/`, "");
  }
  return products;
}

/** Read a single product's stored metafield values, keyed by metafield key. */
export function readStoredAttributes(
  product: ShopifyAdminProduct,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const mf of product.metafields ?? []) {
    out[mf.key] = mf.value;
  }
  return out;
}

/** Write one product metafield (namespace custom). */
export async function writeProductMetafield(
  productId: string,
  key: (typeof ATTR_KEYS)[number],
  value: string | string[],
): Promise<void> {
  await adminFetch(`products/${productId}/metafields.json`, {
    method: "POST",
    body: JSON.stringify({
      metafield: {
        namespace: ATTR_NAMESPACE,
        key,
        value: Array.isArray(value) ? JSON.stringify(value) : value,
        type: key === "occasion_tags" || key === "paired_product_ids"
          ? "list.single_line_text_field"
          : "single_line_text_field",
      },
    }),
  });
}
