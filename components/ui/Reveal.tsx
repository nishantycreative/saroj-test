"use client";

/*
  Motion toolkit — named variants, kept as the single animation vocabulary.

  Base system is IntersectionObserver-driven (framer-motion whileInView).
  Variants:
    - Reveal        fade + 24px rise          (body blocks)
    - ClipReveal    clip-path wipe from bottom (big blocks / panels)
    - WordsReveal   per-word staggered rise    (headlines)
    - CountUp       number count when in view  (trust strip stats)
    - useTilt       cursor-reactive tilt                 (product/category cards)

  All share EASE_LUX (0.22, 0.68, 0, 1) for an unhurried, editorial feel.
*/

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

export const EASE_LUX = [0.22, 0.68, 0, 1] as const;
export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

/* Shared springs — one motion vocabulary site-wide */
export const SPRING_POP = {
  type: "spring",
  stiffness: 260,
  damping: 16,
  mass: 0.6,
} as const;
export const SPRING_SOFT = {
  type: "spring",
  stiffness: 260,
  damping: 20,
} as const;

/* ---------- useEntrance — whileInView entrance props (reduced-motion aware) ---------- */

export interface EntranceOptions {
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
}

/*
  One-liner entrance: returns the framer props (initial / whileInView /
  viewport / transition) with prefers-reduced-motion already applied —
  movement collapses to a quick opacity fade for users who opt out.
*/
export function useEntrance({
  delay = 0,
  y = 24,
  x = 0,
  scale,
  duration = 0.75,
  once = true,
  margin = "-8% 0px",
  amount = 0.1,
}: EntranceOptions = {}) {
  const reduceMotion = useReducedMotion();
  const hidden = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y, x, scale: scale ?? 1 };
  return {
    initial: hidden,
    whileInView: { opacity: 1, y: 0, x: 0, scale: 1 },
    viewport: { once, margin, amount },
    transition: {
      duration: reduceMotion ? 0.2 : duration,
      ease: EASE_LUX,
      delay: reduceMotion ? 0 : delay,
    },
  };
}

/* ---------- useStaggerVariants — parent/child variants for grids ---------- */

export function useStaggerVariants(
  stagger = 0.08,
  itemY = 24,
  itemDuration = 0.7,
  itemScale?: number,
) {
  const reduceMotion = useReducedMotion();
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };
  const item = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: itemY, scale: itemScale ?? 1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0.2 : itemDuration,
        ease: EASE_LUX,
      },
    },
  };
  return { container, item };
}

/* ---------- Reveal — fade + rise (baseline) ---------- */

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  duration?: number;
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
  duration = 0.7,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  return (
    <motion.div
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y, scale: 0.985 }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once, amount: 0.18, margin: "-8% 0px" }}
      transition={{ duration: reduceMotion ? 0.2 : duration, ease: EASE_LUX, delay }}
      onAnimationComplete={() => setDone(true)}
      className={`${done ? "" : "will-change-transform"} ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------- ClipReveal — clip-path wipe from the bottom ---------- */

interface ClipRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  from?: "bottom" | "left";
}

export function ClipReveal({
  children,
  delay = 0,
  className,
  once = true,
  from = "bottom",
}: ClipRevealProps) {
  const reduceMotion = useReducedMotion();
  const hidden =
    from === "bottom" ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)";
  const shown = "inset(0 0 0% 0)";
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { clipPath: hidden, y: from === "bottom" ? 16 : 0 }}
      whileInView={reduceMotion ? { opacity: 1 } : { clipPath: shown, y: 0 }}
      viewport={{ once, amount: 0.2, margin: "-10% 0px" }}
      transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: EASE_LUX, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- WordsReveal — per-word staggered rise (headlines) ---------- */

interface WordsRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "div";
}

export function WordsReveal({
  text,
  className,
  delay = 0,
  stagger = 0.09,
  as: Tag = "span",
}: WordsRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          aria-hidden
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduceMotion ? { opacity: 0 } : { y: "115%", rotateX: 18 }}
            whileInView={reduceMotion ? { opacity: 1 } : { y: "0%", rotateX: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-8% 0px" }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.85,
              ease: EASE_LUX,
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

/* ---------- ScrollFloat — spring-smoothed image depth on scroll ---------- */

interface ScrollFloatProps {
  children: ReactNode;
  className?: string;
  /** Maximum travel in px from the element's enter position to its exit. */
  distance?: number;
  /** Additional scale at the start of the scroll range. */
  scale?: number;
}

export function ScrollFloat({
  children,
  className,
  distance = 28,
  scale = 0.025,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1 + scale, 1]);
  const y = useSpring(rawY, { stiffness: 90, damping: 24, mass: 0.6 });
  const scaleValue = useSpring(rawScale, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { y, scale: scaleValue }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- CountUp — count a number when it scrolls into view ---------- */

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
  /** Full control over the rendered number (e.g. localized currency) */
  format?: (v: number) => string;
}

function formatCount(
  v: number,
  prefix: string,
  suffix: string,
  decimals: number,
  format?: (v: number) => string,
) {
  if (format) return format(v);
  return `${prefix}${v.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
  decimals = 0,
  format,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const animateNumbers = !reduceMotion;

  const [display, setDisplay] = useState(() =>
    formatCount(0, prefix, suffix, decimals, format),
  );

  useEffect(() => {
    if (!inView || !animateNumbers) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) =>
        setDisplay(formatCount(v, prefix, suffix, decimals, format)),
    });
    return () => controls.stop();
  }, [
    inView,
    value,
    duration,
    prefix,
    suffix,
    decimals,
    animateNumbers,
    format,
  ]);

  /* Reduced motion: render the final value directly once in view */
  const text =
    inView && !animateNumbers
      ? formatCount(value, prefix, suffix, decimals, format)
      : display;

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

/* ---------- useTilt — cursor-reactive tilt for cards ---------- */

export interface TiltProps {
  /**
   * Style to spread onto the card: rotateX/rotateY motion values.
   * Deliberately FLAT (not preserve-3d): children are 2D-painted in the
   * wrapper's plane so hit-testing matches getBoundingClientRect. With
   * preserve-3d, Chromium hit-tests coplanar descendants by 3D geometry and
   * the full-bleed <img>/link win over the z-indexed action buttons once any
   * transform (hover lift + tilt) is applied — the eye/wishlist buttons
   * become unclickable on cards without overflow-hidden. No consumer uses
   * translateZ, so flattening loses nothing.
   */
  style: {
    rotateX: ReturnType<typeof useSpring>;
    rotateY: ReturnType<typeof useSpring>;
    transformStyle: "flat";
  };
  /** Event handlers to spread onto the card */
  handlers: {
    onMouseMove: (e: MouseEvent) => void;
    onMouseLeave: () => void;
  };
}

export function useTilt(max = 6): {
  ref: React.RefObject<HTMLDivElement | null>;
} & TiltProps {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 160, damping: 18, mass: 0.4 });
  const rotateY = useSpring(ry, { stiffness: 160, damping: 18, mass: 0.4 });

  const onMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * max);
    ry.set(px * max);
  };

  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return {
    ref,
    handlers: { onMouseMove, onMouseLeave },
    style: { rotateX, rotateY, transformStyle: "flat" },
  };
}
