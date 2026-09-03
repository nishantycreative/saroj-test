/*
  FABRIC CALCULATOR - configuration + estimation math.

  The tailoring rules live centrally here, cleanly separated from the UI:
    Input (component form) -> Calculation (this file) -> Result (component).

  Formulas follow standard Indian fabric-consumption practice for 44"
  handloom width: garment-specific metres-per-piece + 8% wastage allowance,
  rounded up to the nearest 0.25 m.

  The calculator outputs required METERAGE only - no pricing.

  NOTE - Men's yardage: the five men's garments use commonly-published
  standard yardage estimates as placeholders. They MUST be verified
  against the client's own tailors' measurement tables before this ships
  live (see "fabric.noteMenVerify" surfaced in the UI).
*/

import type { DictKey } from "@/lib/i18n";

export interface FieldDef {
  key: string;
  labelKey: DictKey;
  unitKey: DictKey;
  min: number;
  max: number;
  step: number;
  placeholder: string;
  helpKey?: DictKey;
}

export interface GarmentDef {
  id: string;
  labelKey: DictKey;
  noteKey: DictKey;
  fields: FieldDef[];
  /** metres of fabric for one piece, given field values */
  metersPerPiece: (v: Record<string, number>) => number;
}

export interface GarmentCategory {
  id: string;
  labelKey: DictKey;
  garments: GarmentDef[];
}

/* Width of fabric (inches) - standard 44" handloom width */
export const FABRIC_WIDTH_IN = 44;

/* Extra allowance for selvedge, wastage, piping (fraction) */
export const WASTE_ALLOWANCE = 0.08;

const roundUp = (n: number) => Math.ceil(n * 4) / 4; // nearest 0.25 m

/** Women's garments - kept from the original calculator, re-parented under
    the "Women" category. */
export const WOMEN_GARMENTS: GarmentDef[] = [
  {
    id: "saree",
    labelKey: "fabric.g.saree",
    noteKey: "fabric.g.saree.note",
    fields: [
      { key: "blouseBust", labelKey: "fabric.f.blouseBust", unitKey: "fabric.units.in", min: 28, max: 52, step: 1, placeholder: "e.g. 36" },
      { key: "sareeLength", labelKey: "fabric.f.sareeLength", unitKey: "fabric.units.m", min: 5.5, max: 6.5, step: 0.25, placeholder: "e.g. 6.2", helpKey: "fabric.help.sareeLength" },
    ],
    metersPerPiece: (v) => roundUp(v.sareeLength + v.blouseBust * 0.02 + 0.25),
  },
  {
    id: "kurta-set",
    labelKey: "fabric.g.kurta",
    noteKey: "fabric.g.kurta.note",
    fields: [
      { key: "chest", labelKey: "fabric.f.chest", unitKey: "fabric.units.in", min: 28, max: 56, step: 1, placeholder: "e.g. 40" },
      { key: "length", labelKey: "fabric.f.kurtaLength", unitKey: "fabric.units.in", min: 30, max: 56, step: 1, placeholder: "e.g. 44" },
    ],
    metersPerPiece: (v) => roundUp(((v.chest + v.length) / 40) * 1.15),
  },
  {
    id: "lehenga",
    labelKey: "fabric.g.lehenga",
    noteKey: "fabric.g.lehenga.note",
    fields: [
      { key: "waist", labelKey: "fabric.f.waist", unitKey: "fabric.units.in", min: 24, max: 48, step: 1, placeholder: "e.g. 32" },
      { key: "length", labelKey: "fabric.f.lehengaLength", unitKey: "fabric.units.in", min: 30, max: 60, step: 1, placeholder: "e.g. 42" },
      { key: "flare", labelKey: "fabric.f.flare", unitKey: "fabric.units.deg", min: 180, max: 1080, step: 90, placeholder: "e.g. 540", helpKey: "fabric.help.flare" },
    ],
    metersPerPiece: (v) => roundUp((v.length / 39) * (1 + (v.flare - 180) / 540) + v.waist * 0.03),
  },
  {
    id: "dupatta",
    labelKey: "fabric.g.dupatta",
    noteKey: "fabric.g.dupatta.note",
    fields: [
      { key: "length", labelKey: "fabric.f.dupattaLength", unitKey: "fabric.units.m", min: 1.8, max: 2.6, step: 0.1, placeholder: "e.g. 2.2" },
    ],
    metersPerPiece: (v) => roundUp(v.length + 0.1),
  },
];

