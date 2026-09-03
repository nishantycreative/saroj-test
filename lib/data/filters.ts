/*
  Collection filters — Amazon-style client-side filtering for the placeholder
  catalogue.

  Phase 1: every filter derives from the same fields that feed the pairing
  pipeline (title, description, fabric text) using the deterministic
  extractor in lib/pairing/extract.ts, so filters stay consistent with the
  real taxonomy in lib/pairing/attributes.ts.

  Phase 3: swap these derives for Shopify metafields (lib/pairing/attributes.ts
  exports the exact namespace/keys) and drop the heuristic path.
*/

import type { DictKey } from "@/lib/i18n";
import type { ColorFamily } from "@/lib/pairing/attributes";
import { COLOR_FAMILIES } from "@/lib/pairing/attributes";
import { extractAttributesHeuristic } from "@/lib/pairing/extract";
import type { Product } from "@/lib/shopify";
import { discountPercent } from "@/lib/shopify";

/* ---------------- Price bands ---------------- */

export type PriceBandId = "under2000" | "b2000_5000" | "b5000_10000" | "over10000";

export const PRICE_BANDS: {
  id: PriceBandId;
  labelKey: DictKey;
  min: number;
  max: number | null;
}[] = [
  { id: "under2000", labelKey: "collection.filter.price.under2000", min: 0, max: 2000 },
  { id: "b2000_5000", labelKey: "collection.filter.price.b2000_5000", min: 2000, max: 5000 },
  { id: "b5000_10000", labelKey: "collection.filter.price.b5000_10000", min: 5000, max: 10000 },
  { id: "over10000", labelKey: "collection.filter.price.over10000", min: 10000, max: null },
];

/* ---------------- Facet option lists (canonical, client-facing) ---------------- */

export interface FacetOption {
  id: string;
  labelKey: DictKey;
  swatch?: string;
}

export const FABRIC_OPTIONS: FacetOption[] = [
  { id: "silk", labelKey: "collection.filter.fabric.silk" },
  { id: "cotton", labelKey: "collection.filter.fabric.cotton" },
  { id: "georgette", labelKey: "collection.filter.fabric.georgette" },
  { id: "chiffon", labelKey: "collection.filter.fabric.chiffon" },
  { id: "brocade", labelKey: "collection.filter.fabric.brocade" },
  { id: "linen", labelKey: "collection.filter.fabric.linen" },
  { id: "chanderi", labelKey: "collection.filter.fabric.chanderi" },
  { id: "organza", labelKey: "collection.filter.fabric.organza" },
  { id: "velvet", labelKey: "collection.filter.fabric.velvet" },
  { id: "net", labelKey: "collection.filter.fabric.net" },
];

export const PATTERN_OPTIONS: FacetOption[] = [
  { id: "plain", labelKey: "collection.filter.pattern.plain" },
  { id: "printed", labelKey: "collection.filter.pattern.printed" },
  { id: "woven", labelKey: "collection.filter.pattern.woven" },
  { id: "embroidered", labelKey: "collection.filter.pattern.embroidered" },
  { id: "zari", labelKey: "collection.filter.pattern.zari" },
];

export const COLOR_OPTION_HEX: Record<ColorFamily, string> = {
  red: "#C0392B",
  green: "#2E7D32",
  blue: "#1F4E79",
  gold: "#C9A227",
  ivory: "#EFE6D8",
  white: "#FFFFFF",
  black: "#1B1B1B",
  pink: "#D98BA8",
  purple: "#7B4FA6",
  yellow: "#DDBB2C",
  orange: "#E26D2E",
  brown: "#6E4B36",
  grey: "#8A8A8A",
  multi: "linear-gradient(135deg,#C0392B 0%,#2E7D32 25%,#1F4E79 50%,#C9A227 75%,#1B1B1B 100%)",
};

export const COLOR_OPTIONS: FacetOption[] = COLOR_FAMILIES.map((id) => ({
  id,
  labelKey: `collection.filter.color.${id}` as DictKey,
  swatch: COLOR_OPTION_HEX[id],
}));

export const OCCASION_OPTIONS: FacetOption[] = [
  { id: "festive", labelKey: "collection.filter.occasion.festive" },
  { id: "wedding", labelKey: "collection.filter.occasion.wedding" },
  { id: "party", labelKey: "collection.filter.occasion.party" },
  { id: "casual", labelKey: "collection.filter.occasion.casual" },
  { id: "office", labelKey: "collection.filter.occasion.office" },
];

export const RATING_OPTIONS: FacetOption[] = [
  { id: "4", labelKey: "collection.filter.rating.4" },
  { id: "3", labelKey: "collection.filter.rating.3" },
];

export const DISCOUNT_OPTIONS: FacetOption[] = [
  { id: "10", labelKey: "collection.filter.discount.10" },
  { id: "20", labelKey: "collection.filter.discount.20" },
];

/* ---------------- Active filter state ---------------- */

export interface FilterState {
  price: PriceBandId | null;
  fabrics: string[];
  patterns: string[];
  colors: string[];
  occasions: string[];
  rating: number | null;
  discount: number | null;
  inStockOnly: boolean;
}

export const EMPTY_FILTERS: FilterState = {
  price: null,
  fabrics: [],
  patterns: [],
  colors: [],
  occasions: [],
  rating: null,
  discount: null,
  inStockOnly: false,
};

export function hasActiveFilters(f: FilterState): boolean {
  return (
    f.price !== null ||
    f.fabrics.length > 0 ||
    f.patterns.length > 0 ||
    f.colors.length > 0 ||
    f.occasions.length > 0 ||
    f.rating !== null ||
    f.discount !== null ||
    f.inStockOnly
  );
}

