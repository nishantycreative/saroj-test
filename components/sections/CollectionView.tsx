"use client";

import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SHOP_CATEGORIES } from "@/lib/data/categories";
import { BESTSELLERS, TRENDING, CATALOG_EXTRA } from "@/lib/data/products";
import {
  DISCOUNT_OPTIONS,
  FABRIC_OPTIONS,
  OCCASION_OPTIONS,
  PATTERN_OPTIONS,
  PRICE_BANDS,
  RATING_OPTIONS,
  COLOR_OPTIONS,
  filtersFromSearch,
  filtersToQuery,
  hasActiveFilters,
  matchesFilters,
  productFacets,
  type FilterState,
  type PriceBandId,
} from "@/lib/data/filters";
import { IMAGES } from "@/lib/data/images";
import { ProductCard } from "@/components/ui/ProductCard";
import { useStore } from "@/lib/store";
import { Reveal, useStaggerVariants } from "@/components/ui/Reveal";
import { IconArrowRight, IconCheck, IconChevron, IconClose } from "@/components/ui/icons";
import type { Product } from "@/lib/shopify";
import type { FacetOption } from "@/lib/data/filters";
import type { DictKey, TranslationVars } from "@/lib/i18n";

/*
  Collection listing — a single client view for all /collections/[slug]
  pages. Sort is always visible; every filter lives in the desktop sidebar
  (collapsible groups, empty options hidden per collection) or the mobile
  bottom sheet. Filter state is fully URL-driven (?fabric=silk&color=green…),
  so results count, removable chips, shareable/bookmarkable links and
  back/forward all work off the same source of truth.
*/

const ALL_PRODUCTS = [...BESTSELLERS, ...TRENDING, ...CATALOG_EXTRA];

const SORT_OPTIONS = [
  { id: "featured", key: "collection.sort.featured" },
  { id: "newest", key: "collection.sort.newest" },
  { id: "priceLow", key: "collection.sort.priceLow" },
  { id: "priceHigh", key: "collection.sort.priceHigh" },
  { id: "rating", key: "collection.sort.rating" },
] as const;

type SortId = (typeof SORT_OPTIONS)[number]["id"];

type FilterCounts = {
  price: Partial<Record<PriceBandId, number>>;
  fabrics: Record<string, number>;
  patterns: Record<string, number>;
  colors: Record<string, number>;
  occasions: Record<string, number>;
  rating: Record<number, number>;
  discount: Record<number, number>;
};

function computeCounts(
  base: Product[],
  facets: Map<string, ReturnType<typeof productFacets>>,
): FilterCounts {
  const start: FilterCounts = {
    price: {},
    fabrics: {},
    patterns: {},
    colors: {},
    occasions: {},
    rating: {},
    discount: {},
  };
  for (const p of base) {
    const f = facets.get(p.id);
    if (f?.fabric) start.fabrics[f.fabric] = (start.fabrics[f.fabric] ?? 0) + 1;
    start.patterns[f?.pattern ?? "plain"] =
      (start.patterns[f?.pattern ?? "plain"] ?? 0) + 1;
    for (const c of f?.colors ?? []) {
      start.colors[c] = (start.colors[c] ?? 0) + 1;
    }
    for (const o of f?.occasions ?? []) {
      start.occasions[o] = (start.occasions[o] ?? 0) + 1;
    }
    for (const band of PRICE_BANDS) {
      if (
        p.priceInr >= band.min &&
        (band.max === null || p.priceInr < band.max)
      ) {
        start.price[band.id] = (start.price[band.id] ?? 0) + 1;
      }
    }
    if (p.rating) start.rating[p.rating >= 4 ? 4 : p.rating >= 3 ? 3 : 0] =
      (start.rating[p.rating >= 4 ? 4 : p.rating >= 3 ? 3 : 0] ?? 0) + 1;
    const off = p.mrpInr && p.mrpInr > p.priceInr
      ? Math.round(((p.mrpInr - p.priceInr) / p.mrpInr) * 100)
      : 0;
    if (off >= 10) start.discount[10] = (start.discount[10] ?? 0) + 1;
    if (off >= 20) start.discount[20] = (start.discount[20] ?? 0) + 1;
  }
  return start;
}

/* ---------- small building blocks ---------- */

