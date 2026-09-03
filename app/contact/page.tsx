import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ContactView } from "@/components/sections/ContactView";

export const metadata: Metadata = {
  title: "Contact — Saroj Ensemble",
  description:
    "Questions, custom orders or a fitting — talk to the Saroj Ensemble atelier.",
};

export default function ContactPage() {
  return (
    <SiteChrome>
      <ContactView />
    </SiteChrome>
  );
}
