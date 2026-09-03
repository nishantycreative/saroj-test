"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { ClipReveal, useEntrance } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/*
  Section 06 — Festive sale banner (replaces the old countdown strip).
  No countdown, no timers, no invented discount percentages. Premium
  Indian festive campaign: burgundy → saffron wash, gold type, clear
  conversion hierarchy. Generic promotional copy only.
*/

export function FestiveBanner() {
  const { t } = useStore();
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);
  const contentY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const watermarkRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  /* Campaign entrances — slightly more confident than body copy */
  const eyebrowEntrance = useEntrance({ y: 20, duration: 0.6 });
  const titleEntrance = useEntrance({ y: 32, delay: 0.05, duration: 0.85 });
  const ctaEntrance = useEntrance({ y: 28, delay: 0.25, duration: 0.65 });
  const noteEntrance = useEntrance({ y: 20, delay: 0.4, duration: 0.6 });

  return (
    <section
      ref={ref}
      id="festive-sale"
      className="relative overflow-hidden bg-forest text-cream"
    >
      {/* campaign image wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-forest via-forest-deep to-gold/25" />
      <motion.div
        style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
        className="pointer-events-none absolute inset-[-7%] opacity-20 mix-blend-luminosity"
      >
        <Image
          src={IMAGES.festiveEdit}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* oversized watermark */}
      <motion.span
        style={reduceMotion ? undefined : { x: watermarkX, rotate: watermarkRotate }}
        aria-hidden
        className="pointer-events-none absolute -end-6 -top-12 select-none serif text-[15rem] font-black leading-none text-white/[0.05]"
      >
        &apos;26
      </motion.span>

      <motion.div
        style={reduceMotion ? undefined : { y: contentY }}
        className="container-lux relative py-12 text-center md:py-20"
      >
        <motion.p
          {...eyebrowEntrance}
          className="eyebrow text-marigold"
        >
          {t("festive.eyebrow")}
        </motion.p>

        <div className="mt-5">
          <motion.h2
            {...titleEntrance}
            className="serif text-[clamp(3rem,9vw,7rem)] font-black uppercase leading-[0.92] tracking-[-0.01em] text-cream"
          >
            {t("festive.title1")}{" "}
            <span className="text-marigold">{t("festive.title2")}</span>
          </motion.h2>
          <ClipReveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-cream/85">
              {t("festive.sub")}
            </p>
          </ClipReveal>
        </div>

        <motion.div
          {...ctaEntrance}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button href="/collections/festive-edits" size="lg">
            {t("festive.cta")}
            <IconArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
          <Button href="#trending" variant="outline-light" size="lg">
            {t("festive.cta2")}
          </Button>
        </motion.div>

        <motion.p
          {...noteEntrance}
          className="mt-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/70"
        >
          {t("festive.note")}
        </motion.p>
      </motion.div>
    </section>
  );
}