function FilterGroup({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-line/80 py-4 first:pt-0 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 py-0.5 text-left"
      >
        <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink">
          {title}
        </span>
        <IconChevron
          dir={open ? "up" : "down"}
          className={`h-3.5 w-3.5 text-taupe transition-transform ${open ? "" : ""}`}
        />
      </button>
      {open && <div className="mt-3 flex flex-col gap-2.5">{children}</div>}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  count,
  onChange,
}: {
  label: string;
  checked: boolean;
  count?: number;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 text-[13px] text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="flex h-[18px] w-[18px] items-center justify-center border border-ink/25 transition-colors group-hover:border-ink/50 peer-checked:border-forest peer-checked:bg-forest"
      >
        {checked && <IconCheck className="h-3 w-3 text-cream" />}
      </span>
      <span className="transition-colors group-hover:text-forest">{label}</span>
      {count !== undefined && (
        <span className="ms-auto text-[11px] text-taupe-light">({count})</span>
      )}
    </label>
  );
}

function SwatchRow({
  label,
  hex,
  checked,
  count,
  onChange,
}: {
  label: string;
  hex?: string;
  checked: boolean;
  count?: number;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 text-[13px] text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-ink/20 transition-all group-hover:scale-110 peer-checked:ring-1 peer-checked:ring-forest peer-checked:ring-offset-1"
        style={{ background: hex }}
      >
        {checked && <IconCheck className="h-3 w-3 text-cream drop-shadow" />}
      </span>
      <span className="transition-colors group-hover:text-forest">{label}</span>
      {count !== undefined && (
        <span className="ms-auto text-[11px] text-taupe-light">({count})</span>
      )}
    </label>
  );
}

/* ---------- the shared filter panel (sidebar + mobile sheet) ---------- */

interface PanelProps {
  f: FilterState;
  counts: FilterCounts;
  apply: (patch: Partial<FilterState>) => void;
  showInStock: boolean;
  t: (key: DictKey, vars?: TranslationVars) => string;
}

