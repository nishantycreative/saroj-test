"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { PromoCode } from "@/components/ui/PromoCode";
import { IMAGES } from "@/lib/data/images";
import { subscribeNewsletter } from "@/lib/newsletter";
import { useStore } from "@/lib/store";
import { IconCheck } from "@/components/ui/icons";

/*
  Newsletter popup — homepage only (mounted in app/page.tsx).

    - fires 15s after landing, unless dismissed/submitted
    - sessionStorage: never re-show in the same session after dismiss
    - localStorage: "seen" timestamp, 7-day expiry for returning visitors
    - 10% first-purchase offer → WELCOME10 code on signup
    - email goes to /api/newsletter (Klaviyo seam); if the provider is not
      configured, the code still shows but we don't claim a subscription
      happened (successFallback copy).
*/

const NL_COUPON = "WELCOME10";
const DELAY_MS = 15_000;
const SEEN_KEY = "saroj_nl_seen_v1";
const SESSION_KEY = "saroj_nl_session_v1";
const SEEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function isSessionDismissed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function isRecentlySeen(): boolean {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return false;
    const stamp = Number(raw);
    return Number.isFinite(stamp) && Date.now() - stamp < SEEN_TTL_MS;
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
    localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch {
    /* private mode — the popup may re-appear next load */
  }
}

export function NewsletterPopup() {
  const { t } = useStore();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"form" | "code">("form");
  const [configured, setConfigured] = useState(true);

  /* Pure timed trigger: 15s after the page finishes loading —
     skipped when dismissed this session or seen within 7 days */
  useEffect(() => {
    if (isSessionDismissed() || isRecentlySeen()) return;
    let timer: number | undefined;
    const start = () => {
      timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    };
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", start);
    };
  }, []);

  const close = useCallback(() => {
    markSeen();
    setOpen(false);
  }, []);

  const submit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      const value = email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError(t("newsletter.err"));
        return;
      }
      setError(null);
      const result = await subscribeNewsletter(value);
      setConfigured(result.configured);
      markSeen();
      setPhase("code");
    },
    [email, t],
  );

  return (
    <Modal open={open} onClose={close} titleId="nlpop-title" panelClass="max-w-2xl overflow-hidden">
      <div className="grid md:grid-cols-[2fr_3fr]">
        {/* ---------- imagery side ---------- */}
        <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[26rem]">
          {/* TODO_CLIENT_IMAGE: atelier/fabric campaign photo */}
          <Image
            src={IMAGES.storyBoutique}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="scrim-bottom absolute inset-x-0 bottom-0 h-1/2" />
          <p className="eyebrow absolute bottom-5 start-5 text-brand-gold">
            Saroj Ensemble
          </p>
        </div>

        {/* ---------- content ---------- */}
        <div className="p-7 md:p-9">
          {phase === "form" ? (
            <>
              <p className="eyebrow text-forest">{t("nlPop.eyebrow")}</p>
              <h2
                id="nlpop-title"
                className="serif mt-3 text-3xl font-black uppercase leading-[1.05] tracking-[-0.01em] text-ink"
              >
                {t("nlPop.title")}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-taupe">
                {t("nlPop.sub")}
              </p>
              <form onSubmit={submit} noValidate className="mt-6">
                <label htmlFor="nlpop-email" className="sr-only">
                  {t("newsletter.emailLabel")}
                </label>
                <input
                  id="nlpop-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={t("newsletter.placeholder")}
                  aria-invalid={Boolean(error)}
                  className="h-12 w-full border border-ink/20 bg-paper px-4 text-[14px] text-ink placeholder:text-taupe-light focus:border-forest focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-3 h-12 w-full bg-mustard text-[12px] font-bold uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:bg-gold"
                >
                  {t("nlPop.cta")}
                </button>
              </form>
              {error && <p className="mt-2.5 text-[12px] text-coral">{error}</p>}
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-taupe-light">
                {t("nlPop.note")}
              </p>
            </>
          ) : (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-forest text-forest">
                <IconCheck className="h-5 w-5" />
              </span>
              <h2
                id="nlpop-title"
                className="serif mt-4 text-3xl font-black uppercase leading-[1.05] tracking-[-0.01em] text-ink"
              >
                {t("nlPop.successTitle")}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-taupe">
                {configured
                  ? t("nlPop.successCopy", { code: NL_COUPON })
                  : t("nlPop.successFallback", { code: NL_COUPON })}
              </p>
              <div className="mt-5">
                <PromoCode code={NL_COUPON} />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-taupe-light">
                {t("nlPop.validity")}
              </p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
