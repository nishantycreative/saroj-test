"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { STORES } from "@/lib/data/stores";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_LUX, ScrollFloat } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/*
  Section 16 — Store Locator. Ghatkopar is the flagship tile (first
  entry) and keeps its large featured visual. No branch is labelled a
  "head branch" — the featured tile simply shows name, address and a
  directions CTA over a readable gradient; deliberately no rating /
  phone / hours on that visual. Secondary cards keep their details and
  link to the dedicated /stores/[slug] pages.
*/

export function StoreLocator() {
  const { t } = useStore();
  const [flagship, ...others] = STORES;

  return (
    <section id="stores" className="bg-white">
      <div className="container-lux py-8 md:py-14">
        <SectionHeader
          eyebrow={t("stores.eyebrow")}
          title={t("stores.title")}
          accent={t("stores.accent")}
          tone="forest"
          action={
            <Link
              href="/stores"
              className="text-[12px] font-medium uppercase tracking-[0.16em] text-gold transition-colors hover:text-bronze"
            >
              {t("stores.viewAll")} →
            </Link>
          }
        />

        <div className="mt-6 grid gap-3 md:mt-8 lg:grid-cols-3">
          {/* ---------- Ghatkopar flagship tile ---------- */}
          <motion.a
            href={flagship.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.75, ease: EASE_LUX }}
            className="group relative block overflow-hidden bg-forest lg:col-span-2 lg:row-span-2"
          >
            <ScrollFloat
              distance={16}
              scale={0.02}
              className="relative aspect-[16/10] w-full overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            >
              <Image
                src={IMAGES[flagship.image]}
                alt={`${flagship.neighbourhood} store`}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover opacity-95 transition-all duration-[9000ms] ease-out group-hover:scale-[1.06]"
              />
            </ScrollFloat>
            {/* Readable translucent overlay behind the text (not opaque) */}
            <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
            {/* Bottom-anchored label — name/address sit over the image,
                under the scrim, at the bottom of the visual */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <h3 className="serif text-3xl font-black text-cream md:text-5xl">
                {flagship.neighbourhood}
              </h3>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-cream/90 md:text-[15px]">
                {flagship.address}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-gold">
                {t("stores.directions")}
                <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </span>
            </div>
          </motion.a>

          {/* ---------- Other stores — link to their dedicated pages ---------- */}
          {others.map((store, i) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.75, ease: EASE_LUX, delay: 0.08 * (i + 1) }}
            >
              <Link
                href={`/stores/${store.slug}`}
                className="group grid grid-cols-[7.5rem_1fr] items-stretch border border-line bg-paper transition-shadow duration-500 hover:shadow-lux-sm lg:grid-cols-1"
              >
                {/* 4:3 matches the store images' native aspect (1448×1086),
                    so object-cover shows the full frame uncropped */}
                <div className="relative aspect-[4/3] self-start overflow-hidden bg-bone">
                  <Image
                    src={IMAGES[store.image]}
                    alt={`${store.neighbourhood} store`}
                    fill
                    sizes="(max-width: 1024px) 120px, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-col justify-center p-4 lg:p-5">
                  <h4 className="serif text-lg font-bold text-ink">
                    {store.neighbourhood}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-taupe">
                    {store.address}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-taupe-light">
                    <span>{store.hours}</span>
                    {store.phone && <span>· {store.phone}</span>}
                    {store.rating !== undefined && (
                      <span className="text-gold">
                        {store.rating}★ ({store.reviewCount})
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