function FilterPanel({ f, counts, apply, showInStock, t }: PanelProps) {
  /* Groups are collapsible; defaults tuned so price/fabric/colour are
     immediately usable while rating/discount stay tucked away. */
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    price: true,
    fabric: true,
    pattern: true,
    color: true,
    occasion: true,
    rating: false,
    discount: false,
    availability: true,
  });
  const toggle = (k: string) =>
    setOpenGroups((s) => ({ ...s, [k]: !s[k] }));

  const toggleId = (
    group: keyof FilterState,
    value: string,
    inList: (current: FilterState) => boolean,
  ) => {
    const current = inList(f);
    apply({
      [group]: current
        ? (f[group] as string[]).filter((v: string) => v !== value)
        : [...(f[group] as string[]), value],
    } as Partial<FilterState>);
  };

  const fActive = (id: string) =>
    f.fabrics.includes(id) ||
    f.patterns.includes(id) ||
    f.colors.includes(id) ||
    f.occasions.includes(id);

  const visible = (options: FacetOption[], counts: Record<string, number>) =>
    options.filter((o) => (counts[o.id] ?? 0) > 0 || fActive(o.id));

  return (
    <div className="text-[13px]">
      {/* Price */}
      {PRICE_BANDS.some((b) => (counts.price[b.id] ?? 0) > 0 || f.price === b.id) && (
        <FilterGroup
          title={t("collection.filter.price")}
          open={openGroups.price}
          onToggle={() => toggle("price")}
        >
          {PRICE_BANDS.filter(
            (b) => (counts.price[b.id] ?? 0) > 0 || f.price === b.id,
          ).map((b) => (
            <label
              key={b.id}
              className="group flex cursor-pointer items-center gap-2.5 text-ink"
            >
              <input
                type="radio"
                name="filter-price"
                checked={f.price === b.id}
                onChange={() => apply({ price: f.price === b.id ? null : b.id })}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-ink/25 transition-colors group-hover:border-ink/50 peer-checked:border-forest"
              >
                {f.price === b.id && (
                  <span className="h-2.5 w-2.5 rounded-full bg-forest" />
                )}
              </span>
              <span className="transition-colors group-hover:text-forest">
                {t(b.labelKey)}
              </span>
              <span className="ms-auto text-[11px] text-taupe-light">
                ({counts.price[b.id] ?? 0})
              </span>
            </label>
          ))}
        </FilterGroup>
      )}

      {/* Fabric type */}
      {visible(FABRIC_OPTIONS, counts.fabrics).length > 0 && (
        <FilterGroup
          title={t("collection.filter.fabric")}
          open={openGroups.fabric}
          onToggle={() => toggle("fabric")}
        >
          {visible(FABRIC_OPTIONS, counts.fabrics).map((o) => (
            <CheckRow
              key={o.id}
              label={t(o.labelKey)}
              checked={f.fabrics.includes(o.id)}
              count={counts.fabrics[o.id]}
              onChange={() =>
                toggleId("fabrics", o.id, (s) => s.fabrics.includes(o.id))
              }
            />
          ))}
        </FilterGroup>
      )}

      {/* Pattern / weave */}
      {visible(PATTERN_OPTIONS, counts.patterns).length > 0 && (
        <FilterGroup
          title={t("collection.filter.pattern")}
          open={openGroups.pattern}
          onToggle={() => toggle("pattern")}
        >
          {visible(PATTERN_OPTIONS, counts.patterns).map((o) => (
            <CheckRow
              key={o.id}
              label={t(o.labelKey)}
              checked={f.patterns.includes(o.id)}
              count={counts.patterns[o.id]}
              onChange={() =>
                toggleId("patterns", o.id, (s) => s.patterns.includes(o.id))
              }
            />
          ))}
        </FilterGroup>
      )}

      {/* Colour */}
      {visible(COLOR_OPTIONS, counts.colors).length > 0 && (
        <FilterGroup
          title={t("collection.filter.color")}
          open={openGroups.color}
          onToggle={() => toggle("color")}
        >
          {visible(COLOR_OPTIONS, counts.colors).map((o) => (
            <SwatchRow
              key={o.id}
              label={t(o.labelKey)}
              hex={o.swatch}
              checked={f.colors.includes(o.id)}
              count={counts.colors[o.id]}
              onChange={() =>
                toggleId("colors", o.id, (s) => s.colors.includes(o.id))
              }
            />
          ))}
        </FilterGroup>
      )}

      {/* Occasion */}
      {visible(OCCASION_OPTIONS, counts.occasions).length > 0 && (
        <FilterGroup
          title={t("collection.filter.occasion")}
          open={openGroups.occasion}
          onToggle={() => toggle("occasion")}
        >
          {visible(OCCASION_OPTIONS, counts.occasions).map((o) => (
            <CheckRow
              key={o.id}
              label={t(o.labelKey)}
              checked={f.occasions.includes(o.id)}
              count={counts.occasions[o.id]}
              onChange={() =>
                toggleId("occasions", o.id, (s) => s.occasions.includes(o.id))
              }
            />
          ))}
        </FilterGroup>
      )}

      {/* Customer rating */}
      {RATING_OPTIONS.some((o) => (counts.rating[Number(o.id)] ?? 0) > 0) && (
        <FilterGroup
          title={t("collection.filter.rating")}
          open={openGroups.rating}
          onToggle={() => toggle("rating")}
        >
          {RATING_OPTIONS.filter(
            (o) => (counts.rating[Number(o.id)] ?? 0) > 0,
          ).map((o) => (
            <CheckRow
              key={o.id}
              label={t(o.labelKey)}
              checked={f.rating === Number(o.id)}
              count={counts.rating[Number(o.id)]}
              onChange={() =>
                apply({
                  rating: f.rating === Number(o.id) ? null : Number(o.id),
                })
              }
            />
          ))}
        </FilterGroup>
      )}

      {/* Discount */}
      {DISCOUNT_OPTIONS.some((o) => (counts.discount[Number(o.id)] ?? 0) > 0) && (
        <FilterGroup
          title={t("collection.filter.discount")}
          open={openGroups.discount}
          onToggle={() => toggle("discount")}
        >
          {DISCOUNT_OPTIONS.filter((o) => (counts.discount[Number(o.id)] ?? 0) > 0).map(
            (o) => (
              <CheckRow
                key={o.id}
                label={t(o.labelKey)}
                checked={f.discount === Number(o.id)}
                count={counts.discount[Number(o.id)]}
                onChange={() =>
                  apply({
                    discount: f.discount === Number(o.id) ? null : Number(o.id),
                  })
                }
              />
            ),
          )}
        </FilterGroup>
      )}

      {/* Availability */}
      {showInStock && (
        <FilterGroup
          title={t("collection.filter.availability")}
          open={openGroups.availability}
          onToggle={() => toggle("availability")}
        >
          <CheckRow
            label={t("collection.filter.inStock")}
            checked={f.inStockOnly}
            onChange={() => apply({ inStockOnly: !f.inStockOnly })}
          />
        </FilterGroup>
      )}
    </div>
  );
}

/* ---------- chips ---------- */

