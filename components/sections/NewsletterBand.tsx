"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useStore } from "@/lib/store";
import { EASE_LUX, SPRING_POP } from "@/components/ui/Reveal";
import { IconCheck } from "@/components/ui/icons";

/*
  Section 21 — newsletter band. Wine surface for the festive commerce
  direction, working client-side validation, success state on submit.
  Phase 3 wires the provider (Klaviyo is the intended seam — lib/newsletter.ts).
*/

export function NewsletterBand() {
  const { t, showToast } = useStore();
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError(t("newsletter.err"));
      return;
    }
    setError(null);
    setDone(true);
    showToast(t("newsletter.toast"));
  };

  return (
    <section className="bg-white text-ink">
      <div className="container-lux flex flex-col items-center gap-5 py-10 text-center md:py-16">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_LUX }}
              className="flex flex-col items-center gap-4"
            >
              <motion.span
                initial={reduceMotion ? { opacity: 0 } : { scale: 0 }}
                animate={reduceMotion ? { opacity: 1 } : { scale: 1 }}
                transition={{ ...SPRING_POP, delay: 0.15 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold"
              >
                <IconCheck className="h-5 w-5" />
              </motion.span>
              <p className="serif text-3xl font-medium text-ink">
                {t("newsletter.successTitle")}
              </p>
              <p className="max-w-sm text-[14px] leading-relaxed text-taupe">
                {t("newsletter.successCopy")}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="eyebrow text-gold">{t("newsletter.eyebrow")}</p>
              <h2 className="serif mt-4 text-3xl font-black uppercase leading-[1.02] text-ink md:text-[3rem]">
                {t("newsletter.title")}{" "}
                <span className="text-gold">{t("newsletter.accent")}</span>
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-taupe">
                {t("newsletter.sub")}
              </p>

              <form
                onSubmit={submit}
                noValidate
                className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="nl-email" className="sr-only">
                  {t("newsletter.emailLabel")}
                </label>
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={t("newsletter.placeholder")}
                  aria-invalid={Boolean(error)}
                  className={`h-[52px] flex-1 border bg-transparent px-4 text-[14px] text-ink placeholder:text-taupe-light focus:outline-none focus:ring-1 ${
                    error
                      ? "border-coral focus:border-coral focus:ring-coral/30"
                      : "border-ink/25 focus:border-gold focus:ring-gold/30"
                  }`}
                />
                <button
                  type="submit"
                  className="h-[52px] shrink-0 bg-gold px-8 text-[12px] font-medium uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:bg-gold-light"
                >
                  {t("newsletter.subscribe")}
                </button>
              </form>
              {error && <p className="mt-3 text-[13px] text-coral">{error}</p>}
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-taupe-light">
                {t("newsletter.note")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
