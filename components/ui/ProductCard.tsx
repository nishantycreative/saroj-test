"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import type { Product } from "@/lib/shopify";
import { discountPercent } from "@/lib/shopify";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { useEntrance, useTilt } from "@/components/ui/Reveal";
import { IconEye, IconHeart, IconPlus, IconStar } from "@/components/ui/icons";
import { QuickViewModal } from "@/components/ui/QuickViewModal";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
  /** Show the large "featured" treatment (Bestsellers lead card) */
  featured?: boolean;
  /** Surface the card on paper (for dark section backgrounds) */
  surface?: boolean;
}

function Stars({ rating }: { rating?: number }) {
  if (!rating) return null;
  return (
    <span className="flex items-center gap-1.5">
      <span className="flex items-center gap-[1px]" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar
            key={i}
            className={`h-3 w-3 ${
              i < Math.round(rating) ? "text-gold" : "text-ink/15"
            }`}
          />
        ))}
      </span>
      <span className="text-[12px] font-medium text-ink">{rating.toFixed(1)}</span>
    </span>
  );
}

const BADGE_KEYS: Record<string, "product.badge.bestseller" | "product.badge.new" | "product.badge.limited" | "product.badge.trending"> = {
  Bestseller: "product.badge.bestseller",
  New: "product.badge.new",
  Limited: "product.badge.limited",
  Trending: "product.badge.trending",
};

export function ProductCard({
  product,
  index = 0,
  className,
  featured = false,
  surface = false,
}: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist, formatPrice, t } = useStore();
  const { ref: tiltRef, handlers: tiltHandlers, style: tiltStyle } = useTilt(5);
  const entrance = useEntrance({ delay: index * 0.08, y: 28 });
  const saved = wishlist.includes(product.id);
  const off = discountPercent(product);
  const hasAlt = Boolean(product.imageAlt);
  const urgency =
    product.stockLeft && product.stockLeft <= 7
      ? t("product.onlyLeft", { n: product.stockLeft })
      : null;
  const badgeLabel = product.badge ? t(BADGE_KEYS[product.badge] ?? "product.badge.new") : null;

  /* ---- Quick view: click-triggered dialog (no hover behaviour) ---- */
  const [qvOpen, setQvOpen] = useState(false);

  const closeQuickView = useCallback(() => setQvOpen(false), []);

  return (
    <motion.article
      {...entrance}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.985 }}
      className={`group relative flex flex-col ${className ?? ""}`}
    >
      {/* Tilt wrapper — cursor-reactive, flattened so hit-testing matches layout */}
      <motion.div
        ref={tiltRef}
        {...tiltHandlers}
        style={tiltStyle}
        className={`flex flex-col ${
          surface ? "overflow-hidden rounded-md bg-paper shadow-lux-sm" : ""
        }`}
      >
        {/* ---------- Image ---------- */}
        <div className={`relative overflow-hidden bg-bone ${featured ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
          {/* Stretched link to the product page (buttons above stay clickable) */}
          <Link
            href={`/products/${product.handle}`}
            aria-label={product.title}
            className="absolute inset-0 z-[1]"
          />
          {/* TODO_CLIENT_IMAGE: replace with Shopify product imagery */}
          <Image
            src={IMAGES[product.image]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
          {hasAlt && (
            <Image
              src={IMAGES[product.imageAlt!]}
              alt={t("product.altView", { title: product.title })}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="absolute inset-0 object-cover opacity-0 transition-all duration-[700ms] ease-out group-hover:scale-[1.06] group-hover:opacity-100"
            />
          )}
          <div className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 h-2/5 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

          {/* ---------- Tags (top-left) ---------- */}
          <div className="absolute start-3 top-3 flex flex-col items-start gap-1.5">
            {off > 0 && (
              <span className="bg-gold px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-black shadow-lux-sm">
                {t("product.offTag", { n: off })}
              </span>
            )}
            {badgeLabel && (
              <span className="bg-black/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
                {badgeLabel}
              </span>
            )}
          </div>

          {/* ---------- Wishlist (top-right) ---------- */}
          <motion.button
            aria-label={saved ? t("product.unsave") : t("product.save")}
            onClick={() => toggleWishlist(product.id)}
            whileTap={{ scale: 0.86 }}
            className={`absolute end-3 top-3 z-[2] flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 ${
              saved
                ? "border-gold bg-white text-gold"
                : "border-black/10 bg-white/80 text-black opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            }`}
          >
            <IconHeart className="h-4 w-4" />
          </motion.button>

          {/* ---------- Quick view (click-to-open) ---------- */}
          <button
            type="button"
            aria-label={t("product.quickView")}
            onClick={(e) => {
              e.stopPropagation();
              setQvOpen(true);
            }}
            className="absolute start-3 bottom-3 z-[3] flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black transition-colors duration-300 hover:border-gold hover:bg-white hover:text-gold"
          >
            <IconEye className="h-4 w-4" />
          </button>

          {/* ---------- Quick add (hover desktop; clear of the eye icon) ---------- */}
          <motion.button
            type="button"
            onClick={() => addToCart(product)}
            whileTap={{ scale: 0.97 }}
            className="absolute bottom-3 start-12 end-3 z-[2] hidden h-11 translate-y-2 pointer-events-none items-center justify-center gap-2 bg-black text-[12px] font-semibold uppercase tracking-[0.16em] text-cream opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto md:flex"
          >
            <IconPlus className="h-3.5 w-3.5" />
            {t("product.addToBag")}
          </motion.button>
        </div>

        {/* ---------- Info ---------- */}
        <div className={`flex flex-col gap-1 ${surface ? "px-4 pb-4" : ""} pt-4`}>
          <p className="label-caps text-taupe-light">{product.category}</p>
          <h3
            className={`serif leading-snug text-black ${
              featured ? "text-2xl" : "text-[1.15rem]"
            } font-semibold`}
          >
            <Link
              href={`/products/${product.handle}`}
              className="transition-colors hover:text-forest"
            >
              {product.title}
            </Link>
          </h3>
          {product.fabric && (
            <p className="text-[12px] text-taupe">{product.fabric}</p>
          )}

          {/* Price row — converted live, 5% markup on non-INR */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <p className="text-[16px] font-bold tracking-tight text-black">
              {formatPrice(product.priceInr)}
            </p>
            {product.mrpInr && product.mrpInr > product.priceInr && (
              <>
                <p className="text-[13px] text-taupe-light line-through">
                  {formatPrice(product.mrpInr)}
                </p>
                <p className="text-[12px] font-bold text-gold">
                  {t("product.off", { n: off })}
                </p>
              </>
            )}
          </div>

          {/* Rating row */}
          <div className="mt-1 flex items-center gap-2">
            <Stars rating={product.rating} />
            {product.reviewCount ? (
              <span className="text-[12px] text-taupe">
                ({product.reviewCount})
              </span>
            ) : null}
          </div>

          {/* Urgency */}
          {urgency && (
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-bronze">
              {urgency}
            </p>
          )}
        </div>
      </motion.div>

      {/* ---------- Quick view dialog ---------- */}
      <QuickViewModal product={product} open={qvOpen} onClose={closeQuickView} />
    </motion.article>
  );
}
