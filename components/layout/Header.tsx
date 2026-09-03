"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { FLAT_LINKS, MEGA_CATEGORIES } from "@/lib/data/nav";
import { CURRENCIES } from "@/lib/format";
import { hoverEnabled } from "@/lib/hover";
import { Wordmark } from "@/components/brand/Wordmark";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { CartPreview } from "@/components/layout/CartPreview";
import { EASE_LUX, SPRING_POP } from "@/components/ui/Reveal";
import {
  IconBag,
  IconChevron,
  IconClose,
  IconGlobe,
  IconHeart,
  IconMenu,
  IconSearch,
  IconUser,
} from "@/components/ui/icons";

/*
  Header — refined two-row premium header (color refinement only).

    Row 1 (main)   — #131921 dark navy:
                     logo · search · language · currency · wishlist · cart
    Row 2 (nav)    — existing brand-green shade:
                     categories + flat links, single-line on desktop

  Warm ivory text (#F5F0E6) with golden-beige (#E5D09A) hover/active
  accents. The native green logo sits on its paper chip — never recolored.
  Solid opaque dropdowns; the header owns its stacking context (`isolate`,
  z-[80]) so the mega menu and dialogs can never layer over the
  announcement bar or page content. Mega menu closes on scroll.
*/

const SEARCH_SUGGESTION_KEYS = [
  "header.suggestion.1",
  "header.suggestion.2",
  "header.suggestion.3",
  "header.suggestion.4",
  "header.suggestion.5",
  "header.suggestion.6",
] as const;

const ACCOUNT_KEYS = [
  "header.account.signin",
  "header.account.create",
  "header.account.orders",
  "header.account.sessions",
  "header.account.addresses",
] as const;

type PanelId = "lang" | "currency" | "account" | null;

const PANEL_BASE =
  "absolute end-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-md border border-line bg-white py-2 shadow-lux";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-light">
      {children}
    </p>
  );
}

const SELECTOR_BUTTON =
  "flex h-9 items-center gap-1.5 rounded-sm border border-saroj-green px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-hdr-ivory transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold md:px-2.5";

