"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { getLocalBundles } from "@/lib/pairing/local";
import { BESTSELLERS, CATALOG, TRENDING } from "@/lib/data/products";
import { IMAGES } from "@/lib/data/images";
import type { Product } from "@/lib/shopify";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useStaggerVariants } from "@/components/ui/Reveal";
import { IconEye, IconPlus } from "@/components/ui/icons";
import { QuickViewModal } from "@/components/ui/QuickViewModal";

/*
  Section 09b — "Shop the Bundle". Highest-scoring pairs from the pairing
  pipeline (lib/pairing/score.ts), shown as two separate products joined by
  a "+" — each keeps its own image, title and price. One shared
  "Shop This Set" CTA per pair. Placeholder phase: CTA adds both pieces to
  the bag; Phase 3 links to Shopify's native Bundles product instead.

  Homepage dedup: products already shown in the Bestsellers / Trending rails
  above are excluded here so a visitor never meets the same piece twice on
  one scroll.
*/

function BundleProductTile({ product }: { product: Product }) {
  const { formatPrice, t } = useStore();
  const [qvOpen, setQvOpen] = useState(false);
  const closeQuickView = useCallback(() => setQvOpen(false), []);

  return (
    <div className="group relative flex flex-1 flex-col overflow-hidden rounded-sm border border-ink/10 bg-white transition-colors duration-300 hover:border-gold/60">
      {/* whole-tile link — title + price stay clickable */}
      <Link
        href={`/products/${product.handle}`}
        aria-label={product.title}
        className="absolute inset-0 z-[1]"
      />
      {/* TODO_CLIENT_IMAGE: bundle imagery */}
      <div className="relative aspect-[4/5] overflow-hidden bg-bone">
        <Image
          src={IMAGES[product.image]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 40vw, 16vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        {/* Quick view — same trigger as every other product card */}
        <button
          type="button"
          aria-label={t("product.quickView")}
          onClick={(e) => {
            e.stopPropagation();
            setQvOpen(true);
          }}
          className="absolute start-3 bottom-3 z-[3] flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black transition-colors duration-300 hover:border-gold hover:bg-white hover:text-gold"
        >
          <IconEye className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col gap-0.5 p-3">
        <p className="label-caps text-taupe-light">{product.category}</p>
        <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink">
          {product.title}
        </p>
        <p className="mt-0.5 text-[14px] font-bold text-ink">
          {formatPrice(product.priceInr)}
        </p>
      </div>
      <QuickViewModal product={product} open={qvOpen} onClose={closeQuickView} />
    </div>
  );
}

export function BundleRail() {
  const { t, addToCart, formatPrice } = useStore();
  const { container, item } = useStaggerVariants(0.08, 24);

  /* Homepage rails already surface these pieces — don't repeat them here. */
  const bundles = useMemo(() => {
    const railIds = new Set(
      [...BESTSELLERS, ...TRENDING].map((p) => p.id),
    );
    return getLocalBundles().filter(
      (b) =>
        !railIds.has(b.primaryId) &&
        !railIds.has(b.pairId) &&
        CATALOG[b.primaryId] &&
        CATALOG[b.pairId],
    );
  }, []);

  if (bundles.length === 0) return null;

  return (
    <section className="bg-forest">
      <div className="container-lux py-10 md:py-16">
        <SectionHeader
          eyebrow={t("bundle.eyebrow")}
          title={t("bundle.title")}
          accent={t("bundle.accent")}
          tone="onDark"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6% 0px" }}
          className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-5"
        >
          {bundles.map((bundle) => {
            const primary = CATALOG[bundle.primaryId];
            const pair = CATALOG[bundle.pairId];
            if (!primary || !pair) return null;
            const total = primary.priceInr + pair.priceInr;

            return (
              <motion.article
                key={`${bundle.primaryId}-${bundle.pairId}`}
                variants={item}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-md border border-cream/10 bg-paper p-4 transition-[border-color,box-shadow] duration-500 hover:border-gold/70 hover:shadow-lux md:p-5"
              >
                {/* Two separate products, joined by a "+" */}
                <div className="flex flex-1 items-stretch gap-2 md:gap-3">
                  <BundleProductTile product={primary} />
                  <div className="flex items-center" aria-hidden>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold bg-paper text-gold shadow-lux-sm">
                      <IconPlus className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <BundleProductTile product={pair} />
                </div>

                {/* Shared bundle action */}
                <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-taupe-light">
                      {t("bundle.totalLabel")}
                    </span>
                    <span className="text-[17px] font-bold text-black">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(primary);
                      addToCart(pair);
                    }}
                    className="flex h-11 items-center gap-1.5 bg-forest px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-forest-deep"
                  >
                    {t("bundle.cta")}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
