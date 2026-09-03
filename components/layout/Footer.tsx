"use client";

import { motion } from "framer-motion";
import { Wordmark } from "@/components/brand/Wordmark";
import { useStore } from "@/lib/store";
import type { DictKey } from "@/lib/i18n";
import { SHOP_CATEGORIES } from "@/lib/data/categories";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconFacebook,
  IconInstagram,
  IconPinterest,
  IconYouTube,
} from "@/components/ui/icons";

/*
  Section 22 — footer. 4 columns: brand + tagline, Shop, Company, Client
  Care. Bottom bar: copyright + social icons. Deep forest surface.
  The Shop column mirrors the real client taxonomy (lib/data/categories.ts).
  Phase 3 replaces links with Shopify collection/menu handles.
*/

const SHOP_LINKS: { labelKey: DictKey; href: string }[] = SHOP_CATEGORIES.map(
  (c) => ({ labelKey: c.labelKey, href: `/collections/${c.id}` }),
);

const COMPANY_LINKS: { labelKey: DictKey; href: string }[] = [
  { labelKey: "footer.company.story", href: "/our-story" },
  { labelKey: "footer.company.blogs", href: "/blogs" },
  { labelKey: "footer.company.stores", href: "/stores" },
  { labelKey: "footer.company.contact", href: "/contact" },
];

const CARE_LINKS: { labelKey: DictKey; href: string }[] = [
  { labelKey: "footer.care.faq", href: "/faq" },
  { labelKey: "footer.care.shipping", href: "/shipping-policy" },
  { labelKey: "footer.care.returns", href: "/returns-policy" },
  { labelKey: "footer.care.fabricCare", href: "/fabric-care" },
  { labelKey: "footer.care.privacy", href: "/privacy-policy" },
  { labelKey: "footer.care.terms", href: "/terms" },
];

const SOCIALS = [
  {
    label: "Instagram",
    icon: IconInstagram,
    href: "https://www.instagram.com/sarojensembleofficial/",
  },
  { label: "Facebook", icon: IconFacebook, href: "https://www.facebook.com/" },
  { label: "Pinterest", icon: IconPinterest, href: "https://in.pinterest.com/" },
  { label: "YouTube", icon: IconYouTube, href: "https://www.youtube.com/" },
];

export function Footer() {
  const { t } = useStore();

  return (
    <footer className="bg-hdr-footer text-cream">
      <div className="container-lux grid grid-cols-2 gap-x-8 gap-y-8 py-10 md:grid-cols-4 md:py-14">
        <Reveal delay={0} className="col-span-2 md:col-span-1">
          {/* Green logo on a transparent background — never on a white chip */}
          <div className="inline-block">
            <Wordmark />
          </div>
          <p className="mt-5 max-w-[15rem] text-[14px] leading-relaxed text-cream/85">
            {t("footer.tagline")}
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -4, scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="flex h-9 w-9 items-center justify-center border border-cream/25 text-cream transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <nav aria-label={t("footer.shop")}>
            <p className="eyebrow mb-5 text-brand-gold">{t("footer.shop")}</p>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-[14px] text-cream/85 transition-colors duration-300 hover:text-brand-gold"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <Reveal delay={0.16}>
          <nav aria-label={t("footer.company")}>
            <p className="eyebrow mb-5 text-brand-gold">{t("footer.company")}</p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-[14px] text-cream/85 transition-colors duration-300 hover:text-brand-gold"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <Reveal delay={0.24}>
          <nav aria-label={t("footer.care")}>
            <p className="eyebrow mb-5 text-brand-gold">{t("footer.care")}</p>
            <ul className="space-y-2.5">
              {CARE_LINKS.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-[14px] text-cream/85 transition-colors duration-300 hover:text-brand-gold"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-lux flex flex-col items-center justify-between gap-3 py-6 text-[12px] tracking-wide text-cream/70 md:flex-row">
          <p>{t("footer.rights")}</p>
          {/* StudioX404 — subtle developer credit, clickable */}
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cream/50">
            Coded by{" "}
            <a
              href="https://www.studiox404.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream transition-colors hover:text-brand-gold"
            >
              StudioX404
            </a>
          </p>
          <p className="uppercase tracking-[0.18em]">{t("footer.est")}</p>
        </div>
      </div>
    </footer>
  );
}
