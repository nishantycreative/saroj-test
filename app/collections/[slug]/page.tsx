import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { CollectionView } from "@/components/sections/CollectionView";
import { SHOP_CATEGORIES } from "@/lib/data/categories";
import { en } from "@/lib/i18n/dicts/en";

export function generateStaticParams() {
  return SHOP_CATEGORIES.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = SHOP_CATEGORIES.find((c) => c.id === slug);
  if (!category) return {};
  return {
    title: `${en[category.labelKey]} — Saroj Ensemble`,
    description: en[category.taglineKey],
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = SHOP_CATEGORIES.some((c) => c.id === slug);
  if (!exists) notFound();

  return (
    <SiteChrome>
      {/* Suspense keeps this page statically generated (useSearchParams below) */}
      <Suspense fallback={null}>
        <CollectionView slug={slug} />
      </Suspense>
    </SiteChrome>
  );
}
