"use client";

import Image from "next/image";
import { useStore } from "@/lib/store";
import { CATALOG } from "@/lib/data/products";
import { IMAGES } from "@/lib/data/images";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { IconBag } from "@/components/ui/icons";

/* Saved-items drawer with placeholder wishlist items. */

export function WishlistDrawer() {
  const { drawer, closeDrawer, wishlist, addToCart, formatPrice, toggleWishlist, t } =
    useStore();
  const saved = wishlist
    .map((id) => CATALOG[id])
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Drawer
      open={drawer === "wishlist"}
      onClose={closeDrawer}
      title={t("wishlist.title", { n: saved.length })}
    >
      {saved.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <p className="serif text-2xl text-ink">{t("wishlist.empty")}</p>
          <p className="max-w-[16rem] text-sm text-taupe">
            {t("wishlist.emptyHint")}
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {saved.map((product) => (
            <li key={product.id} className="flex gap-4">
              <div className="relative h-28 w-22 shrink-0 overflow-hidden bg-ivory-deep">
                {/* TODO_CLIENT_IMAGE: product imagery */}
                <Image
                  src={IMAGES[product.image]}
                  alt={product.title}
                  fill
                  sizes="88px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h4 className="serif text-[15px] font-medium leading-snug text-ink">
                  {product.title}
                </h4>
                <p className="mt-0.5 text-[12px] text-taupe">
                  {product.category}
                </p>
                <p className="mt-1 text-[14px] font-medium text-ink">
                  {formatPrice(product.priceInr)}
                </p>
                <div className="mt-auto flex items-center gap-4">
                  <Button
                    size="sm"
                    onClick={() => addToCart(product)}
                    className="h-9 px-4 text-[11px]"
                  >
                    <IconBag className="h-3.5 w-3.5" />
                    {t("wishlist.addToBag")}
                  </Button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="text-[11px] uppercase tracking-[0.14em] text-taupe-light transition-colors hover:text-ink"
                  >
                    {t("wishlist.remove")}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
