"use client";

import { useStore } from "@/lib/store";

/*
  Ticker band — continuous horizontal marquee below the hero.
  Pure CSS animation (translateX -50% loop); content duplicated for the seam.
  White band in the dark-green/white homepage rhythm.
*/

const PHRASE_KEYS = [
  "ticker.1",
  "ticker.2",
  "ticker.3",
  "ticker.4",
  "ticker.5",
  "ticker.6",
  "ticker.7",
] as const;

export function TickerMarquee() {
  const { t } = useStore();

  return (
    <div className="group overflow-hidden border-b border-ink/10 bg-white py-3.5">
      <div
        className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
        style={{ animation: "marquee 32s linear infinite" }}
        aria-hidden
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-10">
            {PHRASE_KEYS.map((key) => (
              <span
                key={`${dup}-${key}`}
                className="flex items-center gap-10 text-[12px] font-semibold uppercase tracking-[0.22em] text-forest"
              >
                {t(key)}
                <span className="text-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">{PHRASE_KEYS.map((k) => t(k)).join(" · ")}</span>
    </div>
  );
}
