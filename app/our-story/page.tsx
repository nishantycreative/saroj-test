import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { OurStoryView } from "@/components/sections/OurStoryView";

export const metadata: Metadata = {
  title: "Our Story | Saroj Ensemble",
  description:
    "Discover the story of Saroj Ensemble — from a small 800 sq. ft. store in South Mumbai in 2000 to a 20,000 sq. ft. fabric destination serving customers in India and around the world.",
  alternates: {
    canonical: "/our-story",
  },
};

export default function OurStoryPage() {
  return (
    <SiteChrome>
      <OurStoryView />
    </SiteChrome>
  );
}
