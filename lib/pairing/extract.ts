/*
  PAIRING — Stage 1: attribute extraction.

  Primary path: one LLM call per product (strict JSON, fixed enums — see
  attributes.ts). Runs once per product on creation and again only when a
  product's title/description changes (webhook-triggered), never per page
  load.

  Fallback path (no LLM configured): a deterministic keyword extractor so
  the pipeline and UI are testable against local placeholder data today.
  It is intentionally cruder than the LLM path — swap in real credentials
  to get the full-quality extraction.
*/

import type {
  ColorFamily,
  FabricType,
  GarmentRole,
  OccasionTag,
  PatternMotif,
  ProductAttributes,
  WeightClass,
} from "./attributes";
import {
  COLOR_FAMILIES,
  FABRIC_TYPES,
  GARMENT_ROLES,
  OCCASION_TAGS,
  PATTERN_MOTIFS,
  WEIGHT_CLASSES,
} from "./attributes";

const LLM_API_URL = process.env.LLM_API_URL;
const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_MODEL = process.env.LLM_MODEL ?? "gpt-4o-mini";

export const LLM_ENABLED = Boolean(LLM_API_URL && LLM_API_KEY);

function enumList(values: readonly string[]) {
  return values.map((v) => `"${v}"`).join(", ");
}

const SYSTEM_PROMPT = `You are a catalog analyst for an Indian ethnic-wear store.
Extract structured attributes from a product title + description. Respond with STRICT JSON only (no prose, no markdown), matching exactly this schema:

{
  "garment_role": "top",                    // one of: ${enumList(GARMENT_ROLES)}
  "primary_color_family": "green",          // one of: ${enumList(COLOR_FAMILIES)}
  "secondary_color_family": "gold",         // one of the same list, or null
  "pattern_motif": "zari_border",           // one of: ${enumList(PATTERN_MOTIFS)}
  "fabric_type": "silk",                    // one of: ${enumList(FABRIC_TYPES)}
  "occasion_tags": ["festive"],             // subset of: ${enumList(OCCASION_TAGS)}
  "weight_class": "heavy"                   // one of: ${enumList(WEIGHT_CLASSES)}
}

Rules:
- garment_role: "top" = kurta/top piece, "bottom" = trousers/lehenga skirt/palazzo, "blouse_piece" = saree blouse fabric, "saree" = full saree, "dupatta" = dupatta/odhani, "co_ord_set" = matching top+bottom set, "stole" = stole/scarf.
- Normalize colours ("emerald", "bottle-green", "forest" -> "green"; "beige", "cream", "off-white" -> "ivory"; "maroon", "burgundy" -> "red").
- weight_class from fabric: heavy = silk/brocade/velvet/zardozi, medium = georgette/chiffon blends, light = cotton/linen/net.
- occasion_tags: pick only the ones clearly implied by the text; default ["festive"] for ethnic-wear when unclear.
- secondary_color_family: null when only one colour is described.`;

