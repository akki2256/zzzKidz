import { StudioFinalCta } from "@/components/studio-layout/studio-cta";
import { StudioPageHero } from "@/components/studio-layout/studio-page-hero";
import { StudioItemGrid, StudioSection } from "@/components/studio-layout/studio-blocks";
import { StudioStatement } from "@/components/studio-layout/studio-statement";
import { StudioStatsBand } from "@/components/studio-layout/studio-stats-band";
import { aboutFeatureImage } from "@/content/media";
import { approachPillars, thankYouPillars, trustPillars } from "@/content/site";

export function StudioAboutPage() {
  return (
    <>
      <StudioPageHero
        eyebrow="About"
        title="Not just exercise. Movement education."
        description="Triple Z Kids Move Lab brings years of fitness, movement and training experience into schools — as one complete, managed programme."
        image={aboutFeatureImage}
      />
      <StudioStatement />
      <StudioSection tone="dark" eyebrow="Our Approach" heading="How we work">
        <StudioItemGrid items={approachPillars} tone="dark" columns={5} />
      </StudioSection>
      <StudioStatsBand />
      <StudioSection tone="paper" eyebrow="Why It Matters" heading="What partnership delivers">
        <StudioItemGrid items={thankYouPillars} tone="paper" columns={5} />
      </StudioSection>
      <StudioSection tone="dark" heading="Built on four commitments">
        <StudioItemGrid items={trustPillars} tone="dark" columns={4} />
      </StudioSection>
      <StudioFinalCta />
    </>
  );
}
