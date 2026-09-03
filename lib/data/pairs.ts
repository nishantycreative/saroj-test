import { IMAGES } from "@/lib/data/images";
import type { DictKey } from "@/lib/i18n";

export interface Pairing {
  id: string;
  /** Product names stay as brand names (not translated) */
  primary: string;
  pairsWith: string;
  noteKey: DictKey;
  priceInr: number;
  mrpInr?: number;
  rating?: number;
  reviewCount?: number;
  image: keyof typeof IMAGES;
  swatches: string[];
}

export const PAIRINGS: Pairing[] = [
  {
    id: "pw1",
    primary: "Handloom Banarasi Silk Saree",
    pairsWith: "Tasselled Potli Bag",
    noteKey: "pairs.p1.note",
    priceInr: 24500,
    mrpInr: 32000,
    rating: 4.9,
    reviewCount: 312,
    image: "pwPotli",
    swatches: ["#8F6F3F", "#262019", "#C6A15B"],
  },
  {
    id: "pw2",
    primary: "Heritage Chanderi Kurta Set",
    pairsWith: "Antique Gold Brooch",
    noteKey: "pairs.p2.note",
    priceInr: 8950,
    mrpInr: 10950,
    rating: 4.8,
    reviewCount: 184,
    image: "pwBrooch",
    swatches: ["#E9DFCF", "#B08D57", "#6E6150"],
  },
  {
    id: "pw3",
    primary: "Regal Zardozi Lehenga",
    pairsWith: "Heritage Choker",
    noteKey: "pairs.p3.note",
    priceInr: 68000,
    rating: 5.0,
    reviewCount: 58,
    image: "pwChoker",
    swatches: ["#8F6F3F", "#F3ECDF", "#B08D57"],
  },
  {
    id: "pw4",
    primary: "Silk Drape Maxi",
    pairsWith: "Sculpted Fold Clutch",
    noteKey: "pairs.p4.note",
    priceInr: 12400,
    mrpInr: 14900,
    rating: 4.5,
    reviewCount: 63,
    image: "pwClutch",
    swatches: ["#6E6150", "#E9DFCF", "#262019"],
  },
];
