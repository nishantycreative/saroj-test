/*
  PAIRING — pipeline orchestration (Stage 1 → 3 → metafield writes).

  Runtime behaviour:
    - Nightly batch (cron): runPairingPipeline()
       1. ensure metafield definitions exist
       2. fetch products via Admin API
       3. LLM-extract attributes for products missing them or updated since
       4. score all candidates (Stages 2–3)
       5. write paired_product_ids back per product
    - Near-real-time: Shopify product create/update webhook calls
      refreshProductPairs(productId) — re-extract that product (if changed)
      and recompute every pairing that could involve it.

  No-ops cleanly when Shopify Admin credentials are absent, so the module
  is safe to import anywhere.
*/

import type { ProductAttributes } from "./attributes";
import { extractAttributesLLM, extractAttributesHeuristic } from "./extract";
import { findPairsFor } from "./score";
import type { ScoredProduct } from "./score";
import {
  SHOPIFY_ADMIN_ENABLED,
  ensureMetafieldDefinitions,
  fetchAllProducts,
  readStoredAttributes,
  writeProductMetafield,
} from "./shopify-admin";

async function extractFor(
  title: string,
  body: string,
): Promise<ProductAttributes> {
  /* Prefer the LLM; fall back to heuristics so the batch never stalls. */
  try {
    return await extractAttributesLLM(title, body);
  } catch (err) {
    console.warn(`[pairing] LLM extraction failed, heuristic fallback: ${err}`);
    return extractAttributesHeuristic(title, body);
  }
}

interface CatalogEntry extends ScoredProduct {
  handle: string;
  needsWrite: boolean;
}

/** Full batch: extract missing/stale attributes, score, write metafields. */
export async function runPairingPipeline(): Promise<void> {
  if (!SHOPIFY_ADMIN_ENABLED) {
    console.warn("[pairing] pipeline skipped — Shopify Admin not configured");
    return;
  }
  await ensureMetafieldDefinitions();

  const products = await fetchAllProducts();
  const catalog: CatalogEntry[] = [];

  for (const product of products) {
    const stored = readStoredAttributes(product);
    const hasAttrs = stored.garment_role && stored.primary_color_family;
    const attrs: ProductAttributes = hasAttrs
      ? {
          garment_role: stored.garment_role as ProductAttributes["garment_role"],
          primary_color_family: stored.primary_color_family as ProductAttributes["primary_color_family"],
          secondary_color_family: (stored.secondary_color_family || null) as ProductAttributes["secondary_color_family"],
          pattern_motif: (stored.pattern_motif ??
            "plain") as ProductAttributes["pattern_motif"],
          fabric_type: (stored.fabric_type ??
            "blend") as ProductAttributes["fabric_type"],
          occasion_tags: stored.occasion_tags
            ? (JSON.parse(stored.occasion_tags) as ProductAttributes["occasion_tags"])
            : ["festive"],
          weight_class: (stored.weight_class ??
            "medium") as ProductAttributes["weight_class"],
        }
      : await extractFor(product.title, product.body_html ?? "");

    catalog.push({
      id: product.id,
      attrs,
      handle: product.handle,
      needsWrite: !hasAttrs,
    });
  }

  /* Write extracted attributes where missing (so they persist for reuse). */
  for (const entry of catalog) {
    if (!entry.needsWrite) continue;
    const a = entry.attrs;
    await writeProductMetafield(entry.id, "garment_role", a.garment_role);
    await writeProductMetafield(entry.id, "primary_color_family", a.primary_color_family);
    await writeProductMetafield(entry.id, "secondary_color_family", a.secondary_color_family ?? "");
    await writeProductMetafield(entry.id, "pattern_motif", a.pattern_motif);
    await writeProductMetafield(entry.id, "fabric_type", a.fabric_type);
    await writeProductMetafield(entry.id, "occasion_tags", a.occasion_tags);
    await writeProductMetafield(entry.id, "weight_class", a.weight_class);
  }

  /* Stage 3 — score once, write every product's top matches. */
  for (const entry of catalog) {
    const matches = findPairsFor(entry, catalog);
    if (matches.length === 0) continue;
    await writeProductMetafield(
      entry.id,
      "paired_product_ids",
      matches.map((m) => m.productId),
    );
  }
}

/**
 * Webhook-triggered refresh (products/create, products/update):
 * re-compute pairings for one product and its complement candidates.
 */
export async function refreshProductPairs(productId: string): Promise<void> {
  if (!SHOPIFY_ADMIN_ENABLED) return;
  const products = await fetchAllProducts();
  const catalog: ScoredProduct[] = [];

  for (const product of products) {
    const stored = readStoredAttributes(product);
    let attrs: ProductAttributes;
    if (stored.garment_role && stored.primary_color_family) {
      attrs = {
        garment_role: stored.garment_role as ProductAttributes["garment_role"],
        primary_color_family: stored.primary_color_family as ProductAttributes["primary_color_family"],
        secondary_color_family: (stored.secondary_color_family || null) as ProductAttributes["secondary_color_family"],
        pattern_motif: stored.pattern_motif as ProductAttributes["pattern_motif"],
        fabric_type: stored.fabric_type as ProductAttributes["fabric_type"],
        occasion_tags: stored.occasion_tags
          ? (JSON.parse(stored.occasion_tags) as ProductAttributes["occasion_tags"])
          : ["festive"],
        weight_class: stored.weight_class as ProductAttributes["weight_class"],
      };
    } else {
      attrs = await extractFor(product.title, product.body_html ?? "");
    }
    catalog.push({ id: product.id, attrs });
  }

  const target = catalog.find((c) => c.id === productId);
  if (!target) return;
  const matches = findPairsFor(target, catalog);
  if (matches.length > 0) {
    await writeProductMetafield(
      productId,
      "paired_product_ids",
      matches.map((m) => m.productId),
    );
  }
}
