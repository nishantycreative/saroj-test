/*
  PAIRING — Stage 1 schema & Stage 3 constants.

  All LLM-extracted attributes use fixed enums so outputs stay normalized
  and comparable across products (free-text here would reintroduce the
  same inconsistency the extraction exists to remove).
*/

/* ---------------- Enums (fixed lists, shared with the LLM prompt) ---------------- */

export const GARMENT_ROLES = [
  "top",
  "bottom",
  "blouse_piece",
  "saree",
  "dupatta",
  "co_ord_set",
  "stole",
] as const;
export type GarmentRole = (typeof GARMENT_ROLES)[number];

export const COLOR_FAMILIES = [
  "red",
  "green",
  "blue",
  "gold",
  "ivory",
  "white",
  "black",
  "pink",
  "purple",
  "yellow",
  "orange",
  "brown",
  "grey",
  "multi",
] as const;
export type ColorFamily = (typeof COLOR_FAMILIES)[number];

export const PATTERN_MOTIFS = [
  "floral",
  "geometric",
  "plain",
  "zari_border",
  "embroidered",
  "checked",
  "striped",
  "motif",
] as const;
export type PatternMotif = (typeof PATTERN_MOTIFS)[number];

export const FABRIC_TYPES = [
  "silk",
  "cotton",
  "georgette",
  "chiffon",
  "brocade",
  "linen",
  "organza",
  "velvet",
  "net",
  "blend",
] as const;
export type FabricType = (typeof FABRIC_TYPES)[number];

export const OCCASION_TAGS = [
  "festive",
  "wedding",
  "everyday",
  "office",
  "cocktail",
] as const;
export type OccasionTag = (typeof OCCASION_TAGS)[number];

export const WEIGHT_CLASSES = ["light", "medium", "heavy"] as const;
export type WeightClass = (typeof WEIGHT_CLASSES)[number];

/* ---------------- Extracted attribute shape ---------------- */

export interface ProductAttributes {
  garment_role: GarmentRole;
  primary_color_family: ColorFamily;
  secondary_color_family: ColorFamily | null;
  pattern_motif: PatternMotif;
  fabric_type: FabricType;
  occasion_tags: OccasionTag[];
  weight_class: WeightClass;
}

/** Metafield namespace + keys (Shopify, namespace `custom`). */
export const ATTR_NAMESPACE = "custom";
export const ATTR_KEYS = [
  "garment_role",
  "primary_color_family",
  "secondary_color_family",
  "pattern_motif",
  "fabric_type",
  "occasion_tags",
  "weight_class",
  "paired_product_ids",
] as const;

/* ---------------- Stage 2 — complementary garment roles ---------------- */

export const COMPLEMENTARY_ROLES: Record<GarmentRole, GarmentRole[]> = {
  top: ["bottom"],
  bottom: ["top"],
  blouse_piece: ["saree", "bottom"],
  saree: ["blouse_piece", "dupatta"],
  dupatta: ["saree", "co_ord_set"],
  co_ord_set: ["dupatta", "stole"],
  stole: ["co_ord_set", "dupatta"],
};

/* ---------------- Stage 3 — scoring weights ---------------- */

export const PAIR_WEIGHTS = {
  color: 0.4,
  pattern: 0.25,
  fabricWeight: 0.2,
  occasion: 0.15,
} as const;

/** Pairs below this score are not surfaced (no forced low-quality matches). */
export const MIN_PAIR_SCORE = 0.5;

/** How many matches to keep per product. */
export const TOP_N_PAIRS = 4;

/**
 * Deliberate colour pairings that read as premium combinations, keyed
 * "primary+secondary" — used when families differ.
 */
const HARMONY_PAIRS = new Set([
  "green+gold",
  "gold+green",
  "ivory+green",
  "green+ivory",
  "ivory+gold",
  "gold+ivory",
  "red+gold",
  "gold+red",
  "pink+ivory",
  "ivory+pink",
  "purple+gold",
  "gold+purple",
  "blue+ivory",
  "ivory+blue",
  "black+gold",
  "gold+black",
]);

/** Neutrals that harmonize with almost anything. */
const NEUTRALS: ReadonlySet<ColorFamily> = new Set(["ivory", "white", "black", "gold"]);

export function colorHarmony(a: ColorFamily, b: ColorFamily | null): number {
  if (a === b) return 1;
  if (b && HARMONY_PAIRS.has(`${a}+${b}`)) return 0.9;
  if (NEUTRALS.has(a) || (b && NEUTRALS.has(b))) return 0.75;
  return 0.3;
}
