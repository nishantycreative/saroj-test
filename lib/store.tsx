"use client";

/*
  Client-side UI store.

  Holds: language (10 locales via lib/i18n), currency with LIVE exchange
  rates (INR base, 5% non-INR markup via lib/rates + lib/format), cart /
  wishlist contents (placeholder data), drawer visibility and toasts.

  Boundaries (Phase 2/3):
    - cart/wishlist persistence & totals → Shopify Storefront API (lib/shopify.ts)
    - announcement copy → Shopify metaobject / settings
*/

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Product } from "@/lib/shopify";
import {
  convertFromInr,
  formatConverted,
  formatInr,
  type CurrencyCode,
} from "@/lib/format";
import {
  fetchLiveRates,
  readCachedRates,
  RATES_TTL_MS,
  writeCachedRates,
  type RatesData,
} from "@/lib/rates";
import {
  DEFAULT_LOCALE,
  LOCALES,
  translate,
  type DictKey,
  type LocaleCode,
  type TranslationVars,
} from "@/lib/i18n";
import {
  persistCurrency,
  persistLocale,
  resolveInitialCurrency,
  resolveInitialLocale,
} from "@/lib/geo";
import { DRAWER_SEED_PRODUCTS } from "@/lib/data/products";

export interface CartLine {
  product: Product;
  size: string;
  qty: number;
}

type DrawerId = "cart" | "wishlist" | "menu" | null;

export interface RatesState {
  status: "loading" | "ready" | "error";
  data: RatesData;
  updatedAt?: string;
}

export interface FormatPriceOptions {
  currency?: CurrencyCode;
  maximumFractionDigits?: number;
}

interface StoreShape {
  /* ---- i18n ---- */
  lang: LocaleCode;
  setLang: (l: LocaleCode) => void;
  t: (key: DictKey, vars?: TranslationVars) => string;
  locales: typeof LOCALES;

  /* ---- currency ---- */
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  rates: RatesState;
  /** Convert + format an INR price for the active currency (5% markup on non-INR). */
  formatPrice: (amountInr: number, opts?: FormatPriceOptions) => string;

  /* ---- drawers ---- */
  drawer: DrawerId;
  openDrawer: (d: Exclude<DrawerId, null>) => void;
  closeDrawer: () => void;

  /* ---- cart ---- */
  cart: CartLine[];
  addToCart: (product: Product, size?: string, qty?: number) => void;
  removeFromCart: (index: number) => void;
  updateQty: (index: number, qty: number) => void;
  cartCount: number;
  cartSubtotalInr: number;

  /* ---- wishlist ---- */
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  /* ---- toast ---- */
  toast: string | null;
  showToast: (message: string) => void;

  /* ---- homepage hero reveal ---- */
  /** True once the scroll-scrub hero's door-opening reveal has completed
      and the scroll-lock has released. Header mounts only after this. */
  heroRevealed: boolean;
  setHeroRevealed: (v: boolean) => void;
}

const StoreContext = createContext<StoreShape | null>(null);

const SIZES = ["Free size", "S", "M", "L", "XL", "Custom"];

