import { StudioCategoryGrid } from "@/components/studio-layout/studio-category-grid";
import { StudioFinalCta } from "@/components/studio-layout/studio-cta";
import { StudioPageHero } from "@/components/studio-layout/studio-page-hero";
import {
  StudioChips,
  StudioItemGrid,
  StudioSection,
} from "@/components/studio-layout/studio-blocks";
import { solutionFeatureImage } from "@/content/media";
import { keyActivities, movementLiteracy, zones } from "@/content/site";

export function StudioProgramsPage() {
  return (
    <>
      <StudioPageHero
        eyebrow="Programs"
        title="Inside the Move Lab"
        description="A world-class fitness and movement centre in your school — fully equipped, beautifully designed and expertly managed."
        image={solutionFeatureImage}
      />
      <StudioSection
        tone="dark"
        eyebrow="Activity Zones"
        heading="Every zone, purpose-built"
        description="Zones and equipment are planned around your available space and age groups."
      >
        <StudioItemGrid items={zones} tone="dark" columns={4} />
      </StudioSection>
      <StudioCategoryGrid />
      <StudioSection tone="accent" eyebrow="Key Activities" heading="What kids actually do">
        <StudioChips items={keyActivities} tone="accent" />
      </StudioSection>
      <StudioSection
        tone="paper"
        eyebrow="Movement Literacy"
        heading="Five skills we build and track"
      >
        <StudioItemGrid items={movementLiteracy} tone="paper" columns={5} />
      </StudioSection>
      <StudioFinalCta />
    </>
  );
}
