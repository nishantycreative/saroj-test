/*
  Shopify boundary.

  This module is the single seam where real Shopify data enters the app.
  During Phase 1 every consumer works against the placeholder types and data
  (lib/data/products.ts), so Phase 3 becomes: swap implementations here,
  keep components.

  Real Storefront API queries are implemented below (read-only, public data)
  and activate automatically once the env vars are set — components keep
  rendering placeholder data until then (SHOPIFY_ENABLED stays false).
*/

import type { ImageKey } from "@/lib/data/images";

/* ==================== Placeholder product shape ==================== */

export interface Product {
  id: string;
  handle: string;
  title: string;
  /** Selling price (INR) — after any discount */
  priceInr: number;
  /** Strikethrough MRP (INR) — presence of a higher MRP implies a discount */
  mrpInr?: number;
  category: string;
  /** Collection page slugs this product appears on (client taxonomy) */
  collections?: string[];
  fabric?: string;
  image: ImageKey;
  /** Alternate image shown on hover ("view 2") */
  imageAlt?: ImageKey;
  badge?: "Bestseller" | "New" | "Limited" | "Trending";
  /** Urgency tag, e.g. "Only 3 left" — rendered as a small tag badge */
  stockLeft?: number;
  rating?: number; // 0–5
  reviewCount?: number;
  swatches: string[]; // hex swatches shown on cards
  /** ISO date — drives the "Newest" sort until Shopify takes over */
  createdAt?: string;
  /** Plain-text description — feeds the pairing attribute extraction */
  description?: string;
}

/** Discount percent vs MRP — 0 when no MRP or no discount. */
export function discountPercent(p: Product): number {
  if (!p.mrpInr || p.mrpInr <= p.priceInr) return 0;
  return Math.round(((p.mrpInr - p.priceInr) / p.mrpInr) * 100);
}

/* ==================== Shopify Storefront API ==================== */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;

/** True once real credentials are configured (Phase 3). */
export const SHOPIFY_ENABLED = Boolean(SHOPIFY_DOMAIN && SHOPIFY_TOKEN);

/** Storefront API version — bump as Shopify releases newer versions. */
const API_VERSION = "2024-10";

/**
 * How long new-arrival ordering is cached (seconds). Order doesn't need
 * real-time precision — ISR-fresh every 5 minutes is plenty.
 */
export const NEW_ARRIVALS_REVALIDATE = 300;

/** Minimal Storefront product node (only the fields the site consumes). */
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  createdAt: string;
  imageUrl?: string;
  imageAltText?: string;
  minPrice?: { amount: string; currencyCode: string };
}

interface ShopifyProductEdge {
  node: {
    id: string;
    title: string;
    handle: string;
    createdAt: string;
    images: { edges: { node: { url: string; altText: string | null } }[] };
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
  };
}

const COLLECTION_PRODUCTS_QUERY = /* GraphQL */ `
  query CollectionProducts(
    $handle: String!
    $first: Int!
    $sortKey: ProductSortKeys!
    $reverse: Boolean!
  ) {
    collection(handle: $handle) {
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            title
            handle
            createdAt
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
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
    }
  }
`;

const PRODUCTS_SORTED_QUERY = /* GraphQL */ `
  query ProductsSorted(
    $first: Int!
    $sortKey: ProductSortKeys!
    $reverse: Boolean!
  ) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          id
          title
          handle
          createdAt
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
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
  }
`;

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate: number = NEW_ARRIVALS_REVALIDATE,
): Promise<T> {
  if (!SHOPIFY_ENABLED) throw new Error("Shopify credentials not configured");
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN as string,
      },
      body: JSON.stringify({ query, variables }),
      /* ISR-style caching on the server fetch — no fresh call per page view */
      next: { revalidate },
    },
  );
  if (!res.ok) throw new Error(`Shopify request failed: ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) throw new Error("Shopify GraphQL error");
  return json.data as T;
}

/**
 * Products for a collection, sorted natively by Shopify's Storefront API —
 * no custom algorithm needed.
 *
 * Defaults to `CREATED_AT` + `reverse: true` = newest listings first, which
 * is exactly the New Arrivals behaviour.
 */
export async function getProductsByCollection(
  handle: string,
  {
    sortKey = "CREATED_AT",
    reverse = true,
    first = 20,
    revalidate = NEW_ARRIVALS_REVALIDATE,
  }: {
    sortKey?: "CREATED_AT" | "BEST_SELLING" | "PRICE" | "TITLE";
    reverse?: boolean;
    first?: number;
    revalidate?: number;
  } = {},
): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_ENABLED) return [];
  const data = await shopifyFetch<{
    collection: { products: { edges: ShopifyProductEdge[] } } | null;
  }>(COLLECTION_PRODUCTS_QUERY, { handle, first, sortKey, reverse }, revalidate);

  return (data.collection?.products.edges ?? []).map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    createdAt: node.createdAt,
    imageUrl: node.images.edges[0]?.node.url,
    imageAltText: node.images.edges[0]?.node.altText ?? undefined,
    minPrice: node.priceRange.minVariantPrice,
  }));
}

/** Whole-catalogue products sorted natively (no collection filter). */
export async function getProductsSorted({
  sortKey = "CREATED_AT",
  reverse = true,
  first = 20,
  revalidate = NEW_ARRIVALS_REVALIDATE,
}: {
  sortKey?: "CREATED_AT" | "BEST_SELLING" | "PRICE" | "TITLE";
  reverse?: boolean;
  first?: number;
  revalidate?: number;
} = {}): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_ENABLED) return [];
  const data = await shopifyFetch<{
    products: { edges: ShopifyProductEdge[] };
  }>(PRODUCTS_SORTED_QUERY, { first, sortKey, reverse }, revalidate);

  return data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    createdAt: node.createdAt,
    imageUrl: node.images.edges[0]?.node.url,
    imageAltText: node.images.edges[0]?.node.altText ?? undefined,
    minPrice: node.priceRange.minVariantPrice,
  }));
}

/**
 * New Arrivals — newest first.
 *
 * Two supported patterns:
 *  1. Manual merchandising (recommended): pass `collection` — the query runs
 *     against the tagged/curated collection so merchants control what shows,
 *     with the same `sortKey: CREATED_AT, reverse: true` applied inside it.
 *  2. Pure chronological: omit `collection` and the full catalogue is sorted
 *     by creation date.
 *
 * Optional `windowDays` trims the result set client-side to products created
 * within the last N days (the Storefront API cannot filter by date range, so
 * we sort natively and then trim).
 */
export async function getNewArrivals({
  first = 20,
  collection = "new-arrival",
  windowDays,
}: {
  first?: number;
  collection?: string | null;
  windowDays?: number;
} = {}): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_ENABLED) return [];
  const products = collection
    ? await getProductsByCollection(collection, {
        sortKey: "CREATED_AT",
        reverse: true,
        first,
      })
    : await getProductsSorted({ sortKey: "CREATED_AT", reverse: true, first });

  if (!windowDays) return products;
  const cutoff = Date.now() - windowDays * 24 * 60 * 60 * 1000;
  return products.filter((p) => new Date(p.createdAt).getTime() >= cutoff);
}

/* TODO(phase-3): replace placeholder consumers with the functions above.
   Components keep working against lib/data/products.ts until then. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getProducts(_collection: string): Promise<Product[]> {
  return Promise.resolve([]);
}
