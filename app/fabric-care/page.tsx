import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { FabricCareView } from "@/components/sections/FabricCareView";

export const metadata: Metadata = {
  title: "Fabric Care Guide | Saroj Ensemble",
  description:
    "Learn how to wash, dry, press, store and care for your Saroj Ensemble fabrics.",
  alternates: {
    canonical: "/fabric-care",
  },
};

export default function FabricCarePage() {
  return (
    <SiteChrome>
      <FabricCareView />
    </SiteChrome>
  );
}
