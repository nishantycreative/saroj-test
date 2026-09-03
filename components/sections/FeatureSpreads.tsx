"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  CountUp,
  ScrollFloat,
  useEntrance,
  useStaggerVariants,
} from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";
import { FABRIC_TYPE_COUNT } from "@/lib/data/categories";
import { STORES } from "@/lib/data/stores";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";

/*
  Section 11 — feature spread + By-the-Numbers strip.

  Spread 1 ("The Couture Atelier"): layered editorial composition — main
  image + overlapping secondary image + floating atelier notes.

  Strip 2 ("Craft, in numbers"): replaces the old Master Karigars spread —
  a quick scannable trust-builder with real, derivable numbers, keeping a
  different rhythm from the calculator and the pinned fabric story.
*/

/* ---------- Spread 1 — layered editorial composition ---------- */

function SpreadCouture() {
  const { t } = useStore();
  const mainEntrance = useEntrance({ x: -48, duration: 0.85 });
  const secondaryEntrance = useEntrance({ y: 24, delay: 0.25, duration: 0.8 });
  const badgeEntrance = useEntrance({ y: 24, delay: 0.35, duration: 0.8 });
  const copyEntrance = useEntrance({ x: 48, delay: 0.1, duration: 0.85 });

  return (
    <div className="bg-white">
      <div className="container-lux grid items-center gap-10 py-10 md:grid-cols-[1.15fr_1fr] md:gap-14 md:py-16">
        {/* Layered image composition */}
        <motion.div
          {...mainEntrance}
          className="relative pb-14 pe-8 md:pb-20 md:pe-16"
        >
          {/* TODO_CLIENT_IMAGE: couture spread imagery */}
          <ScrollFloat distance={18} scale={0.02} className="relative aspect-[4/5] overflow-hidden bg-beige-deep">
            <Image
              src={IMAGES.madeToMeasureA}
              alt={t("features.c1.eyebrow")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </ScrollFloat>
          {/* overlapping secondary image */}
          <motion.div
            {...secondaryEntrance}
            className="absolute bottom-0 end-0 w-[46%] border-4 border-white shadow-lux"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={IMAGES.madeToMeasureB}
                alt={t("styling.eyebrow")}
                fill
                sizes="(max-width: 768px) 46vw, 23vw"
                className="object-cover"
              />
            </div>
          </motion.div>
          {/* floating craft badge — brand mark, no founding-date claim */}
          <motion.div
            {...badgeEntrance}
            className="absolute -bottom-2 start-4 bg-forest px-6 py-4 text-cream shadow-lux"
          >
            <p className="serif text-2xl font-black leading-none text-marigold">
              Saroj
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/80">
              {t("story.eyebrow")}
            </p>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <motion.div {...copyEntrance}>
          <p className="eyebrow text-gold">{t("features.c1.eyebrow")}</p>
          <h2 className="serif mt-4 text-3xl font-black uppercase leading-[1.02] tracking-[-0.01em] text-forest md:text-[3.6rem]">
            {t("features.c1.title")}{" "}
            <span className="text-burgundy">{t("features.c1.accent")}</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/80">
            {t("features.c1.sub")}
          </p>
          <div className="mt-6 flex items-center gap-4 border-y border-forest/20 py-4">
            <p className="serif text-xl font-black leading-tight text-forest">
              {t("features.c1.badgeTitle")}
            </p>
            <span className="h-8 w-px bg-forest/25" aria-hidden />
            <p className="text-[13px] leading-snug text-ink/80">
              {t("features.c1.badgeCopy")}
            </p>
          </div>
          <div className="mt-8">
            <Button href="#booking" variant="black">
              {t("features.c1.cta")}
              <IconArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Spread 2 — "By the Numbers" impact strip ----------
   Quick scannable trust-builder with real, derivable numbers: total Google
   reviews (sum of store listings) · fabric types from the taxonomy · store
   count · the four craft stages. Distinct rhythm from the calculator and
   the pinned story. */

const TOTAL_GOOGLE_REVIEWS = STORES.reduce(
  (sum, s) => sum + (s.reviewCount ?? 0),
  0,
);

const CRAFT_STATS = [
  { value: TOTAL_GOOGLE_REVIEWS, suffix: "+", labelKey: "hands.s1.label" as const },
  { value: FABRIC_TYPE_COUNT, suffix: "+", labelKey: "hands.s2.label" as const },
  { value: STORES.length, suffix: "", labelKey: "hands.s3.label" as const },
  { value: 4, suffix: "", labelKey: "hands.s4.label" as const },
];

function CraftNumbers() {
  const { t } = useStore();
  const { container, item } = useStaggerVariants(0.08, 20);

  return (
    <div className="border-t border-line bg-white">
      <div className="container-lux py-10 text-center md:py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20% 0px" }}
        >
          <motion.p variants={item} className="eyebrow text-gold">
            {t("hands.eyebrow")}
          </motion.p>
          <motion.h2
            variants={item}
            className="serif mt-4 text-3xl font-black uppercase leading-[1.02] tracking-[-0.01em] text-ink md:text-[3.4rem]"
          >
            {t("hands.title")}
          </motion.h2>
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-taupe"
          >
            {t("hands.sub")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20% 0px" }}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4"
        >
          {CRAFT_STATS.map((s) => (
            <motion.div
              key={s.labelKey}
              variants={item}
              className="flex flex-col items-center gap-2"
            >
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className="serif text-5xl font-black tabular-nums text-ink md:text-6xl"
              />
              <span className="mx-auto h-px w-10 bg-gold" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe">
                {t(s.labelKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function FeatureSpreads() {
  return (
    <section className="space-y-0 overflow-x-clip">
      <SpreadCouture />
      <CraftNumbers />
    </section>
  );
}
