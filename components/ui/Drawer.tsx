"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_LUX } from "@/components/ui/Reveal";
import { IconClose } from "@/components/ui/icons";
import { useBodyScrollLock, useStore } from "@/lib/store";

/*
  Slide-over drawer. `side="right"` means the end side of the page, so
  the panel anchors with logical utilities (end-0) and the slide direction
  flips for RTL (Arabic) so drawers always enter from the correct edge.
*/

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: "right" | "left";
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  side = "right",
}: DrawerProps) {
  useBodyScrollLock(open);
  const { lang } = useStore();
  const rtl = lang === "ar";
  /* Off-screen x for the enter/exit animation, mirrored in RTL */
  const offX = side === "right" ? (rtl ? "-100%" : "100%") : rtl ? "100%" : "-100%";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90]">
          <motion.button
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-espresso/45"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            initial={{ x: offX }}
            animate={{ x: 0 }}
            exit={{ x: offX }}
            transition={{ duration: 0.45, ease: EASE_LUX }}
            className={`absolute top-0 flex h-full w-full max-w-[26.5rem] flex-col bg-ivory shadow-lux ${
              side === "right" ? "end-0" : "start-0"
            }`}
          >
            <header className="flex items-center justify-between border-b border-line px-7 py-5">
              <h3 className="serif text-xl font-medium text-ink">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close panel"
                className="p-1 text-taupe transition-colors hover:text-ink"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-7 py-6">{children}</div>
            {footer ? (
              <footer className="border-t border-line bg-ivory-deep px-7 py-5">
                {footer}
              </footer>
            ) : null}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
