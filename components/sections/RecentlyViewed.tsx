"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useStore } from "@/lib/store";
import { readRecentIds, subscribeRecent } from "@/lib/recentlyViewed";
import { productById } from "@/lib/data/products";
import type { Product } from "@/lib/shopify";

/*
  Recently-viewed rail — shows the last handful of products the visitor
  opened, fed from localStorage. Empty until something is viewed.

  Props:
    - `excludeId`: hide one product from the rail. The product detail page
      passes its own id so a PDP never shows itself in the row (the current
      product is always the newest entry in the history).
    - `scroll`: render as a horizontal scroll-snap row (PDP, 6–8 items)
      instead of the responsive grid used on the cart page.
*/

export function RecentlyViewed({
  limit = 4,
  excludeId,
  scroll = false,
}: {
  limit?: number;
  excludeId?: string;
  scroll?: boolean;
}) {
  const { t } = useStore();
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () =>
      setIds(
        readRecentIds()
          .filter((id) => id !== excludeId)
          .slice(0, limit),
      );
    /* async so the initial read doesn't cascade renders in the effect body */
    const timeout = window.setTimeout(sync, 0);
    const unsubscribe = subscribeRecent(sync);
    return () => {
      window.clearTimeout(timeout);
      unsubscribe();
    };
  }, [limit, excludeId]);

  const products = ids
    .map(productById)
    .filter((p): p is Product => Boolean(p));

  if (products.length === 0) return null;

  const grid = (
    <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );

  const scroller = (
    <div className="no-scrollbar -mx-6 mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-6 px-6 pb-2">
      {products.map((p, i) => (
        <div
          key={p.id}
          className="w-[62vw] max-w-[19rem] shrink-0 snap-start sm:w-[42vw] md:w-[24rem]"
        >
          <ProductCard product={p} index={i} />
        </div>
      ))}
    </div>
  );

  return (
    <section className="overflow-x-clip border-t border-line bg-white">
      <div className="container-lux py-14 md:py-20">
        <h2 className="serif text-2xl font-black uppercase tracking-[-0.01em] text-ink md:text-4xl">
          {t("recents.title")}
        </h2>
        {scroll ? scroller : grid}
      </div>
    </section>
  );
}