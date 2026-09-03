/*
  PAIRING — Stages 2 & 3: complementary matching + compatibility scoring.

  Stage 2: candidates = products whose garment_role is complementary.
  Stage 3: ranked by weighted score — colour harmony 40%, pattern 25%,
  fabric/weight 20%, occasion overlap 15%. Top-N per product, with a
  minimum threshold so low-quality pairs are never surfaced.

  Pure, dependency-free — unit-testable against any product+attribute list.
*/

import type { ProductAttributes } from "./attributes";
import {
  COMPLEMENTARY_ROLES,
  MIN_PAIR_SCORE,
  PAIR_WEIGHTS,
  TOP_N_PAIRS,
  colorHarmony,
} from "./attributes";

export interface ScoredProduct {
  id: string;
  attrs: ProductAttributes;
}

export interface PairMatch {
  productId: string;
  /** 0–1 weighted compatibility score */
  score: number;
  /** Human-readable reasons, used for debugging/UI hints */
  reasons: string[];
}

function patternScore(a: ProductAttributes, b: ProductAttributes): number {
  if (a.pattern_motif === b.pattern_motif) return 1;
  const onePlain = a.pattern_motif === "plain" || b.pattern_motif === "plain";
  if (onePlain) return 0.7; // mixed plain + patterned is a common styling choice
  return 0.4; // two different loud patterns clash
}

function fabricWeightScore(a: ProductAttributes, b: ProductAttributes): number {
  if (a.fabric_type === b.fabric_type) return 1;
  if (a.weight_class === b.weight_class) return 0.85;
  return 0.5; // mismatched drape (heavy silk top + sheer chiffon bottom)
}

function occasionScore(a: ProductAttributes, b: ProductAttributes): number {
  const overlap = a.occasion_tags.filter((t) => b.occasion_tags.includes(t));
  if (overlap.length > 0) return 1;
  const flexible =
    a.occasion_tags.includes("everyday") || b.occasion_tags.includes("everyday");
  return flexible ? 0.7 : 0.4;
}

/** Weighted 0–1 compatibility score for a candidate pair. */
export function scorePair(
  primary: ProductAttributes,
  candidate: ProductAttributes,
): PairMatch["score"] {
  const color =
    colorHarmony(
      primary.primary_color_family,
      candidate.primary_color_family,
    ) *
      0.6 +
    (primary.secondary_color_family &&
    candidate.primary_color_family === primary.secondary_color_family
      ? 1
      : colorHarmony(
          primary.primary_color_family,
          candidate.primary_color_family,
        )) *
      0.4;

  const pattern = patternScore(primary, candidate);
  const fabric = fabricWeightScore(primary, candidate);
  const occasion = occasionScore(primary, candidate);

  return (
    color * PAIR_WEIGHTS.color +
    pattern * PAIR_WEIGHTS.pattern +
    fabric * PAIR_WEIGHTS.fabricWeight +
    occasion * PAIR_WEIGHTS.occasion
  );
}

/** Top-N complementary matches for one product, above the min threshold. */
export function findPairsFor(
  product: ScoredProduct,
  catalog: ScoredProduct[],
  {
    topN = TOP_N_PAIRS,
    minScore = MIN_PAIR_SCORE,
  }: { topN?: number; minScore?: number } = {},
): PairMatch[] {
  const complementary = COMPLEMENTARY_ROLES[product.attrs.garment_role];
  return catalog
    .filter((p) => p.id !== product.id)
    .filter((p) => complementary.includes(p.attrs.garment_role))
    .map((p) => {
      const score = scorePair(product.attrs, p.attrs);
      const reasons: string[] = [];
      if (score >= minScore) {
        reasons.push(`${product.attrs.garment_role}+${p.attrs.garment_role}`);
      }
      return { productId: p.id, score, reasons };
    })
    .filter((m) => m.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

/** Pair map for the whole catalog (Stage 3 batch output). */
export function buildPairMap(catalog: ScoredProduct[]): Record<string, PairMatch[]> {
  const map: Record<string, PairMatch[]> = {};
  for (const product of catalog) {
    const matches = findPairsFor(product, catalog);
    if (matches.length > 0) map[product.id] = matches;
  }
  return map;
}

export interface Bundle {
  /** primary product id */
  primaryId: string;
  /** paired product id */
  pairId: string;
  score: number;
}

/** Highest-scoring pairs across the catalog — homepage "Shop the Bundle". */
export function topBundles(pairMap: Record<string, PairMatch[]>, count = 4): Bundle[] {
  const all: Bundle[] = [];
  for (const [primaryId, matches] of Object.entries(pairMap)) {
    for (const m of matches) {
      all.push({ primaryId, pairId: m.productId, score: m.score });
    }
  }
  return all.sort((a, b) => b.score - a.score).slice(0, count);
}