/* Rates start from the 24h localStorage cache when fresh (no effect needed). */
function initialRates(): RatesState {
  const cached = readCachedRates();
  if (cached && Date.now() - cached.fetchedAt < RATES_TTL_MS) {
    return {
      status: "ready",
      data: cached.rates,
      updatedAt: new Date(cached.fetchedAt).toISOString(),
    };
  }
  return { status: "loading", data: {} };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LocaleCode>(DEFAULT_LOCALE);
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");
  const [rates, setRates] = useState<RatesState>(initialRates);
  const [drawer, setDrawer] = useState<DrawerId>(null);
  const [cart, setCart] = useState<CartLine[]>(() =>
    DRAWER_SEED_PRODUCTS.map((product, i) => ({
      product,
      size: SIZES[i % SIZES.length],
      qty: 1,
    })),
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    DRAWER_SEED_PRODUCTS.map((p) => p.id).slice(0, 2),
  );
  const [toast, setToast] = useState<string | null>(null);
  const [heroRevealed, setHeroRevealed] = useState(false);

  /* One-time auto-detect after hydration (avoids SSR hydration mismatch).
     Reading localStorage synchronously in an initializer would disagree
     with the server-rendered markup; populating in an effect does not. */
  const geoApplied = useRef(false);
  useEffect(() => {
    if (geoApplied.current) return;
    geoApplied.current = true;
    setLangState(resolveInitialLocale());
    setCurrencyState(resolveInitialCurrency());
  }, []);

  /* Persist explicit user choices so geo-detect only runs on first visit. */
  const setLang = useCallback((next: LocaleCode) => {
    setLangState(next);
    if (typeof window !== "undefined") persistLocale(next);
  }, []);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
    if (typeof window !== "undefined") persistCurrency(next);
  }, []);

  /* ---- document lang + direction follow the selected locale ---- */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  /* ---- live exchange rates: cached 24h, one fetch per app load ---- */
  useEffect(() => {
    let cancelled = false;
    if (rates.status === "ready") return;
    fetchLiveRates()
      .then((data) => {
        if (cancelled) return;
        const fetchedAt = Date.now();
        setRates({
          status: "ready",
          data,
          updatedAt: new Date(fetchedAt).toISOString(),
        });
        writeCachedRates({ fetchedAt, rates: data });
      })
      .catch(() => {
        if (cancelled) return;
        setRates((prev) => ({ ...prev, status: "error" }));
      });
    return () => {
      cancelled = true;
    };
  }, [rates.status]);

  const t = useCallback(
    (key: DictKey, vars?: TranslationVars) => translate(lang, key, vars),
    [lang],
  );

  /* ---- price conversion: INR native, others × rate × 1.05 ---- */
  const formatPrice = useCallback(
    (amountInr: number, opts?: FormatPriceOptions) => {
      const code = opts?.currency ?? currency;
      const digits = opts?.maximumFractionDigits;
      if (code === "INR") {
        return formatInr(amountInr);
      }
      const rate = rates.data[code];
      if (!rate) {
        /* Honest fallback: live rate not yet available → show INR */
        return formatInr(amountInr);
      }
      const converted = convertFromInr(amountInr, code, rate);
      return formatConverted(converted, code, digits ? { maximumFractionDigits: digits } : {});
    },
    [currency, rates],
  );

  const showToast = useCallback(
    (message: string) => {
      setToast(message);
      window.setTimeout(() => setToast(null), 2600);
    },
    [],
  );

  const addToCart = useCallback(
    (product: Product, size = "M", qty = 1) => {
      const add = Math.max(1, qty);
      setCart((prev) => {
        const idx = prev.findIndex(
          (l) => l.product.id === product.id && l.size === size,
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + add };
          return next;
        }
        return [...prev, { product, size, qty: add }];
      });
      showToast(
        translate(lang, "product.addedToast", { title: product.title }),
      );
    },
    [lang, showToast],
  );

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQty = useCallback((index: number, qty: number) => {
    setCart((prev) =>
      prev.map((line, i) =>
        i === index ? { ...line, qty: Math.max(1, qty) } : line,
      ),
    );
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, l) => sum + l.qty, 0),
    [cart],
  );
  const cartSubtotalInr = useMemo(
    () => cart.reduce((sum, l) => sum + l.qty * l.product.priceInr, 0),
    [cart],
  );

  const value = useMemo<StoreShape>(
    () => ({
      lang,
      setLang,
      t,
      locales: LOCALES,
      currency,
      setCurrency,
      rates,
      formatPrice,
      drawer,
      openDrawer: (d) => setDrawer(d),
      closeDrawer: () => setDrawer(null),
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      cartCount,
      cartSubtotalInr,
      wishlist,
      toggleWishlist,
      toast,
      showToast,
      heroRevealed,
      setHeroRevealed,
    }),
    [
      lang,
      setLang,
      t,
      currency,
      setCurrency,
      rates,
      formatPrice,
      drawer,
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      cartCount,
      cartSubtotalInr,
      wishlist,
      toggleWishlist,
      toast,
      showToast,
      heroRevealed,
      setHeroRevealed,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreShape {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within <StoreProvider>");
  return ctx;
}

/* Body scroll lock while a drawer is open */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}
