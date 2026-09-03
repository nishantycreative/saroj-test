"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { IconCheck } from "@/components/ui/icons";
import { EASE_LUX } from "@/components/ui/Reveal";

export function Toast() {
  const { toast } = useStore();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: EASE_LUX }}
          className="fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-3 bg-espresso px-6 py-4 text-sm text-cream shadow-lux"
          role="status"
        >
          <IconCheck className="h-4 w-4 text-gold" />
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
