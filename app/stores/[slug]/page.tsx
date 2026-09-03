import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { StoreDetailView } from "@/components/sections/StoreDetailView";
import { STORES } from "@/lib/data/stores";

export function generateStaticParams() {
  return STORES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const store = STORES.find((s) => s.slug === slug);
  if (!store) return {};
  return {
    title: `${store.neighbourhood} — Saroj Ensemble`,
    description: `${store.neighbourhood} store. ${store.address}`,
  };
}

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = STORES.some((s) => s.slug === slug);
  if (!exists) notFound();

  return (
    <SiteChrome>
      <StoreDetailView slug={slug} />
    </SiteChrome>
  );
}
