"use client";

import { TRUST_ITEMS } from "@/lib/data/trust";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { CountUp, Reveal } from "@/components/ui/Reveal";
import {
  IconCraft,
  IconLock,
  IconReturns,
  IconTruck,
} from "@/components/ui/icons";

/* Trust strip — count-up stats + icons + short trust copy. */

const ICONS = {
  truck: IconTruck,
  returns: IconReturns,
  lock: IconLock,
  craft: IconCraft,
} as const;

export function TrustStrip() {
  const { t } = useStore();

  return (
    <section className="border-y border-cream/10 bg-forest">
      <div className="container-lux grid grid-cols-2 gap-x-6 gap-y-8 py-8 md:grid-cols-4 md:py-12">
        {TRUST_ITEMS.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal key={item.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <motion.span
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 280, damping: 16 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold"
                >
                  <Icon className="h-6 w-6" />
                </motion.span>
                <CountUp
                  value={item.stat.value}
                  prefix={item.stat.prefix}
                  suffix={item.stat.suffix}
                  decimals={item.stat.decimals}
                  className="serif text-4xl font-black tabular-nums text-cream md:text-5xl"
                />
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-cream">
                  {t(item.titleKey)}
                </h3>
                <p className="max-w-[15rem] text-[13px] leading-relaxed text-cream-muted">
                  {t(item.copyKey)}
                </p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
