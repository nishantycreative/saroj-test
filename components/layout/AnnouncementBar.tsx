"use client";

import { useStore } from "@/lib/store";

/*
  Permanent announcement bar — always visible, not dismissible, no close
  button, no dismissal state. Copy is fully localized via the dictionary.
*/

export function AnnouncementBar() {
  const { t } = useStore();

  return (
    <div className="border-b border-hdr-ivory/10 bg-black">
      <div className="container-lux flex h-10 items-center justify-center">
        <p className="truncate text-center text-[12px] font-medium tracking-[0.08em] text-brand-gold">
          {t("announcement.text")}
        </p>
      </div>
    </div>
  );
}
