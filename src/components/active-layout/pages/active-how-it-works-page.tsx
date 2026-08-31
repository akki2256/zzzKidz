import { ActiveFinalCta } from "@/components/active-layout/active-cta";
import { ActiveItemGrid, ActiveSection } from "@/components/active-layout/active-blocks";
import { ActivePageHero } from "@/components/active-layout/active-page-hero";
import { heroSlides } from "@/content/media";
import { approachPillars, processSteps } from "@/content/site";

const steps = processSteps.map((step) => ({
  title: step.title,
  description: step.points.join(" "),
}));

export function ActiveHowItWorksPage() {
  return (
    <>
      <ActivePageHero
        eyebrow="Getting Started"
        title="A complete, end-to-end solution"
        description="From planning to progress — we stay with you at every step."
        image={heroSlides[2] ?? heroSlides[0]}
      />
      <ActiveSection tone="white" eyebrow="The Process" heading="Every step covered">
        <ActiveItemGrid items={steps} columns={4} />
      </ActiveSection>
      <ActiveSection tone="mint" eyebrow="Our Approach" heading="How we make it easy">
        <ActiveItemGrid items={approachPillars} columns={5} />
      </ActiveSection>
      <ActiveFinalCta />
    </>
  );
}
