/*
  SAROJ ENSEMBLE — English master dictionary.

  This file is the single source of truth for every customer-facing string.
  The DictKey type is derived from it, so every other language dictionary
  must cover exactly the same keys (enforced by TypeScript).

  Strings may contain {placeholder} tokens replaced at render time by t().
*/

export const en = {
  /* ================= Announcement ================= */
  "announcement.text":
    "Festive Edit '26 — dispatch within 24 hours. Complimentary shipping over ₹2,500",

  /* ================= Ticker ================= */
  "ticker.1": "Dispatch within 24 hours",
  "ticker.2": "Complimentary alterations on first order",
  "ticker.3": "Handwoven in Varanasi & Jaipur",
  "ticker.4": "100% authentic handloom — GI tagged",
  "ticker.5": "Easy 14-day returns, no questions",
  "ticker.6": "Bridal & trousseau styling studio",
  "ticker.7": "Festive edit '26 — live now",

  /* ================= Header ================= */
  "header.openMenu": "Open menu",
  "header.home": "Saroj Ensemble home",
  "header.searchPlaceholder": "Search silks, suits, dupattas…",
  "header.search": "Search",
  "header.closeSearch": "Close search",
  "header.language": "Language",
  "header.currency": "Currency",
  "header.ratesNote": "Live exchange rates · 5% international fee included",
  "header.ratesUnavailable": "Live rates unavailable — prices shown in INR",
  "header.ratesUpdated": "Rates updated {date}",
  "header.account": "Account",
  "header.account.signin": "Sign in",
  "header.account.create": "Create account",
  "header.account.orders": "My orders",
  "header.account.sessions": "Styling sessions",
  "header.account.addresses": "Saved addresses",
  "header.searchNote": "Live results arrive with Shopify search — Phase 3",
  "header.suggestion.1": "Banarasi silk saree",
  "header.suggestion.2": "Chanderi kurta set",
  "header.suggestion.3": "Bridal lehenga",
  "header.suggestion.4": "Potli bags",
  "header.suggestion.5": "Zardozi work",
  "header.suggestion.6": "Festive edit '26",
  "header.wishlist": "Wishlist",
  "header.cart": "Cart",
  "header.primaryNav": "Primary",

  /* ================= Flat navigation ================= */
  "nav.stores": "Store Locator",
  "nav.blogs": "Blogs",
  "nav.about": "Our Story",
  "nav.contact": "Contact",
  "nav.sale": "Sale",

  /* ================= Mega menu (real client taxonomy) ================= */
  "nav.mega.festive": "Festive Edits",
  "nav.mega.newarrival": "New Arrival",
  "nav.mega.fabrics": "Fabrics",
  "nav.mega.fancydye": "Fancy Dye",
  "nav.mega.suits": "Suits",
  "nav.mega.dupattas": "Dupattas",
  "nav.mega.designersuits": "Designer Suits / Semi-Stitched",

  "nav.mega.fabrics.plain": "Plain",
  "nav.mega.fabrics.printed": "Printed",
  "nav.mega.fabrics.woven": "Woven",
  "nav.mega.fabrics.embroidery": "Embroidery",
  "nav.mega.flatCta": "Shop {cat}",
  "nav.mega.toggleSubcats": "Show {cat} subcategories",

  /* ================= Hero ================= */
  "hero.explore": "Explore the atelier",
  "hero.prev": "Previous slide",
  "hero.next": "Next slide",
  "hero.featured": "Featured collection",
  "hero.s1.eyebrow": "Handwoven Heritage",
  "hero.s1.title": "New Season, New Silks",
  "hero.s1.sub":
    "Discover Kanjeevaram and Banarasi silks, handcrafted for life's finest occasions.",
  "hero.s1.cta": "Shop New Arrivals",
  "hero.s2.eyebrow": "The Fabric Edit",
  "hero.s2.title": "Fabrics Worth the Story",
  "hero.s2.sub":
    "Explore our curated library of silks, weaves, and finishes — sourced and finished by hand.",
  "hero.s2.cta": "Browse Fabrics",

  /* ================= Categories ================= */
  "categories.eyebrow": "Shop by category",
  "categories.title": "Chosen with an occasion",
  "categories.accent": "in mind",
  "categories.shopAll": "Shop all",
  "categories.viewCollection": "View the collection",
  "categories.countFabrics": "{n} fabric types",
  "categories.festive.label": "Festive Edits",
  "categories.festive.tagline": "The celebration edit — silks and weaves for every occasion",
  "categories.newarrival.label": "New Arrival",
  "categories.newarrival.tagline": "The latest drops, first",
  "categories.fabrics.label": "Fabrics",
  "categories.fabrics.tagline": "Silks, cottons & sheers by the metre",
  "categories.fancydye.label": "Fancy Dye",
  "categories.fancydye.tagline": "Hand-dyed colour stories",
  "categories.suits.label": "Suits",
  "categories.suits.tagline": "Two-pieces cut for ease and elegance",
  "categories.dupattas.label": "Dupattas",
  "categories.dupattas.tagline": "The finishing drape",
  "categories.designersuits.label": "Designer Suits / Semi-Stitched",
  "categories.designersuits.tagline": "Statement ensembles, ready to tailor",

  /* ================= Festive banner ================= */
  "festive.eyebrow": "The Festive Edit '26",
  "festive.title1": "Festive",
  "festive.title2": "Edit '26",
  "festive.sub":
    "Discover the New Collection — handloom sarees, lehengas and kurta sets for every celebration.",
  "festive.cta": "Discover the New Collection",
  "festive.cta2": "Shop Bestsellers",
  "festive.note": "Woven in small batches · Limited pieces",

  /* ================= Product rails ================= */
  "rail.bestsellers.eyebrow": "Bestsellers",
  "rail.bestsellers.title": "Most loved,",
  "rail.bestsellers.accent": "season after season",
  "rail.trending.eyebrow": "Trending now",
  "rail.trending.title": "The talk of",
  "rail.trending.accent": "the atelier",
  "rail.newArrivals.eyebrow": "New arrivals",
  "rail.newArrivals.title": "Fresh off",
  "rail.newArrivals.accent": "the loom",
  "rail.viewAll": "View the collection",

  /* ================= Story ================= */
  "story.eyebrow": "Our story",

  /* ================= The Making of Our Fabric (4-stage story) ================= */
  "fabricStory.title": "The Making of Our Fabric",
  "fabricStory.sub": "From thread to texture, every fabric has a story.",
  "fabricStory.s1.title": "Sourcing",
  "fabricStory.s1.copy":
    "It begins at the source — raw silk, cotton and heritage fibres, chosen for their strength, lustre and hand-feel.",
  "fabricStory.s2.title": "Spinning & Weaving",
  "fabricStory.s2.copy":
    "Skilled hands spin the thread and set the loom. Warp and weft meet thread by thread, giving the cloth its structure and soul.",
  "fabricStory.s3.title": "Dyeing & Finishing",
  "fabricStory.s3.copy":
    "Colour is built in layers — dye, print or embroidery — then softened, washed and pressed until the hand-feel is just right.",
  "fabricStory.s4.title": "Final Product",
  "fabricStory.s4.copy":
    "Inspected, folded and dispatched from the atelier — the fabric leaves ready to become something made to be yours.",
  "fabricStory.outro": "Now, find the fabric that's right for you.",
  "fabricStory.cta": "Explore All Fabrics",
  "fabricStory.stage": "Stage {n} of 4",

  /* ================= Fabric calculator ================= */
  "fabric.eyebrow": "Custom fabric calculator",
  "fabric.title": "Know your drape,",
  "fabric.accent": "before you buy",
  "fabric.sub":
    "Tell us the garment and your measurements — we estimate the yardage before you visit the atelier. No waste, no surprises.",
  "fabric.garmentType": "Garment type",
  "fabric.category": "Category",
  "fabric.measurements": "Measurements",
  "fabric.calculate": "Calculate Yardage",
  "fabric.reserve": "Reserve this yardage",
  "fabric.yourEstimate": "Your estimate",
  "fabric.metres": "metres",
  "fabric.requiredYardage": "Required yardage",
  "fabric.wastage": "Wastage allowance",
  "fabric.included": "Included",
  "fabric.emptyHint":
    "Enter your measurements above — the estimate appears here.",
  "fabric.required": "Required",
  "fabric.rangeError": "{label} must be {min}–{max} {unit}",
  "fabric.noteProduction": "Sample formulas — production yardage tables arrive in Phase 2",
  "fabric.noteMenVerify":
    "Men's yardage figures are standard estimates — please verify with our tailors before ordering.",
  "fabric.toastConfirm":
    "Estimate confirmed — a stylist will follow up to reserve yardage",
  "fabric.toastReserve": "Yardage reservation request noted",
  "fabric.units.in": "in",
  "fabric.units.m": "m",
  "fabric.units.deg": "°",
  "fabric.category.women": "Women",
  "fabric.category.men": "Men",
  "fabric.g.saree": "Saree (with blouse)",
  "fabric.g.saree.note":
    "Saree yardage is near-standard; the variable is blouse fabric.",
  "fabric.g.kurta": "Kurta Set (kurta + bottoms)",
  "fabric.g.kurta.note": 'Assumes 44" width and a straight-to-A-line kurta.',
  "fabric.g.lehenga": "Lehenga",
  "fabric.g.lehenga.note":
    "Flare grows fabric quickly — a full circle (1080°) needs ~3× the base.",
  "fabric.g.dupatta": "Dupatta / Stole",
  "fabric.g.dupatta.note": "Optional extra — often woven on a separate loom width.",
  "fabric.g.menShirt": "Shirt",
  "fabric.g.menShirt.note": "Standard full sleeve shirt — placeholder estimate.",
  "fabric.g.menPant": "Trouser / Pant",
  "fabric.g.menPant.note": "Standard width trouser — placeholder estimate.",
  "fabric.g.menJacket": "Jacket / Blazer",
  "fabric.g.menJacket.note": "Regular-cut jacket — placeholder estimate.",
  "fabric.g.menKurta": "Kurta",
  "fabric.g.menKurta.note": "Straight-cut men's kurta — placeholder estimate.",
  "fabric.g.menSherwani": "Sherwani",
  "fabric.g.menSherwani.note": "Full-length sherwani coat — placeholder estimate.",
  "fabric.f.blouseBust": "Blouse bust",
  "fabric.f.sareeLength": "Saree length",
  "fabric.f.chest": "Chest",
  "fabric.f.kurtaLength": "Kurta length",
  "fabric.f.shirtLength": "Shirt length",
  "fabric.f.sleeve": "Sleeve length",
  "fabric.f.pantLength": "Pant length",
  "fabric.f.jacketLength": "Jacket length",
  "fabric.f.sherwaniLength": "Sherwani length",
  "fabric.f.waist": "Waist",
  "fabric.f.lehengaLength": "Lehenga length",
  "fabric.f.flare": "Flare",
  "fabric.f.dupattaLength": "Length",
  "fabric.help.sareeLength": "5.5 m for cotton, 6.2 m for silk drapes",
  "fabric.help.flare": "180° straight · 540° medium · 1080° full circle",

  /* ================= Pairs well with ================= */
  "pairs.eyebrow": "Pairs well with",
  "pairs.title": "Complete",
  "pairs.accent": "the look",
  "pairs.addSet": "Add set",
  "pairs.theSet": "The set",
  "pairs.pairsWith": "Pairs with {name}",
  "pairs.p1.note": "The potli echoes the saree's zari border.",
  "pairs.p2.note": "Pinned at the neckline, worn like an heirloom.",
  "pairs.p3.note": "Kundan at the throat, zardozi at the hem — quiet symmetry.",
  "pairs.p4.note": "A clutch in the same silk, folded by the same hands.",

  /* ================= Shop the Bundle (auto-paired sets) ================= */
  "bundle.eyebrow": "Shop the Bundle",
  "bundle.title": "Perfectly",
  "bundle.accent": "paired sets",
  "bundle.totalLabel": "Bundle total",
  "bundle.cta": "Shop This Set",

  /* ================= Pairs Well With (product page, FBT) ================= */
  "fbt.title": "Pairs Well With",
  "fbt.sub": "Complete the look with these auto-paired pieces.",
  "fbt.addSelected": "Add Selected to Cart",
  "fbt.total": "Total for selected",
  "fbt.current": "This item",

  /* ================= Feature spreads ================= */
  "features.c1.eyebrow": "The couture atelier",
  "features.c1.title": "Made to",
  "features.c1.accent": "measure",
  "features.c1.sub":
    "Every ensemble begins as a sketch and ends with three fittings. Your measurements, your weave, your story — cut by karigars who have dressed three generations.",
  "features.c1.cta": "Book an atelier visit",
  "features.c1.badgeTitle": "Made to measure",
  "features.c1.badgeCopy": "Three fittings, one flawless day.",
  "features.a.eyebrow": "The hands behind the weave",
  "features.a.title": "Master karigars,",
  "features.a.accent": "three generations deep",
  "features.a.sub":
    "Zardozi, gota and hand-block — practised, passed down, perfected. Each piece carries the maker's initials.",
  "features.a.d1.title": "The signature",
  "features.a.d1.copy":
    "Zardozi and hand-block prints, worked by karigars who learned at their parents' frames.",
  "features.a.d2.title": "The process",
  "features.a.d2.copy":
    "Every design is sampled in muslin first — drape, weight and fall tested before the final weave.",
  "features.a.d3.title": "The promise",
  "features.a.d3.copy":
    "Each piece ships with the maker's initials and a care card — a small signature, a long guarantee.",
  "features.a.cta": "Read our story",

  /* ================= Editorial / lookbook ================= */
  "editorial.eyebrow": "The lookbook",
  "editorial.title": "An autumn",
  "editorial.accent": "in drape",
  "editorial.scroll": "Scroll to explore",
  "editorial.e1.tag": "The Monsoon Edit",
  "editorial.e1.caption": "Feather-light weaves for first rain",
  "editorial.e2.tag": "Look 01",
  "editorial.e2.caption": "The shopping hour",
  "editorial.e3.tag": "Look 02",
  "editorial.e3.caption": "Chai, conversations",
  "editorial.e4.tag": "Look 03",
  "editorial.e4.caption": "The quiet drape",
  "editorial.e5.tag": "Look 04",
  "editorial.e5.caption": "Evening, in ivory",

  /* ================= Google reviews ================= */
  "reviews.eyebrow": "Google reviews",
  "reviews.title": "Loved by patrons,",
  "reviews.accent": "on Google",
  "reviews.basedOn": "Based on {n} verified reviews",
  "reviews.readAll": "Read all reviews",
  "reviews.loading": "Loading live reviews…",
  "reviews.error": "Couldn't load reviews right now. Please try again.",
  "reviews.errorRetry": "Try again",
  "reviews.notConfigured.title": "Live Google reviews connect here",
  "reviews.notConfigured.copy":
    "This section shows live reviews from our Google Business Profile. It needs the Google Places API configured before going live.",
  "reviews.empty":
    "No qualifying reviews yet — the newest 5-star reviews will appear here.",
  "reviews.starRating": "{n} star rating",
  "reviews.verified": "Verified on Google",

  /* ================= Instagram ================= */
  "instagram.eyebrow": "From our feed",
  "instagram.title": "Follow",
  "instagram.accent": "@sarojensembleofficial",
  "instagram.follow": "Follow on Instagram",
  "instagram.loading": "Loading latest posts…",
  "instagram.notConfigured.title": "Instagram feed connects here",
  "instagram.notConfigured.copy":
    "The latest 6 posts from @sarojensembleofficial appear here once the Instagram Business API is configured.",
  "instagram.empty": "No posts yet — follow @sarojensembleofficial",
  "instagram.viewPost": "View post on Instagram",

  /* ================= Stores ================= */
  "stores.eyebrow": "Our stores",
  "stores.title": "5 locations across",
  "stores.accent": "Mumbai",
  "stores.viewAll": "View all stores",
  "stores.flagship": "Flagship Store",
  "stores.directions": "Get directions",
  "stores.bookPrivate": "Book a private viewing",
  "stores.hours830": "Closes 8:30 PM",
  "stores.hours900": "Closes 9:00 PM",
  "stores.mapToast": "Interactive map arrives in Phase 2",

  /* ================= Personal styling ================= */
  "styling.eyebrow": "Personal styling",
  "styling.title": "A session with",
  "styling.accent": "your stylist",
  "styling.sub":
    "Trousseau, a single occasion, or a fresh season of you — one hour with a stylist who knows the weave library by heart.",
  "styling.sessionType": "Session type",
  "styling.inStore": "In-store",
  "styling.videoCall": "Video call",
  "styling.inStoreHint": "Flagship store, Juhu, Mumbai — chai on arrival.",
  "styling.videoHint": "A 45-minute video call on Google Meet, at your convenience.",
  "styling.store": "Store location",
  "styling.storePh": "Select a store",
  "styling.err.store": "Select a store",
  "styling.name": "Full name",
  "styling.namePh": "e.g. Ananya Kapoor",
  "styling.email": "Email",
  "styling.emailPh": "you@example.com",
  "styling.phone": "Phone",
  "styling.phonePh": "+91 98XXXXXX00",
  "styling.occasion": "Occasion",
  "styling.occasionPh": "Select an occasion",
  "styling.occasion.wedding": "Wedding",
  "styling.occasion.festive": "Festive",
  "styling.occasion.cocktail": "Cocktail & Reception",
  "styling.occasion.office": "Office / Corporate",
  "styling.occasion.everyday": "Everyday",
  "styling.occasion.other": "Something else",
  "styling.date": "Preferred date",
  "styling.time": "Preferred time",
  "styling.timePh": "Select…",
  "styling.requirements": "Styling requirements",
  "styling.requirementsPh":
    "Colours, silhouettes, references — anything that helps us prepare.",
  "styling.optional": "(optional)",
  "styling.submit": "Reserve Your Fitting",
  "styling.footnote": "No payment needed — we confirm availability first",
  "styling.success.title": "Request received",
  "styling.success.copy":
    "Thank you, {name}. Our atelier will confirm your {mode} session at {time} on the date you chose.",
  "styling.success.again": "Book another session",
  "styling.err.name": "Please enter your full name",
  "styling.err.email": "Enter a valid email address",
  "styling.err.phone": "Enter a valid phone number",
  "styling.err.date": "Choose a date",
  "styling.err.datePast": "Pick a future date",
  "styling.err.time": "Choose a time slot",
  "styling.err.occasion": "Select an occasion",
  "styling.toast": "Styling session requested — we'll confirm shortly",

  /* ================= Blogs ================= */
  "blogs.eyebrow": "From the blogs",
  "blogs.title": "Notes from",
  "blogs.accent": "the atelier",
  "blogs.all": "All blogs",
  "blogs.read": "Read the story",
  "blogs.minRead": "{n} min read",
  "blogs.b1.title": "The Drape Diary: Six ways to wear a saree after 5 pm",
  "blogs.b1.excerpt":
    "From boardroom to barat, the same six metres work harder than you think — here's how to restyle them after dark.",
  "blogs.b2.title": "How Jaipur wears a saree now",
  "blogs.b2.excerpt":
    "Young Jaipur is rewriting the city's drape code. We followed three women through a working week.",
  "blogs.b3.title": "The Kurta Edit: a groom's guide",
  "blogs.b3.excerpt":
    "Silk, brocade or cotton? A groom's kurta has to survive tears, dances and twelve hours of photographs.",

  /* ================= FAQ ================= */
  "faq.eyebrow": "Questions, answered",
  "faq.title": "Good to know",
  "faq.accent": "before you order",
  "faq.f1.q": "Do you offer custom blouse or outfit stitching?",
  "faq.f1.a":
    "Yes — most fabrics and sarees can be paired with custom blouse or made-to-measure stitching. Share your measurements after ordering, or book a session with our in-store stylist for a guided fitting.",
  "faq.f2.q": "What is your return and exchange policy?",
  "faq.f2.a":
    "We offer a 14-day return window on unused, unwashed items with original tags. Custom-stitched or made-to-measure pieces are final sale and not eligible for return, since they're cut specifically to your measurements.",
  "faq.f3.q": "How can I be sure the silk and zari work are authentic?",
  "faq.f3.a":
    "Every fabric is sourced and verified through our own network of weavers and karigars — the same sourcing process featured in our Making of the Fabric story. Product pages note fabric composition and origin where applicable.",
  "faq.f4.q": "Do you offer Cash on Delivery (COD)?",
  "faq.f4.a":
    "Cash on delivery is available on every pin code in India — pay when your order arrives. Prepaid is always welcome and dispatches faster.",
  "faq.f5.q": "How long does made-to-measure tailoring take?",
  "faq.f5.a":
    "Most made-to-measure pieces are ready within 2–3 weeks, cut and fitted by our karigars after your measurements or an in-person fitting are confirmed.",
  "faq.f6.q": "Can I book a styling session before I buy?",
  "faq.f6.a":
    "Yes — book a one-hour session with a stylist either in-store at any of our 5 Mumbai locations or over video call, and get guided through fabric, weave, and styling choices before you commit.",
  "faq.f7.q": "Do you ship across India and internationally?",
  "faq.f7.a":
    "We ship across India and to 200+ countries worldwide. International orders are accepted directly — our concierge confirms shipping costs.",

  /* ================= Newsletter ================= */
  "newsletter.eyebrow": "The atelier letter",
  "newsletter.title": "Weaves first,",
  "newsletter.accent": "invitations second",
  "newsletter.sub":
    "One letter a month — new collections, atelier stories and a private preview before anyone else.",
  "newsletter.placeholder": "Your email address",
  "newsletter.subscribe": "Subscribe",
  "newsletter.err": "Please enter a valid email address",
  "newsletter.note": "No noise, unsubscribe anytime",
  "newsletter.successTitle": "You're on the list",
  "newsletter.successCopy":
    "The next atelier letter — new weaves, private previews, and the occasional poem — arrives in your inbox soon.",
  "newsletter.toast": "Welcome to the atelier newsletter",
  "newsletter.emailLabel": "Email address",

  /* ================= Promo popups (newsletter + cart exit) ================= */
  "promo.close": "Close",
  "promo.copy": "Copy code",
  "promo.copied": "Copied!",

  "nlPop.eyebrow": "A gift from the atelier",
  "nlPop.title": "10% off your first order",
  "nlPop.sub":
    "Join the Saroj list and take 10% off your first fabrics, suits or dupattas order.",
  "nlPop.cta": "Claim my 10%",
  "nlPop.note": "One letter a month. No noise, unsubscribe anytime.",
  "nlPop.successTitle": "Your code is ready",
  "nlPop.successCopy":
    "Use {code} at checkout for 10% off your first purchase.",
  "nlPop.successFallback":
    "Save {code} — it's valid on your first purchase. We'll confirm your email as soon as our list goes live.",
  "nlPop.validity": "Valid for 30 days on your first purchase.",

  "cartExit.eyebrow": "Wait — your cart is waiting",
  "cartExit.title": "Finish your order with 10% off",
  "cartExit.sub":
    "An extra 10%, just for completing your purchase in the next two hours.",
  "cartExit.codeLabel": "Your extra code",
  "cartExit.cartSummary": "{n} items · {total}",
  "cartExit.apply": "Apply & Continue",
  "cartExit.applied": "10% off applied to your order",
  "cartExit.leave": "No thanks, leave",
  "cartExit.note": "Applies to your current cart at checkout.",

  /* ================= Footer ================= */
  "footer.tagline":
    "Quiet luxury for the modern Indian woman. Heritage craft, contemporary mind.",
  "footer.shop": "Shop",
  "footer.company": "Company",
  "footer.care": "Client Care",
  "footer.shop.sarees": "Sarees",
  "footer.shop.kurtasets": "Kurta Sets",
  "footer.shop.lehengas": "Lehengas",
  "footer.shop.accessories": "Accessories",
  "footer.shop.occasion": "Occasion Collections",
  "footer.shop.gifting": "Gifting",
  "footer.company.story": "Our Story",
  "footer.company.blogs": "Blogs",
  "footer.company.stores": "Store Locator",
  "footer.company.services": "Boutique Services",
  "footer.company.contact": "Contact",
  "footer.care.faq": "FAQ",
  "footer.care.shipping": "Shipping & Delivery",
  "footer.care.returns": "Returns & Exchanges",
  "footer.care.fabricCare": "Fabric Care",
  "footer.care.privacy": "Privacy Policy",
  "footer.care.terms": "Terms of Service",
  "footer.rights": "© 2026 Saroj Ensemble. All rights reserved.",
  "footer.est": "Woven in India",

  /* ================= Trust strip ================= */

  /* ================= Cart ================= */
  "cart.title": "Your bag ({n})",
  "cart.continue": "Continue shopping",
  "cart.size": "Size {size}",
  "cart.remove": "Remove",
  "cart.subtotal": "Subtotal",
  "cart.note": "Shipping, taxes and gift wrapping calculated at checkout.",
  "cart.checkout": "Proceed to checkout",
  "cart.empty": "Your bag is empty",
  "cart.emptyHint": "Handloom pieces you'll love are a click away.",
  "recents.title": "Recently viewed",
  "cart.checkoutToast": "Checkout connects to Shopify in Phase 3",
  "cart.qty": "Quantity for {title}",

  /* ================= Breadcrumb / collections ================= */
  "breadcrumb.home": "Home",
  "collection.sortLabel": "Sort by",
  "collection.sort.featured": "Featured",
  "collection.sort.newest": "Newest",
  "collection.sort.priceLow": "Price: low to high",
  "collection.sort.priceHigh": "Price: high to low",
  "collection.sort.rating": "Top rated",
  "collection.fabricType": "Fabric type",
  "collection.allFabrics": "All fabric types",
  "collection.results": "{n} pieces",
  "collection.empty": "Nothing here yet — new weaves arrive weekly.",
  "collection.back": "Browse all collections",
  "collection.filter.title": "Filters",
  "collection.filter.active": "Active filters",
  "collection.filter.remove": "Remove filter",
  "collection.filter.close": "Close filters",
  "collection.filter.clearAll": "Clear all",
  "collection.filter.show": "Show {n} results",
  "collection.filter.price": "Price",
  "collection.filter.price.under2000": "Under ₹2,000",
  "collection.filter.price.b2000_5000": "₹2,000 – 5,000",
  "collection.filter.price.b5000_10000": "₹5,000 – 10,000",
  "collection.filter.price.over10000": "₹10,000 & above",
  "collection.filter.fabric": "Fabric type",
  "collection.filter.fabric.silk": "Silk",
  "collection.filter.fabric.cotton": "Cotton",
  "collection.filter.fabric.georgette": "Georgette",
  "collection.filter.fabric.chiffon": "Chiffon",
  "collection.filter.fabric.brocade": "Brocade",
  "collection.filter.fabric.linen": "Linen",
  "collection.filter.fabric.chanderi": "Chanderi",
  "collection.filter.fabric.organza": "Organza",
  "collection.filter.fabric.velvet": "Velvet",
  "collection.filter.fabric.net": "Net",
  "collection.filter.pattern": "Pattern / weave",
  "collection.filter.pattern.plain": "Plain",
  "collection.filter.pattern.printed": "Printed",
  "collection.filter.pattern.woven": "Woven",
  "collection.filter.pattern.embroidered": "Embroidered",
  "collection.filter.pattern.zari": "Zari border",
  "collection.filter.color": "Colour",
  "collection.filter.color.red": "Red",
  "collection.filter.color.green": "Green",
  "collection.filter.color.blue": "Blue",
  "collection.filter.color.gold": "Gold",
  "collection.filter.color.ivory": "Ivory",
  "collection.filter.color.white": "White",
  "collection.filter.color.black": "Black",
  "collection.filter.color.pink": "Pink",
  "collection.filter.color.purple": "Purple",
  "collection.filter.color.yellow": "Yellow",
  "collection.filter.color.orange": "Orange",
  "collection.filter.color.brown": "Brown",
  "collection.filter.color.grey": "Grey",
  "collection.filter.color.multi": "Multi",
  "collection.filter.occasion": "Occasion",
  "collection.filter.occasion.festive": "Festive",
  "collection.filter.occasion.wedding": "Bridal / Wedding",
  "collection.filter.occasion.party": "Party wear",
  "collection.filter.occasion.casual": "Casual",
  "collection.filter.occasion.office": "Daily / Office",
  "collection.filter.rating": "Customer rating",
  "collection.filter.rating.4": "4★ & above",
  "collection.filter.rating.3": "3★ & above",
  "collection.filter.discount": "Discount",
  "collection.filter.discount.10": "10% off or more",
  "collection.filter.discount.20": "20% off or more",
  "collection.filter.availability": "Availability",
  "collection.filter.inStock": "In stock only",

  /* ================= By the Numbers (hands behind the weave) ================= */
  "hands.eyebrow": "The hands behind the weave",
  "hands.title": "Craft, in numbers",
  "hands.sub": "A house measured in decades, weaves and ateliers — not just metres.",
  "hands.s1.label": "Google reviews",
  "hands.s2.label": "Fabric types",
  "hands.s3.label": "Stores across Mumbai",
  "hands.s4.label": "Craft stages, start to finish",

  /* ================= About ================= */
  "about.title": "A house built on the loom",
  "about.sub":
    "Three generations, two looms, one ledger — the Saroj Ensemble story.",
  "about.p1":
    "Saroj Devi began in Chandni Chowk with two looms and a ledger book, weaving Banarasi silks for the brides of Old Delhi. Her measure of success wasn't volume, but whether a weave could be signed with pride.",
  "about.p2":
    "Today the atelier bridges Varanasi and Jaipur, where master karigars — many of them second-generation — still finish every piece by hand. We moved closer to the source on purpose: beside the looms, where quality is decided.",
  "about.p3":
    "The craft hasn't changed. The ledger has — children's schooling now sits on it, because a house is only as strong as the hands that built it.",
  "about.v1.eyebrow": "Origin",
  "about.v1.title": "Founded in Chandni Chowk",
  "about.v1.copy": "Two looms, one ledger, a lifetime of weave.",
  "about.v2.eyebrow": "Atelier",
  "about.v2.title": "Beside the looms",
  "about.v2.copy": "Master karigars finish every piece by hand.",
  "about.v3.eyebrow": "Values",
  "about.v3.title": "Craft, fairly paid",
  "about.v3.copy": "Artisans on payroll; their children's schooling on ours.",

  /* ================= Contact ================= */
  "contact.title": "Talk to the atelier",
  "contact.sub": "Questions, custom orders or a fitting — we reply within a day.",
  "contact.name": "Full name",
  "contact.namePh": "Your name",
  "contact.email": "Email",
  "contact.emailPh": "you@example.com",
  "contact.subject": "Subject",
  "contact.subjectPh": "What's it about?",
  "contact.message": "Message",
  "contact.messagePh": "Tell us everything…",
  "contact.send": "Send message",
  "contact.sent": "Message sent — we'll be in touch within a day.",
  "contact.visit": "Visit us",
  "contact.phone": "Call us",
  "contact.emailUs": "Email us",

  /* ================= Stores ================= */
  "stores.viewMore": "View store",
  "stores.call": "Call",
  "stores.whatsapp": "WhatsApp",
  "stores.hours": "Hours",
  "stores.allDays": "Open all days",
  "stores.days": "Days",
  "stores.reviews": "{n} reviews",

  /* ================= Blogs ================= */
  "blogs.back": "All posts",

  /* ================= Wishlist ================= */
  "wishlist.title": "Saved items ({n})",
  "wishlist.empty": "Nothing saved yet",
  "wishlist.emptyHint": "Tap the heart on any piece to keep it here.",
  "wishlist.addToBag": "Add to bag",
  "wishlist.remove": "Remove",

  /* ================= Product ================= */
  "product.addToBag": "Add to bag",
  "product.offTag": "{n}% OFF",
  "product.off": "{n}% off",
  "product.onlyLeft": "Only {n} left",
  "product.addedToast": "{title} added to your bag",
  "product.save": "Save to wishlist",
  "product.unsave": "Remove from wishlist",
  "product.altView": "{title} — alternate view",
  "product.quickView": "Quick view",
  "product.starRating": "{n} star rating",
  "product.badge.bestseller": "Bestseller",
  "product.badge.new": "New",
  "product.badge.limited": "Limited",
  "product.badge.trending": "Trending",
  "product.buyNow": "Buy Now",
  "product.added": "Added",
  "product.qty": "Quantity",
  "product.colour": "Colour",
  "product.viewFullDetails": "View full details",

  /* ================= Common ================= */
  "common.close": "Close",
  "common.menu": "Menu",
  "common.languageCurrency": "Language · Currency",
  "common.viewAll": "View all",

  /* ================= Policies ================= */
  "policy.privacy.title": "Privacy Policy",
  "policy.privacy.sub":
    "How Saroj Ensemble collects, uses and protects your personal information.",
  "policy.privacy.s1.heading": "Information we collect",
  "policy.privacy.s1.body":
    "We collect the details you share when you place an order, create an account, subscribe to our newsletter, or contact us — including your name, contact details, shipping address and payment information.",
  "policy.privacy.s2.heading": "How we use it",
  "policy.privacy.s2.body":
    "We use your information to process and dispatch orders, provide customer support, improve our store, and — with your consent — send updates about new collections.",
  "policy.privacy.s3.heading": "Cookies",
  "policy.privacy.s3.body":
    "Our site uses cookies to remember your preferences, keep your bag up to date, and understand how visitors shop. You can disable cookies in your browser at any time without affecting basic browsing.",
  "policy.privacy.s4.heading": "Your rights",
  "policy.privacy.s4.body":
    "You may request access to, correction of, or deletion of your personal data at any time by contacting us. We never sell your data to third parties.",
  "policy.terms.title": "Terms of Service",
  "policy.terms.sub":
    "The terms that apply when you browse or purchase from Saroj Ensemble.",
  "policy.terms.s1.heading": "Use of our site",
  "policy.terms.s1.body":
    "Content on our site is provided for lawful, personal use. You agree not to misuse our services or interfere with their operation.",
  "policy.terms.s2.heading": "Orders & pricing",
  "policy.terms.s2.body":
    "Prices are shown in your selected currency and include applicable taxes unless stated otherwise. We reserve the right to correct pricing errors and to decline or cancel orders where fraud is suspected.",
  "policy.terms.s3.heading": "Returns",
  "policy.terms.s3.body":
    "Most unworn items can be returned within 14 days of delivery, subject to our Returns Policy.",
  "policy.terms.s4.heading": "Liability",
  "policy.terms.s4.body":
    "To the fullest extent permitted by law, Saroj Ensemble is not liable for indirect or consequential losses arising from use of the site.",
  "policy.shipping.title": "Shipping Policy",
  "policy.shipping.sub":
    "How quickly we dispatch and how long delivery takes.",
  "policy.shipping.s1.heading": "Dispatch within 24 hours",
  "policy.shipping.s1.body":
    "Every order is packed and dispatched within 24 hours of confirmation, on working days.",
  "policy.shipping.s2.heading": "Delivery time",
  "policy.shipping.s2.body":
    "Standard delivery takes 5–7 working days across India, and 7–14 working days for international orders.",
  "policy.shipping.s3.heading": "Tracking",
  "policy.shipping.s3.body":
    "Once your order ships, you will receive a tracking link by email or WhatsApp so you can follow it to your door.",
  "policy.shipping.s4.heading": "Need it sooner?",
  "policy.shipping.s4.body":
    "Contact us before ordering for express-shipping options and we will do our best to accommodate.",
  "policy.returns.title": "Returns & Refunds",
  "policy.returns.sub": "Our 14-day return policy, kept fair and simple.",
  "policy.returns.s1.heading": "14-day window",
  "policy.returns.s1.body":
    "You may request a return within 14 days of delivery for unworn items in their original condition with tags attached.",
  "policy.returns.s2.heading": "Condition",
  "policy.returns.s2.body":
    "Items must be returned with their original packaging, tags and certificate of authenticity (where applicable). Made-to-order and personalised pieces are excluded.",
  "policy.returns.s3.heading": "Process",
  "policy.returns.s3.body":
    "Email or WhatsApp us with your order number and reason. We will arrange a reverse pickup or share a return address.",
  "policy.returns.s4.heading": "Refunds",
  "policy.returns.s4.body":
    "Once your return is received and inspected, we will process your refund to the original payment method within 5–7 working days. Exchanges are subject to availability.",

  /* ================= WhatsApp ================= */
  "whatsapp.title": "Chat with our stylists",
  "whatsapp.copy":
    "Drape questions, size guidance, occasion help — on WhatsApp, every day 10:30–20:30.",
  "whatsapp.cta": "Start a chat",
  "whatsapp.msg": "Hi, I'd like to know more about your fabrics and sarees.",
  "whatsapp.aria": "Chat on WhatsApp",
  "whatsapp.hours": "Open daily, 10:00 – 20:30 IST",
  "trust.t1.title": "Complimentary shipping",
  "trust.t1.copy": "Insured, tracked delivery across India on orders above ₹ 2,500.",
  "trust.t2.title": "14-day easy returns",
  "trust.t2.copy": "Unworn pieces, no questions. Pickup arranged from your door.",
  "trust.t3.title": "Secure payments",
  "trust.t3.copy": "UPI, cards and net banking — encrypted end to end.",
  "trust.t4.title": "Craftsmanship guarantee",
  "trust.t4.copy": "Every weave checked twice at the loom and once at the atelier.",
} as const;

export type DictKey = keyof typeof en;
