/*
  Auto-locale bootstrapping (client-side).

  On first visit we pick the best supported language + currency from the
  browser (navigator.language / Intl region). The user's explicit choice —
  from the header selectors — is persisted and always wins when present.

  India exception: when the detected country/region resolves to India, the
  language is forced to English ("en") regardless of what the browser's
  navigator.language or IP-geolocation guess returns. This applies ONLY to
  language — India still resolves to INR for currency, unchanged.

  Best-effort: detection failures fall back to the global defaults (en·INR),
  and only the header selector can change things afterwards.

  NOTE: this module intentionally has NO runtime imports (only type imports
  that are erased at build time) so scripts/verify-geo.ts can execute it
  directly under node --experimental-strip-types with mocked browser globals.
  Keep the supported-code lists below in sync with lib/i18n and lib/format.
*/

import type { LocaleCode } from "@/lib/i18n";
import type { CurrencyCode } from "@/lib/format";

/** Supported language codes — keep in sync with LOCALES in lib/i18n. */
const SUPPORTED_LANGUAGE_CODES: readonly string[] = [
  "en",
  "hi",
  "es",
  "fr",
  "de",
  "ar",
  "pt",
  "it",
  "ja",
  "zh",
];

/** Supported currency codes — keep in sync with CURRENCIES in lib/format. */
const SUPPORTED_CURRENCY_CODES: readonly string[] = [
  "INR",
  "USD",
  "EUR",
  "GBP",
  "AED",
  "SGD",
  "AUD",
  "CAD",
];

const LANG_KEY = "saroj.lang.v1";
const CURRENCY_KEY = "saroj.currency.v1";

/** Country/region code (e.g. "IN", "US") from the browser Intl locale or
    navigator.language tag, if either carries one. */
export function detectRegion(): string | undefined {
  try {
    const fromIntl =
      new Intl.DateTimeFormat().resolvedOptions().locale?.split("-")[1];
    if (fromIntl) return fromIntl.toUpperCase();
  } catch {
    /* fall through to navigator tag */
  }
  try {
    const fromNav = navigator.language?.split("-")[1];
    if (fromNav) return fromNav.toUpperCase();
  } catch {
    /* ignore */
  }
  return undefined;
}

/** Persisted/preferred locale, else a browser-derived best match. */
export function resolveInitialLocale(): LocaleCode {
  try {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED_LANGUAGE_CODES.includes(saved)) {
      return saved as LocaleCode;
    }
  } catch {
    /* storage unavailable — fall through to detection */
  }
  return detectLocale();
}

/** Browser language → closest supported locale.
    India is ALWAYS English regardless of the browser language guess. */
export function detectLocale(): LocaleCode {
  if (detectRegion() === "IN") return "en";
  try {
    const raw = navigator.language ?? "en";
    const tag = raw.toLowerCase().replace("_", "-");
    const [lang] = tag.split("-");
    const matched =
      SUPPORTED_LANGUAGE_CODES.find((l) => l === lang) ??
      // language parent match: zh-* → zh, es-419 → es, etc.
      SUPPORTED_LANGUAGE_CODES.find((l) => tag.startsWith(`${l}-`));
    return (matched ?? "en") as LocaleCode;
  } catch {
    return "en";
  }
}

/** Persisted/preferred currency, else a region-derived best match. */
export function resolveInitialCurrency(): CurrencyCode {
  try {
    const saved = window.localStorage.getItem(CURRENCY_KEY);
    if (saved && SUPPORTED_CURRENCY_CODES.includes(saved)) {
      return saved as CurrencyCode;
    }
  } catch {
    /* fall through */
  }
  return detectCurrency();
}

/** Intl region tag → a supported currency, capped to the export table. */
export function detectCurrency(): CurrencyCode {
  const region = detectRegion();
  if (!region) return "INR";
  const regionToCurrency: Record<string, CurrencyCode> = {
    IN: "INR",
    US: "USD",
    GB: "GBP",
    AE: "AED",
    SG: "SGD",
    AU: "AUD",
    CA: "CAD",
    DE: "EUR",
    FR: "EUR",
    IT: "EUR",
    ES: "EUR",
    PT: "EUR",
    AT: "EUR",
    BE: "EUR",
    NL: "EUR",
    IE: "EUR",
  };
  return regionToCurrency[region] ?? "INR";
}

/** Remember the user's explicit choice for the next visit. */
export function persistLocale(locale: LocaleCode): void {
  try {
    window.localStorage.setItem(LANG_KEY, locale);
  } catch {
    /* ignore */
  }
}

export function persistCurrency(currency: CurrencyCode): void {
  try {
    window.localStorage.setItem(CURRENCY_KEY, currency);
  } catch {
    /* ignore */
  }
}