/*
  Placeholder catalogue data. Phase 1 only — realistic but static.
  Phase 3 replaces these arrays with Shopify collection/product queries
  (see lib/shopify.ts). Prices are INR placeholders.

  Sales fields mirror real-store mechanics: strikethrough MRP + discounted
  price, "% OFF" derived from mrpInr, star ratings, urgency stock tags,
  and an alternate image for the hover-swap.

  `description` feeds the pairing pipeline's attribute extraction
  (lib/pairing/extract.ts) — the same field Shopify descriptions will
  provide in Phase 3.
*/

import type { Product } from "@/lib/shopify";
import { IMAGES } from "@/lib/data/images";

type ImageKey = keyof typeof IMAGES;

const p = (
  row: Omit<Product, "handle" | "image" | "swatches"> & {
    image: ImageKey;
    imageAlt?: ImageKey;
    swatches?: string[];
  },
): Product => ({
  handle: row.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  swatches: ["#B08D57", "#E9DFCF", "#6E6150", "#8F6F3F"],
  ...row,
  image: row.image as ImageKey,
  imageAlt: row.imageAlt as ImageKey | undefined,
});

export const BESTSELLERS: Product[] = [
  p({
    id: "p01",
    title: "Ivory Anarkali Set",
    priceInr: 24500,
    mrpInr: 32000,
    category: "Suits",
    collections: ["suits", "new-arrival", "festive-edits"],
    fabric: "Pure silk · zari border",
    image: "bestIvoryAnarkali",
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 312,
    createdAt: "2026-08-12",
    description:
      "Co-ord anarkali set in ivory silk with a gold zari border. Festive and wedding wear.",
  }),
  p({
    id: "p02",
    title: "Pink Sequin Saree",
    priceInr: 8950,
    mrpInr: 10950,
    category: "Dupattas",
    collections: ["dupattas", "fabrics", "fancy-dye"],
    fabric: "Chanderi · hand block",
    image: "bestPinkSaree",
    rating: 4.8,
    reviewCount: 184,
    createdAt: "2026-07-28",
    description:
      "Saree in pink chanderi with hand block print motifs. Everyday and festive wear.",
  }),
  p({
    id: "p03",
    title: "Kalamkari Set",
    priceInr: 31200,
    category: "Suits",
    collections: ["suits", "fancy-dye", "festive-edits"],
    fabric: "Organza · hand-painted",
    image: "bestKalamkari",
    badge: "Limited",
    stockLeft: 3,
    rating: 4.7,
    reviewCount: 96,
    createdAt: "2026-06-30",
    description:
      "Co-ord set with hand-painted Kalamkari motifs on organza. Festive wear.",
  }),
  p({
    id: "p04",
    title: "Magenta Kurta",
    priceInr: 6750,
    mrpInr: 8500,
    category: "Suits",
    collections: ["suits"],
    fabric: "Jacquard weave",
    image: "bestMagentaKurta",
    rating: 4.6,
    reviewCount: 141,
    createdAt: "2026-08-02",
    description:
      "Kurta top in magenta silk jacquard weave. Festive wear.",
  }),
  p({
    id: "p05",
    title: "Blue Kurta",
    priceInr: 68000,
    mrpInr: 82000,
    category: "Suits",
    collections: ["suits", "new-arrival", "festive-edits"],
    fabric: "Silk · zardozi work",
    image: "bestBlueKurta",
    badge: "Bestseller",
    stockLeft: 5,
    rating: 5.0,
    reviewCount: 58,
    createdAt: "2026-08-20",
    description:
      "Kurta top in blue silk with zardozi embroidery. Wedding and festive wear.",
  }),
];

