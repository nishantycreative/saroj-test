"use client";

import { motion } from "framer-motion";
import { EASE_LUX, Reveal, WordsReveal } from "@/components/ui/Reveal";

/*
  Major e-commerce section headline (h2 — the hero owns the page h1).

  Color discipline for the refined fashion palette:
    - Dark sections (green/burgundy/navy/plum) → warm white heading,
      saffron accent.
    - Light sections (beige/blush) → deep forest/burgundy/plum/navy
      headings with a small gold accent.
  Gold is a premium detail — never the default heading color.
*/

export type HeadingTone = "onDark" | "forest" | "burgundy" | "plum" | "navy";

const TONE_TITLE: Record<HeadingTone, string> = {
  onDark: "text-cream",
  forest: "text-forest",
  burgundy: "text-burgundy",
  plum: "text-plum",
  navy: "text-navy",
};

const TONE_ACCENT: Record<HeadingTone, string> = {
  onDark: "text-marigold",
  forest: "text-gold",
  burgundy: "text-gold",
  plum: "text-gold",
  navy: "text-gold",
};

const TONE_EYEBROW: Record<HeadingTone, string> = {
  onDark: "text-marigold",
  forest: "text-gold",
  burgundy: "text-gold",
  plum: "text-gold",
  navy: "text-gold",
};

const TONE_DASH: Record<HeadingTone, string> = {
  onDark: "bg-marigold",
  forest: "bg-gold",
  burgundy: "bg-gold",
  plum: "bg-gold",
  navy: "bg-gold",
};

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  accent?: string; // second phrase — upright, small premium accent
  action?: React.ReactNode;
  align?: "left" | "center";
  tone?: HeadingTone;
  /** Override title scale — e.g. "text-[2.5rem] md:text-[4rem]" */
  titleClass?: string;
  /** Override the accent color when a section needs a specific tone */
  accentClass?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  action,
  align = "left",
  tone = "burgundy",
  titleClass,
  accentClass,
}: SectionHeaderProps) {
  const titleWords = title.split(" ").length;
  const accentDelay = 0.15 + titleWords * 0.09;

  return (
    <Reveal>
      <div
        className={`flex flex-wrap items-end justify-between gap-6 ${
          align === "center" ? "flex-col items-center text-center" : ""
        }`}
      >
        <div className={align === "center" ? "flex flex-col items-center" : ""}>
          <div className="flex items-center gap-3">
            <span className={`h-[2px] w-10 ${TONE_DASH[tone]}`} aria-hidden />
            <p className={`eyebrow ${TONE_EYEBROW[tone]}`}>{eyebrow}</p>
          </div>
          <h2
            className={`serif mt-4 font-black uppercase leading-[1.02] tracking-[-0.01em] ${
              titleClass ??
              "text-[clamp(2.2rem,5.4vw,4.25rem)]"
            } ${TONE_TITLE[tone]}`}
          >
            <WordsReveal text={title} />
            {accent ? (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.7, ease: EASE_LUX, delay: accentDelay }}
                className={`block font-black ${accentClass ?? TONE_ACCENT[tone]}`}
              >
                {accent}
              </motion.span>
            ) : null}
          </h2>
        </div>
        {action}
      </div>
    </Reveal>
  );
}
