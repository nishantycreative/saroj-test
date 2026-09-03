import { IMAGES } from "@/lib/data/images";

/*
  Blogs — 3 SEO-optimized posts. Bodies are English-only for now
  (TODO: localize post content per locale). Each post carries internal
  links to collection pages and uses H2/H3 structure inside the body.
*/

export interface BlogSection {
  /** H2 heading — omit for the lead paragraph */
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  /** H3 sub-sections */
  subs?: { heading: string; paragraphs: string[] }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  readTimeMin: number;
  tag: string;
  image: keyof typeof IMAGES;
  body: BlogSection[];
  /** internal links to relevant collection pages */
  related: { label: string; href: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "fabric-care-guide",
    title: "The Complete Fabric Care Guide: Silk, Cotton & Chanderi",
    metaDescription:
      "How to wash, store and iron Saroj silk, cotton and chanderi fabrics the right way — so every weave stays beautiful for years.",
    excerpt:
      "The atelier's honest guide to keeping silk, cotton and chanderi looking — and feeling — as good as the day they left the loom.",
    readTimeMin: 6,
    tag: "Fabric Care",
    image: "journalA",
    related: [
      { label: "Shop all fabrics", href: "/collections/fabrics" },
      { label: "Plain fabrics", href: "/collections/fabrics?type=plain" },
      { label: "Suits", href: "/collections/suits" },
    ],
    body: [
      {
        paragraphs: [
          "Every fabric Saroj Ensemble makes is hand-finished, which means it responds best to a little considered care. The reward is a drape that softens with each wear rather than wearing out. Here's how to look after silk, cotton and chanderi — without a trip to the dry-cleaner every season.",
        ],
      },
      {
        heading: "Why care matters more than you think",
        paragraphs: [
          "Natural fibres are hygroscopic — they breathe with the room. Dust, perspiration and humidity settle into the weave and dull the colour over time. Air your pieces after wearing and store them clean; it is the single biggest difference you can make.",
        ],
      },
      {
        heading: "Washing by fibre",
        subs: [
          {
            heading: "Silk",
            paragraphs: [
              "Hand-wash cold with a pH-neutral detergent, never wring — roll in a towel and press. Avoid direct sun, which yellows whites and fades deep tones.",
            ],
          },
          {
            heading: "Cotton",
            paragraphs: [
              "Cotton takes a gentle machine cycle well. Wash dark and bright colours inside out to protect the surface, and shake out before drying to keep the weave crisp.",
            ],
          },
          {
            heading: "Chanderi & blends",
            paragraphs: [
              "The silk-cotton union can stretch when wet. Hand-wash or use a mesh bag, dry flat, and iron on a low setting while slightly damp for a smooth finish.",
            ],
          },
        ],
      },
      {
        heading: "Storing without creases",
        paragraphs: [],
        list: [
          "Fold heavier weaves; hang only light fabrics on padded hangers.",
          "Store away from direct light and in breathable cloth, never plastic.",
          "Use acid-free tissue between embellished layers to protect embroidery.",
          "Add cedar or neem leaves to keep the cupboard fresh naturally.",
        ],
      },
      {
        heading: "When to let the professionals step in",
        paragraphs: [
          "Zardozi, gota and heavy brocade are best dry-cleaned occasionally rather than washed at home. Spot-treat stains immediately with cold water, and always test any method on a hidden seam first.",
        ],
      },
    ],
  },
  {
    slug: "seasonal-styling-guide",
    title: "Seasonal Styling Guide: Suits & Dupattas for Every Occasion",
    metaDescription:
      "How to style Saroj suits and dupattas from workday to festive evening — with fabric, colour and drape advice for every season.",
    excerpt:
      "One wardrobe, four seasons. How to carry a suit set from a morning meeting to a festive dinner — and let the dupatta do the heavy lifting.",
    readTimeMin: 5,
    tag: "Styling",
    image: "journalB",
    related: [
      { label: "Shop suits", href: "/collections/suits" },
      { label: "Shop dupattas", href: "/collections/dupattas" },
      { label: "New arrivals", href: "/collections/new-arrival" },
    ],
    body: [
      {
        paragraphs: [
          "A well-cut suit set is the most versatile piece in an Indian wardrobe. The styling secret isn't more clothes — it's how you shift the same two pieces across occasions with colour, drape and accessories.",
        ],
      },
      {
        heading: "The workday set",
        paragraphs: [
          "Daylight calls for breathable cotton and soft pastels, worn straight and simple. A chanderi kurta over tailored trousers reads polished without trying too hard.",
        ],
      },
      {
        heading: "Festive evenings, layer by layer",
        paragraphs: [
          "Evening is where colour earns its keep. Deep tones — burgundy, forest, mustard — photograph beautifully and gather warmth under indoor light. Swap the cotton dupatta for a silk or organza one and the same suit becomes an occasion piece.",
        ],
      },
      {
        heading: "The dupatta is the hero",
        paragraphs: [
          "A dupatta changes the silhouette in seconds: left loose for ease, pinned at the shoulder for structure, or cross-draped at the elbow for a festive line. Owning a few interchangeable dupattas multiplies every suit you already have.",
        ],
      },
      {
        heading: "After the occasion",
        paragraphs: [
          "Air, spot-clean and store clean — the guide above is the whole aftercare routine. Occasion-wear that's cared for comes back for years, which is its own kind of sustainability.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-fabric",
    title: "How to Choose the Right Fabric: A Buyer's Guide to Weaves & Weight",
    metaDescription:
      "Silk, cotton, georgette or chanderi? A simple guide to choosing fabric by occasion, season, weight and drape — before you buy by the metre.",
    excerpt:
      "Weight, drape, transparency, sheen — choosing fabric isn't a mystery. This buyer's guide walks you through the decisions that matter.",
    readTimeMin: 7,
    tag: "Buyer's Guide",
    image: "journalC",
    related: [
      { label: "Shop all fabrics", href: "/collections/fabrics" },
      { label: "Estimate your yardage", href: "/#fabric-calculator" },
      { label: "Fancy dye", href: "/collections/fancy-dye" },
    ],
    body: [
      {
        paragraphs: [
          "Buying fabric by the metre is a small design project. Get the three decisions right — occasion, season and weight — and the rest is taste. Here's the framework our stylists use at the atelier.",
        ],
      },
      {
        heading: "Start with the occasion",
        paragraphs: [
          "Day events and warm weather lean to cotton, linen and light silks; evenings and celebrations open up to georgette, organza and brocade. When in doubt, let the calendar decide before the colour chart does.",
        ],
      },
      {
        heading: "Weight and drape, explained",
        subs: [
          {
            heading: "Sheers (40–60 GSM)",
            paragraphs: [
              "Georgette, chiffon, organza. Breezy, translucent, fluid — ideal for dupattas, overlays and summer layers.",
            ],
          },
          {
            heading: "Mid-weights (60–100 GSM)",
            paragraphs: [
              "Chanderi, crepe, habutai silk. Structure with movement — the workhorse range for kurtas and suits.",
            ],
          },
          {
            heading: "Heavy weaves (100 GSM+)",
            paragraphs: [
              "Raw silk, dupion, brocade. Weight that holds pleats and shapes a garment — best for lehengas, shararas and statements.",
            ],
          },
        ],
      },
      {
        heading: "Colour against your skin tone",
        paragraphs: [
          "Test fabric near the face, in daylight. Warmer skin takes to earth tones and golds; cooler skin glows in jewel blues, pinks and pure whites. When buying online, hold a swatch from your wardrobe up to the screen for a rough match.",
        ],
      },
      {
        heading: "The metre math",
        paragraphs: [
          "Before you commit to a length, run the numbers through our fabric calculator — garment, measurements and grade in, yardage and cost out. It removes the guesswork (and the waste) from buying by the metre.",
        ],
      },
    ],
  },
];
