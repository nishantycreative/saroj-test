"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useStaggerVariants } from "@/components/ui/Reveal";
import { IconInstagram } from "@/components/ui/icons";

/*
  Section 15 — LIVE Instagram feed: latest 6 posts from
  @sarojensembleofficial via /api/instagram (Instagram Graph API,
  server-side). No fabricated posts: when the API is not configured the
  section shows a clear notice. Posts open their real Instagram permalink.
*/

interface Post {
  id: string;
  caption: string | null;
  mediaUrl: string;
  permalink: string;
  thumbnailUrl: string | null;
  timestamp: string | null;
}

interface InstagramPayload {
  configured: boolean;
  missing?: string[];
  error?: string;
  posts?: Post[];
}

type FeedState =
  | { phase: "loading" }
  | { phase: "notConfigured"; missing: string[] }
  | { phase: "error" }
  | { phase: "empty" }
  | { phase: "ready"; posts: Post[] };

const INSTAGRAM_PROFILE = "https://www.instagram.com/sarojensembleofficial/";

export function UGCGrid() {
  const { t } = useStore();
  const [state, setState] = useState<FeedState>({ phase: "loading" });
  const { container, item } = useStaggerVariants(0.1, 16, 0.7, 0.97);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/instagram", { cache: "no-store" });
      const json = (await res.json()) as InstagramPayload;
      if (!json.configured) {
        setState({ phase: "notConfigured", missing: json.missing ?? [] });
        return;
      }
      if (json.error || !json.posts) {
        setState({ phase: "error" });
        return;
      }
      if (json.posts.length === 0) {
        setState({ phase: "empty" });
        return;
      }
      setState({ phase: "ready", posts: json.posts });
    } catch {
      setState({ phase: "error" });
    }
  }, []);

  useEffect(() => {
    /* async boundary: fetch after mount, not synchronously in the effect */
    const id = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(id);
  }, [load]);

  return (
    <section className="overflow-x-clip bg-forest">
      <div className="container-lux py-10 md:py-16">
        <SectionHeader
          eyebrow={t("instagram.eyebrow")}
          title={t("instagram.title")}
          accent={t("instagram.accent")}
          tone="onDark"
          action={
            <a
              href={INSTAGRAM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-cream/60 transition-colors hover:text-cream"
            >
              <IconInstagram className="h-4 w-4" />
              {t("instagram.follow")}
            </a>
          }
        />

        <div className="mt-6 md:mt-8">
          {state.phase === "loading" && (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse bg-cream/10"
                  aria-hidden
                />
              ))}
              <p className="sr-only">{t("instagram.loading")}</p>
            </div>
          )}

          {(state.phase === "notConfigured" ||
            state.phase === "error" ||
            state.phase === "empty") && (
            <div className="flex flex-col items-center gap-4 border border-dashed border-ink/15 bg-paper p-10 text-center">
              <IconInstagram className="h-8 w-8 text-gold" />
              {state.phase === "notConfigured" && (
                <>
                  <p className="serif text-xl font-bold text-ink">
                    {t("instagram.notConfigured.title")}
                  </p>
                  <p className="max-w-md text-[14px] leading-relaxed text-taupe">
                    {t("instagram.notConfigured.copy")}
                  </p>
                  <p className="rounded border border-ink/10 bg-bone px-3 py-2 font-mono text-[11px] text-taupe">
                    {state.missing.join(", ")}
                  </p>
                </>
              )}
              {state.phase === "error" && (
                <>
                  <p className="max-w-md text-[14px] text-taupe">
                    {t("instagram.notConfigured.copy")}
                  </p>
                  <button
                    onClick={() => {
                      setState({ phase: "loading" });
                      void load();
                    }}
                    className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold"
                  >
                    {t("reviews.errorRetry")}
                  </button>
                </>
              )}
              {state.phase === "empty" && (
                <p className="max-w-md text-[14px] leading-relaxed text-taupe">
                  {t("instagram.empty")}
                </p>
              )}
              <a
                href={INSTAGRAM_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold"
              >
                <IconInstagram className="h-4 w-4" />
                {t("instagram.follow")}
              </a>
            </div>
          )}

          {state.phase === "ready" && (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-6% 0px" }}
              className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3"
            >
              {state.posts.map((post) => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    post.caption
                      ? `${post.caption} — ${t("instagram.viewPost")}`
                      : t("instagram.viewPost")
                  }
                  variants={item}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative block aspect-square overflow-hidden bg-cream/10"
                >
                  {post.mediaUrl ? (
                    <Image
                      src={post.mediaUrl}
                      alt={post.caption ?? "Saroj Ensemble on Instagram"}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center bg-espresso/0 opacity-0 transition-all duration-[250ms] group-hover:bg-espresso/60 group-hover:opacity-100">
                    <IconInstagram className="h-8 w-8 text-cream" />
                  </div>
                  {post.caption && (
                    <div className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 h-1/2" />
                  )}
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
