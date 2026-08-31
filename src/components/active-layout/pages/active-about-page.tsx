import { ActiveFinalCta } from "@/components/active-layout/active-cta";
import { ActiveItemGrid, ActiveSection } from "@/components/active-layout/active-blocks";
import { ActivePageHero } from "@/components/active-layout/active-page-hero";
import { ActivePromiseQuote } from "@/components/active-layout/active-promise-quote";
import { aboutFeatureImage } from "@/content/media";
import { approachPillars, thankYouPillars, trustPillars } from "@/content/site";

export function ActiveAboutPage() {
  return (
    <>
      <ActivePageHero
        eyebrow="About Us"
        title="Not just exercise. Movement education."
        description="Triple Z Kids Move Lab brings fitness, coaching and curriculum into schools as one managed programme."
        image={aboutFeatureImage}
      />
      <ActiveSection tone="white" eyebrow="Our Approach" heading="How we work with schools">
        <ActiveItemGrid items={approachPillars} columns={5} />
      </ActiveSection>
      <ActivePromiseQuote />
      <ActiveSection tone="mint" eyebrow="Partnership" heading="What schools gain with us">
        <ActiveItemGrid items={thankYouPillars} columns={5} />
      </ActiveSection>
      <ActiveSection tone="royal" heading="Built on four commitments">
        <ActiveItemGrid items={trustPillars} columns={4} tone="dark" />
      </ActiveSection>
      <ActiveFinalCta />
    </>
  );
}
