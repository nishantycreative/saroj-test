"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useCallback, useState } from "react";
import { PAIRINGS, type Pairing } from "@/lib/data/pairs";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/shopify";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollFloat, useStaggerVariants } from "@/components/ui/Reveal";
import { IconEye, IconPlus, IconStar } from "@/components/ui/icons";
import { QuickViewModal } from "@/components/ui/QuickViewModal";

/*
  Section 10 — "Pairs Well With": 4 cards with product-swatch pairings,
  stagger reveal, lift on hover. Add-to-bag adds the primary piece.
  Each card also carries the standard Quick View (eye) trigger, backed by
  the same portaled ProductPane dialog used across the site.
*/

export function PairsWellWith() {
  const { t } = useStore();
  const { container, item } = useStaggerVariants(0.08, 24);

  return (
    <section className="bg-forest">
      <div className="container-lux py-10 md:py-16">
        <SectionHeader
          eyebrow={t("pairs.eyebrow")}
          title={t("pairs.title")}
          accent={t("pairs.accent")}
          tone="onDark"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6% 0px" }}
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 lg:grid-cols-4"
        >
          {PAIRINGS.map((pair) => (
            <PairsCard key={pair.id} pair={pair} variants={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- PairsCard — one "set" card with the standard Quick View ---------- */

function PairsCard({
  pair,
  variants,
}: {
  pair: Pairing;
  variants: Variants;
}) {
  const { addToCart, formatPrice, t } = useStore();
  const [qvOpen, setQvOpen] = useState(false);
  const closeQuickView = useCallback(() => setQvOpen(false), []);

  const off = pair.mrpInr
    ? Math.round(((pair.mrpInr - pair.priceInr) / pair.mrpInr) * 100)
    : 0;
  const product: Product = {
    id: pair.id,
    handle: pair.id,
    title: pair.primary,
    priceInr: pair.priceInr,
    mrpInr: pair.mrpInr,
    category: "The Set",
    image: pair.image,
    swatches: pair.swatches,
  };

  return (
    <motion.article
      variants={variants}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-md border border-cream/10 bg-paper transition-[border-color,box-shadow] duration-500 hover:border-gold/70 hover:shadow-lux"
    >
      <ScrollFloat distance={16} scale={0.02} className="relative aspect-[4/3] overflow-hidden bg-bone">
        {/* TODO_CLIENT_IMAGE: pairing imagery */}
        <Image
          src={IMAGES[pair.image]}
          alt={pair.primary}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
        {off > 0 && (
          <span className="absolute start-3 top-3 bg-gold px-2 py-1 text-[11px] font-bold tracking-[0.06em] text-black">
            {t("product.offTag", { n: off })}
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
          <span className="bg-black/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
            {t("pairs.theSet")}
          </span>
          <button
            type="button"
            aria-label={t("product.quickView")}
            onClick={(e) => {
              e.stopPropagation();
              setQvOpen(true);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black transition-colors duration-300 hover:border-gold hover:bg-white hover:text-gold"
          >
            <IconEye className="h-4 w-4" />
          </button>
        </div>
      </ScrollFloat>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex gap-1.5" aria-hidden>
          {pair.swatches.map((c) => (
            <span
              key={c}
              className="h-3.5 w-3.5 rounded-full border border-ink/15"
              style={{ background: c }}
            />
          ))}
        </div>
        <h3 className="serif mt-3 text-lg font-bold leading-snug text-black">
          {pair.primary}
        </h3>
        <p className="mt-1 text-[13px] text-taupe">
          {t("pairs.pairsWith", { name: pair.pairsWith })}
        </p>
        <p className="mt-1 text-[12px] italic text-taupe-light">
          {t(pair.noteKey)}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="flex items-center gap-[1px]" aria-hidden>
            {Array.from({ length: 5 }).map((_, s) => (
              <IconStar
                key={s}
                className={`h-3 w-3 ${
                  s < Math.round(pair.rating ?? 0) ? "text-gold" : "text-ink/15"
                }`}
              />
            ))}
          </span>
          {pair.reviewCount ? (
            <span className="text-[12px] text-taupe">
              ({pair.reviewCount})
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
          <div>
            <p className="text-[15px] font-bold text-black">
              {formatPrice(pair.priceInr)}
            </p>
            {pair.mrpInr && pair.mrpInr > pair.priceInr && (
              <p className="text-[12px] text-taupe-light line-through">
                {formatPrice(pair.mrpInr)}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              addToCart(product, "Free size");
            }}
            className="flex h-10 items-center gap-1.5 border border-black/25 px-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-black"
          >
            <IconPlus className="h-3 w-3" />
            {t("pairs.addSet")}
          </button>
        </div>
      </div>

      <QuickViewModal product={product} open={qvOpen} onClose={closeQuickView} />
    </motion.article>
  );
}
