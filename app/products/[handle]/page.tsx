import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ProductDetailView } from "@/components/sections/ProductDetailView";
import { CATALOG } from "@/lib/data/products";

/*
  Minimal product detail page (Phase 1). Phase 3 swaps the lookup for a
  Shopify Storefront `product(handle: …)` query and reads pairing
  metafields via lib/pairing/storefront.ts — the view component is shared.
*/

export function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  return params.then(async ({ handle }) => {
    const product = Object.values(CATALOG).find((p) => p.handle === handle);
    if (!product) return {};
    return {
      title: `${product.title} — Saroj Ensemble`,
      description: product.description ?? product.fabric ?? product.category,
    };
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = Object.values(CATALOG).find((p) => p.handle === handle);
  if (!product) notFound();

  return (
    <SiteChrome>
      <ProductDetailView product={product} />
    </SiteChrome>
  );
}
