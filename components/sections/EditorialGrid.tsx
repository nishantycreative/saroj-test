"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EDITORIAL_GRID } from "@/lib/data/editorial";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { EASE_LUX } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/*
  Section 12 — Lookbook. Scroll-jacked horizontal gallery: the section pins
  for ~3 viewports of scroll while the 5 editorial images travel
  horizontally. Distinct rhythm from the rest of the page.
*/

const CARD_WIDTHS = [
  "w-[58vw] md:w-[46vw]",
  "w-[44vw] md:w-[32vw]",
  "w-[50vw] md:w-[38vw]",
  "w-[42vw] md:w-[30vw]",
  "w-[48vw] md:w-[36vw]",
];

export function EditorialGrid() {
  const { t } = useStore();
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  /* Measure how far the track must move so the last card clears the viewport */
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setTravel(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <section ref={ref} className="relative h-[280vh] bg-beige">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* ---------- Header row ---------- */}
        <div className="container-lux pointer-events-none absolute inset-x-0 top-0 z-10 flex items-end justify-between py-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-9 bg-gold" aria-hidden />
              <p className="eyebrow text-gold">{t("editorial.eyebrow")}</p>
            </div>
            <h2 className="serif mt-3 text-[2rem] font-black uppercase leading-[1.02] tracking-[-0.01em] text-burgundy md:text-[3.2rem]">
              {t("editorial.title")}{" "}
              <span className="text-gold">{t("editorial.accent")}</span>
            </h2>
          </div>
          <span className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe md:flex">
            {t("editorial.scroll")}
            <IconArrowRight className="h-4 w-4 rotate-90 text-gold" />
          </span>
        </div>

        {/* ---------- Track ---------- */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-4 ps-[1rem] pe-[12vw] md:gap-6 md:ps-[2.5rem]"
        >
          {EDITORIAL_GRID.map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "-30% 0px" }}
              transition={{ duration: 0.75, ease: EASE_LUX, delay: i * 0.06 }}
              className={`group relative shrink-0 overflow-hidden bg-bone ${CARD_WIDTHS[i] ?? ""}`}
            >
              {/* TODO_CLIENT_IMAGE: editorial imagery */}
              <div className="relative aspect-[3/4] md:aspect-[4/5]">
                <Image
                  src={IMAGES[item.image]}
                  alt={t(item.captionKey)}
                  fill
                  sizes="(max-width: 768px) 50vw, 40vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                />
              </div>
              <div className="scrim-bottom absolute inset-x-0 bottom-0 h-2/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition-all duration-700 group-hover:opacity-100">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                  {t(item.tagKey)}
                </p>
                <p className="serif mt-1 text-lg font-semibold text-cream">
                  {t(item.captionKey)}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        {/* ---------- Progress line ---------- */}
        <div className="container-lux absolute inset-x-0 bottom-8">
          <div className="h-[2px] w-full bg-ink/10">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full origin-left bg-gold rtl:origin-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
