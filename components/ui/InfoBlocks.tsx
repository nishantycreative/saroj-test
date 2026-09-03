"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/*
  Shared editorial building blocks for the help & legal pages
  (faq / shipping / returns / privacy / terms / fabric-care).

  Uses the same premium Saroj visual language as the rest of the
  site: texture-grain paper hero, serif display headings, gold
  eyebrows, hairline dividers, deep-forest callouts and restrained
  reveal motion.
*/

export function InfoHero({
  eyebrow,
  title,
  subtitle,
  meta,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="texture-grain border-b border-line bg-paper">
      <div className="container-lux py-14 md:py-20">
        <Reveal>
          <p className="eyebrow text-saffron">{eyebrow}</p>
          <h1 className="serif mt-4 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[1] tracking-[-0.01em] text-ink">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-taupe md:text-base">
              {subtitle}
            </p>
          ) : null}
          {meta ? (
            <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-taupe/80">
              {meta}
            </p>
          ) : null}
        </Reveal>
      </div>
    </div>
  );
}

export function InfoSection({
  index,
  heading,
  children,
  lead,
}: {
  index?: string;
  heading: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 md:py-10">
      <Reveal>
        {index ? <p className="eyebrow text-gold">{index}</p> : null}
        <h2 className="serif mt-1 text-2xl font-bold text-ink md:text-[1.65rem]">
          {heading}
        </h2>
        {lead ? (
          <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
            {lead}
          </p>
        ) : null}
        {children ? (
          <div className="mt-4 max-w-2xl space-y-3 text-[15px] leading-relaxed text-taupe">
            {children}
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}

export function UspCard({
  icon,
  title,
  copy,
}: {
  icon: ReactNode;
  title: ReactNode;
  copy: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col border border-line bg-paper p-6 md:p-7">
      <span className="flex h-11 w-11 items-center justify-center border border-gold/40 text-gold">
        {icon}
      </span>
      <h3 className="serif mt-5 text-xl font-bold text-forest">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-taupe">{copy}</p>
    </div>
  );
}

export function PrimeBanner({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-y border-cream/10 bg-forest text-cream">
      <div className="container-lux py-10 md:py-14">
        <Reveal>
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="eyebrow text-marigold">{eyebrow}</p>
            ) : null}
            <h2 className="serif mt-3 text-2xl font-black uppercase leading-tight text-cream md:text-4xl">
              {title}
            </h2>
            {children ? (
              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-cream/80">
                {children}
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
