"use client";

import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { Footer } from "@/components/layout/Footer";
import { CartExitPopup, useCartExit } from "@/components/layout/CartExitPopup";
import { RecentlyViewed } from "@/components/sections/RecentlyViewed";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { IconArrowRight, IconMinus, IconPlus } from "@/components/ui/icons";

/*
  Standalone /cart page — the exit-intent popup lives HERE (and only here).
  The newsletter popup is homepage-only (app/page.tsx).

  "Continue shopping" links run through useCartExit().requestExit("/") so
  they show the 10% offer instead of navigating straight away.
*/

function CartBody() {
  const {
    t,
    cart,
    updateQty,
    removeFromCart,
    cartSubtotalInr,
    formatPrice,
    showToast,
  } = useStore();
  const { requestExit } = useCartExit();

  return (
    <main className="min-h-screen bg-white">
      <div className="container-lux py-10 md:py-16">
        <h1 className="serif text-3xl font-black uppercase tracking-[-0.01em] text-ink md:text-5xl">
          {t("cart.title", { n: cart.length })}
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="serif text-2xl text-ink">{t("cart.empty")}</p>
            <p className="max-w-[16rem] text-sm text-taupe">
              {t("cart.emptyHint")}
            </p>
            <Button href="/" className="mt-2">
              {t("cart.continue")}
              <IconArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_22rem]">
            {/* ---------- Lines ---------- */}
            <ul className="space-y-6">
              {cart.map((line, i) => (
                <li
                  key={`${line.product.id}-${line.size}`}
                  className="flex gap-4 border-b border-line pb-6"
                >
                  <div className="relative h-28 w-22 shrink-0 overflow-hidden bg-bone">
                    {/* TODO_CLIENT_IMAGE: product imagery */}
                    <Image
                      src={IMAGES[line.product.image]}
                      alt={line.product.title}
                      fill
                      sizes="88px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="serif text-[15px] font-medium leading-snug text-ink">
                          {line.product.title}
                        </h4>
                        <p className="mt-0.5 text-[12px] text-taupe">
                          {t("cart.size", { size: line.size })}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(i)}
                        aria-label={`${t("cart.remove")} — ${line.product.title}`}
                        className="text-[11px] uppercase tracking-[0.14em] text-taupe-light transition-colors hover:text-ink"
                      >
                        {t("cart.remove")}
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button
                          onClick={() => updateQty(i, line.qty - 1)}
                          aria-label={`− ${t("cart.qty", { title: line.product.title })}`}
                          className="flex h-8 w-8 items-center justify-center text-taupe transition-colors hover:text-ink"
                        >
                          <IconMinus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-[13px]">
                          {line.qty}
                        </span>
                        <button
                          onClick={() => updateQty(i, line.qty + 1)}
                          aria-label={`+ ${t("cart.qty", { title: line.product.title })}`}
                          className="flex h-8 w-8 items-center justify-center text-taupe transition-colors hover:text-ink"
                        >
                          <IconPlus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-[14px] font-medium text-ink">
                        {formatPrice(line.product.priceInr * line.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* ---------- Summary ---------- */}
            <aside className="h-fit border border-line bg-paper p-6">
              <div className="flex items-center justify-between">
                <span className="text-[13px] uppercase tracking-[0.14em] text-taupe">
                  {t("cart.subtotal")}
                </span>
                <span className="serif text-xl font-medium text-ink">
                  {formatPrice(cartSubtotalInr)}
                </span>
              </div>
              <p className="mt-3 text-[12px] text-taupe">{t("cart.note")}</p>
              <div className="mt-5 space-y-3">
                <Button
                  fullWidth
                  onClick={() => showToast(t("cart.checkoutToast"))}
                >
                  {t("cart.checkout")}
                </Button>
                {/* TODO(phase-3): real Shopify checkout link */}
                <Button
                  href="/"
                  variant="outline"
                  fullWidth
                  size="sm"
                  onClick={(e) => {
                    /* exit intent: show the 10% offer instead of leaving */
                    e.preventDefault();
                    requestExit("/");
                  }}
                >
                  {t("cart.continue")}
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>
      <RecentlyViewed />
    </main>
  );
}

export default function CartPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      {/* CartExitPopup provides the exit-intent context to the cart body */}
      <CartExitPopup>
        <CartBody />
      </CartExitPopup>

      <Footer />

      {/* Overlays */}
      <MobileMenu />
      <CartDrawer />
      <WishlistDrawer />
      <Toast />
    </>
  );
}