export const TRENDING: Product[] = [
  p({
    id: "p06",
    title: "Green Kurta Set",
    priceInr: 12400,
    category: "Suits",
    collections: ["suits", "dupattas", "new-arrival"],
    fabric: "Mulberry silk",
    image: "trendGreenKurta",
    badge: "New",
    rating: 4.5,
    reviewCount: 63,
    createdAt: "2026-08-31",
    description:
      "Co-ord kurta set in green mulberry silk. Everyday and festive wear.",
  }),
  p({
    id: "p07",
    title: "Purple Kurta",
    priceInr: 18900,
    mrpInr: 22400,
    category: "Suits",
    collections: ["suits", "fancy-dye", "festive-edits"],
    fabric: "Organza",
    image: "trendPurpleKurta",
    stockLeft: 7,
    rating: 4.8,
    reviewCount: 121,
    createdAt: "2026-07-15",
    description:
      "Kurta top in purple organza. Cocktail and festive wear.",
  }),
  // TODO_TRENDING_IMAGE: replace trendTemp1 image with unique trending image once generated
  p({
    id: "p08",
    title: "Tusser Silk Lehenga",
    priceInr: 7900,
    category: "Designer Suits / Semi-Stitched",
    collections: ["designer-suits", "fabrics"],
    fabric: "Cotton slub",
    image: "trendTemp1",
    rating: 4.7,
    reviewCount: 204,
    createdAt: "2026-06-18",
    description:
      "Lehenga skirt in tusser silk. Wedding wear.",
  }),
  // TODO_TRENDING_IMAGE: replace trendTemp2 image with unique trending image once generated
  p({
    id: "p09",
    title: "Chanderi Coord Set",
    priceInr: 4850,
    mrpInr: 6000,
    category: "Suits",
    collections: ["suits", "fabrics"],
    fabric: "Oxidised brass",
    image: "trendTemp2",
    rating: 4.9,
    reviewCount: 89,
    createdAt: "2026-05-22",
    description:
      "Co-ord set in chanderi silk with oxidised accents. Everyday wear.",
  }),
  // TODO_TRENDING_IMAGE: replace trendTemp3 image with unique trending image once generated
  p({
    id: "p10",
    title: "Embroidered A-Line Sharara",
    priceInr: 52400,
    mrpInr: 61000,
    category: "Designer Suits / Semi-Stitched",
    collections: ["designer-suits", "fabrics", "festive-edits"],
    fabric: "Raw silk · threadwork",
    image: "trendTemp3",
    badge: "Trending",
    stockLeft: 4,
    rating: 4.8,
    reviewCount: 77,
    createdAt: "2026-04-10",
    description:
      "Co-ord sharara set in raw silk with thread embroidery. Wedding wear.",
  }),
];

/*
  Complementary pieces — added so the pairing algorithm has real
  garment-role matches (saree ↔ blouse_piece, top ↔ bottom, saree ↔ dupatta,
  co_ord_set ↔ dupatta) against the local catalogue. TODO_CLIENT_IMAGE:
  replace reused imagery with product photography.
*/
export const CATALOG_EXTRA: Product[] = [
  p({
    id: "p11",
    title: "Emerald Silk Churidar Bottom",
    priceInr: 6400,
    mrpInr: 7900,
    category: "Suits",
    collections: ["suits", "fabrics"],
    fabric: "Silk · zari border",
    image: "trendGreenKurta",
    rating: 4.7,
    reviewCount: 42,
    createdAt: "2026-08-25",
    description:
      "Churidar bottom in deep emerald green silk with a gold zari border. Heavy silk — festive and wedding wear.",
  }),
  p({
    id: "p12",
    title: "Gold Banarasi Blouse Piece",
    priceInr: 3800,
    category: "Fabrics",
    collections: ["fabrics", "new-arrival"],
    fabric: "Brocade · floral zari",
    image: "storyBoutique",
    rating: 4.8,
    reviewCount: 27,
    createdAt: "2026-08-28",
    description:
      "Banarasi brocade blouse piece in antique gold, woven with floral zari motifs. Heavy brocade — wedding wear.",
  }),
  p({
    id: "p13",
    title: "Kanjeevaram Green Silk Saree",
    priceInr: 21800,
    mrpInr: 26400,
    category: "Sarees",
    collections: ["new-arrival", "fabrics", "festive-edits"],
    fabric: "Silk · zari border",
    image: "hero2",
    rating: 4.9,
    reviewCount: 118,
    createdAt: "2026-08-30",
    description:
      "Kanjeevaram silk saree in emerald green with a gold zari border. Heavy silk — festive and wedding wear.",
  }),
  p({
    id: "p14",
    title: "Ivory Chanderi Embroidered Dupatta",
    priceInr: 2900,
    mrpInr: 3600,
    category: "Dupattas",
    collections: ["dupattas", "fabrics"],
    fabric: "Chanderi silk · floral embroidery",
    image: "bestIvoryAnarkali",
    rating: 4.6,
    reviewCount: 33,
    createdAt: "2026-08-26",
    description:
      "Chanderi silk dupatta in ivory with delicate floral embroidery. Light drape — festive and everyday wear.",
  }),
];

