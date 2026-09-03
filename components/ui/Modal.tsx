"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { EASE_LUX } from "@/components/ui/Reveal";
import { IconClose } from "@/components/ui/icons";
import { useBodyScrollLock, useStore } from "@/lib/store";

/*
  Shared accessible modal — used by the prompt popups (newsletter + cart
  exit) and the quick-view dialog.

    - focus trap while open (Tab cycles inside the panel)
    - Escape closes
    - focus restored to the trigger on close
    - body scroll locked
    - entrance: scale/fade from slightly smaller/lower + backdrop dim,
      collapsing to a plain fade under prefers-reduced-motion

  Rendered through a portal to <body>. Cards/rails animate with framer-motion
  transforms; a `position: fixed` overlay nested inside a transformed element
  would resolve against that element instead of the viewport and shrink to
  card size. Portaling escapes every transformed/overflow containing block.

  NOTE: `onClose` must be referentially stable (useCallback) — the
  focus-trap effect re-subscribes when it changes.
*/

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id of the panel's title element, for aria-labelledby */
  titleId: string;
  children: ReactNode;
  /** class for the panel — callers control width + internal scroll */
  panelClass?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* Server snapshot is false, so the portal (which needs `document`) is never
   rendered during SSR; the client snapshot flips to true after hydration and
   React reconciles the difference without a mismatch error. */
const subscribeToNothing = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function Modal({ open, onClose, titleId, children, panelClass }: ModalProps) {
  const { t } = useStore();
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  useBodyScrollLock(open);
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const list = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-8">
          {/* backdrop — dim fade, closes on click */}
          <motion.button
            aria-label={t("promo.close")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-espresso/55 backdrop-blur-[2px]"
          />

          {/* panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 18 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE_LUX }}
            className={`relative w-full bg-white shadow-lux ${panelClass ?? "max-w-2xl"}`}
          >
            <button
              onClick={onClose}
              aria-label={t("promo.close")}
              className="absolute end-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-taupe shadow-lux-sm transition-colors hover:bg-white hover:text-ink"
            >
              <IconClose className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
