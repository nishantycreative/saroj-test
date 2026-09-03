import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ReturnsView } from "@/components/sections/ReturnsView";

export const metadata: Metadata = {
  title: "Returns & Exchanges | Saroj Ensemble",
  description:
    "Learn about Saroj Ensemble's 14-day return policy, exchanges and fabric return conditions.",
  alternates: {
    canonical: "/returns-policy",
  },
};

export default function ReturnsPolicyPage() {
  return (
    <SiteChrome>
      <ReturnsView />
    </SiteChrome>
  );
}
