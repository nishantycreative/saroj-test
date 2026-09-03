import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { BlogsView } from "@/components/sections/BlogsView";

export const metadata: Metadata = {
  title: "Blogs — Saroj Ensemble",
  description:
    "Fabric care guides, seasonal styling advice and buyer's guides from the Saroj Ensemble atelier.",
};

export default function BlogsPage() {
  return (
    <SiteChrome>
      <BlogsView />
    </SiteChrome>
  );
}
