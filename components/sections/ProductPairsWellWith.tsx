"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/shopify";
import { IconPlus } from "@/components/ui/icons";

/*
  Product page — "Pairs Well With" (Amazon-style "Frequently Bought
  Together"). Reads each product's pre-computed paired_product_ids
  (Shopify metafield in Phase 3; the local pair map today) and renders
  the current product + its top 2–3 matches with individual checkboxes,
  a combined total and one "Add Selected to Cart" action.

  Renders nothing when a product has no matches above the minimum score —
  low-quality pairs are never forced.
*/

export function ProductPairsWellWith({
  current,
  matches,
}: {
  current: Product;
  matches: Product[];
}) {
  const { t, addToCart, formatPrice } = useStore();
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(matches.map((m) => m.id)),
  );

  if (matches.length === 0) return null;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const chosen = matches.filter((m) => selected.has(m.id));
  const total = current.priceInr + chosen.reduce((sum, m) => sum + m.priceInr, 0);

  return (
    <section className="mt-12 border border-line bg-bone/60">
      <Reveal>
        <div className="p-5 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">{t("pairs.eyebrow")}</p>
              <h2 className="serif mt-2 text-2xl font-black uppercase tracking-[-0.01em] text-ink md:text-3xl">
                {t("fbt.title")}
              </h2>
              <p className="mt-1 text-[13px] text-taupe">{t("fbt.sub")}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* ---------- Products row ---------- */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              {/* Current product — always included */}
              <div className="flex w-36 flex-col items-center text-center">
                <Link
                  href={`/products/${current.handle}`}
                  className="group relative aspect-[4/5] w-full overflow-hidden bg-bone ring-2 ring-gold/60"
                >
                  <Image
                    src={IMAGES[current.image]}
                    alt={current.title}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                  {t("fbt.current")}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-ink">
                  {current.title}
                </p>
                <p className="mt-1 text-[13px] font-bold text-ink">
                  {formatPrice(current.priceInr)}
                </p>
              </div>

              {matches.map((m) => (
                <div key={m.id} className="flex items-center gap-3 md:gap-4">
                  <IconPlus
                    className="h-4 w-4 shrink-0 text-taupe-light"
                    aria-hidden
                  />
                  <label className="flex w-36 cursor-pointer flex-col items-center text-center">
                    <span className="group relative aspect-[4/5] w-full overflow-hidden bg-bone">
                      <Image
                        src={IMAGES[m.image]}
                        alt={m.title}
                        fill
                        sizes="160px"
                        className={`object-cover transition-all duration-500 ${
                          selected.has(m.id)
                            ? "opacity-100"
                            : "opacity-50 saturate-50"
                        }`}
                      />
                      <input
                        type="checkbox"
                        checked={selected.has(m.id)}
                        onChange={() => toggle(m.id)}
                        aria-label={`${m.title} — ${t("fbt.addSelected")}`}
                        className="absolute start-2 top-2 h-4 w-4 accent-gold"
                      />
                    </span>
                    <span className="mt-2 line-clamp-2 text-[12px] leading-snug text-ink">
                      {m.title}
                    </span>
                    <span className="mt-1 text-[13px] font-bold text-ink">
                      {formatPrice(m.priceInr)}
                    </span>
                  </label>
                </div>
              ))}
            </div>

            {/* ---------- Total + action ---------- */}
            <div className="flex shrink-0 flex-col gap-3 border-t border-line pt-4 lg:min-w-56 lg:border-t-0 lg:border-s lg:ps-6 lg:pt-0">
              <div className="flex items-baseline justify-between gap-6">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-taupe">
                  {t("fbt.total")}
                </span>
                <span className="text-[18px] font-bold text-ink">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart(current);
                  chosen.forEach((m) => addToCart(m));
                }}
                className="flex h-12 items-center justify-center gap-2 bg-gold px-6 text-[12px] font-bold uppercase tracking-[0.16em] text-black transition-colors duration-300 hover:bg-gold-light"
              >
                {t("fbt.addSelected")}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
