"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";

export interface SarojHeroProps {
  /** Path to the hero video, relative to /public. Default: /images/hero/hero-video.mp4 */
  videoSrc?: string;
  /** Line 1 of the headline. Default: "Made of Stories." */
  headlineLine1?: string;
  /** Line 2 of the headline. Default: "Worn as Memory." */
  headlineLine2?: string;
  /** CTA button label. Default: "Discover Your Fabric →" */
  ctaLabel?: string;
  /** CTA href. Default: "/collections" */
  ctaHref?: string;
  /** Total scroll input (px) to scrub full video. Default: 3200 */
  scrubDistance?: number;
}

const DEFAULT_VIDEO = "/images/hero/hero-video.mp4";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function SarojHero({
  videoSrc = DEFAULT_VIDEO,
  headlineLine1 = "Made of Stories.",
  headlineLine2 = "Worn as Memory.",
  ctaLabel = "Discover Your Fabric →",
  ctaHref = "/collections",
  scrubDistance = 3200,
}: SarojHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const { setHeroRevealed } = useStore();

  const [takeover, setTakeover] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let duration = 0;
    let rafId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let isSeeking = false;
    let pendingTime: number | null = null;
    let locked = false;
    let lockedScrollY = 0;
    let touchStartY = 0;
    let lastSeekTime = -1;
    let lastSeekTimeStamp = 0;
    let smoothMove = 0;

    /* Defensive reset — clear any stale body-lock / video state left over
       from a previous mount so the scrub always starts from a clean slate. */
    Object.assign(document.body.style, {
      position: "",
      top: "",
      left: "",
      right: "",
      width: "",
      overflow: "",
    });
    window.scrollTo(0, 0);

    /* Force a fresh load on every mount. After a previous scrub the browser
       may keep the element in an "ended" state with data cached; calling
       load() resets the internal state, re-fires loadeddata, and rewinds to
       frame 0 so scrubbing works on every visit. */
    video.load();
    video.currentTime = 0;

    targetProgress = 0;
    currentProgress = 0;

    const onLoadedData = () => {
      duration = video.duration || 0;
      if (reduceMotion) {
        video.currentTime = duration * 0.92;
        setTakeover(false);
        setHeadlineVisible(true);
        setCtaVisible(true);
        setHeroRevealed(true);
      }
    };
    video.addEventListener("loadeddata", onLoadedData);

    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        isSeeking = true;
        video.currentTime = t;
      }
    };
    video.addEventListener("seeked", onSeeked);

    function seekTo(t: number) {
      /* Skip asking the video for a time we've already requested this
         frame — prevents redundant, janky seeks on every RAF tick. */
      const now = performance.now();
      if (Math.abs(t - lastSeekTime) < 0.002 && now - lastSeekTimeStamp < 80) {
        return;
      }
      lastSeekTime = t;
      lastSeekTimeStamp = now;
      if (isSeeking) {
        pendingTime = t;
        return;
      }
      isSeeking = true;
      video!.currentTime = t;
    }

    function engageLock() {
      if (locked || typeof document === "undefined") return;
      locked = true;
      lockedScrollY = window.scrollY;
      const b = document.body.style;
      b.position = "fixed";
      b.top = `-${lockedScrollY}px`;
      b.left = "0";
      b.right = "0";
      b.width = "100%";
      setTakeover(true);
      setHeroRevealed(false);
    }

    function releaseLock() {
      if (!locked || typeof document === "undefined") return;
      locked = false;
      const y = lockedScrollY;
      const b = document.body.style;
      b.position = "";
      b.top = "";
      b.left = "";
      b.right = "";
      b.width = "";
      window.scrollTo(0, y);
      setHeroRevealed(true);
    }

    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      releaseLock();
      setTakeover(false);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafId);
    }

    if (!reduceMotion) engageLock();

    function addDelta(deltaY: number, divisor: number = scrubDistance) {
      targetProgress = clamp(targetProgress + deltaY / divisor, 0, 1);
      if (targetProgress > 0.001) {
        setHasScrolled(true);
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (finished) return;
      /* Aim: one wheel notch (~100px) ≈ 1/3 of the video → ~3 notches to
         scrub fully. Adjust this divisor to taste per site. */
      addDelta(e.deltaY, 300);
      e.preventDefault();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (finished) return;
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (finished) return;
      const y = e.touches[0]?.clientY ?? touchStartY;
      /* Touch gestures produce smaller pixel deltas than a desktop wheel
         flick, so use a tighter divisor for a natural, responsive scrub. */
      addDelta(touchStartY - y, 400);
      touchStartY = y;
      e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    const warmPlay = () => {
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {});
      }
    };
    video.addEventListener("canplay", warmPlay, { once: true });

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18;

      /* Unlock at the end — must run every frame, even when idle, so the
         page releases the moment the video completes. */
      if (currentProgress >= 0.99 && targetProgress >= 0.99) {
        finish();
        cancelAnimationFrame(rafId);
        return;
      }

      /* Once settled, stop emitting redundant video seeks but keep the
         loop alive so a fresh input re-engages immediately. */
      const deltaSince = Math.abs(targetProgress - currentProgress);
      const idle = deltaSince < 0.0004 && smoothMove < 0.0004;
      if (idle && !isSeeking) {
        rafId = requestAnimationFrame(frame);
        return;
      }

      if (duration > 0) {
        /* Quantize seeks to ~30fps so we never request the same video frame
           twice — dramatically smoother on mobile where seeking is costly. */
        const frameDur = 1 / 30;
        const targetTime = currentProgress * duration;
        const quantized = Math.round(targetTime / frameDur) * frameDur;
        seekTo(quantized);
      }

      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${1 + currentProgress * 0.06})`;
      }

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      setHeadlineVisible(currentProgress >= 0.6);
      setCtaVisible(currentProgress >= 0.8);

      smoothMove = deltaSince;
      rafId = requestAnimationFrame(frame);
    }

    if (!reduceMotion) rafId = requestAnimationFrame(frame);

    return () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("canplay", warmPlay);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafId);
      releaseLock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrubDistance]);

  return (
    <div
      ref={sectionRef}
      style={{
        position: takeover ? "fixed" : "relative",
        inset: takeover ? 0 : undefined,
        zIndex: takeover ? 200 : undefined,
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.60) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 8%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <AnimatePresence>
          {headlineVisible && (
            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 7vw, 96px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  textShadow:
                    "0 2px 6px rgba(0,0,0,0.55), 0 6px 28px rgba(0,0,0,0.5)",
                  margin: 0,
                }}
              >
                {headlineLine1}
                <br />
                {headlineLine2}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {ctaVisible && (
            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              style={{ marginTop: "clamp(20px, 3vh, 36px)" }}
            >
              <Button href={ctaHref} variant="forest" size="lg">
                {ctaLabel}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              left: "50%",
              bottom: "clamp(20px, 6vh, 48px)",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(10px, 1.4vw, 12px)",
              fontWeight: 600,
              letterSpacing: "0.3em",
              pointerEvents: "none",
            }}
          >
            <span>SCROLL TO SHOP</span>
            <svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              style={{
                animation: "saroj-hero-bounce 1.6s ease-in-out infinite",
              }}
            >
              <style>{`
                @keyframes saroj-hero-bounce {
                  0%, 100% { transform: translateY(0); opacity: 0.5; }
                  50% { transform: translateY(5px); opacity: 1; }
                }
              `}</style>
              <path
                d="M7 1 L7 17 M2 12 L7 17 L12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          ref={progressFillRef}
          style={{
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.95))",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
