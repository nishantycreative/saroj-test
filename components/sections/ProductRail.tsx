"use client";

import type { Product } from "@/lib/shopify";
import { useStore } from "@/lib/store";
import type { DictKey } from "@/lib/i18n";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeader, type HeadingTone } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/icons";

/*
  Section 07/13 — product rail (Bestsellers / Trending share this component).
  Desktop: 5-up grid (lead card emphasized for Bestsellers).
  Mobile: horizontal scroll-snap rail.

  `tone` controls the section identity; dark tones surface the product
  cards on paper so text stays readable.
*/

interface ProductRailProps {
  id: string;
  eyebrowKey: DictKey;
  titleKey: DictKey;
  accentKey?: DictKey;
  products: Product[];
  viewAllHref: string;
  /** Emphasize the first card (larger title + ring) — used for Bestsellers */
  featuredLead?: boolean;
  tone?: HeadingTone;
  /** Section background class (only white/black/green — e.g. "bg-black") */
  sectionClass?: string;
  /** Surface cards on paper for dark backgrounds */
  surfaceCards?: boolean;
}

export function ProductRail({
  id,
  eyebrowKey,
  titleKey,
  accentKey,
  products,
  viewAllHref,
  featuredLead = false,
  tone = "burgundy",
  sectionClass = "",
  surfaceCards = false,
}: ProductRailProps) {
  const { t } = useStore();

  return (
    <section id={id} className={`overflow-x-clip ${sectionClass}`}>
      <div className="container-lux py-10 md:py-16">
        <SectionHeader
          eyebrow={t(eyebrowKey)}
          title={t(titleKey)}
          accent={accentKey ? t(accentKey) : undefined}
          tone={tone}
          action={
            <Button
              href={viewAllHref}
              variant={tone === "onDark" ? "outline-light" : "outline"}
              size="sm"
              className="hidden md:inline-flex"
            >
              {t("rail.viewAll")}
              <IconArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Button>
          }
        />

        <div className="no-scrollbar -mx-6 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-6 px-6 pb-2 md:mx-0 md:mt-10 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0 md:scroll-pl-0">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="w-[62vw] max-w-[19rem] shrink-0 snap-start sm:w-[42vw] md:w-auto md:max-w-none"
            >
              <ProductCard
                product={product}
                index={i}
                featured={featuredLead && i === 0}
                surface={surfaceCards}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button href={viewAllHref} variant="black" size="sm">
            {t("common.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
}
