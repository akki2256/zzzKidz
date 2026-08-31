import { PulseStubPage } from "@/components/pulse-layout/pulse-stub-page";
import { aboutFeatureImage } from "@/content/media";

export function PulseAboutPage() {
  return (
    <PulseStubPage
      title="About"
      description="Not just exercise — movement education. Triple Z Kids Move Lab brings fitness, coaching and curriculum into schools as one managed programme."
      image={aboutFeatureImage}
    />
  );
}
