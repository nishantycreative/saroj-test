"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/Reveal";
import { STORE_CONTACT, STORES } from "@/lib/data/stores";
import { IconInstagram, IconFacebook, IconPinterest, IconYouTube } from "@/components/ui/icons";

const SOCIALS = [
  { label: "Instagram", icon: IconInstagram, href: "https://www.instagram.com/sarojensembleofficial/" },
  { label: "Facebook", icon: IconFacebook, href: "https://www.facebook.com/" },
  { label: "Pinterest", icon: IconPinterest, href: "https://in.pinterest.com/" },
  { label: "YouTube", icon: IconYouTube, href: "https://www.youtube.com/" },
];

export function ContactView() {
  const { t, showToast } = useStore();
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast(t("contact.sent"));
  };

  const inputCls =
    "mt-2 h-12 w-full border border-ink/15 bg-paper px-4 text-[14px] text-ink placeholder:text-taupe-light focus:border-forest focus:outline-none";

  return (
    <main className="min-h-screen bg-white">
      <div className="container-lux grid gap-10 py-10 md:grid-cols-[1.1fr_1fr] md:py-16">
        {/* ---------- form ---------- */}
        <Reveal>
          <section>
            <p className="eyebrow text-gold">Saroj Ensemble</p>
            <h1 className="serif mt-3 text-4xl font-black uppercase tracking-[-0.01em] text-ink md:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="mt-3 text-[15px] text-taupe">{t("contact.sub")}</p>

            <form onSubmit={submit} noValidate className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="text-[11px] font-bold uppercase tracking-[0.18em] text-taupe">
                    {t("contact.name")}
                  </label>
                  <input id="c-name" required placeholder={t("contact.namePh")} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="c-email" className="text-[11px] font-bold uppercase tracking-[0.18em] text-taupe">
                    {t("contact.email")}
                  </label>
                  <input id="c-email" type="email" required placeholder={t("contact.emailPh")} className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="c-subject" className="text-[11px] font-bold uppercase tracking-[0.18em] text-taupe">
                  {t("contact.subject")}
                </label>
                <input id="c-subject" placeholder={t("contact.subjectPh")} className={inputCls} />
              </div>
              <div>
                <label htmlFor="c-message" className="text-[11px] font-bold uppercase tracking-[0.18em] text-taupe">
                  {t("contact.message")}
                </label>
                <textarea
                  id="c-message"
                  rows={5}
                  required
                  placeholder={t("contact.messagePh")}
                  className="mt-2 w-full resize-none border border-ink/15 bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-taupe-light focus:border-forest focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-13 items-center gap-3 bg-forest px-9 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-forest-deep"
              >
                {t("contact.send")}
              </button>
              {sent && (
                <p className="text-[13px] text-forest">{t("contact.sent")}</p>
              )}
            </form>
          </section>
        </Reveal>

        {/* ---------- info ---------- */}
        <Reveal delay={0.15}>
          <aside className="space-y-6 border border-line bg-paper p-7 md:p-9">
            <div>
              <p className="eyebrow text-gold">{t("contact.emailUs")}</p>
              <a
                href={`mailto:${STORE_CONTACT.email}`}
                className="mt-2 block text-[15px] font-medium text-ink underline-offset-4 hover:underline"
              >
                {STORE_CONTACT.email}
              </a>
            </div>
            <div>
              <p className="eyebrow text-gold">{t("contact.phone")}</p>
              <a
                href={`tel:${STORE_CONTACT.phone.replace(/\s/g, "")}`}
                className="mt-2 block text-[15px] font-medium text-ink underline-offset-4 hover:underline"
              >
                {STORE_CONTACT.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow text-gold">{t("contact.visit")}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-taupe">
                {STORES[0].neighbourhood}
              </p>
              <p className="mt-1 text-[14px] leading-relaxed text-taupe">
                {STORES[0].address}
              </p>
              <p className="mt-2 text-[13px] text-taupe-light">{STORES[0].hours}</p>
            </div>
            <div>
              <p className="eyebrow text-gold">Social</p>
              <div className="mt-3 flex gap-3">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center border border-ink/20 text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </main>
  );
}
