import { CtaBand } from "@/components/shared/cta-band";
import { ChallengeSection } from "@/components/sections/challenge-section";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandPulseStrip } from "@/components/sections/brand-pulse-strip";
import { ProcessBenefitsSection } from "@/components/sections/process-benefits-section";
import { ProgramsPreviewSection } from "@/components/sections/programs-preview-section";
import { GalleryPreviewSection } from "@/components/sections/gallery-preview-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { WhyUsHomeSection } from "@/components/sections/why-us-home-section";

export function OriginalHomePage() {
  return (
    <>
      <HeroSection />
      <BrandPulseStrip />
      <ChallengeSection />
      <SolutionSection />
      <ProgramsPreviewSection />
      <ProcessBenefitsSection />
      <GalleryPreviewSection />
      <WhyUsHomeSection />
      <CtaBand />
    </>
  );
}
