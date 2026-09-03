import type { ImageKey } from "@/lib/data/images";
import type { DictKey } from "@/lib/i18n";

/*
  SAROJ ENSEMBLE — real category taxonomy (client source data).

  Single source of truth for the shop structure. Everything that lists
  categories — the header mega menu, mobile menu and the homepage
  "Shop by Category" grid — derives from SHOP_CATEGORIES here
  (lib/data/nav.ts re-exports it for navigation).

  Hierarchy (from the client spreadsheet):
    - Festive Edits                                   (flat)
    - New Arrival                                    (flat)
    - Fabrics                                        (2 levels)
        Plain       → 43 fabric types
        Printed     → 14 fabric types
        Woven       →  9 fabric types
        Embroidery  → 13 fabric types
    - Fancy Dye                                      (flat)
    - Suits                                          (flat)
    - Dupattas                                       (flat)
    - Designer Suits / Semi-Stitched                 (flat)

  Notes:
    - Fabric names repeat across sub-categories (e.g. "Munga Silk" in
      Printed and Embroidery) — correct per source data, each belongs to
      its own parent.
    - Source bullet dashes ("- Satin Georgette") were formatting, not a
      tier — stripped.
    - Fabric names are technical product terms kept in English for every
      locale; category/sub-category labels are i18n keys.
*/

export interface FabricSubCategory {
  /** stable slug — e.g. "plain", "printed" */
  id: string;
  /** localized display label */
  labelKey: DictKey;
  /** fabric-type names, straight from the client spreadsheet */
  fabrics: string[];
}

export interface ShopCategory {
  /** stable slug — e.g. "new-arrival", "fabrics" */
  id: string;
  /** localized display label (nav + grid) */
  labelKey: DictKey;
  /** one-line grid/menu descriptor */
  taglineKey: DictKey;
  /** campaign tile imagery (homepage grid + collection breadcrumb) */
  image: ImageKey;
  /** header mega-menu campaign tile — separate asset so each surface can
      reference its own correctly-sized image independently */
  headerImage: ImageKey;
  /** optional honest count for the grid tile (only where data supports it) */
  countValue?: number;
  countKey?: DictKey;
  /** fabric sub-taxonomy — only Fabrics has one today */
  subCategories?: FabricSubCategory[];
}

export const FABRICS_PLAIN: string[] = [
  "Cotton",
  "Linen",
  "Nylon",
  "Silk",
  "Viscose",
  "Satin Georgette",
  "Butterfly Net",
  "Cotton Lycra",
  "Linen Satin",
  "Lycra Net",
  "Modal Satin",
  "Mul Chanderi (40gms)",
  "Nylon Organza",
  "Plain Silk",
  "Raw Silk (100gsm)",
  "Satin Lycra",
  "Silk Chanderi (70gms)",
  "Silk Chiffon",
  "Silk Organza",
  "Silk Velvet",
  "Slub Satin",
  "Slub Silk",
  "Soft Net",
  "Viscose Chiffon",
  "Viscose Chinnon",
  "Viscose Crepe",
  "Viscose Georgette",
  "Viscose Jacquard",
  "Viscose Lycra",
  "Viscose Muslin",
  "Viscose Organza",
  "Viscose Velvet",
  "100 GSM Crepe",
  "100 GSM Georgette",
  "120 GSM Crepe",
  "40 GSM Georgette",
  "40 GSM Habutai Silk",
  "50 GSM Habutai Silk",
  "60 GSM Dupion",
  "60 GSM Georgette",
  "60 GSM Shamo Satin",
  "80 GSM Crepe",
  "80 GSM Georgette",
  "80 GSM Shamo Satin",
];

export const FABRICS_PRINTED: string[] = [
  "Chiffon Print",
  "Chinnon Print",
  "Cotton Print",
  "Crepe Print",
  "Kora Silk Print",
  "Lawn Cotton Print",
  "Linen Satin Print",
  "Modal Satin Print",
  "Mul Chanderi Print",
  "Munga Silk",
  "Muslin Print",
  "Silk Chanderi",
  "Silk Linen Print",
  "Viscose Linen",
];

export const FABRICS_WOVEN: string[] = [
  "Chinia Silk Brocade",
  "Dupian Silk Brocade",
  "Katan Silk Brocade",
  "Kheen Khaab Brocade",
  "Paithani Silk Brocade",
  "Raw Silk Ikkat",
  "Satin Brocade",
  "Silk Patola (Patan Patola)",
  "Slub Silk Jacquard",
];

export const FABRICS_EMBROIDERY: string[] = [
  "Chanderi Silk",
  "Chinnon",
  "Kora Cotton",
  "Linen",
  "Munga Silk",
  "Nylon Organza",
  "Raw Silk",
  "Silk Organza",
  "Slub Silk",
  "Tissue",
  "Tusser Silk",
  "Viscose Georgette",
  "Viscose Organza",
];

/** Fabrics → sub-category fabric lists (single source, drives the mega menu). */
export const FABRIC_SUB_CATEGORIES: FabricSubCategory[] = [
  { id: "plain", labelKey: "nav.mega.fabrics.plain", fabrics: FABRICS_PLAIN },
  { id: "printed", labelKey: "nav.mega.fabrics.printed", fabrics: FABRICS_PRINTED },
  { id: "woven", labelKey: "nav.mega.fabrics.woven", fabrics: FABRICS_WOVEN },
  { id: "embroidery", labelKey: "nav.mega.fabrics.embroidery", fabrics: FABRICS_EMBROIDERY },
];

/** Total fabric types across the four sub-categories (computed, never invented). */
export const FABRIC_TYPE_COUNT = FABRIC_SUB_CATEGORIES.reduce(
  (sum, sub) => sum + sub.fabrics.length,
  0,
);

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    id: "festive-edits",
    labelKey: "nav.mega.festive",
    taglineKey: "categories.festive.tagline",
    image: "catFestiveEdit",
    headerImage: "headerFestiveEdit",
  },
  {
    id: "new-arrival",
    labelKey: "nav.mega.newarrival",
    taglineKey: "categories.newarrival.tagline",
    image: "catNewArrival",
    headerImage: "headerNewArrival",
  },
  {
    id: "fabrics",
    labelKey: "nav.mega.fabrics",
    taglineKey: "categories.fabrics.tagline",
    image: "catFabrics",
    headerImage: "headerFabrics",
    countValue: FABRIC_TYPE_COUNT,
    countKey: "categories.countFabrics",
    subCategories: FABRIC_SUB_CATEGORIES,
  },
  {
    id: "fancy-dye",
    labelKey: "nav.mega.fancydye",
    taglineKey: "categories.fancydye.tagline",
    image: "catFancyDye",
    headerImage: "headerFancyDye",
  },
  {
    id: "suits",
    labelKey: "nav.mega.suits",
    taglineKey: "categories.suits.tagline",
    image: "catSuits",
    headerImage: "headerSuits",
  },
  {
    id: "dupattas",
    labelKey: "nav.mega.dupattas",
    taglineKey: "categories.dupattas.tagline",
    image: "catDupattas",
    headerImage: "headerDupattas",
  },
  {
    id: "designer-suits",
    labelKey: "nav.mega.designersuits",
    taglineKey: "categories.designersuits.tagline",
    image: "catDesignerSuits",
    headerImage: "headerDesignerSuits",
  },
];
