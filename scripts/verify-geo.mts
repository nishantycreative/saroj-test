/*
  Geo bootstrapping test (node --experimental-strip-types).
  Run: node scripts/verify-geo.mts

  Mocks the browser globals geo.ts reads (window.localStorage,
  navigator.language, Intl.DateTimeFormat) and asserts the key behaviours,
  most importantly the India → English language exception.
*/

const failures: string[] = [];

const assert = (cond: boolean, label: string) => {
  if (cond) {
    console.log(`ok: ${label}`);
  } else {
    failures.push(label);
    console.error(`FAIL: ${label}`);
  }
};

const fakeStorage = () => {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
};

const setGlobal = (key: string, value: unknown) => {
  Object.defineProperty(globalThis, key, {
    value,
    configurable: true,
    writable: true,
  });
};

const mockWindowLocalStorage = () =>
  (globalThis as unknown as { window?: MockWindow }).window!.localStorage;

interface MockWindow {
  localStorage: { getItem(key: string): string | null; setItem(key: string, value: string): void };
}

const mockBrowser = (language: string, intlLocale: string) => {
  setGlobal("window", { localStorage: fakeStorage() });
  setGlobal("navigator", { language });
  setGlobal("Intl", {
    DateTimeFormat: class {
      resolvedOptions() {
        return { locale: intlLocale };
      }
    },
  });
};

const geo = await import("../lib/geo.ts");

/* ---- 1. Simulated India IP / browser: hi-IN + en-IN region → English ---- */
mockBrowser("hi-IN", "en-IN");
assert(geo.detectRegion() === "IN", "detectRegion resolves en-IN → IN");
assert(
  geo.detectLocale() === "en",
  "India → language forced to en (ignores hi navigator.language)",
);
assert(
  geo.detectCurrency() === "INR",
  "India → currency stays INR (exception applies to language only)",
);
assert(
  geo.resolveInitialLocale() === "en",
  "fresh resolveInitialLocale (no saved pref) → en for India",
);
assert(
  geo.resolveInitialCurrency() === "INR",
  "fresh resolveInitialCurrency → INR for India",
);

/* ---- 2. Explicit persisted choice wins over the India force ---- */
mockBrowser("hi-IN", "en-IN");
mockWindowLocalStorage().setItem("saroj.lang.v1", "hi");
assert(
  geo.resolveInitialLocale() === "hi",
  "explicit persisted hi overrides the India → en force",
);
mockWindowLocalStorage().setItem("saroj.currency.v1", "USD");
assert(
  geo.resolveInitialCurrency() === "USD",
  "explicit persisted USD overrides India → INR",
);

/* ---- 3. India with a completely unrelated browser language ---- */
mockBrowser("ja-JP", "hi-IN");
assert(
  geo.detectLocale() === "en",
  "India region + ja-JP browser → still English",
);
assert(geo.detectCurrency() === "INR", "India region + ja-JP → INR");

/* ---- 4. Overseas locales behave normally (unchanged behaviour) ---- */
mockBrowser("fr-FR", "fr-FR");
assert(geo.detectLocale() === "fr", "fr-FR → fr");
assert(geo.detectCurrency() === "EUR", "France → EUR");

mockBrowser("en-US", "en-US");
assert(geo.detectLocale() === "en", "en-US → en");
assert(geo.detectCurrency() === "USD", "US → USD");

mockBrowser("ar-AE", "ar-AE");
assert(geo.detectLocale() === "ar", "ar-AE → ar");
assert(geo.detectCurrency() === "AED", "UAE → AED");

/* ---- 5. Unsaved persisted junk + missing globals fall back safely ---- */
mockBrowser("es-419", "es-MX");
assert(geo.detectLocale() === "es", "es-419 tag → es (parent match)");
mockWindowLocalStorage().setItem("saroj.lang.v1", "xx");
assert(
  geo.resolveInitialLocale() === "en" ||
    geo.resolveInitialLocale() === "es",
  "unsupported saved pref falls back to detection",
);

delete (globalThis as unknown as { window?: unknown }).window;
delete (globalThis as unknown as { navigator?: unknown }).navigator;
try {
  delete (globalThis as unknown as { Intl?: unknown }).Intl;
} catch {
  /* non-configurable in some envs */
}
assert(geo.detectLocale() === "en", "no browser globals → en default");
assert(geo.detectCurrency() === "INR", "no browser globals → INR default");

if (failures.length > 0) {
  throw new Error(`GEO CHECKS FAILED:\n- ${failures.join("\n- ")}`);
}
console.log("ALL GEO CHECKS PASSED");