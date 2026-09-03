import { IMAGES } from "@/lib/data/images";
import type { DictKey } from "@/lib/i18n";

export interface HeroSlide {
  id: string;
  image: keyof typeof IMAGES;
  /** descriptive alt text — accessibility + image SEO */
  alt: string;
  /** "dark" = light text over a deep image; "light" = ink text over a cream image */
  tone: "dark" | "light";
  eyebrowKey: DictKey;
  titleKey: DictKey;
  subKey: DictKey;
  cta: { labelKey: DictKey; href: string };
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "s1",
    image: "bannerHero",
    alt: "Woman in handwoven gold silk saree by Saroj Ensemble",
    tone: "dark",
    eyebrowKey: "hero.s1.eyebrow",
    titleKey: "hero.s1.title",
    subKey: "hero.s1.sub",
    cta: { labelKey: "hero.s1.cta", href: "/collections/new-arrival" },
  },
  {
    id: "s2",
    image: "bannerFabrics",
    alt: "Stack of handwoven silk, chanderi and cotton fabrics at Saroj Ensemble",
    tone: "light",
    eyebrowKey: "hero.s2.eyebrow",
    titleKey: "hero.s2.title",
    subKey: "hero.s2.sub",
    cta: { labelKey: "hero.s2.cta", href: "/collections/fabrics" },
  },
  // TODO_CLIENT_IMAGE: add hero slide 3 here — the carousel auto-adapts to any array length
];