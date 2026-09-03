"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Modal } from "@/components/ui/Modal";
import { PromoCode } from "@/components/ui/PromoCode";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";

/*
  Cart exit-intent popup — mounted on the /cart route only.

  Triggers (once per cart session, sessionStorage flag):
    1. PRIMARY — browser/device back button: a history guard entry is
       pushed while the cart has items; the first back-press is cancelled
       (guard re-pushed) and the offer shows. Only a second back-press or
       "No thanks, leave" lets the navigation proceed. Desktop-only —
       touch browsers navigate normally, no trap.
    2. PRIMARY — explicit on-page exit ("Continue shopping" links): the
       page intercepts them via useCartExit() and shows the offer instead.
    3. Secondary — desktop mouseleave through the top edge.

  "Apply & Continue" keeps the user on the cart page with the 10% applied.
*/

const CART_COUPON = "SAROJ10";
const SHOWN_KEY = "saroj_cart_exit_shown_v1";

function isDesktopBrowser(): boolean {
  try {
    return (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      navigator.maxTouchPoints === 0
    );
  } catch {
    return false;
  }
}

function shownThisSession(): boolean {
  try {
    return sessionStorage.getItem(SHOWN_KEY) === "1";
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SHOWN_KEY, "1");
  } catch {
    /* storage unavailable */
  }
}

function clearShown() {
  try {
    sessionStorage.removeItem(SHOWN_KEY);
  } catch {
    /* ignore */
  }
}

interface CartExitShape {
  /** Ask the popup to appear — href = where "No thanks, leave" should go */
  requestExit: (href?: string) => void;
}

const CartExitContext = createContext<CartExitShape>({ requestExit: () => {} });

/** On-page exit links (e.g. "Continue shopping") call this instead of navigating. */
export function useCartExit(): CartExitShape {
  return useContext(CartExitContext);
}

export function CartExitPopup({ children }: { children: ReactNode }) {
  const {
    t,
    cart,
    cartCount,
    cartSubtotalInr,
    formatPrice,
    showToast,
  } = useStore();
  const [open, setOpen] = useState(false);
  const [exitHref, setExitHref] = useState<string | null>(null);

  const requestExit = useCallback((href?: string) => {
    if (shownThisSession() || cart.length === 0) return;
    markShown();
    setExitHref(href ?? null);
    setOpen(true);
  }, [cart.length]);

  /* --- primary trigger: back button (popstate guard, desktop only) --- */
  useEffect(() => {
    if (!isDesktopBrowser() || cart.length === 0) return;
    let guardPushed = false;
    const pushGuard = () => {
      guardPushed = true;
      window.history.pushState({ sarojCartGuard: Date.now() }, "");
    };
    pushGuard();

    const onPop = () => {
      if (!guardPushed) return;
      guardPushed = false;
      if (shownThisSession()) return; /* second back-press — let them go */
      pushGuard(); /* cancel the navigation */
      markShown();
      setExitHref(null);
      setOpen(true);
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [cart.length]);

  /* --- secondary trigger: mouseleave through the top edge (desktop) --- */
  useEffect(() => {
    if (!isDesktopBrowser() || cart.length === 0) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 0 || e.relatedTarget !== null) return;
      requestExit();
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [cart.length, requestExit]);

  /* New cart session → reset the one-shot flag */
  useEffect(() => {
    if (cart.length === 0) clearShown();
  }, [cart.length]);

  /* "Apply & Continue" — the code is applied; stay on the cart page */
  const apply = useCallback(() => {
    setOpen(false);
    showToast(t("cartExit.applied"));
  }, [showToast, t]);

  /* "No thanks, leave" — actually proceed with the intended navigation */
  const leave = useCallback(() => {
    setOpen(false);
    if (exitHref) {
      window.location.assign(exitHref);
    } else {
      window.history.back();
    }
  }, [exitHref]);

  return (
    <CartExitContext.Provider value={{ requestExit }}>
      {children}

      <Modal open={open} onClose={leave} titleId="cartexit-title" panelClass="max-w-2xl overflow-hidden">
        <div className="grid md:grid-cols-[2fr_3fr]">
          {/* ---------- imagery side ---------- */}
          <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[28rem]">
            {/* TODO_CLIENT_IMAGE: cart campaign photo */}
            <Image
              src={IMAGES.spreadAtelier}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="scrim-bottom absolute inset-x-0 bottom-0 h-1/2" />
            <p className="eyebrow absolute bottom-5 start-5 text-brand-gold">
              Saroj Ensemble
            </p>
          </div>

          {/* ---------- content ---------- */}
          <div className="p-7 md:p-9">
            <p className="eyebrow text-forest">{t("cartExit.eyebrow")}</p>
            <h2
              id="cartexit-title"
              className="serif mt-3 text-3xl font-black uppercase leading-[1.05] tracking-[-0.01em] text-ink"
            >
              {t("cartExit.title")}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-taupe">
              {t("cartExit.sub")}
            </p>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-taupe">
                {t("cartExit.codeLabel")}
              </p>
              <PromoCode code={CART_COUPON} />
            </div>

            {/* cart summary — what the code applies to */}
            <div className="mt-5 flex items-center gap-3 border border-ink/10 bg-bone/60 px-4 py-3">
              <div className="flex -space-x-2">
                {cart.slice(0, 3).map((line) => (
                  <span
                    key={`${line.product.id}-${line.size}`}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white"
                  >
                    <Image
                      src={IMAGES[line.product.image]}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
              <p className="text-[13px] font-medium text-ink">
                {t("cartExit.cartSummary", {
                  n: cartCount,
                  total: formatPrice(cartSubtotalInr),
                })}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                onClick={apply}
                className="h-12 flex-1 bg-mustard text-[12px] font-bold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:bg-gold"
              >
                {t("cartExit.apply")}
              </button>
              <button
                onClick={leave}
                className="h-12 flex-1 border border-ink/25 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
              >
                {t("cartExit.leave")}
              </button>
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-taupe-light">
              {t("cartExit.note")}
            </p>
          </div>
        </div>
      </Modal>
    </CartExitContext.Provider>
  );
}
