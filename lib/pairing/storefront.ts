/*
  PAIRING — Storefront reads (what the frontend consumes in Phase 3).

  The product page / homepage read each product's pre-computed
  `custom.paired_product_ids` metafield via the Storefront API, then fetch
  the referenced products' display data. No live scoring on page load —
  runtime cost is a plain metafield read.

  Falls back to the locally computed pair map (lib/pairing/local.ts) while
  Shopify is not connected, so UI components share one async API.
*/

import { getLocalPairs } from "./local";
import type { PairMatch } from "./score";

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;

export const STOREFRONT_ENABLED = Boolean(SHOPIFY_DOMAIN && STOREFRONT_TOKEN);

const API_VERSION = "2024-10";

export interface PairedProductSummary {
  id: string;
  handle: string;
  title: string;
  imageUrl?: string;
  priceInr?: number;
}

const PAIRED_QUERY = /* GraphQL */ `
  query PairedProducts($handle: String!) {
    product(handle: $handle) {
      paired: metafields(
        identifiers: [{ namespace: "custom", key: "paired_product_ids" }]
        first: 1
      ) {
        edges {
          node {
            value
          }
        }
      }
    }
  }
`;
const PRODUCT_SUMMARY_QUERY = /* GraphQL */ `
  query ProductSummaries($handles: [String!]!) {
    nodes(ids: $handles) {
      ... on Product {
        id
        title
        handle
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

async function storefrontFetch<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN as string,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 },
    },
  );
  if (!res.ok) throw new Error(`Storefront pairing read failed: ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) throw new Error("Storefront pairing GraphQL error");
  return json.data as T;
}

/**
 * Paired product IDs for a product, read from its metafield.
 * Falls back to the local map while Shopify is not connected.
 */
export async function getPairedProductIds(
  productId: string,
  handle?: string,
): Promise<string[]> {
  if (!STOREFRONT_ENABLED || !handle) {
    return getLocalPairs(productId).map((m: PairMatch) => m.productId);
  }
  const data = await storefrontFetch<{
    product: { paired: { edges: { node: { value: string } }[] } } | null;
  }>(PAIRED_QUERY, { handle });
  const value = data.product?.paired.edges[0]?.node.value;
  return value ? (JSON.parse(value) as string[]) : [];
}

/** Display data for the paired products (image/title/price). */
export async function getPairedProductSummaries(
  productIds: string[],
): Promise<PairedProductSummary[]> {
  if (!STOREFRONT_ENABLED || productIds.length === 0) return [];
  const handles = productIds.map((id) => `gid://shopify/Product/${id}`);
  const data = await storefrontFetch<{
    nodes: {
      id: string;
      title: string;
      handle: string;
      featuredImage: { url: string; altText: string | null } | null;
      priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    }[];
  }>(PRODUCT_SUMMARY_QUERY, { handles });
  return data.nodes.map((n) => ({
    id: n.id.replace("gid://shopify/Product/", ""),
    handle: n.handle,
    title: n.title,
    imageUrl: n.featuredImage?.url,
    priceInr: parseFloat(n.priceRange.minVariantPrice.amount),
  }));
}
