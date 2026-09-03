"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { STORES } from "@/lib/data/stores";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { Reveal, useStaggerVariants } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/*
  Store Locator page — all 5 physical stores with rating badges and a
  "View store" link to the dedicated /stores/[slug] page.
*/

export function StoresView() {
  const { t } = useStore();
  const { container, item } = useStaggerVariants(0.08, 24);

  return (
    <main className="min-h-screen bg-white">
      <div className="container-lux py-10 md:py-16">
        <Reveal>
          <p className="eyebrow text-gold">{t("stores.eyebrow")}</p>
          <h1 className="serif mt-3 text-4xl font-black uppercase tracking-[-0.01em] text-ink md:text-5xl">
            {t("stores.title")}
          </h1>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6% 0px" }}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STORES.map((store) => (
            <motion.div key={store.id} variants={item}>
              <Link
                href={`/stores/${store.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-line bg-paper transition-shadow duration-500 hover:shadow-lux-sm"
              >
                {/* 4:3 matches the store images' native aspect (1448×1086), so
                    object-cover shows the full frame uncropped */}
                <div className="relative aspect-[4/3] overflow-hidden bg-bone">
                  {/* TODO_CLIENT_IMAGE: real store photography */}
                  <Image
                    src={IMAGES[store.image]}
                    alt={`${store.neighbourhood} store`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="serif text-xl font-bold text-ink">
                    {store.neighbourhood}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-taupe">
                    {store.address}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-taupe-light">
                    <span>{store.hours}</span>
                    {store.phone && <span>· {store.phone}</span>}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                    {store.rating !== undefined ? (
                      <span className="inline-flex items-center gap-1.5 bg-bone px-2.5 py-1 text-[12px] font-semibold text-ink">
                        <span className="text-gold">{store.rating}★</span>
                        {t("stores.reviews", { n: store.reviewCount ?? 0 })}
                      </span>
                    ) : (
                      <span className="text-[12px] text-taupe-light">
                        {t("stores.viewMore")}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
                      {t("stores.viewMore")}
                      <IconArrowRight className="h-3 w-3 rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
