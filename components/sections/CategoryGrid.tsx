"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SHOP_CATEGORIES } from "@/lib/data/categories";
import type { ShopCategory } from "@/lib/data/categories";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollFloat, useEntrance, useTilt } from "@/components/ui/Reveal";
import { IconArrowRight, IconChevron } from "@/components/ui/icons";

/*
  Section 05 — Shop by Category (real client taxonomy).

  6 tiles: New Arrival leads as the hero tile, Fabrics carries its
  computed fabric-type count ("79 fabric types") from the source data,
  and the remaining flat categories follow. Every tile is a full-bleed
  image card; the label sits on a strong bottom gradient.
*/

/* Mosaic placement for the 6-tile grid (md: 6 columns) */
const TILE_SPAN = [
  "col-span-2 row-span-2 md:col-span-3", // 0 · New Arrival — hero
  "md:col-span-3", // 1 · Fabrics
  "md:col-span-3", // 2 · Fancy Dye
  "md:col-span-2", // 3 · Suits
  "md:col-span-2", // 4 · Dupattas
  "col-span-2 md:col-span-2", // 5 · Designer Suits (full row on mobile)
];

/* Categories shown in the grid — Festive Edits is intentionally excluded
   from this surface (it stays in nav/footer); shown here instead. */
const GRID_CATEGORIES = SHOP_CATEGORIES.filter((c) => c.id !== "festive-edits");

function CategoryTileCard({ cat, index }: { cat: ShopCategory; index: number }) {
  const { t } = useStore();
  const {
    ref: tiltRef,
    handlers: tiltHandlers,
    style: tiltStyle,
  } = useTilt(5);
  const entrance = useEntrance({ delay: index * 0.08, y: 24 });

  return (
    <motion.div
      {...entrance}
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.985 }}
      className={`relative block ${TILE_SPAN[index] ?? ""}`}
    >
      <Link
        href={`/collections/${cat.id}`}
        className="group relative block h-full w-full overflow-hidden bg-bone"
      >
        <motion.div
          ref={tiltRef}
          {...tiltHandlers}
          style={tiltStyle}
          className="absolute inset-0 h-full w-full"
        >
        {/* TODO_CLIENT_IMAGE: category campaign imagery */}
        <ScrollFloat className="absolute inset-[-3%]" distance={18} scale={0.018}>
          <Image
            src={IMAGES[cat.image]}
            alt={t(cat.labelKey)}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:duration-[500ms]"
          />
        </ScrollFloat>
        {/* Strong readable gradient behind the label */}
        <div className="absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 md:p-6">
          {cat.countKey && cat.countValue !== undefined && (
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-marigold">
              {t(cat.countKey, { n: cat.countValue })}
            </p>
          )}
          <h3 className="serif mt-1 text-2xl font-black text-cream md:text-[1.7rem]">
            {t(cat.labelKey)}
            {(cat.subCategories?.length ?? 0) > 0 && (
              <IconChevron
                className="ms-1.5 inline h-3.5 w-3.5 text-marigold/80"
                aria-hidden
              />
            )}
          </h3>
          <p className="mt-0.5 text-[13px] text-cream/85">
            {t(cat.taglineKey)}
          </p>
          <span className="mt-3 inline-flex translate-y-1 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-marigold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {t("categories.viewCollection")}
            <IconArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </span>
        </div>
        {/* hover frame */}
        <span className="pointer-events-none absolute inset-3 border border-transparent transition-colors duration-500 group-hover:border-marigold/60" />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function CategoryGrid() {
  const { t } = useStore();

  return (
    <section id="categories" className="bg-white">
      <div className="container-lux py-8 md:py-14">
        <SectionHeader
          eyebrow={t("categories.eyebrow")}
          title={t("categories.title")}
          accent={t("categories.accent")}
          tone="forest"
          action={
            <a
              href="#bestsellers"
              className="hidden items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-taupe transition-colors hover:text-ink md:inline-flex"
            >
              {t("categories.shopAll")}
              <IconArrowRight className="h-4 w-4" />
            </a>
          }
        />

        <div className="mt-6 grid grid-cols-2 auto-rows-[11rem] gap-2 sm:auto-rows-[14rem] md:mt-8 md:grid-cols-6 md:auto-rows-[16rem] md:gap-3 lg:auto-rows-[18rem]">
          {GRID_CATEGORIES.map((cat, i) => (
            <CategoryTileCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