export function Header() {
  const { lang, setLang, currency, setCurrency, rates, cartCount, openDrawer, t, locales } =
    useStore();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [megaActive, setMegaActive] = useState<string | null>(null);
  const [panel, setPanel] = useState<PanelId>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);

  /* Mini-cart hover preview timers — only on devices that truly hover
     (touch browsers synthesize a hover before the tap; the preview must
     not fire there — click goes straight to /cart instead). */
  const [cartPreview, setCartPreview] = useState(false);
  const cpOpenTimer = useRef<number | null>(null);
  const cpCloseTimer = useRef<number | null>(null);
  const cpScheduleOpen = useCallback(() => {
    if (!hoverEnabled()) return;
    if (cpCloseTimer.current !== null) {
      window.clearTimeout(cpCloseTimer.current);
      cpCloseTimer.current = null;
    }
    if (cpOpenTimer.current !== null) return;
    cpOpenTimer.current = window.setTimeout(() => setCartPreview(true), 220);
  }, []);
  const cpScheduleClose = useCallback(() => {
    if (!hoverEnabled()) return;
    if (cpOpenTimer.current !== null) {
      window.clearTimeout(cpOpenTimer.current);
      cpOpenTimer.current = null;
    }
    if (cpCloseTimer.current !== null) return;
    cpCloseTimer.current = window.setTimeout(() => setCartPreview(false), 200);
  }, []);
  const cpCancelClose = useCallback(() => {
    if (cpCloseTimer.current !== null) {
      window.clearTimeout(cpCloseTimer.current);
      cpCloseTimer.current = null;
    }
  }, []);
  const cpClear = useCallback(() => {
    if (cpOpenTimer.current !== null) window.clearTimeout(cpOpenTimer.current);
    if (cpCloseTimer.current !== null) window.clearTimeout(cpCloseTimer.current);
    cpOpenTimer.current = null;
    cpCloseTimer.current = null;
  }, []);

  /* Shrink-on-scroll: main row compacts, nav row collapses, mega closes */
  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 12;
      setScrolled(isScrolled);
      if (isScrolled) setMegaActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdowns on outside click / Escape */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setPanel(null);
        setMegaActive(null);
        setCartPreview(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(null);
        setMegaActive(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const langButtonLabel = lang.toUpperCase();
  const currencyButtonLabel = currency;

  return (
    <>
      <header
        ref={headerRef}
        className="isolate sticky top-0 z-[80] bg-hdr-footer transition-all duration-500"
        /* Close the mega menu only when the pointer leaves the whole header
           (nav row + open panel). Leaving just the nav row into the panel
           must NOT close it — the panel lives inside the header. */
        onMouseLeave={() => setMegaActive(null)}
      >
        {/* ================= Row 1 — main header #131921 ================= */}
        <div
          className={`container-lux flex items-center gap-1.5 transition-all duration-500 md:gap-3 ${
            scrolled ? "py-2" : "py-3.5"
          }`}
        >
          <button
            className="p-0.5 text-hdr-ivory lg:hidden"
            onClick={() => openDrawer("menu")}
            aria-label={t("header.openMenu")}
          >
            <IconMenu className="h-6 w-6" />
          </button>

          {/* Native green logo (never recolored) — real route link */}
          <Link href="/" aria-label={t("header.home")}>
            <motion.div
              animate={{ scale: scrolled ? 0.94 : 1 }}
              transition={{ duration: 0.5, ease: EASE_LUX }}
              className="rounded-sm"
            >
              <Wordmark />
            </motion.div>
          </Link>

          {/* Desktop inline search */}
          <div className="ms-3 hidden flex-1 md:block">
            <div className="relative mx-auto max-w-sm">
              <IconSearch className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-hdr-ivory/45" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder={t("header.searchPlaceholder")}
                className="h-10 w-full rounded-sm border border-marigold bg-transparent ps-10 pe-4 text-[14px] text-hdr-ivory placeholder:text-hdr-ivory/45 focus:border-marigold focus:outline-none"
              />
            </div>
          </div>

          <div className="ms-auto flex items-center gap-1 md:gap-2">
            <button
              className="p-1.5 text-hdr-ivory md:hidden"
              onClick={() => setSearchOpen(true)}
              aria-label={t("header.search")}
            >
              <IconSearch className="h-5 w-5" />
            </button>

            {/* ---------- Language button (separate control) ---------- */}
            <div className="relative">
              <button
                onClick={() => setPanel(panel === "lang" ? null : "lang")}
                aria-expanded={panel === "lang"}
                aria-haspopup="listbox"
                aria-label={t("header.language")}
                className={SELECTOR_BUTTON}
              >
                <IconGlobe className="hidden h-3.5 w-3.5 sm:block" />
                {langButtonLabel}
                <IconChevron
                  className={`h-3 w-3 transition-transform duration-300 ${
                    panel === "lang" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {panel === "lang" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25, ease: EASE_LUX }}
                    className={`${PANEL_BASE} w-52`}
                    role="listbox"
                    aria-label={t("header.language")}
                  >
                    <SectionLabel>{t("header.language")}</SectionLabel>
                    {locales.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setPanel(null);
                        }}
                        aria-selected={lang === l.code}
                        role="option"
                        className={`flex w-full items-center justify-between px-4 py-2 text-start text-[14px] transition-colors hover:bg-bone ${
                          lang === l.code
                            ? "font-semibold text-forest"
                            : "text-ink"
                        }`}
                      >
                        {l.name}
                        {lang === l.code && (
                          <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ---------- Currency button (separate control) ---------- */}
            <div className="relative">
              <button
                onClick={() =>
                  setPanel(panel === "currency" ? null : "currency")
                }
                aria-expanded={panel === "currency"}
                aria-haspopup="listbox"
                aria-label={t("header.currency")}
                className={SELECTOR_BUTTON}
              >
                {currencyButtonLabel}
                <IconChevron
                  className={`h-3 w-3 transition-transform duration-300 ${
                    panel === "currency" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {panel === "currency" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25, ease: EASE_LUX }}
                    className={`${PANEL_BASE} w-60`}
                    role="listbox"
                    aria-label={t("header.currency")}
                  >
                    <SectionLabel>{t("header.currency")}</SectionLabel>
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCurrency(c.code);
                          setPanel(null);
                        }}
                        aria-selected={currency === c.code}
                        role="option"
                        className={`flex w-full items-center justify-between px-4 py-2 text-start text-[14px] transition-colors hover:bg-bone ${
                          currency === c.code
                            ? "font-semibold text-forest"
                            : "text-ink"
                        }`}
                      >
                        <span>
                          {c.symbol} · {c.code} — {c.label}
                        </span>
                        {currency === c.code && (
                          <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                        )}
                      </button>
                    ))}
                    <p className="border-t border-line px-4 pb-1 pt-3 text-[10px] leading-relaxed text-taupe-light">
                      {rates.status === "error"
                        ? t("header.ratesUnavailable")
                        : rates.status === "ready" && rates.updatedAt
                          ? t("header.ratesUpdated", {
                              date: new Date(rates.updatedAt).toLocaleDateString(
                                "en-IN",
                                { day: "numeric", month: "short" },
                              ),
                            })
                          : t("header.ratesNote")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="hidden rounded-sm border border-saroj-green p-2 text-hdr-ivory transition-colors hover:border-brand-gold hover:text-brand-gold lg:block"
              onClick={() => setPanel(panel === "account" ? null : "account")}
              aria-label={t("header.account")}
            >
              <IconUser className="h-5 w-5" />
            </button>

            <button
              className="relative hidden rounded-sm border border-saroj-green p-2 text-hdr-ivory transition-colors hover:border-brand-gold hover:text-brand-gold sm:block"
              onClick={() => openDrawer("wishlist")}
              aria-label={t("header.wishlist")}
            >
              <IconHeart className="h-5 w-5" />
            </button>

            <div
              className="relative"
              onMouseEnter={cpScheduleOpen}
              onMouseLeave={cpScheduleClose}
            >
              <button
                className="relative rounded-sm border border-saroj-green p-2 text-hdr-ivory transition-colors hover:border-brand-gold hover:text-brand-gold"
                onClick={() => {
                  cpClear();
                  router.push("/cart");
                }}
                aria-label={t("header.cart")}
              >
                <IconBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0.3 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={SPRING_POP}
                    className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-marigold px-1 text-[10px] font-bold text-espresso"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
              <AnimatePresence>
                {cartPreview && (
                  <CartPreview
                    onHoverEnter={cpCancelClose}
                    onHoverLeave={cpScheduleClose}
                    onClose={cpClear}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ================= Row 2 — navigation, #232F3E ================= */}
        <div
          className={`hidden border-t border-hdr-ivory/10 bg-hdr-main transition-all duration-500 lg:block ${
            scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-14 opacity-100"
          }`}
        >
          <nav
            className="flex items-center justify-center gap-3.5 px-4 py-3 xl:gap-5 xl:px-6"
            aria-label={t("header.primaryNav")}
          >
            {MEGA_CATEGORIES.map((cat) => {
              const hasSubs = (cat.subCategories?.length ?? 0) > 0;
              return (
                <div
                  key={cat.id}
                  className="relative flex items-center whitespace-nowrap"
                  onMouseEnter={() => setMegaActive(cat.id)}
                >
                  {/* Label always navigates to the collection page */}
                  <Link
                    href={`/collections/${cat.id}`}
                    onClick={() => setMegaActive(null)}
                    className="group relative py-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-300 xl:text-[13px]"
                  >
                    {t(cat.labelKey)}
                    <span
                      className={`absolute -bottom-0.5 start-0 h-px transition-all duration-500 ${
                        megaActive === cat.id
                          ? "w-full bg-brand-gold"
                          : "w-0 bg-hdr-ivory/70 group-hover:w-full"
                      }`}
                    />
                  </Link>

                  {/* Chevron (only for categories with subcategories) toggles
                      the mega panel without navigating */}
                  {hasSubs && (
                    <button
                      onClick={() =>
                        setMegaActive(
                          megaActive === cat.id ? null : cat.id,
                        )
                      }
                      aria-expanded={megaActive === cat.id}
                      aria-label={t("nav.mega.toggleSubcats", {
                        cat: t(cat.labelKey),
                      })}
                      className="ms-0.5 p-1 text-hdr-ivory/70 transition-colors hover:text-brand-gold"
                    >
                      <IconChevron
                        className={`h-3 w-3 transition-transform duration-300 ${
                          megaActive === cat.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              );
            })}
            <span className="h-4 w-px bg-hdr-ivory/20" aria-hidden />
            {FLAT_LINKS.map((link) => (
              <a
                key={link.labelKey}
                href={link.href}
                className="group relative whitespace-nowrap py-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-300 xl:text-[13px]"
              >
                {t(link.labelKey)}
                <span className="absolute -bottom-0.5 start-0 h-px w-0 bg-hdr-ivory/70 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        <MegaMenu activeId={megaActive} onHover={setMegaActive} />
      </header>

      {/* ---------- Account dropdown (solid panel) ---------- */}
      <AnimatePresence>
        {panel === "account" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE_LUX }}
            className="fixed end-8 top-[4.5rem] z-[85] hidden w-56 rounded-md border border-line bg-white py-2 shadow-lux md:block"
          >
            <SectionLabel>{t("header.account")}</SectionLabel>
            {ACCOUNT_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setPanel(null)}
                className="w-full px-5 py-2 text-start text-[14px] text-ink transition-colors hover:bg-bone"
              >
                {t(key)}
              </button>
            ))}
            {/* TODO(phase-2): wire sign-in / account drawer here */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Search overlay (mobile + expandable desktop) ---------- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[85]"
          >
            <div
              className="absolute inset-0 bg-espresso/40"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ y: -12 }}
              animate={{ y: 0 }}
              exit={{ y: -12 }}
              transition={{ duration: 0.4, ease: EASE_LUX }}
              className="relative mx-auto mt-24 max-w-xl rounded-md border border-line bg-white p-7 shadow-lux"
            >
              <button
                onClick={() => setSearchOpen(false)}
                aria-label={t("header.closeSearch")}
                className="absolute end-4 top-4 p-1 text-taupe hover:text-ink"
              >
                <IconClose className="h-4 w-4" />
              </button>
              <p className="eyebrow mb-3">{t("header.search")}</p>
              <div className="relative">
                <IconSearch className="pointer-events-none absolute start-0 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe-light" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("header.searchPlaceholder")}
                  className="w-full border-b border-ink/20 bg-transparent pb-2 ps-7 text-lg text-ink placeholder:text-taupe-light focus:border-gold focus:outline-none"
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {SEARCH_SUGGESTION_KEYS.map((key) => (
                  <button
                    key={key}
                    onClick={() => setSearchQuery(t(key))}
                    className="rounded-sm border border-line px-3 py-1.5 text-[12px] tracking-wide text-taupe transition-colors hover:border-gold hover:text-ink"
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-taupe-light">
                {t("header.searchNote")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
