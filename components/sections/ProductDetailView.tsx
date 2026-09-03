"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CATALOG } from "@/lib/data/products";
import { getLocalPairs } from "@/lib/pairing/local";
import { recordRecentId } from "@/lib/recentlyViewed";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/shopify";
import { ProductPane } from "@/components/sections/ProductPane";
import { ProductPairsWellWith } from "@/components/sections/ProductPairsWellWith";
import { RecentlyViewed } from "@/components/sections/RecentlyViewed";

/*
  Product detail view — Phase 1 (placeholder catalogue). The product
  layout itself lives in ProductPane, shared with the quick-view dialog
  so the two can never drift apart. Around it: breadcrumb, the
  "Pairs Well With" row driven by the pairing pipeline, and a
  horizontally-scrolling "Recently viewed" rail.
*/

export function ProductDetailView({ product }: { product: Product }) {
  const { t } = useStore();

  useEffect(() => {
    recordRecentId(product.id);
  }, [product.id]);

  const matches = getLocalPairs(product.id)
    .map((m) => CATALOG[m.productId])
    .filter((p): p is Product => Boolean(p))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* ---------- breadcrumb ---------- */}
      <nav className="border-b border-line" aria-label="Breadcrumb">
        <div className="container-lux flex items-center gap-2 py-3 text-[12px] text-taupe">
          <Link href="/" className="transition-colors hover:text-ink">
            {t("breadcrumb.home")}
          </Link>
          <span aria-hidden>·</span>
          <Link
            href={`/collections/${product.collections?.[0] ?? "new-arrival"}`}
            className="transition-colors hover:text-ink"
          >
            {product.category}
          </Link>
          <span aria-hidden>·</span>
          <span className="text-taupe-light">{product.title}</span>
        </div>
      </nav>

      <div className="container-lux py-8 md:py-12">
        <ProductPane product={product} titleTag="h1" />

        {/* ---------- Pairs well with (FBT) ---------- */}
        <ProductPairsWellWith current={product} matches={matches} />
      </div>

      {/* ---------- Recently viewed (excludes the current product) ---------- */}
      <RecentlyViewed excludeId={product.id} limit={8} scroll />
    </main>
  );
}