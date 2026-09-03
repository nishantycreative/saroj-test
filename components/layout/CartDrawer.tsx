"use client";

import Image from "next/image";
import { useStore } from "@/lib/store";
import { IMAGES } from "@/lib/data/images";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { IconMinus, IconPlus } from "@/components/ui/icons";

/*
  Cart drawer with placeholder items — fully interactive locally,
  no backend. Prices convert live (5% markup on non-INR). Checkout
  button is stubbed until Phase 3.
*/

export function CartDrawer() {
  const {
    drawer,
    closeDrawer,
    cart,
    updateQty,
    removeFromCart,
    cartSubtotalInr,
    formatPrice,
    t,
  } = useStore();

  return (
    <Drawer
      open={drawer === "cart"}
      onClose={closeDrawer}
      title={t("cart.title", { n: cart.length })}
      footer={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] uppercase tracking-[0.14em] text-taupe">
              {t("cart.subtotal")}
            </span>
            <span className="serif text-xl font-medium text-ink">
              {formatPrice(cartSubtotalInr)}
            </span>
          </div>
          <p className="text-[12px] text-taupe">{t("cart.note")}</p>
          <Button fullWidth href="/cart" onClick={closeDrawer}>
            {t("cart.checkout")}
          </Button>
          {/* TODO(phase-3): real Shopify checkout link */}
        </div>
      }
    >
      {cart.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <p className="serif text-2xl text-ink">{t("cart.empty")}</p>
          <p className="max-w-[16rem] text-sm text-taupe">
            {t("cart.emptyHint")}
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {cart.map((line, i) => (
            <li key={`${line.product.id}-${line.size}`} className="flex gap-4">
              <div className="relative h-28 w-22 shrink-0 overflow-hidden bg-ivory-deep">
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
                    <span className="w-8 text-center text-[13px]">{line.qty}</span>
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
      )}
    </Drawer>
  );
}