/*
  Men's garments - standard published yardage estimates for 44" cloth width
  as PLACEHOLDERS. Verify against the client's tailors' tables before launch.
*/
export const MEN_GARMENTS: GarmentDef[] = [
  {
    id: "men-shirt",
    labelKey: "fabric.g.menShirt",
    noteKey: "fabric.g.menShirt.note",
    fields: [
      { key: "chest", labelKey: "fabric.f.chest", unitKey: "fabric.units.in", min: 28, max: 56, step: 1, placeholder: "e.g. 40" },
      { key: "shirtLength", labelKey: "fabric.f.shirtLength", unitKey: "fabric.units.in", min: 26, max: 42, step: 1, placeholder: "e.g. 32" },
      { key: "sleeve", labelKey: "fabric.f.sleeve", unitKey: "fabric.units.in", min: 20, max: 28, step: 1, placeholder: "e.g. 24" },
    ],
    metersPerPiece: (v) => roundUp(2.0 + (v.chest - 38) * 0.05 + (v.shirtLength - 30) * 0.03 + (v.sleeve - 24) * 0.02),
  },
  {
    id: "men-pant",
    labelKey: "fabric.g.menPant",
    noteKey: "fabric.g.menPant.note",
    fields: [
      { key: "waist", labelKey: "fabric.f.waist", unitKey: "fabric.units.in", min: 26, max: 48, step: 1, placeholder: "e.g. 34" },
      { key: "pantLength", labelKey: "fabric.f.pantLength", unitKey: "fabric.units.in", min: 36, max: 46, step: 1, placeholder: "e.g. 41" },
    ],
    metersPerPiece: (v) => roundUp(1.2 + (v.waist - 32) * 0.03 + (v.pantLength - 40) * 0.02),
  },
  {
    id: "men-jacket",
    labelKey: "fabric.g.menJacket",
    noteKey: "fabric.g.menJacket.note",
    fields: [
      { key: "chest", labelKey: "fabric.f.chest", unitKey: "fabric.units.in", min: 28, max: 56, step: 1, placeholder: "e.g. 40" },
      { key: "jacketLength", labelKey: "fabric.f.jacketLength", unitKey: "fabric.units.in", min: 26, max: 40, step: 1, placeholder: "e.g. 31" },
    ],
    metersPerPiece: (v) => roundUp(2.6 + (v.chest - 38) * 0.05 + (v.jacketLength - 30) * 0.04),
  },
  {
    id: "men-kurta",
    labelKey: "fabric.g.menKurta",
    noteKey: "fabric.g.menKurta.note",
    fields: [
      { key: "chest", labelKey: "fabric.f.chest", unitKey: "fabric.units.in", min: 28, max: 56, step: 1, placeholder: "e.g. 40" },
      { key: "length", labelKey: "fabric.f.kurtaLength", unitKey: "fabric.units.in", min: 30, max: 52, step: 1, placeholder: "e.g. 44" },
    ],
    metersPerPiece: (v) => roundUp(2.4 + (v.chest - 38) * 0.04 + (v.length - 40) * 0.04),
  },
  {
    id: "men-sherwani",
    labelKey: "fabric.g.menSherwani",
    noteKey: "fabric.g.menSherwani.note",
    fields: [
      { key: "chest", labelKey: "fabric.f.chest", unitKey: "fabric.units.in", min: 28, max: 56, step: 1, placeholder: "e.g. 40" },
      { key: "sherwaniLength", labelKey: "fabric.f.sherwaniLength", unitKey: "fabric.units.in", min: 38, max: 58, step: 1, placeholder: "e.g. 48" },
    ],
    metersPerPiece: (v) => roundUp(3.4 + (v.chest - 38) * 0.05 + (v.sherwaniLength - 44) * 0.04),
  },
];

export const GARMENT_CATEGORIES: GarmentCategory[] = [
  { id: "women", labelKey: "fabric.category.women", garments: WOMEN_GARMENTS },
  { id: "men", labelKey: "fabric.category.men", garments: MEN_GARMENTS },
];

/** All garments across both categories, keyed by id. */
export const GARMENT_BY_ID: Record<string, GarmentDef> = Object.fromEntries(
  [...WOMEN_GARMENTS, ...MEN_GARMENTS].map((g) => [g.id, g]),
);

export interface FabricEstimate {
  meters: number;
  wasteIncluded: boolean;
}

/** Estimate required metres for a garment/measurements combo (no pricing). */
export function estimateFabric(
  garmentId: string,
  values: Record<string, number>,
): FabricEstimate {
  const def = GARMENT_BY_ID[garmentId];
  if (!def) throw new Error(`Unknown garment: ${garmentId}`);
  const base = def.metersPerPiece(values);
  const meters = roundUp(base * (1 + WASTE_ALLOWANCE));
  return { meters, wasteIncluded: true };
}
