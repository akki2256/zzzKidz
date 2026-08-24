import { StudioFinalCta } from "@/components/studio-layout/studio-cta";
import { StudioMission } from "@/components/studio-layout/studio-mission";
import { StudioPageHero } from "@/components/studio-layout/studio-page-hero";
import {
  StudioChips,
  StudioItemGrid,
  StudioSection,
} from "@/components/studio-layout/studio-blocks";
import { foundationImages } from "@/content/media";
import {
  foundationOutcomes,
  overallOutcomes,
  schoolBenefits,
  studentBenefits,
} from "@/content/site";

export function StudioBenefitsPage() {
  return (
    <>
      <StudioPageHero
        eyebrow="Benefits"
        title="Stronger students. Stronger schools."
        description="Holistic development through structured movement — stronger bodies, sharper minds and lasting school value."
        image={foundationImages[0]}
      />
      <StudioSection tone="dark" eyebrow="For Students" heading="What every child gains">
        <StudioItemGrid items={studentBenefits} tone="dark" columns={5} />
      </StudioSection>
      <StudioSection tone="paper" eyebrow="For Schools" heading="What your school gains">
        <StudioItemGrid items={schoolBenefits} tone="paper" columns={5} />
      </StudioSection>
      <StudioSection tone="accent" eyebrow="Foundation For Life" heading="The long-term outcome">
        <StudioItemGrid items={foundationOutcomes} tone="accent" columns={5} />
        <div className="mt-12">
          <StudioChips items={overallOutcomes} tone="accent" />
        </div>
      </StudioSection>
      <StudioMission />
      <StudioFinalCta />
    </>
  );
}
