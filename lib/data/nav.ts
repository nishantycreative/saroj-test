import { SHOP_CATEGORIES } from "@/lib/data/categories";
import type { ShopCategory } from "@/lib/data/categories";
import type { DictKey } from "@/lib/i18n";

/*
  Navigation structure — derived from lib/data/categories.ts, the single
  source of truth for the shop taxonomy (client spreadsheet).

    MEGA_CATEGORIES → desktop mega menu + mobile menu accordion
    FLAT_LINKS      → secondary header links
*/

export type MegaCategory = ShopCategory;

export const MEGA_CATEGORIES: MegaCategory[] = SHOP_CATEGORIES;

export const FLAT_LINKS = [
  { labelKey: "nav.stores" as DictKey, href: "/stores" },
  { labelKey: "nav.blogs" as DictKey, href: "/blogs" },
  { labelKey: "nav.about" as DictKey, href: "/our-story" },
  { labelKey: "nav.contact" as DictKey, href: "/contact" },
] as const;
