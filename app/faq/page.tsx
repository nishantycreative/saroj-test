import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { FaqPageView } from "@/components/sections/FaqPageView";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Saroj Ensemble",
  description:
    "Find answers about Saroj Ensemble fabrics, orders, shipping, returns, international delivery and fabric care.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <SiteChrome>
      <FaqPageView />
    </SiteChrome>
  );
}
