"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

/*
  Shared coupon-code block for the two promo popups — dashed mustard
  frame, code + copy button (clipboard API, toast on copy). If the
  clipboard is unavailable the code stays visible to type out.
*/

export function PromoCode({ code }: { code: string }) {
  const { t, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard unavailable — code remains visible to copy by hand */
    }
    setCopied(true);
    showToast(t("promo.copied"));
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex items-center justify-between gap-3 border border-dashed border-mustard bg-mustard/10 px-4 py-3">
      <span className="text-[15px] font-bold uppercase tracking-[0.22em] text-ink">
        {code}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={t("promo.copy")}
        className={`flex h-9 shrink-0 items-center justify-center border px-4 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
          copied
            ? "border-mustard bg-mustard text-espresso"
            : "border-ink/25 text-ink hover:border-mustard hover:bg-mustard hover:text-espresso"
        }`}
      >
        {copied ? t("promo.copied") : t("promo.copy")}
      </button>
    </div>
  );
}
