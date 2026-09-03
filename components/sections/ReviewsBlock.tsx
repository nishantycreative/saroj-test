"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_LUX, SPRING_SOFT, useEntrance } from "@/components/ui/Reveal";
import { IconStar } from "@/components/ui/icons";

/*
  Section 14 — LIVE Google reviews.

  Fetches /api/reviews (Google Places API, server-side). Filtering happens
  server-side: 5 stars + 50+ characters + max 5. No fabricated reviews:
  when the API is not configured this section shows a clear notice.

  Switching Goregaon → Juhu = GOOGLE_PLACE_ID env var (or lib/data/google.ts);
  this component needs no changes.
*/

interface ReviewOut {
  id: string;
  name: string;
  initials: string;
  text: string;
  stars: number;
  relativeTime: string | null;
}

interface ReviewsPayload {
  configured: boolean;
  missing?: string[];
  error?: string;
  place?: { name: string; rating: number | null; total: number | null };
  reviews?: ReviewOut[];
}

type ReviewsState =
  | { phase: "loading" }
  | { phase: "notConfigured"; missing: string[] }
  | { phase: "error" }
  | { phase: "empty"; place: ReviewsPayload["place"] }
  | { phase: "ready"; place: ReviewsPayload["place"]; reviews: ReviewOut[] };

