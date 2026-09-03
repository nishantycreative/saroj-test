"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MEGA_CATEGORIES } from "@/lib/data/nav";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { EASE_LUX } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

interface MegaMenuProps {
  activeId: string | null;
  onHover: (id: string | null) => void;
}

/*
  Section 03 — desktop mega-menu sub-nav panel (real client taxonomy).

  Two panel shapes:
    - Fabrics (has sub-categories): 4 columns — Plain / Printed / Woven /
      Embroidery — each listing its fabric types from the source data.
    - Flat categories: category statement + tagline + CTA, with campaign
      imagery on the end.

  Open/close contract: opening is driven by hovering a nav category; the
  panel is a child of the <header>, which owns the single close trigger
  (onMouseLeave on the header). Moving between the nav row and the panel
  never leaves the header, so the panel stays open the whole time the
  pointer is over either — no hover-gap, no timers.

  Layering contract unchanged: the panel lives INSIDE the header, which
  owns the stacking context (`isolate`, z-[80]); solid white, anchored
  `top-full`, closes on scroll.
*/

export function MegaMenu({ activeId, onHover }: MegaMenuProps) {
  const { t } = useStore();
  const active = MEGA_CATEGORIES.find((c) => c.id === activeId) ?? null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: EASE_LUX }}
          className="absolute inset-x-0 top-full z-30 border-b border-line bg-white shadow-lux"
        >
          <div className="container-lux py-10">
            {active.subCategories && active.subCategories.length > 0 ? (
              /* ---------- Fabrics — 2-level taxonomy panel ---------- */
              <div className="grid grid-cols-[1fr_19rem] gap-12">
                <div className="grid max-h-[62vh] grid-cols-4 gap-x-10 overflow-y-auto pe-2">
                  {active.subCategories.map((sub) => (
                    <div key={sub.id}>
                      <p className="eyebrow mb-3 border-b border-line pb-3">
                        {t(sub.labelKey)}
                        <span className="ms-2 text-taupe-light">
                          {sub.fabrics.length}
                        </span>
                      </p>
                      <ul className="space-y-0.5">
                        {sub.fabrics.map((fabric) => (
                          <li key={fabric}>
                            <Link
                              href={`/collections/fabrics?type=${sub.id}`}
                              onClick={() => onHover(null)}
                              className="group inline-flex items-center py-[5px] text-[13.5px] text-ink/80 transition-colors hover:text-ink"
                            >
                              <span className="relative">
                                {fabric}
                                <span className="absolute -bottom-0.5 start-0 h-px w-0 bg-brand-gold transition-all duration-500 group-hover:w-full" />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* campaign tile */}
                <div className="w-[19rem]">
                  <Link
                    href={`/collections/${active.id}`}
                    onClick={() => onHover(null)}
                    className="group relative block aspect-[4/5] overflow-hidden bg-bone"
                  >
                    {/* TODO_CLIENT_IMAGE: fabrics campaign tile */}
                    <Image
                      src={IMAGES[active.headerImage]}
                      alt={t(active.labelKey)}
                      fill
                      sizes="304px"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="scrim-bottom absolute inset-x-0 bottom-0 h-3/5" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="serif text-xl leading-snug text-cream">
                        {t(active.labelKey)}
                      </p>
                      <p className="mt-1 text-[13px] text-cream/80">
                        {t(active.taglineKey)}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-gold">
                        {t("nav.mega.flatCta", { cat: t(active.labelKey) })}
                        <IconArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              /* ---------- Flat category panel ---------- */
              <div className="grid grid-cols-[1fr_19rem] gap-12">
                <div className="flex flex-col justify-center py-4">
                  <p className="eyebrow text-gold">{t("categories.eyebrow")}</p>
                  <p className="serif mt-3 text-4xl font-black uppercase leading-[1.05] tracking-[-0.01em] text-ink">
                    {t(active.labelKey)}
                  </p>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-taupe">
                    {t(active.taglineKey)}
                  </p>
                  <div className="mt-7">
                    <Link
                      href={`/collections/${active.id}`}
                      onClick={() => onHover(null)}
                      className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                    >
                      {t("nav.mega.flatCta", { cat: t(active.labelKey) })}
                      <IconArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>

                <div className="w-[19rem]">
                  <Link
                    href={`/collections/${active.id}`}
                    onClick={() => onHover(null)}
                    className="group relative block aspect-[4/5] overflow-hidden bg-bone"
                  >
                    {/* TODO_CLIENT_IMAGE: category campaign tile */}
                    <Image
                      src={IMAGES[active.headerImage]}
                      alt={t(active.labelKey)}
                      fill
                      sizes="304px"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="scrim-bottom absolute inset-x-0 bottom-0 h-3/5" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="serif text-xl leading-snug text-cream">
                        {t(active.labelKey)}
                      </p>
                      <p className="mt-1 text-[13px] text-cream/80">
                        {t(active.taglineKey)}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
