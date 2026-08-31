import type { Metadata } from "next";
import { ActiveHomePage } from "@/components/active-layout/active-home-page";
import { OriginalHomePage } from "@/components/original-layout/original-home-page";
import { PulseHomePage } from "@/components/pulse-layout/pulse-home-page";
import { StudioHomePage } from "@/components/studio-layout/studio-home-page";
import { MultiLayoutPage } from "@/components/theme/multi-layout-page";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "School Fitness & Movement Labs",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <MultiLayoutPage
      original={<OriginalHomePage />}
      studio={<StudioHomePage />}
      active={<ActiveHomePage />}
      pulse={<PulseHomePage />}
    />
  );
}
