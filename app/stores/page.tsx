import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { StoresView } from "@/components/sections/StoresView";

export const metadata: Metadata = {
  title: "Store Locator — Saroj Ensemble",
  description:
    "Five Saroj Ensemble stores across Mumbai — Ghatkopar, Nepean Sea Road, Thane, Goregaon and Juhu.",
};

export default function StoresPage() {
  return (
    <SiteChrome>
      <StoresView />
    </SiteChrome>
  );
}
