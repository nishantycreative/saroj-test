"use client";

import { useStore } from "@/lib/store";
import { GOOGLE_REVIEWS } from "@/lib/data/google-reviews";
import { SectionHeader } from "@/components/ui/SectionHeader";

/*
  Section 14 — Curated Google reviews, animated marquee.

  Pulls the 45 curated 5-star reviews from GOOGLE_REVIEWS (lib/data) and
  scrolls them in a continuous horizontal marquee (pure CSS, -50% loop,
  content duplicated for a seamless seam). Hover to pause for reading.

  Unlike the earlier live-API block, this works with no backend key: the
  reviews are real, scraped from the Ghatkopar Google Business listing
  and hand-curated (5 stars, >=100 chars, clean English, no Hindi).
*/

const GOOGLE_COLORS = {
  google: "#4285F4",
  green: "#34A853",
  yellow: "#FBBC05",
  red: "#EA4335",
};

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill={GOOGLE_COLORS.google} />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill={GOOGLE_COLORS.green} />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill={GOOGLE_COLORS.yellow} />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill={GOOGLE_COLORS.red} />
    </svg>
  );
}

/* Cap review text at 150 characters (curated set is already >=100). */
const MAX_TEXT = 150;
function clampText(text: string): string {
  if (text.length <= MAX_TEXT) return text;
  return `${text.slice(0, MAX_TEXT).trimEnd()}…`;
}

/* Seamless loop: the -50% translate must equal one duplicated group width,
   so render the full set twice and let the keyframe move by half the track. */
export function ReviewsMarquee() {
  const { t } = useStore();
  const reviews = GOOGLE_REVIEWS;
  const halfCount = reviews.length;

  return (
    <section className="overflow-hidden border-y border-ink/10 bg-white">
      <div className="container-lux py-8 md:py-14">
        <SectionHeader
          eyebrow={t("reviews.eyebrow")}
          title={t("reviews.title")}
          accent={t("reviews.accent")}
          action={
            <span className="hidden items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-taupe md:inline-flex">
              <span className="flex items-center gap-2">
                <GoogleLogo />
                {t("reviews.verified")}
              </span>
              <span aria-hidden className="text-ink/30">·</span>
              <a
                href="https://www.google.com/maps/place/Saroj+Ensemble+-+Goregaon/@19.1654723,72.8450236,18.25z/data=!3m1!5s0x3be7b651f5852e95:0x38f500cebc591b4d!4m8!3m7!1s0x3be7b70016f3eb23:0xfdacc5a4bf47a6ca!8m2!3d19.1638762!4d72.845737!9m1!1b1!16s%2Fg%2F11lnmxppxg?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4285F4] transition-colors hover:text-[#1a56c4]"
              >
                {t("reviews.readAll")} →
              </a>
            </span>
          }
        />
      </div>

      <div className="group relative pb-10 md:pb-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent md:w-24" />

        <div
          className="flex w-max items-stretch gap-5 px-5 will-change-transform group-hover:[animation-play-state:paused] md:gap-6 md:px-24"
          style={{ animation: `marquee ${Math.max(120, halfCount * 6)}s linear infinite` }}
        >
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex items-stretch gap-5 md:gap-6"
              aria-hidden={dup === 1}
            >
              {reviews.map((r) => (
                <figure
                  key={`${dup}-${r.id}`}
                  className="flex w-[18rem] shrink-0 flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-1 text-[#FBBC05]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                        <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15.9 4.7 17.6l1-5.8L1.5 7.7l5.9-.9z" />
                      </svg>
                    ))}
                    <span className="sr-only">{t("reviews.starRating", { n: 5 })}</span>
                  </div>
                  <blockquote className="text-[14px] leading-relaxed text-ink">
                    &ldquo;{clampText(r.text)}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-2 pt-1">
                    <GoogleLogo />
                    <span className="text-[12px] uppercase tracking-[0.14em] text-taupe">
                      {t("reviews.verified")}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