/* ---------------- Per-product derived facets ---------------- */

const FABRIC_IDS = new Set(FABRIC_OPTIONS.map((o) => o.id));

const OCCASION_MAP: Record<string, string> = {
  festive: "festive",
  wedding: "wedding",
  cocktail: "party",
  everyday: "casual",
  office: "office",
};

function deriveFabric(text: string, fallback: string): string | null {
  if (/chanderi/i.test(text)) return "chanderi";
  if (FABRIC_IDS.has(fallback)) return fallback;
  return null;
}

function derivePattern(text: string): string {
  if (/zari\s*border|zari\b/i.test(text)) return "zari";
  if (/embroider|zardozi|thread\s*work/i.test(text)) return "embroidered";
  if (/print|kalamkari/i.test(text)) return "printed";
  if (/brocade|woven|jacquard|ikkat|patola|weave/i.test(text)) return "woven";
  return "plain";
}

export interface ProductFacets {
  fabric: string | null;
  pattern: string;
  colors: string[];
  occasions: string[];
}

export function productFacets(p: Product): ProductFacets {
  const heuristic = extractAttributesHeuristic(p.title, p.description ?? p.fabric ?? "");
  const text = `${p.title}. ${p.description ?? ""} ${p.fabric ?? ""}`;
  const colors = [
    heuristic.primary_color_family,
    heuristic.secondary_color_family,
  ].filter((c): c is ColorFamily => c !== null);
  const occasions = Array.from(
    new Set(
      heuristic.occasion_tags
        .map((o) => OCCASION_MAP[o])
        .filter((o): o is string => o !== undefined),
    ),
  );
  return {
    fabric: deriveFabric(text, heuristic.fabric_type as string),
    pattern: derivePattern(text),
    colors,
    occasions,
  };
}

/* ---------------- Matching (AND across groups, OR within a group) ---------------- */

export function matchesFilters(p: Product, f: FilterState, facets: ProductFacets): boolean {
  if (f.price) {
    const band = PRICE_BANDS.find((b) => b.id === f.price);
    if (!band) return false;
    if (p.priceInr < band.min) return false;
    if (band.max !== null && p.priceInr >= band.max) return false;
  }
  if (f.fabrics.length > 0 && (!facets.fabric || !f.fabrics.includes(facets.fabric)))
    return false;
  if (f.patterns.length > 0 && !f.patterns.includes(facets.pattern)) return false;
  if (
    f.colors.length > 0 &&
    !f.colors.some((c) => facets.colors.includes(c))
  )
    return false;
  if (
    f.occasions.length > 0 &&
    !f.occasions.some((o) => facets.occasions.includes(o))
  )
    return false;
  if (f.rating !== null && (p.rating ?? 0) < f.rating) return false;
  if (f.discount !== null && discountPercent(p) < f.discount) return false;
  if (f.inStockOnly && p.stockLeft !== undefined && p.stockLeft <= 0) return false;
  return true;
}

/* ---------------- URL <-> state codec ---------------- */

export function filtersFromSearch(sp: URLSearchParams): FilterState {
  const priceId = sp.get("price");
  const price = (PRICE_BANDS.some((b) => b.id === priceId)
    ? priceId
    : null) as FilterState["price"];

  const patterns = splitList(sp.get("pattern"));

  /* Legacy ?>type=plain|printed|woven|embroidery (Fabrics sub-category pills)
     folds into the Pattern group so old/bookmarked links keep working. */
  const legacyType = sp.get("type");
  const legacyPattern = patterns.length > 0 ? patterns : legacyPatternFrom(legacyType);

  return {
    price,
    fabrics: splitList(sp.get("fabric")).filter((v) => FABRIC_IDS.has(v)),
    patterns: legacyPattern,
    colors: splitList(sp.get("color")).filter((v) =>
      (COLOR_FAMILIES as readonly string[]).includes(v),
    ),
    occasions: splitList(sp.get("occasion")).filter((v) =>
      OCCASION_OPTIONS.some((o) => o.id === v),
    ),
    rating: sp.get("rating") === "4" || sp.get("rating") === "3"
      ? Number(sp.get("rating"))
      : null,
    discount: sp.get("discount") === "10" || sp.get("discount") === "20"
      ? Number(sp.get("discount"))
      : null,
    inStockOnly: sp.get("stock") === "1",
  };
}

function legacyPatternFrom(type: string | null): string[] {
  const map: Record<string, string> = {
    plain: "plain",
    printed: "printed",
    woven: "woven",
    embroidery: "embroidered",
  };
  return type && map[type] ? [map[type]] : [];
}

function splitList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

export function filtersToQuery(
  f: FilterState,
  sort: string | null,
  base: URLSearchParams,
): URLSearchParams {
  const sp = new URLSearchParams();
  base.forEach((_v, k) => {
    if (!FILTER_PARAM_KEYS.has(k)) sp.set(k, base.get(k) as string);
  });
  if (f.price) sp.set("price", f.price);
  if (f.fabrics.length) sp.set("fabric", f.fabrics.join(","));
  if (f.patterns.length) sp.set("pattern", f.patterns.join(","));
  if (f.colors.length) sp.set("color", f.colors.join(","));
  if (f.occasions.length) sp.set("occasion", f.occasions.join(","));
  if (f.rating !== null) sp.set("rating", String(f.rating));
  if (f.discount !== null) sp.set("discount", String(f.discount));
  if (f.inStockOnly) sp.set("stock", "1");
  if (sort) sp.set("sort", sort);
  return sp;
}

const FILTER_PARAM_KEYS = new Set([
  "type",
  "price",
  "fabric",
  "pattern",
  "color",
  "occasion",
  "rating",
  "discount",
  "stock",
  "sort",
]);