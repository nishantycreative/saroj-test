import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ShippingView } from "@/components/sections/ShippingView";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Saroj Ensemble",
  description:
    "Learn about Saroj Ensemble's 24-hour dispatch commitment, 7-day domestic delivery and international shipping to 200+ countries.",
  alternates: {
    canonical: "/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
  return (
    <SiteChrome>
      <ShippingView />
    </SiteChrome>
  );
}
