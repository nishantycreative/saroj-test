import { HeroRevealChrome } from "@/components/layout/HeroRevealChrome";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { NewsletterPopup } from "@/components/layout/NewsletterPopup";

import SarojHero from "@/components/sections/SarojHero";
import { TickerMarquee } from "@/components/sections/TickerMarquee";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { BundleRail } from "@/components/sections/BundleRail";
import { FestiveBanner } from "@/components/sections/FestiveBanner";
import { ProductRail } from "@/components/sections/ProductRail";
import { FabricStory } from "@/components/sections/FabricStory";
import { FabricCalculator } from "@/components/sections/FabricCalculator";
import { PairsWellWith } from "@/components/sections/PairsWellWith";
import { FeatureSpreads } from "@/components/sections/FeatureSpreads";
import { ReviewsMarquee } from "@/components/sections/ReviewsMarquee";
import { UGCGrid } from "@/components/sections/UGCGrid";
import { StoreLocator } from "@/components/sections/StoreLocator";
import { StylingBooking } from "@/components/sections/StylingBooking";
import { BlogsRail } from "@/components/sections/BlogsRail";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { NewsletterBand } from "@/components/sections/NewsletterBand";

import { buildHomepageRails } from "@/lib/data/products";
import { Toast } from "@/components/ui/Toast";

/*
  Homepage — colorful fashion-commerce section order.
  All data is placeholder (lib/data/*); Phase 3 swaps sources in
  lib/shopify.ts without touching section components.
*/

export default function Home() {
  /* Rails are built in precedence order (Best Sellers → Trending →
     New Arrivals) with per-rail exclusions — a product never appears in
     more than one of the three. */
  const { bestsellers, trending, newArrivals } = buildHomepageRails();

  return (
    <>
      {/* 01 · Announcement + 02 · Header + 03 · mega menu — hidden while
          the hero's scroll-lock is active; mount+fade in on reveal */}
      <HeroRevealChrome />

      {/* 04 · Hero — locked scroll-scrub video (storefront reveal) */}
      <SarojHero />

      {/* 04b · Ticker marquee */}
      <TickerMarquee />

      {/* 04c · Trust strip */}
      <TrustStrip />

      {/* 05 · Shop by category */}
      <CategoryGrid />

      {/* 06 · Festive sale banner (no countdown) */}
      <FestiveBanner />

      {/* 07 · Bestsellers rail */}
      <ProductRail
        id="bestsellers"
        eyebrowKey="rail.bestsellers.eyebrow"
        titleKey="rail.bestsellers.title"
        accentKey="rail.bestsellers.accent"
        products={bestsellers}
        viewAllHref="#bestsellers"
        featuredLead
        tone="forest"
        sectionClass="bg-white"
      />

      {/* 08 · The Making of Our Fabric — 4-stage story */}
      <FabricStory />

      {/* 09 · Custom fabric calculator */}
      <FabricCalculator />

      {/* 09b · Shop the Bundle — auto-paired sets (pairing pipeline) */}
      <BundleRail />

      {/* 09c · New Arrivals rail — kept clear of Bestsellers; sits as a
           white section between two green sections so the homepage
           alternates forest/white end-to-end */}
      <ProductRail
        id="new-arrivals"
        eyebrowKey="rail.newArrivals.eyebrow"
        titleKey="rail.newArrivals.title"
        accentKey="rail.newArrivals.accent"
        products={newArrivals}
        viewAllHref="/collections/new-arrival"
        tone="forest"
        sectionClass="bg-white"
      />

      {/* 10 · Pairs well with */}
      <PairsWellWith />

      {/* 11 · Feature spreads */}
      <FeatureSpreads />

      {/* 13 · Trending rail — dark green */}
      <ProductRail
        id="trending"
        eyebrowKey="rail.trending.eyebrow"
        titleKey="rail.trending.title"
        accentKey="rail.trending.accent"
        products={trending}
        viewAllHref="#trending"
        tone="onDark"
        sectionClass="bg-forest"
        surfaceCards
      />

      {/* 14 · Curated Google reviews marquee */}
      <ReviewsMarquee />

      {/* 15 · Live Instagram feed */}
      <UGCGrid />

      {/* 16 · Store locator (Juhu flagship) */}
      <StoreLocator />

      {/* 17 · Personal styling booking */}
      <StylingBooking />

      {/* 18 · Blogs */}
      <BlogsRail />

      {/* 19 · FAQ */}
      <FaqAccordion />

      {/* 20 · Newsletter */}
      <NewsletterBand />

      {/* 21 · Footer */}
      <Footer />

      {/* 22 · Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Overlays */}
      <MobileMenu />
      <CartDrawer />
      <WishlistDrawer />
      <Toast />

      {/* Promo popups — newsletter is homepage-only; cart exit lives on /cart */}
      <NewsletterPopup />
    </>
  );
}