/** Items seeded into the cart + wishlist drawers so they feel alive on first open. */
export const DRAWER_SEED_PRODUCTS: Product[] = [
  BESTSELLERS[0],
  TRENDING[1],
  BESTSELLERS[2],
];

/** All catalogue products, keyed by id — used for wishlist/PDP/pairing lookups. */
export const CATALOG: Record<string, Product> = Object.fromEntries(
  [...BESTSELLERS, ...TRENDING, ...CATALOG_EXTRA].map((product) => [
    product.id,
    product,
  ]),
);

/** Look up any catalogue product by id (recently-viewed etc.). */
export function productById(id: string): Product | undefined {
  return CATALOG[id];
}

/*
  Homepage rails — Best Sellers → Trending → New Arrivals, deduped in that
  precedence order so no product ever appears in more than one rail:
    1. Best Sellers  — built first from sales data, fills with no exclusions.
    2. Trending      — next, excluding anything already placed in Best Sellers.
    3. New Arrivals  — last, chronological by creation date (newest first),
                       excluding anything placed in Best Sellers or Trending.
  When a rail runs short of its target, takeTarget backfills from that
  rail's next-best-ranked candidates instead of leaving a short row.
*/
export interface HomepageRails {
  bestsellers: Product[];
  trending: Product[];
  newArrivals: Product[];
}

const RAIL_TARGET = 5;

function byRatingDesc(a: Product, b: Product): number {
  return (b.rating ?? 0) - (a.rating ?? 0);
}

function byNewest(a: Product, b: Product): number {
  return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
}

/** Take up to `target` items from `list`, skipping anything in `used`
   (adding every pick to `used` so later rails never repeat a product). */
function takeTarget(
  list: Product[],
  used: Set<string>,
  target: number,
): Product[] {
  const out: Product[] = [];
  for (const product of list) {
    if (used.has(product.id)) continue;
    used.add(product.id);
    out.push(product);
    if (out.length >= target) break;
  }
  return out;
}

export function buildHomepageRails(): HomepageRails {
  /* 1. Best Sellers — highest-signal list, fills first, no exclusions. */
  const bestsellers = [...BESTSELLERS];
  const used = new Set(bestsellers.map((product) => product.id));

  /* 2. Trending — engagement-ranked, excluding Best Sellers. */
  const trending = takeTarget(
    [...TRENDING].sort(byRatingDesc),
    used,
    RAIL_TARGET,
  );

  /* 3. New Arrivals — newest first across the catalogue, excluding
       everything already placed in Best Sellers or Trending. */
  const newArrivals = takeTarget(
    [...BESTSELLERS, ...TRENDING, ...CATALOG_EXTRA].sort(byNewest),
    used,
    RAIL_TARGET,
  );

  /* Invariant: the three rails must never share a product id. */
  const ids = [...bestsellers, ...trending, ...newArrivals].map((p) => p.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error(
      "buildHomepageRails: rails overlap — dedup invariant violated",
    );
  }

  return { bestsellers, trending, newArrivals };
}
