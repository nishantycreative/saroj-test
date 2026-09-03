"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_LUX, Reveal } from "@/components/ui/Reveal";
import { IconChevron, IconArrowRight } from "@/components/ui/icons";

/*
  Homepage FAQ preview — a compact selection of the most-asked
  questions (24-hour dispatch first) leading to the full /faq page.
  One item open at a time, linked to the dedicated FAQ route.
*/

interface Faq {
  id: string;
  q: string;
  a: string;
}

const PREVIEW: Faq[] = [
  {
    id: "dispatch",
    q: "How quickly do you dispatch orders?",
    a: "We dispatch orders within 24 hours. Fast dispatch is one of our commitments to our customers. Orders are prepared and handed over for shipping as quickly as possible after successful order confirmation, subject to product availability and verification.",
  },
  {
    id: "delivery",
    q: "How long does delivery take?",
    a: "Our standard delivery timeline is up to 7 days for domestic orders, depending on the destination and courier service. International delivery timelines can vary depending on the destination country, customs procedures and local delivery networks.",
  },
  {
    id: "international",
    q: "Do you offer international delivery?",
    a: "Yes. Saroj Ensemble offers international delivery to 200+ countries worldwide. International delivery times and charges vary by destination. Any applicable customs duties, taxes or import charges may be payable by the recipient depending on the destination country's regulations.",
  },
  {
    id: "returns",
    q: "What is your return policy?",
    a: "We offer a 14-day return window for eligible products. If you receive a product that qualifies for a return, please contact us within 14 days of receiving your order and follow the return instructions provided by our team.",
  },
  {
    id: "cutting",
    q: "Can I return fabric after cutting it?",
    a: "For hygiene, quality-control and resale reasons, cut, altered, washed, used or otherwise modified fabric may not be eligible for return. Please inspect your fabric carefully before cutting, stitching, washing or altering it.",
  },
  {
    id: "care",
    q: "How should I care for my fabric?",
    a: "Care instructions vary depending on the fibre, weave, finish and construction of the fabric. Always refer to the specific care instructions provided with your purchase where available. When in doubt, professional dry cleaning is generally the safer choice for delicate, embellished or premium fabrics.",
  },
];

export function FaqAccordion() {
  const { t } = useStore();
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(PREVIEW[0].id);

  return (
    <section id="faq" className="bg-forest">
      <div className="container-lux max-w-4xl py-10 md:py-16">
        <SectionHeader
          eyebrow={t("faq.eyebrow")}
          title={t("faq.title")}
          accent={t("faq.accent")}
          align="center"
          tone="onDark"
        />

        <div className="mt-8 border-t border-cream/10">
          {PREVIEW.map((faq, i) => {
            const open = openId === faq.id;
            return (
              <Reveal key={faq.id} delay={i * 0.06} y={18}>
                <div className="border-b border-cream/10">
                  <button
                    onClick={() => setOpenId(open ? null : faq.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-6 text-start"
                  >
                    <span
                      className={`serif text-xl font-bold transition-colors duration-300 md:text-[1.45rem] ${
                        open ? "text-gold" : "text-cream"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-500 ${
                        open
                          ? "rotate-180 border-gold text-gold"
                          : "border-cream/25 text-cream/60"
                      }`}
                    >
                      <IconChevron className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reduceMotion ? 0.15 : 0.45,
                          ease: EASE_LUX,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-cream/75">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 text-center">
            <a
              href="/faq"
              className="group inline-flex items-center gap-2 border border-cream/25 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              View All FAQs
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
