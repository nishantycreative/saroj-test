"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FLAT_LINKS, MEGA_CATEGORIES } from "@/lib/data/nav";
import { useStore } from "@/lib/store";
import { CURRENCIES } from "@/lib/format";
import { Drawer } from "@/components/ui/Drawer";
import { EASE_LUX } from "@/components/ui/Reveal";
import { IconChevron } from "@/components/ui/icons";

/*
  Mobile navigation — the mega menu becomes a full-screen drawer with
  accordion categories. Language/currency selectors stay in English.
*/

export function MobileMenu() {
  const { drawer, closeDrawer, lang, setLang, currency, setCurrency, t, locales } =
    useStore();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Drawer
      open={drawer === "menu"}
      onClose={closeDrawer}
      title={t("common.menu")}
      side="left"
    >
      <div className="space-y-1">
        {MEGA_CATEGORIES.map((cat) => {
          const open = openId === cat.id;
          const hasSubs = (cat.subCategories?.length ?? 0) > 0;
          return (
            <div key={cat.id} className="border-b border-line/70 pb-1">
              <div className="flex items-center">
                {/* Label always navigates to the collection page */}
                <Link
                  href={`/collections/${cat.id}`}
                  onClick={closeDrawer}
                  className="flex-1 py-3 text-start text-[15px] font-medium text-ink transition-colors hover:text-forest"
                >
                  {t(cat.labelKey)}
                </Link>

                {/* Chevron (subcategory categories only) toggles the accordion */}
                {hasSubs && (
                  <button
                    onClick={() => setOpenId(open ? null : cat.id)}
                    className="p-3 text-gold transition-colors hover:text-bronze"
                    aria-expanded={open}
                    aria-label={t("nav.mega.toggleSubcats", {
                      cat: t(cat.labelKey),
                    })}
                  >
                    <IconChevron
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
              <AnimatePresence initial={false}>
                {open && hasSubs && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_LUX }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 pb-4">
                      {cat.subCategories?.map((sub) => (
                        <div key={sub.id}>
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                            {t(sub.labelKey)}
                          </p>
                          <ul className="grid grid-cols-2 gap-x-4">
                            {sub.fabrics.map((fabric) => (
                              <li key={fabric}>
                                <Link
                                  href={`/collections/fabrics?type=${sub.id}`}
                                  onClick={closeDrawer}
                                  className="block py-1 text-[13px] text-taupe transition-colors hover:text-ink"
                                >
                                  {fabric}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <div className="flex flex-wrap gap-x-6 gap-y-2 py-4">
          {FLAT_LINKS.map((link) => (
            <a
              key={link.labelKey}
              href={link.href}
              onClick={closeDrawer}
              className="text-[13px] font-medium uppercase tracking-[0.14em] text-taupe transition-colors hover:text-ink"
            >
              {t(link.labelKey)}
            </a>
          ))}
        </div>

        <div className="border-t border-line pt-4">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-taupe-light">
            {t("common.languageCurrency")}
          </p>
          <div className="flex flex-wrap gap-2">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                className={`px-3 py-1.5 text-[12px] uppercase tracking-[0.12em] transition-colors ${
                  lang === l.code
                    ? "bg-gold text-espresso"
                    : "border border-line text-taupe hover:text-ink"
                }`}
              >
                {l.code}
              </button>
            ))}
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                aria-pressed={currency === c.code}
                className={`px-3 py-1.5 text-[12px] tracking-[0.08em] transition-colors ${
                  currency === c.code
                    ? "bg-gold text-espresso"
                    : "border border-line text-taupe hover:text-ink"
                }`}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
