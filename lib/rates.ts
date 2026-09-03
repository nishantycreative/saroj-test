/*
  Live exchange-rate fetching (INR base).

  Primary provider: open.er-api.com — free, no key required, refreshed
  daily. Fallback: frankfurter.app (ECB rates; no AED). Both return
  INR-based rates.

  Caching:
    - Module-level in-flight promise → concurrent callers share one request.
    - localStorage cache with a 24h TTL → one network call per day.
  Every product price renders from the in-memory state; no per-product
  requests are made.
*/

import type { CurrencyCode } from "@/lib/format";

export const RATES_TTL_MS = 24 * 60 * 60 * 1000;
export const RATES_STORAGE_KEY = "saroj-rates-v1";

export const RATE_CURRENCIES: readonly CurrencyCode[] = [
  "USD",
  "EUR",
  "GBP",
  "AED",
  "SGD",
  "AUD",
  "CAD",
];

export type RatesData = Partial<Record<CurrencyCode, number>>;

export interface CachedRates {
  fetchedAt: number;
  rates: RatesData;
}

let inflight: Promise<RatesData> | null = null;

export function readCachedRates(): CachedRates | null {
  try {
    const raw = window.localStorage.getItem(RATES_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CachedRates> | null;
    if (
      !parsed ||
      typeof parsed.fetchedAt !== "number" ||
      typeof parsed.rates !== "object"
    ) {
      return null;
    }
    return parsed as CachedRates;
  } catch {
    return null;
  }
}

export function writeCachedRates(cached: CachedRates): void {
  try {
    window.localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify(cached));
  } catch {
    /* storage unavailable — caching is best-effort */
  }
}

async function fetchOpenErApi(): Promise<RatesData> {
  const res = await fetch("https://open.er-api.com/v6/latest/INR", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`open.er-api.com responded ${res.status}`);
  const json = (await res.json()) as {
    result?: string;
    rates?: Record<string, number>;
  };
  if (json.result !== "success" || !json.rates) {
    throw new Error("open.er-api.com returned an invalid payload");
  }
  return pickRates(json.rates);
}

async function fetchFrankfurter(): Promise<RatesData> {
  const targets = RATE_CURRENCIES.filter((c) => c !== "AED").join(",");
  const res = await fetch(
    `https://api.frankfurter.app/latest?from=INR&to=${targets}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error(`frankfurter.app responded ${res.status}`);
  const json = (await res.json()) as { rates?: Record<string, number> };
  if (!json.rates) throw new Error("frankfurter.app returned an invalid payload");
  return pickRates(json.rates);
}

/** Keep only the currencies we render; drop anything missing. */
function pickRates(all: Record<string, number>): RatesData {
  const out = {} as RatesData;
  for (const code of RATE_CURRENCIES) {
    const v = all[code];
    if (typeof v === "number" && Number.isFinite(v) && v > 0) {
      out[code] = v;
    }
  }
  if (Object.keys(out).length === 0) {
    throw new Error("No usable rates in payload");
  }
  return out;
}

/**
 * Fetch live INR-based rates once, sharing the in-flight request across
 * concurrent callers. Tries open.er-api.com, then frankfurter.app.
 */
export function fetchLiveRates(): Promise<RatesData> {
  if (inflight) return inflight;
  inflight = fetchOpenErApi()
    .catch(() => fetchFrankfurter())
    .finally(() => {
      inflight = null;
    });
  return inflight;
}