/** Extract attributes for one product via the LLM. Throws on any failure. */
export async function extractAttributesLLM(
  title: string,
  description: string,
): Promise<ProductAttributes> {
  if (!LLM_API_URL || !LLM_API_KEY) {
    throw new Error("LLM not configured — set LLM_API_URL / LLM_API_KEY");
  }
  const res = await fetch(LLM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Title: ${title}\nDescription: ${description}` },
      ],
    }),
  });
  if (!res.ok) throw new Error(`LLM extraction failed: ${res.status}`);
  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("LLM extraction returned no content");
  return validateAttributes(JSON.parse(content));
}

/** Validate + normalize a parsed attribute object against the fixed enums. */
export function validateAttributes(raw: unknown): ProductAttributes {
  const a = raw as Record<string, unknown>;
  const pick = <T extends readonly string[]>(v: unknown, allowed: T, fallback: T[number]): T[number] =>
    typeof v === "string" && (allowed as readonly string[]).includes(v)
      ? (v as T[number])
      : fallback;

  const primary = pick(a.primary_color_family, COLOR_FAMILIES, "multi");
  const secondaryRaw = a.secondary_color_family;
  const secondary =
    typeof secondaryRaw === "string" &&
    (COLOR_FAMILIES as readonly string[]).includes(secondaryRaw) &&
    secondaryRaw !== primary
      ? (secondaryRaw as ColorFamily)
      : null;

  return {
    garment_role: pick(a.garment_role, GARMENT_ROLES, "co_ord_set"),
    primary_color_family: primary,
    secondary_color_family: secondary,
    pattern_motif: pick(a.pattern_motif, PATTERN_MOTIFS, "plain"),
    fabric_type: pick(a.fabric_type, FABRIC_TYPES, "blend"),
    occasion_tags: Array.isArray(a.occasion_tags)
      ? (a.occasion_tags.filter(
          (t): t is OccasionTag =>
            typeof t === "string" &&
            (OCCASION_TAGS as readonly string[]).includes(t),
        ) as OccasionTag[])
      : ["festive"],
    weight_class: pick(a.weight_class, WEIGHT_CLASSES, "medium"),
  };
}

/* ---------------- Deterministic fallback (no LLM, dev/testing) ---------------- */

function matchEnum(
  text: string,
  patterns: [RegExp, string][],
  fallback: string,
): string {
  for (const [re, value] of patterns) {
    if (re.test(text)) return value;
  }
  return fallback;
}

const ROLE_PATTERNS: [RegExp, GarmentRole][] = [
  [/blouse\s*piece|blouse\s*fabric/i, "blouse_piece"],
  [/saree|sari\b/i, "saree"],
  [/dupatta|odhani/i, "dupatta"],
  [/stole|scarf/i, "stole"],
  [/bottom|churidar|palazzo|trouser|lehenga/i, "bottom"],
  [/\bset\b|co-ord|coord|anarkali|sharara|kurta\s*set/i, "co_ord_set"],
  [/kurta|kurti|shirt|top\b/i, "top"],
];

const COLOR_PATTERNS: [RegExp, ColorFamily][] = [
  [/emerald|forest|bottle[- ]?green|green|olive|sage/i, "green"],
  [/maroon|burgundy|wine|red|scarlet/i, "red"],
  [/navy|blue|indigo/i, "blue"],
  [/gold|zari|champagne/i, "gold"],
  [/ivory|cream|beige|off[- ]?white|bone/i, "ivory"],
  [/white/i, "white"],
  [/black|charcoal|ink\b/i, "black"],
  [/pink|rose|magenta|sequin\s*pink/i, "pink"],
  [/purple|lavender|plum|lilac/i, "purple"],
  [/yellow|mustard/i, "yellow"],
  [/orange|saffron|rust/i, "orange"],
  [/brown|tan|mocha/i, "brown"],
  [/grey|gray|slate/i, "grey"],
];

const PATTERN_PATTERNS: [RegExp, PatternMotif][] = [
  [/zari\s*border|zari/i, "zari_border"],
  [/embroider|thread\s*work|zardozi/i, "embroidered"],
  [/floral|botanical/i, "floral"],
  [/checked|checks|plaid/i, "checked"],
  [/striped|stripe/i, "striped"],
  [/geometric/i, "geometric"],
  [/kalamkari|motif|print/i, "motif"],
];

const FABRIC_PATTERNS: [RegExp, FabricType][] = [
  [/brocade|banarasi\s*brocade/i, "brocade"],
  [/velvet/i, "velvet"],
  [/organza/i, "organza"],
  [/georgette/i, "georgette"],
  [/chiffon/i, "chiffon"],
  [/net\b/i, "net"],
  [/linen/i, "linen"],
  [/cotton|mul\b|muslin/i, "cotton"],
  [/silk|chanderi|tusser|raw\s*silk|jacquard/i, "silk"],
];

const OCCASION_PATTERNS: [RegExp, OccasionTag][] = [
  [/wedding|bridal/i, "wedding"],
  [/cocktail|party|reception/i, "cocktail"],
  [/office|work|corporate/i, "office"],
  [/everyday|daily/i, "everyday"],
  [/festive|celebration|diwali/i, "festive"],
];

function weightFromFabric(fabric: FabricType): WeightClass {
  if (fabric === "silk" || fabric === "brocade" || fabric === "velvet")
    return "heavy";
  if (fabric === "cotton" || fabric === "linen" || fabric === "net")
    return "light";
  return "medium";
}

/** Keyword-based extraction — local fallback only, replaced by the LLM path. */
export function extractAttributesHeuristic(
  title: string,
  description = "",
): ProductAttributes {
  const text = `${title}. ${description}`;
  const role = matchEnum(text, ROLE_PATTERNS, "co_ord_set") as GarmentRole;
  const primary = matchEnum(text, COLOR_PATTERNS, "multi") as ColorFamily;

  /* Second distinct colour family mentioned becomes the secondary. */
  let secondaryColor: ColorFamily | null = null;
  const seen = new Set<string>();
  for (const [re, family] of COLOR_PATTERNS) {
    if (re.test(text) && !seen.has(family)) {
      seen.add(family);
      if (seen.size > 1) {
        secondaryColor = family;
        break;
      }
    }
  }
  if (secondaryColor === primary) secondaryColor = null;

  const fabric = matchEnum(text, FABRIC_PATTERNS, "blend") as FabricType;
  const occasions = OCCASION_PATTERNS.filter(([re]) => re.test(text)).map(
    ([, o]) => o,
  );
  const occasionTags: OccasionTag[] =
    occasions.length > 0 ? occasions : ["festive"];

  return {
    garment_role: role,
    primary_color_family: primary,
    secondary_color_family: secondaryColor,
    pattern_motif: matchEnum(text, PATTERN_PATTERNS, "plain") as PatternMotif,
    fabric_type: fabric,
    occasion_tags: occasionTags,
    weight_class: weightFromFabric(fabric),
  };
}
