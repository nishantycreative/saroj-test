"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/lib/shopify";
import { discountPercent } from "@/lib/shopify";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { IconCheck, IconMinus, IconPlus, IconStar } from "@/components/ui/icons";

/*
  Product pane — the one shared product layout on the site.

  Used by BOTH the real product page (/products/[handle] via ProductDetailView)
  and the quick-view dialog. Rendering the same component in both keeps them
  from drifting apart: what you see in the dialog is exactly the product page.

  Layout: gallery (main image + thumbnail strip when a second image exists,
  uncropped) | title, fabric, rating, price (+offer), colour swatches, size,
  quantity, Add to Cart (with "Added ✓" confirmation), Buy Now, description,
  and an optional "View full details" link back to the real PDP.
*/

interface ProductPaneProps {
  product: Product;
  /** id to put on the title (modal uses it for aria-labelledby) */
  titleId?: string;
  /** semantic heading level — h1 on the real PDP, h2 in the dialog */
  titleTag?: "h1" | "h2";
  /** show the "View full details" link (dialog only — the PDP IS the full page) */
  showViewDetails?: boolean;
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <p className="label-caps text-taupe-light">{children}</p>
  );
}

export function ProductPane({
  product,
  titleId,
  titleTag = "h2",
  showViewDetails = false,
}: ProductPaneProps) {
  const { t, addToCart, formatPrice } = useStore();
  const router = useRouter();
  const off = discountPercent(product);
  const photos = product.imageAlt ? [product.image, product.imageAlt] : [product.image];
  const [photoIdx, setPhotoIdx] = useState(0);
  const [swatch, setSwatch] = useState(0);
  const [size, setSize] = useState("Free size");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const Title = titleTag;

  const handleAdd = () => {
    addToCart(product, size, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, size, qty);
    router.push("/cart");
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
      {/* ---------- gallery ---------- */}
      <div>
        <div className="relative aspect-[4/5] overflow-hidden bg-bone">
          <Image
            src={IMAGES[photos[photoIdx]]}
            alt={photoIdx === 1 ? t("product.altView", { title: product.title }) : product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
          {off > 0 && (
            <span className="absolute start-4 top-4 bg-gold px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-black">
              {t("product.offTag", { n: off })}
            </span>
          )}
        </div>

        {/* thumbnail strip — when a second image exists */}
        {photos.length > 1 && (
          <div className="mt-4 flex gap-3">
            {photos.map((key, i) => (
              <button
                key={key}
                onClick={() => setPhotoIdx(i)}
                aria-pressed={photoIdx === i}
                aria-label={t("product.altView", { title: product.title })}
                className={`relative aspect-[4/5] w-16 overflow-hidden border bg-bone transition-colors ${
                  photoIdx === i
                    ? "border-gold ring-1 ring-gold"
                    : "border-line opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={IMAGES[key]}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ---------- info ---------- */}
      <div>
        <FieldLabel>{product.category}</FieldLabel>
        <Title
          id={titleId}
          className="serif mt-2 text-3xl font-black uppercase leading-[1.05] tracking-[-0.01em] text-ink md:text-5xl"
        >
          {product.title}
        </Title>
        {product.fabric && (
          <p className="mt-3 text-[14px] text-taupe">{product.fabric}</p>
        )}

        {/* rating */}
        <div className="mt-4 flex items-center gap-2">
          <span className="flex items-center gap-[1px]" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(product.rating ?? 0) ? "text-gold" : "text-ink/15"
                }`}
              />
            ))}
          </span>
          {product.rating && (
            <span className="text-[13px] text-taupe">
              {product.rating.toFixed(1)}
              {product.reviewCount
                ? ` · ${t("stores.reviews", { n: product.reviewCount })}`
                : ""}
            </span>
          )}
        </div>

        {/* price */}
        <div className="mt-5 flex items-baseline gap-3">
          <p className="text-[26px] font-bold tracking-tight text-ink">
            {formatPrice(product.priceInr)}
          </p>
          {product.mrpInr && product.mrpInr > product.priceInr && (
            <>
              <p className="text-[15px] text-taupe-light line-through">
                {formatPrice(product.mrpInr)}
              </p>
              <p className="text-[13px] font-bold text-gold">
                {t("product.off", { n: off })}
              </p>
            </>
          )}
        </div>

        {/* colour swatches */}
        {product.swatches.length > 0 && (
          <div className="mt-5">
            <FieldLabel>{t("product.colour")}</FieldLabel>
            <div className="mt-2 flex gap-2">
              {product.swatches.map((hex, i) => (
                <button
                  key={hex}
                  onClick={() => setSwatch(i)}
                  aria-pressed={swatch === i}
                  aria-label={`${t("product.colour")} ${i + 1}`}
                  className={`h-7 w-7 rounded-full transition-all ${
                    swatch === i
                      ? "ring-2 ring-gold ring-offset-2 ring-offset-white"
                      : "ring-1 ring-black/10"
                  }`}
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
        )}

        {/* size */}
        <div className="mt-5">
          <FieldLabel>{t("cart.size", { size })}</FieldLabel>
          <div className="mt-2">
            <button
              onClick={() => setSize("Free size")}
              aria-pressed
              className="border border-ink px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink"
            >
              Free size
            </button>
          </div>
        </div>

        {/* quantity */}
        <div className="mt-5 flex items-center gap-4">
          <FieldLabel>{t("product.qty")}</FieldLabel>
          <div className="flex items-center border border-line">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label={`${t("product.qty")} − 1`}
              className="flex h-9 w-9 items-center justify-center text-taupe transition-colors hover:text-ink"
            >
              <IconMinus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-[13px] font-bold text-ink" aria-live="polite">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              aria-label={`${t("product.qty")} + 1`}
              className="flex h-9 w-9 items-center justify-center text-taupe transition-colors hover:text-ink"
            >
              <IconPlus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* actions */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button onClick={handleAdd} className="min-w-48">
            {added ? (
              <>
                <IconCheck className="h-4 w-4" />
                {t("product.added")}
              </>
            ) : (
              <>
                <IconPlus className="h-4 w-4" />
                {t("product.addToBag")}
              </>
            )}
          </Button>
          <Button onClick={handleBuyNow} variant="black" className="min-w-40">
            {t("product.buyNow")}
          </Button>
        </div>

        {/* description */}
        {product.description && (
          <p className="mt-6 max-w-lg text-[14px] leading-relaxed text-taupe">
            {product.description}
          </p>
        )}

        {/* full details — dialog only */}
        {showViewDetails && (
          <p className="mt-5">
            <Link
              href={`/products/${product.handle}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-bronze"
            >
              {t("product.viewFullDetails")} →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}