const ROTATE_MS = 6000;

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${n} / 5`}
    >
      {Array.from({ length: n }).map((_, i) => (
        <IconStar key={i} className="h-3.5 w-3.5 text-[#FBBC05]" />
      ))}
    </span>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export function ReviewsBlock() {
  const { t } = useStore();
  const [state, setState] = useState<ReviewsState>({ phase: "loading" });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews", { cache: "no-store" });
      const json = (await res.json()) as ReviewsPayload;
      if (!json.configured) {
        setState({ phase: "notConfigured", missing: json.missing ?? [] });
        return;
      }
      if (json.error || !json.reviews) {
        setState({ phase: "error" });
        return;
      }
      if (json.reviews.length === 0) {
        setState({ phase: "empty", place: json.place });
        return;
      }
      setState({ phase: "ready", place: json.place, reviews: json.reviews });
      setIndex(0);
    } catch {
      setState({ phase: "error" });
    }
  }, []);

  useEffect(() => {
    /* async boundary: fetch after mount, not synchronously in the effect */
    const id = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(id);
  }, [load]);

  const reviews = state.phase === "ready" ? state.reviews : [];
  const hasPlace =
    state.phase === "ready" || state.phase === "empty"
      ? state.place
      : undefined;
  const rating = hasPlace?.rating ?? null;
  const total = hasPlace?.total ?? null;

  useEffect(() => {
    if (paused || state.phase !== "ready" || reviews.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % reviews.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, state.phase, reviews.length]);

  const review = reviews[Math.min(index, reviews.length - 1)];
  const badgeEntrance = useEntrance({ y: 24 });
  const reviewEntrance = useEntrance({ delay: 0.12, y: 24 });

  return (
    <section className="border-y border-ink/10 bg-white">
      <div className="container-lux py-8 md:py-14">
        <SectionHeader
          eyebrow={t("reviews.eyebrow")}
          title={t("reviews.title")}
          accent={t("reviews.accent")}
        />

        <div className="mt-6 grid items-start gap-8 md:mt-8 md:grid-cols-[1fr_2fr] md:gap-12">
          {/* ---------- Google badge ---------- */}
          <motion.div {...badgeEntrance}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={SPRING_SOFT}
              className="flex flex-col items-center gap-3 border border-ink/10 bg-white p-8 text-center shadow-sm md:items-start md:text-start"
            >
            <div className="flex items-center gap-2.5">
              <GoogleLogo />
              <span className="text-[14px] font-medium text-ink">Reviews</span>
            </div>

            {state.phase === "loading" && (
              <p className="py-6 text-[13px] text-taupe">{t("reviews.loading")}</p>
            )}

            {rating !== null && (
              <>
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 160, damping: 15 }}
                  className="serif text-6xl font-black text-ink"
                >
                  {rating.toFixed(1)}
                </motion.p>
                <Stars n={5} />
                {total !== null && (
                  <p className="text-[13px] text-taupe">
                    {t("reviews.basedOn", { n: total })}
                  </p>
                )}
                <a
                  href="https://maps.google.com/?q=Saroj+Ensemble+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[#4285F4] transition-colors hover:text-[#1a56c4]"
                >
                  {t("reviews.readAll")}
                </a>
              </>
            )}

            {state.phase === "notConfigured" && (
              <div className="mt-2 text-left">
                <p className="text-[14px] font-semibold text-ink">
                  {t("reviews.notConfigured.title")}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-taupe">
                  {t("reviews.notConfigured.copy")}
                </p>
                <p className="mt-3 rounded border border-ink/10 bg-bone px-3 py-2 font-mono text-[11px] text-taupe">
                  {state.missing.join(", ")}
                </p>
              </div>
            )}
            </motion.div>
          </motion.div>

          {/* ---------- Rotating live review ---------- */}
          <motion.div {...reviewEntrance}>
          <div
            className="relative min-h-[16rem] md:min-h-[13rem]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {state.phase === "loading" && (
              <div className="flex h-full items-center justify-center">
                <p className="text-[14px] text-taupe">{t("reviews.loading")}</p>
              </div>
            )}

            {state.phase === "notConfigured" && (
              <div className="flex h-full flex-col items-center justify-center gap-4 border border-dashed border-ink/15 p-8 text-center">
                <GoogleLogo />
                <p className="max-w-md text-[14px] leading-relaxed text-taupe">
                  {t("reviews.notConfigured.copy")}
                </p>
                <p className="rounded border border-ink/10 bg-bone px-3 py-2 font-mono text-[11px] text-taupe">
                  {state.missing.join(", ")}
                </p>
              </div>
            )}

            {state.phase === "error" && (
              <div className="flex h-full flex-col items-center justify-center gap-4 border border-dashed border-ink/15 p-8 text-center">
                <p className="text-[14px] text-taupe">{t("reviews.error")}</p>
                <button
                  onClick={() => {
                    setState({ phase: "loading" });
                    void load();
                  }}
                  className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#4285F4]"
                >
                  {t("reviews.errorRetry")}
                </button>
              </div>
            )}

            {state.phase === "empty" && (
              <div className="flex h-full flex-col items-center justify-center gap-4 border border-dashed border-ink/15 p-8 text-center">
                <GoogleLogo />
                <p className="max-w-md text-[14px] leading-relaxed text-taupe">
                  {t("reviews.empty")}
                </p>
              </div>
            )}

            {state.phase === "ready" && review && (
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.6, ease: EASE_LUX }}
                  className="flex h-full flex-col justify-between gap-6"
                >
                  <div>
                    <Stars n={review.stars} />
                    <p className="serif mt-4 text-xl leading-relaxed text-ink md:text-[1.45rem]">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 border-t border-line pt-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4285F4] text-[12px] font-medium tracking-wide text-white">
                      {review.initials}
                    </span>
                    <div>
                      <p className="text-[14px] font-medium text-ink">
                        {review.name}
                      </p>
                      <p className="flex items-center gap-1 text-[12px] text-taupe">
                        {review.relativeTime && (
                          <span>{review.relativeTime} · </span>
                        )}
                        <span>{t("reviews.verified")}</span>
                      </p>
                    </div>
                  </div>
                </motion.blockquote>
              </AnimatePresence>
            )}

            {state.phase === "ready" && reviews.length > 1 && (
              <div className="mt-6 flex items-center gap-2">
                {reviews.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => setIndex(i)}
                    aria-label={`Review ${i + 1}`}
                    className="group flex h-4 items-center"
                  >
                    <span
                      className={`block h-px transition-all duration-500 ${
                        i === index
                          ? "w-7 bg-[#4285F4]"
                          : "w-4 bg-ink/25 group-hover:bg-ink/45"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
