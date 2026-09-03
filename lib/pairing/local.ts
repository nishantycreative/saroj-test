/*
  PAIRING — local compute (dev/placeholder phase).

  Runs Stages 1–3 against the placeholder catalogue at module load so the
  UI (homepage "Shop the Bundle" + product-page "Pairs Well With") works
  today without Shopify or an LLM key. Uses the heuristic extractor;
  the Shopify pipeline (lib/pairing/pipeline.ts) uses the LLM path and
  metafield storage instead.

  This module is a drop-in stand-in for the Storefront metafield reads
  (lib/pairing/storefront.ts) — same output shapes.
*/

import { CATALOG_EXTRA, BESTSELLERS, TRENDING } from "@/lib/data/products";
import type { Product } from "@/lib/shopify";
import { extractAttributesHeuristic } from "./extract";
import { buildPairMap, topBundles } from "./score";
import type { Bundle, PairMatch, ScoredProduct } from "./score";

export const LOCAL_PAIRING_CATALOG: Product[] = [
  ...BESTSELLERS,
  ...TRENDING,
  ...CATALOG_EXTRA,
];

const scored: ScoredProduct[] = LOCAL_PAIRING_CATALOG.map((product) => ({
  id: product.id,
  attrs: extractAttributesHeuristic(
    product.title,
    product.description ?? "",
  ),
}));

/** productId → ranked matches (same shape the Storefront metafield yields) */
export const LOCAL_PAIR_MAP: Record<string, PairMatch[]> =
  buildPairMap(scored);

/** Highest-scoring pairs across the catalogue — homepage bundles. */
export const LOCAL_BUNDLES: Bundle[] = topBundles(LOCAL_PAIR_MAP, 4);

export function getLocalPairs(productId: string): PairMatch[] {
  return LOCAL_PAIR_MAP[productId] ?? [];
}

export function getLocalBundles(): Bundle[] {
  return LOCAL_BUNDLES;
}
