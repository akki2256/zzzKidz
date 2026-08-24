import { StudioFinalCta } from "@/components/studio-layout/studio-cta";
import { StudioPageHero } from "@/components/studio-layout/studio-page-hero";
import { StudioPromoTiles } from "@/components/studio-layout/studio-promo-tiles";
import { StudioItemGrid, StudioSection } from "@/components/studio-layout/studio-blocks";
import { StudioStatsBand } from "@/components/studio-layout/studio-stats-band";
import { heroSlides } from "@/content/media";
import { approachPillars, processSteps } from "@/content/site";

/** Process steps carry a points[] list, flattened here into the shared grid shape. */
const steps = processSteps.map((step) => ({
  title: step.title,
  description: step.points.join(" "),
}));

export function StudioHowItWorksPage() {
  return (
    <>
      <StudioPageHero
        eyebrow="How It Works"
        title="A complete, end-to-end solution"
        description="From planning to progress — we are with you at every step, so your team can stay focused on education."
        image={heroSlides[2] ?? heroSlides[0]}
      />
      <StudioSection tone="dark" eyebrow="The Process" heading="Every step covered">
        <StudioItemGrid items={steps} tone="dark" columns={4} numbered />
      </StudioSection>
      <StudioPromoTiles />
      <StudioStatsBand />
      <StudioSection tone="paper" eyebrow="Our Approach" heading="How we make it easy">
        <StudioItemGrid items={approachPillars} tone="paper" columns={5} />
      </StudioSection>
      <StudioFinalCta />
    </>
  );
}
