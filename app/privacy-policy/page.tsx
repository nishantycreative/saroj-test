import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PrivacyView } from "@/components/sections/PrivacyView";

export const metadata: Metadata = {
  title: "Privacy Policy | Saroj Ensemble",
  description:
    "How Saroj Ensemble collects, uses and protects your personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <SiteChrome>
      <PrivacyView />
    </SiteChrome>
  );
}
