"use client";


import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { STORES } from "@/lib/data/stores";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/*
  Store detail — full address, closing time, phone/WhatsApp CTAs, rating
  badge and an embedded Google Map. Full daily schedules are a TODO
  (pull from each Google Business listing).
*/

export function StoreDetailView({ slug }: { slug: string }) {
  const { t } = useStore();
  const router = useRouter();
  const [state, setState] = useState<"idle" | "fallback">("idle");
  const store = STORES.find((s) => s.slug === slug);

  if (!store) return null;

  const waHref = (phone: string) =>
    `https://wa.me/+91${phone.replace(/\s/g, "")}`;

  return (
    <main className="min-h-screen bg-white">
      {/* breadcrumb */}
      <nav className="border-b border-line" aria-label="Breadcrumb">
        <div className="container-lux flex items-center gap-2 py-3 text-[12px] text-taupe">
          <Link href="/" className="transition-colors hover:text-ink">
            {t("breadcrumb.home")}
          </Link>
          <span aria-hidden>·</span>
          <Link href="/stores" className="transition-colors hover:text-ink">
            {t("stores.viewAll")}
          </Link>
          <span aria-hidden>·</span>
          <span className="text-taupe-light">{store.neighbourhood}</span>
        </div>
      </nav>

      <div className="container-lux grid gap-10 py-8 md:grid-cols-[1.1fr_1fr] md:py-14">
        {/* ---------- info ---------- */}
        <Reveal>
          <div>
            <h1 className="serif mt-3 text-4xl font-black uppercase tracking-[-0.01em] text-ink md:text-5xl">
              {store.neighbourhood}
            </h1>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 border-b border-line pb-4">
                <span className="eyebrow w-24 shrink-0 pt-1 text-gold">
                  {t("stores.hours")}
                </span>
                <p className="text-[14px] text-ink">{store.hours}</p>
              </div>
              <div className="flex items-start gap-3 border-b border-line pb-4">
                <span className="eyebrow w-24 shrink-0 pt-1 text-gold">
                  {t("stores.days")}
                </span>
                <p className="inline-flex items-center gap-2 text-[14px] text-ink">
                  <span className="flex h-2 w-2 rounded-full bg-forest" aria-hidden="true" />
                  {t("stores.allDays")}
                </p>
              </div>
              <div className="flex items-start gap-3 border-b border-line pb-4">
                <span className="eyebrow w-24 shrink-0 pt-1 text-gold">
                  {t("contact.visit")}
                </span>
                <p className="text-[14px] leading-relaxed text-taupe">
                  {store.address}
                </p>
              </div>
              {store.rating !== undefined && (
                <div className="flex items-start gap-3 border-b border-line pb-4">
                  <span className="eyebrow w-24 shrink-0 pt-1 text-gold">★</span>
                  <p className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink">
                    <span className="text-gold">{store.rating}</span>
                    {t("stores.reviews", { n: store.reviewCount ?? 0 })}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {store.phone && (
                <a
                  href={`tel:${store.phone.replace(/\s/g, "")}`}
                  className="inline-flex h-12 items-center gap-2 border border-ink px-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-cream"
                >
                  {t("stores.call")} · {store.phone}
                </a>
              )}
              {store.whatsapp && (
                <a
                  href={waHref(store.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 bg-forest px-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-forest-deep"
                >
                  {t("stores.whatsapp")}
                </a>
              )}
              <a
                href={store.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 bg-gold px-6 text-[12px] font-bold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-gold-light"
              >
                {t("stores.directions")}
                <IconArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* ---------- image + map ---------- */}
        <Reveal delay={0.12}>
          <div className="space-y-5">
            <div className="relative aspect-[16/10] overflow-hidden bg-bone">
              {/* TODO_CLIENT_IMAGE: real store photography */}
              <Image
                src={IMAGES[store.image]}
                alt={`${store.neighbourhood} store`}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            {state === "fallback" ? (
              <div className="flex aspect-[16/10] items-center justify-center border border-line bg-paper">
                <p className="max-w-[16rem] text-center text-[13px] text-taupe">
                  {store.address}
                </p>
              </div>
            ) : (
              <iframe
                title={`${store.neighbourhood} map`}
                src={store.embedUrl}
                className="h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onError={() => setState("fallback")}
              />
            )}
          </div>
        </Reveal>
      </div>

      {/* back to all stores */}
      <div className="border-t border-line">
        <div className="container-lux py-6">
          <button
            onClick={() => router.push("/stores")}
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-taupe transition-colors hover:text-ink"
          >
            <IconArrowRight className="h-3.5 w-3.5 rotate-180 rtl:rotate-0" />
            {t("stores.viewAll")}
          </button>
        </div>
      </div>
    </main>
  );
}
