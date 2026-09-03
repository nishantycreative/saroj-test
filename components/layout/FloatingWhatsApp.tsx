"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { IconWhatsApp, IconClose } from "@/components/ui/icons";
import { EASE_LUX } from "@/components/ui/Reveal";

/*
  Floating WhatsApp — fixed bottom-right entry-point with a click-to-chat
  popover. The primary CTA is a real wa.me deep-link that opens WhatsApp
  with the prefilled message from whatsapp.msg (live, not a toast stub).
*/

const WHATSAPP_NUMBER = "8097909904"; // +91 80979 09904 — Saroj WhatsApp
const WA_BASE = `https://wa.me/+91${WHATSAPP_NUMBER}`;

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const { t } = useStore();

  const waHref = () => {
    const msg = encodeURIComponent(t("whatsapp.msg"));
    return `${WA_BASE}?text=${msg}`;
  };

  return (
    <div className="fixed bottom-6 end-6 z-[75]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE_LUX }}
            className="mb-4 w-64 border border-line bg-ivory p-5 shadow-lux"
          >
            <p className="serif text-lg font-medium leading-snug text-ink">
              {t("whatsapp.title")}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-taupe">
              {t("whatsapp.copy")}
            </p>
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 bg-espresso text-[12px] font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:bg-espresso-soft"
            >
              <IconWhatsApp className="h-4 w-4 text-gold" />
              {t("whatsapp.cta")}
            </a>
            <p className="mt-3 text-center text-[11px] uppercase tracking-[0.14em] text-taupe">
              {t("whatsapp.hours")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_LUX, delay: 1.2 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={t("whatsapp.aria")}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-espresso text-cream shadow-lux transition-transform duration-300 hover:scale-105"
      >
        {open ? (
          <IconClose className="h-5 w-5" />
        ) : (
          <IconWhatsApp className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}