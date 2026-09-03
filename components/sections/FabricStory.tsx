"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FABRIC_STORY_STAGES } from "@/lib/data/fabric-story";
import type { FabricStoryStage } from "@/lib/data/fabric-story";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/*
  THE MAKING OF OUR FABRIC — pinned cinematic scrollytelling.

  Four full-viewport scenes (Sourcing → Spinning & Weaving → Dyeing &
  Finishing → Final Product). Each scene is pinned for one viewport-height
  while the page scrolls through it, with a cross-fade + directional
  reveal into the next — the transition IS the storytelling.

  Motion is GPU-only (transform/opacity), driven by scroll progress
  (framer useScroll — IntersectionObserver-free but no scroll listeners,
  no layout reads). A smooth (spring-smoothed) progress rail marks the
  active part. Under prefers-reduced-motion the section renders as a
  plain stacked story with no pinning.

  Imagery: real client photography only (flagged in lib/data/fabric-story.ts
  for sourcing/mill/workshop swaps).
*/

const COUNT = FABRIC_STORY_STAGES.length;

/* Per-scene reveal vocabulary — direction varies so it never feels mechanical */
const SCENE_VARIANTS: {
  textFrom: { y?: number; x?: number; scale?: number };
  zoomFrom: number;
  zoomTo: number;
}[] = [
  { textFrom: { y: 70 }, zoomFrom: 1.12, zoomTo: 1 },
  { textFrom: { x: 90 }, zoomFrom: 1, zoomTo: 1.08 },
  { textFrom: { y: -50, scale: 0.97 }, zoomFrom: 1.08, zoomTo: 1.02 },
  { textFrom: { y: 60 }, zoomFrom: 1.14, zoomTo: 1 },
];

