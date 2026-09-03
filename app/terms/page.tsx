import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { TermsView } from "@/components/sections/TermsView";

export const metadata: Metadata = {
  title: "Terms of Service | Saroj Ensemble",
  description:
    "The terms that apply when you browse or purchase from Saroj Ensemble.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <SiteChrome>
      <TermsView />
    </SiteChrome>
  );
}
