/*
  SAROJ ENSEMBLE — i18n core.

  Flat-key dictionary architecture:
    - lib/i18n/dicts/en.ts is the master dictionary; its keys define the
      DictKey type, so every other language file is compile-time checked
      to cover exactly the same keys.
    - Adding a language = add a dictionary file + one entry in DICTIONARIES
      and LOCALES below. No component changes required.
    - The language selector UI itself always renders in English (LOCALES.name).
*/

import { en, type DictKey } from "./dicts/en";
import { hi } from "./dicts/hi";
import { es } from "./dicts/es";
import { fr } from "./dicts/fr";
import { de } from "./dicts/de";
import { ar } from "./dicts/ar";
import { pt } from "./dicts/pt";
import { it } from "./dicts/it";
import { ja } from "./dicts/ja";
import { zh } from "./dicts/zh";

export type { DictKey };
export type Dictionary = Record<DictKey, string>;

export interface LocaleDef {
  code: string;
  /** English display name — the selector stays in English for all locales. */
  name: string;
  nativeName?: string;
}

export const LOCALES: readonly LocaleDef[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: LocaleCode = "en";

export const DICTIONARIES: Record<LocaleCode, Dictionary> = {
  en: en as unknown as Dictionary,
  hi,
  es,
  fr,
  de,
  ar,
  pt,
  it,
  ja,
  zh,
};

export type TranslationVars = Record<string, string | number>;

/**
 * Resolve a dictionary key for a locale, falling back to English (then to
 * the key itself) if a translation is missing. Replaces {placeholders}.
 */
export function translate(
  locale: LocaleCode,
  key: DictKey,
  vars?: TranslationVars,
): string {
  let str: string =
    DICTIONARIES[locale]?.[key] ??
    (en as unknown as Dictionary)[key] ??
    key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}