function ChipRow({
  f,
  counts,
  apply,
  clearAll,
  t,
}: {
  f: FilterState;
  counts: FilterCounts;
  apply: (patch: Partial<FilterState>) => void;
  clearAll: () => void;
  t: (key: DictKey, vars?: TranslationVars) => string;
}) {
  const chips: { label: string; remove: () => void }[] = [];

  if (f.price) {
    const band = PRICE_BANDS.find((b) => b.id === f.price);
    if (band)
      chips.push({
        label: t(band.labelKey),
        remove: () => apply({ price: null }),
      });
  }
  for (const v of f.fabrics) {
    const o = FABRIC_OPTIONS.find((x) => x.id === v);
    if (o && (counts.fabrics[v] ?? 0) > 0)
      chips.push({
        label: t(o.labelKey),
        remove: () => apply({ fabrics: f.fabrics.filter((x) => x !== v) }),
      });
  }
  for (const v of f.patterns) {
    const o = PATTERN_OPTIONS.find((x) => x.id === v);
    if (o)
      chips.push({
        label: t(o.labelKey),
        remove: () => apply({ patterns: f.patterns.filter((x) => x !== v) }),
      });
  }
  for (const v of f.colors) {
    const o = COLOR_OPTIONS.find((x) => x.id === v);
    if (o)
      chips.push({
        label: t(o.labelKey),
        remove: () => apply({ colors: f.colors.filter((x) => x !== v) }),
      });
  }
  for (const v of f.occasions) {
    const o = OCCASION_OPTIONS.find((x) => x.id === v);
    if (o)
      chips.push({
        label: t(o.labelKey),
        remove: () => apply({ occasions: f.occasions.filter((x) => x !== v) }),
      });
  }
  if (f.rating)
    chips.push({
      label: t(RATING_OPTIONS.find((o) => o.id === String(f.rating))?.labelKey ?? "collection.filter.rating.4"),
      remove: () => apply({ rating: null }),
    });
  if (f.discount)
    chips.push({
      label: t(
        DISCOUNT_OPTIONS.find((o) => o.id === String(f.discount))?.labelKey ??
          "collection.filter.discount.10",
      ),
      remove: () => apply({ discount: null }),
    });
  if (f.inStockOnly)
    chips.push({
      label: t("collection.filter.inStock"),
      remove: () => apply({ inStockOnly: false }),
    });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" role="list" aria-label={t("collection.filter.active")}>
      {chips.map((c, i) => (
        <button
          key={`${c.label}-${i}`}
          type="button"
          onClick={c.remove}
          aria-label={`${t("collection.filter.remove")}: ${c.label}`}
          className="group flex items-center gap-1.5 border border-forest/30 bg-forest/5 py-1.5 px-3 text-[12px] font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
          role="listitem"
        >
          {c.label}
          <IconClose className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="py-1.5 px-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-taupe transition-colors hover:text-bronze"
      >
        {t("collection.filter.clearAll")}
      </button>
    </div>
  );
}

/* ---------- main view ---------- */

export function CollectionView({ slug }: { slug: string }) {
  const { t } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const f = useMemo(() => filtersFromSearch(searchParams), [searchParams]);
  const sort = useMemo<SortId>(() => {
    const s = searchParams.get("sort");
    return (SORT_OPTIONS.some((o) => o.id === s) ? (s as SortId) : null) ??
      (slug === "new-arrival" ? "newest" : "featured");
  }, [searchParams, slug]);

  const [sheetOpen, setSheetOpen] = useState(false);
  const { container, item } = useStaggerVariants(0.07, 20);

  const category = SHOP_CATEGORIES.find((c) => c.id === slug);
  const products = useMemo(() => ALL_PRODUCTS.filter((p) => p.collections?.includes(slug)), [slug]);

  const facets = useMemo(
    () => new Map(products.map((p) => [p.id, productFacets(p)])),
    [products],
  );

  const counts = useMemo(() => computeCounts(products, facets), [products, facets]);

  const filtered = useMemo(() => {
    const l = products.filter((p) =>
      matchesFilters(p, f, facets.get(p.id) as ReturnType<typeof productFacets>),
    );
    switch (sort) {
      case "newest":
        l.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
        break;
      case "priceLow":
        l.sort((a, b) => a.priceInr - b.priceInr);
        break;
      case "priceHigh":
        l.sort((a, b) => b.priceInr - a.priceInr);
        break;
      case "rating":
        l.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }
    return l;
  }, [products, facets, f, sort]);

  const apply = (patch: Partial<FilterState>) => {
    const next = { ...f, ...patch };
    const qs = filtersToQuery(next, sort, searchParams).toString();
    router.push(qs ? `/collections/${slug}?${qs}` : `/collections/${slug}`, {
      scroll: false,
    });
  };
  const setSort = (id: SortId) => {
    const qs = filtersToQuery(f, id, searchParams).toString();
    router.push(qs ? `/collections/${slug}?${qs}` : `/collections/${slug}`, {
      scroll: false,
    });
  };
  const clearAllFilters = () => {
    router.push(`/collections/${slug}`, { scroll: false });
  };

  if (!category) return null;

  const activeCount = [
    f.price ? 1 : 0,
    f.fabrics.length,
    f.patterns.length,
    f.colors.length,
    f.occasions.length,
    f.rating ? 1 : 0,
    f.discount ? 1 : 0,
    f.inStockOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const showInStock = products.some((p) => p.stockLeft !== undefined);

  const panelProps = { f, counts, apply, showInStock, t };

  return (
    <main className="min-h-screen bg-white">
      {/* ---------- breadcrumb ---------- */}
      <nav className="border-b border-line" aria-label="Breadcrumb">
        <div className="container-lux flex items-center gap-2 py-3 text-[12px] text-taupe">
          <Link href="/" className="transition-colors hover:text-ink">
            {t("breadcrumb.home")}
          </Link>
          <span aria-hidden>·</span>
          <span className="text-taupe-light">{t(category.labelKey)}</span>
        </div>
      </nav>

      {/* ---------- hero band ---------- */}
      <div className="relative h-44 overflow-hidden bg-forest md:h-64">
        <Image
          src={IMAGES[category.image]}
          alt={t(category.labelKey)}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="container-lux relative flex h-full flex-col justify-end pb-6">
          <Reveal>
            <h1 className="serif text-4xl font-black uppercase tracking-[-0.01em] text-cream md:text-6xl">
              {t(category.labelKey)}
            </h1>
            <p className="mt-2 max-w-xl text-[14px] text-cream/85">
              {t(category.taglineKey)}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---------- controls ---------- */}
      <div className="container-lux py-8 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <p className="text-[13px] font-medium text-taupe" aria-live="polite">
            {t("collection.results", { n: filtered.length })}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {/* Mobile filter trigger */}
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex h-11 items-center gap-2 border border-line bg-paper px-4 text-[13px] font-semibold text-ink transition-colors hover:border-forest hover:text-forest lg:hidden"
              aria-haspopup="dialog"
            >
              {t("collection.filter.title")}
              {activeCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-forest px-1.5 text-[11px] font-bold text-cream">
                  {activeCount}
                </span>
              )}
            </button>
            <label className="flex items-center gap-2 text-[13px] text-taupe">
              {t("collection.sortLabel")}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="h-11 border border-line bg-paper px-3 text-[13px] text-ink focus:border-forest focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {t(o.key)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* ---------- sidebar + results ---------- */}
        <div className="mt-6 flex items-start gap-8">
          <aside className="sticky top-24 hidden w-60 shrink-0 lg:block" aria-label={t("collection.filter.title")}>
            <FilterPanel {...panelProps} />
          </aside>

          <div className="min-w-0 flex-1">
            {hasActiveFilters(f) && (
              <div className="mb-5">
                <ChipRow
                  f={f}
                  counts={counts}
                  apply={apply}
                  clearAll={clearAllFilters}
                  t={t}
                />
              </div>
            )}

            {filtered.length > 0 ? (
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-4% 0px" }}
                className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3"
                key={filtersToQuery(f, sort, searchParams).toString()}
              >
                {filtered.map((product, i) => (
                  <motion.div key={product.id} variants={item}>
                    <ProductCard product={product} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-20 text-center">
                <p className="serif text-2xl text-ink">{t("collection.empty")}</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-bronze"
                >
                  {t("collection.back")}
                  <IconArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ---------- mobile bottom sheet---------- */}
        <AnimatePresence>
          {sheetOpen && (
            <div className="lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSheetOpen(false)}
                className="fixed inset-0 z-[80] bg-black/50"
                aria-hidden
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={t("collection.filter.title")}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 32, stiffness: 300 }}
                className="fixed inset-x-0 bottom-0 z-[81] flex max-h-[88dvh] flex-col rounded-t-xl bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <span className="text-[14px] font-bold uppercase tracking-[0.14em] text-ink">
                    {t("collection.filter.title")}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSheetOpen(false)}
                    aria-label={t("collection.filter.close")}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-forest hover:text-forest"
                  >
                    <IconClose className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 pb-4 pt-3">
                  <FilterPanel {...panelProps} />
                </div>
                {hasActiveFilters(f) && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="mx-4 mb-2 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-taupe transition-colors hover:text-bronze"
                  >
                    {t("collection.filter.clearAll")}
                  </button>
                )}
                <div className="border-t border-line p-3">
                  <button
                    type="button"
                    onClick={() => setSheetOpen(false)}
                    className="flex h-12 w-full items-center justify-center gap-2 bg-forest text-[13px] font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-forest-deep"
                  >
                    {t("collection.filter.show", { n: filtered.length })}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}