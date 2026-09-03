/*
  Price / formatting helpers — global currency support.

  INR is the base currency. Non-INR prices = INR × live rate × 1.05
  (5% international service fee). Rates come from lib/rates.ts (fetched
  live from open.er-api.com, cached client-side for 24h).
*/

export type CurrencyCode =
  | "INR"
  | "USD"
  | "EUR"
  | "GBP"
  | "AED"
  | "SGD"
  | "AUD"
  | "CAD";

export interface CurrencyDef {
  code: CurrencyCode;
  symbol: string;
  /** English display name — the selector stays in English for all locales. */
  label: string;
}

export const CURRENCIES: readonly CurrencyDef[] = [
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "AED", symbol: "AED", label: "UAE Dirham" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
] as const;

/** Extra markup applied to every non-INR converted price (5%). */
export const NON_INR_MARKUP = 1.05;

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "AED",
  SGD: "S$",
  AUD: "A$",
  CAD: "C$",
};

export function currencyByCode(code: CurrencyCode): CurrencyDef {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

/** Convert an INR amount into the target currency (with 5% non-INR markup). */
export function convertFromInr(
  amountInr: number,
  code: CurrencyCode,
  rate: number,
): number {
  if (code === "INR") return amountInr;
  return amountInr * rate * NON_INR_MARKUP;
}

/** Format an already-converted amount with the currency symbol. */
export function formatConverted(
  amount: number,
  code: CurrencyCode,
  opts: { maximumFractionDigits?: number } = {},
): string {
  const { maximumFractionDigits = 2 } = opts;
  const formatted = amount.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });
  return `${CURRENCY_SYMBOLS[code]} ${formatted}`;
}

/** Format an INR amount natively (never converted, never marked up). */
export function formatInr(amountInr: number): string {
  return `₹ ${amountInr.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
