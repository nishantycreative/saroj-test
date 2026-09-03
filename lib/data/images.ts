/*
  SAROJ ENSEMBLE — imagery registry.

  Client-shot imagery lives in public/images/ and is referenced by local path.
  Stock photography (Unsplash) remains for sections not yet swapped.
  To swap in a background-removed transparent PNG for any Bestseller/Trending
  image, simply replace the file at the same path — no component code changes needed.
*/

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80`;

export const IMAGES = {
  /* ---- Homepage hero banners (carousel slides) ---- */
  bannerHero: "/images/banner-hero-model.png",
  bannerFabrics: "/images/banner-fabric-stack.png",
  /* Legacy hero images — still referenced: hero1 = FestiveBanner wash,
     hero2 = FabricStory stage 03. Not part of the carousel anymore. */
  hero1: "/images/hero-slide-1-gold-mirror-sequin-lehenga.png",
  hero2: "/images/hero-slide-2-multicolor-stripe-saree.png",

  /* ---- Festive Edit campaign ---- */
  festiveEdit: "/images/festive-edit-1.png",

  /* ---- The Making of Our Fabric (storytelling scenes) ---- */
  storytelling2: "/images/Storytelling-2.png",
  storytelling3: "/images/Storytelling-3.png",
  storytelling4: "/images/Storytelling-4.png",
  storytelling5: "/images/Storytelling-5.png",

  /* ---- Custom fabric calculator ---- */
  fabricCalc: "/images/Custom-Fabric-Calculator-6.png",

  /* ---- Feature spreads ---- */
  spreadEditorial: "/images/feature-spread-1-lavender-gold-lehenga.png",
  spreadAtelier: "/images/feature-spread-2-mustard-pink-saree.png",
  madeToMeasureA: "/images/Made-to-Measure-7A.png",
  madeToMeasureB: "/images/Made-to-Measure-7B.png",

  /* ---- Bestseller rail (5 cards, left-to-right) ---- */
  bestIvoryAnarkali: "/images/bestseller-1-ivory-anarkali.png",
  bestPinkSaree: "/images/bestseller-2-pink-sequin-saree.png",
  bestKalamkari: "/images/bestseller-3-kalamkari-set.png",
  bestMagentaKurta: "/images/bestseller-4-magenta-kurta.png",
  bestBlueKurta: "/images/bestseller-5-blue-kurta.png",

  /* ---- Trending rail (2 unique images + 3 temporary reuses) ---- */
  trendGreenKurta: "/images/trending-1-green-kurta.png",
  trendPurpleKurta: "/images/trending-2-purple-kurta.png",
  // TODO_TRENDING_IMAGE: replace with unique trending images once generated
  trendTemp1: "/images/bestseller-1-ivory-anarkali.png",
  trendTemp2: "/images/bestseller-2-pink-sequin-saree.png",
  trendTemp3: "/images/bestseller-3-kalamkari-set.png",

  /* ---- Fabric story (The Making of Our Fabric, 4 stages) ---- */
  storyLoom: "/images/story-chapter-1-origin.png", // TODO_CLIENT_IMAGE: stage 01 sourcing — raw fibre photo
  storyBoutique: "/images/story-chapter-2-craft-fabric-detail.png", // TODO_CLIENT_IMAGE: stage 02 spinning/weaving — loom photo

  /* ---- Personal styling ---- */
  styling: "/images/Book-Your-Stylist-8.png",

  /* ---- Shop by Category (7 tiles — real taxonomy) ---- */
  catFestiveEdit: "/images/festive-edit-1.png",
  catNewArrival: "/images/new-arrivals.png",
  catFabrics: "/images/fabrics.png",
  catFancyDye: "/images/fancy-dye.png",
  catSuits: "/images/suits.png",
  catDupattas: "/images/dupattas.png",
  catDesignerSuits: "/images/Designer-Suits.png",

  /* ---- Header mega-menu campaign tiles (4:5, 1122×1402 — same surface
     in both the fabrics sub-nav panel and the flat category panel) ---- */
  headerFestiveEdit: "/images/festive-edit-1.png",
  headerNewArrival: "/images/header/new-arrival-header-1.png",
  headerFabrics: "/images/header/fabrics-header-2.png",
  headerFancyDye: "/images/header/fancy-dye-header-3.png",
  headerSuits: "/images/header/suits-header-4.png",
  headerDupattas: "/images/header/dupattas-header-5.png",
  headerDesignerSuits: "/images/header/Designer-Suits-header-6.png",

  /* ---- Product imagery (stand-ins for product photography) ---- */
  pBanarasi: u("photo-1509631179647-0177331693ae"), // TODO_CLIENT_IMAGE: product 01
  pChanderi: u("photo-1543087903-1ac2ec7aa8c5"), // TODO_CLIENT_IMAGE: product 02
  pIvoryMuse: u("photo-1539109136881-3be0616acf4b"), // TODO_CLIENT_IMAGE: product 03
  pJacquard: u("photo-1562157873-818bc0726f68"), // TODO_CLIENT_IMAGE: product 04
  pZardozi: u("photo-1529139574466-a303027c1d8b"), // TODO_CLIENT_IMAGE: product 05
  pMaxi: u("photo-1515886657613-9f3515b0c78f"), // TODO_CLIENT_IMAGE: product 06
  pOrganza: u("photo-1537832816519-689ad163238b"), // TODO_CLIENT_IMAGE: product 07
  pCalcutta: u("photo-1524504388940-b1c1722653e1"), // TODO_CLIENT_IMAGE: product 08
  pBrooch: u("photo-1535632066927-ab7c9ab60908"), // TODO_CLIENT_IMAGE: product 09
  pALine: u("photo-1594736797933-d0501ba2fe65"), // TODO_CLIENT_IMAGE: product 10

  /* ---- Alternate product imagery (hover-swap, "view 2") ---- */
  pBanarasiAlt: u("photo-1515372039744-b8f02a3ae446"), // TODO_CLIENT_IMAGE: product 01 · alt
  pChanderiAlt: u("photo-1502716119720-b23a93e5fe1b"), // TODO_CLIENT_IMAGE: product 02 · alt
  pIvoryMuseAlt: u("photo-1519699047748-de8e457a634e"), // TODO_CLIENT_IMAGE: product 03 · alt
  pJacquardAlt: u("photo-1434389677669-e08b4cac3105"), // TODO_CLIENT_IMAGE: product 04 · alt
  pZardoziAlt: u("photo-1518391846015-55a9cc003b25"), // TODO_CLIENT_IMAGE: product 05 · alt
  pMaxiAlt: u("photo-1521572163474-6864f9cf17ab"), // TODO_CLIENT_IMAGE: product 06 · alt
  pOrganzaAlt: u("photo-1496747611176-843222e1e57c"), // TODO_CLIENT_IMAGE: product 07 · alt
  pCalcuttaAlt: u("photo-1509631179647-0177331693ae"), // TODO_CLIENT_IMAGE: product 08 · alt
  pBroochAlt: u("photo-1529626455594-4ff0802cfb7e"), // TODO_CLIENT_IMAGE: product 09 · alt
  pALineAlt: u("photo-1507003211169-0a1dd7228f2d"), // TODO_CLIENT_IMAGE: product 10 · alt

  /* ---- Pairs Well With ---- */
  pwPotli: u("photo-1445205170230-053b83016050"), // TODO_CLIENT_IMAGE: pairing 01
  pwBrooch: u("photo-1556905055-8f358a7a47b2"), // TODO_CLIENT_IMAGE: pairing 02
  pwChoker: u("photo-1584917865442-de89df76afd3"), // TODO_CLIENT_IMAGE: pairing 03
  pwClutch: u("photo-1576566588028-4147f3842f27"), // TODO_CLIENT_IMAGE: pairing 04

  /* ---- Editorial / lookbook grid (1 large + 4) ---- */
  editLarge: u("photo-1500595046743-cd271d694d30"), // TODO_CLIENT_IMAGE: editorial lead
  editA: u("photo-1483985988355-763728e1935b"), // TODO_CLIENT_IMAGE: editorial 02
  editB: u("photo-1503342217505-b0a15ec3261c"), // TODO_CLIENT_IMAGE: editorial 03
  editC: u("photo-1492707892479-7bc8d5a4ee93"), // TODO_CLIENT_IMAGE: editorial 04
  editD: u("photo-1529626455594-4ff0802cfb7e"), // TODO_CLIENT_IMAGE: editorial 05

  /* ---- UGC "As Worn By You" (6 tiles) ---- */
  ugc1: u("photo-1494790108377-be9c29b29330"), // TODO_CLIENT_IMAGE: ugc 01
  ugc2: u("photo-1531123897727-8f129e1688ce"), // TODO_CLIENT_IMAGE: ugc 02
  ugc3: u("photo-1517841905240-472988babdf9"), // TODO_CLIENT_IMAGE: ugc 03
  ugc4: u("photo-1488426862026-3ee34a7d66df"), // TODO_CLIENT_IMAGE: ugc 04
  ugc5: u("photo-1508214751196-bcfd4ca60f91"), // TODO_CLIENT_IMAGE: ugc 05
  ugc6: u("photo-1507003211169-0a1dd7228f2d"), // TODO_CLIENT_IMAGE: ugc 06

  /* ---- Stores (1 flagship + 4) ---- */
  storeFlagship: "/images/Ghatkopar.png",
  storeMumbai: "/images/Nepeansea-road.png",
  storeJaipur: "/images/Thane.png",
  storeBengaluru: "/images/Goregaon.png",
  storeHyderabad: u("photo-1556228453-efd6c1ff04f6"), // TODO_CLIENT_IMAGE: store hyderabad

  /* ---- Journal (3 posts) ---- */
  journalA: "/images/blog-1.png",
  journalB: "/images/blog-2.png",
  journalC: "/images/blog-3.png",
} as const;

export type ImageKey = keyof typeof IMAGES;
