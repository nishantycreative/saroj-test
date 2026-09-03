"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { EASE_LUX } from "@/components/ui/Reveal";

/*
  Mini-cart hover preview — right-side flyout on hovering the header cart
  icon (desktop only). Clicking the icon navigates to /cart instead.
  Closes when the pointer leaves the icon + panel region.
*/

export function CartPreview({
  onHoverEnter,
  onHoverLeave,
  onClose,
}: {
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  onClose: () => void;
}) {
  const { t, cart, cartSubtotalInr, formatPrice } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.25, ease: EASE_LUX }}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      className="absolute end-0 top-full z-50 mt-2 hidden w-80 border border-line bg-white p-4 shadow-lux md:block"
    >
      <p className="eyebrow">{t("cart.title", { n: cart.length })}</p>

      {cart.length === 0 ? (
        <p className="mt-3 text-[13px] text-taupe">{t("cart.empty")}</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {cart.slice(0, 4).map((line) => (
            <li key={`${line.product.id}-${line.size}`} className="flex gap-3">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-bone">
                <Image
                  src={IMAGES[line.product.image]}
                  alt={line.product.title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <p className="line-clamp-1 text-[13px] font-medium leading-snug text-ink">
                  {line.product.title}
                </p>
                <p className="mt-0.5 text-[11px] text-taupe">
                  {t("cart.size", { size: line.size })} · ×{line.qty}
                </p>
                <p className="mt-auto text-[13px] font-bold text-ink">
                  {formatPrice(line.product.priceInr * line.qty)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-taupe-light">
            {t("cart.subtotal")}
          </p>
          <p className="serif text-lg font-medium text-ink">
            {formatPrice(cartSubtotalInr)}
          </p>
        </div>
        <Button href="/cart" size="sm" onClick={onClose}>
          {t("cart.checkout")}
        </Button>
      </div>
    </motion.div>
  );
}
