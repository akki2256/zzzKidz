import { ActiveFinalCta } from "@/components/active-layout/active-cta";
import { ActiveItemGrid, ActiveSection } from "@/components/active-layout/active-blocks";
import { ActivePageHero } from "@/components/active-layout/active-page-hero";
import { ActiveProgramsGrid } from "@/components/active-layout/active-programs-grid";
import { solutionFeatureImage } from "@/content/media";
import { activities, keyActivities, movementLiteracy, zones } from "@/content/site";

export function ActiveProgramsPage() {
  return (
    <>
      <ActivePageHero
        eyebrow="Curricula"
        title="Inside the Move Lab"
        description="Zones, activities and movement literacy — designed for your space and every age group."
        image={solutionFeatureImage}
      />
      <ActiveSection tone="white" eyebrow="Activity Zones" heading="Every zone, purpose-built">
        <ActiveItemGrid items={zones} columns={4} />
      </ActiveSection>
      <ActiveProgramsGrid />
      <ActiveSection tone="mint" eyebrow="Key Activities" heading="What kids actually do">
        <div className="flex flex-wrap gap-2">
          {keyActivities.map((item) => (
            <span
              key={item}
              className="rounded-md bg-[#7c5cbf] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </ActiveSection>
      <ActiveSection tone="royal" eyebrow="Movement Literacy" heading="Five skills we build">
        <ActiveItemGrid items={movementLiteracy} columns={5} tone="dark" />
      </ActiveSection>
      <ActiveSection tone="white" eyebrow="Full Curriculum" heading="Activities we offer">
        <ActiveItemGrid items={activities} columns={5} />
      </ActiveSection>
      <ActiveFinalCta />
    </>
  );
}