function ScenePanel({
  stage,
  index,
  progress,
  active,
}: {
  stage: FabricStoryStage;
  index: number;
  progress: MotionValue<number>;
  active: number;
}) {
  const { t } = useStore();
  const start = index / COUNT;
  const end = (index + 1) / COUNT;
  const variant = SCENE_VARIANTS[index];
  const isFirst = index === 0;
  const isLast = index === COUNT - 1;

  /* Cross-fade window with overlap; first scene starts visible, last ends visible */
  const fadeIn = isFirst ? 0 : start - 0.06;
  const fadeInEnd = isFirst ? 0.06 : start + 0.06;
  const fadeOut = isLast ? 1 : end - 0.06;
  const fadeOutEnd = isLast ? 1 : end + 0.06;
  const opacity = useTransform(
    progress,
    [fadeIn, fadeInEnd, fadeOut, fadeOutEnd],
    isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );

  /* Image: slow zoom within the scene (transform-only) */
  const imgScale = useTransform(
    progress,
    [start, end],
    [variant.zoomFrom, variant.zoomTo],
  );

  /* Text: directional reveal per scene */
  const textY = useTransform(
    progress,
    [start, start + 0.09],
    [variant.textFrom.y ?? 0, 0],
  );
  const textX = useTransform(
    progress,
    [start, start + 0.09],
    [variant.textFrom.x ?? 0, 0],
  );
  const textScale = useTransform(
    progress,
    [start, start + 0.09],
    [variant.textFrom.scale ?? 1, 1],
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 will-change-transform"
      aria-hidden={index !== active}
      inert={index !== active}
    >
      {/* ---------- full-bleed imagery ---------- */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-0">
        {/* TODO_CLIENT_IMAGE: swap per-stage photography in lib/data/fabric-story.ts */}
        <Image
          src={IMAGES[stage.image]}
          alt={`${stage.number} — ${t(stage.titleKey)}`}
          fill
          priority={isFirst}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* legibility scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />

      {/* ghost editorial number */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-8 end-4 select-none serif text-[clamp(8rem,24vw,18rem)] font-black leading-none text-cream/[0.07] md:end-10"
      >
        {stage.number}
      </span>

      {/* ---------- scene copy ---------- */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-lux pb-24 md:pb-28">
          <motion.div
            style={{ y: textY, x: textX, scale: textScale }}
            className="max-w-2xl will-change-transform"
          >
            <p className="eyebrow text-marigold">
              {stage.number} / 04 — {t("fabricStory.title")}
            </p>
            <h3 className="serif mt-4 text-[clamp(2.4rem,6.5vw,5rem)] font-black uppercase leading-[0.95] tracking-[-0.01em] text-cream">
              <span className="me-4 text-marigold">{stage.number}</span>
              {t(stage.titleKey)}
            </h3>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/80 md:text-base">
              {t(stage.copyKey)}
            </p>

            {/* single exit CTA — the landing point after 4 parts */}
            {isLast && (
              <motion.div
                style={{ opacity, y: textY }}
                className="mt-8 md:mt-10"
              >
                <Link
                  href="/collections/fabrics"
                  className="group inline-flex h-14 items-center gap-3 bg-gold px-8 text-[12px] font-bold uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:bg-gold-light md:h-16 md:px-10 md:text-[13px]"
                >
                  {t("fabricStory.cta")}
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- smooth progress rail ---------- */

function ProgressRail({
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: number;
}) {
  const { t } = useStore();
  return (
    <div className="absolute inset-x-0 bottom-0 z-20">
      <div className="container-lux pb-7 md:pb-9">
        <ol
          className="mx-auto flex max-w-xl items-center justify-between"
          aria-label={t("fabricStory.title")}
        >
          {FABRIC_STORY_STAGES.map((stage, i) => (
            <li key={stage.number}>
              <span
                className={`text-[11px] font-semibold tracking-[0.2em] transition-colors duration-500 ${
                  i === active ? "text-marigold" : "text-cream/40"
                }`}
              >
                {stage.number}
              </span>
            </li>
          ))}
        </ol>
        <div className="relative mx-auto mt-3 h-px max-w-xl bg-cream/15">
          <motion.span
            style={{ scaleX: progress }}
            className="absolute inset-0 origin-left bg-marigold rtl:origin-right"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- reduced-motion fallback: plain stacked story ---------- */

function StackedStory() {
  const { t } = useStore();
  return (
    <div className="container-lux py-10 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="serif text-[clamp(2.2rem,5vw,3.8rem)] font-black uppercase leading-[1.02] tracking-[-0.01em] text-cream">
          {t("fabricStory.title")}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-cream/70">
          {t("fabricStory.sub")}
        </p>
      </div>
      <div className="mt-10 space-y-10 md:mt-16">
        {FABRIC_STORY_STAGES.map((stage, i) => (
          <Reveal key={stage.number}>
            <div className="relative aspect-[16/9] overflow-hidden bg-forest-deep">
              <Image
                src={IMAGES[stage.image]}
                alt={`${stage.number} — ${t(stage.titleKey)}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <h3 className="serif mt-5 text-2xl font-black uppercase tracking-[-0.01em] text-cream md:text-4xl">
              <span className="me-3 text-marigold">{stage.number}</span>
              {t(stage.titleKey)}
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-cream/75">
              {t(stage.copyKey)}
            </p>
            {i === COUNT - 1 && (
              <Link
                href="/collections/fabrics"
                className="mt-6 inline-flex h-14 items-center gap-3 bg-gold px-8 text-[12px] font-bold uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:bg-gold-light"
              >
                {t("fabricStory.cta")}
                <IconArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function FabricStory() {
  const { t } = useStore();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      COUNT - 1,
      Math.max(0, Math.floor(v * COUNT)),
    );
    setActive(idx);
  });

  return (
    <section
      id="story"
      ref={ref}
      className="texture-grain relative bg-forest text-cream"
    >
      {reduceMotion ? (
        <StackedStory />
      ) : (
        <>
          {/* ---------- intro (normal flow) ---------- */}
          <div className="container-lux pt-12 text-center md:pt-16">
            <Reveal>
              <p className="eyebrow text-marigold">{t("fabricStory.title")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="serif mt-4 text-[clamp(2.2rem,5vw,3.8rem)] font-black uppercase leading-[1.02] tracking-[-0.01em] text-cream">
                {t("fabricStory.title")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-[15px] leading-relaxed text-cream/70">
                {t("fabricStory.sub")}
              </p>
            </Reveal>
          </div>

          {/* ---------- pinned 4-scene journey (1 viewport per part) ---------- */}
          <div
            ref={pinRef}
            className="relative mt-8 md:mt-10"
            style={{ height: `${COUNT * 100}vh` }}
          >
            <div className="sticky top-0 h-screen overflow-hidden">
              {FABRIC_STORY_STAGES.map((stage, i) => (
                <ScenePanel
                  key={stage.number}
                  stage={stage}
                  index={i}
                  progress={scrollYProgress}
                  active={active}
                />
              ))}
              <ProgressRail progress={progress} active={active} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
