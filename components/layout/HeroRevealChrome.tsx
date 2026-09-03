"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { EASE_LUX } from "@/components/ui/Reveal";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";

/*
  Site chrome (announcement bar + sticky header) gated behind the homepage
  hero's reveal.

  On a server-rendered home page the hero is a full-viewport, scroll-locked
  takeover — nothing else should be on screen while the door-opening video
  scrubs. So this wrapper renders nothing until `heroRevealed` flips true
  (the moment the hero's scroll-lock releases), then fades/slides the
  announcement bar and header in.
*/

export function HeroRevealChrome() {
  const { heroRevealed } = useStore();

  return (
    <AnimatePresence>
      {heroRevealed && (
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_LUX }}
        >
          <AnnouncementBar />
          <Header />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
