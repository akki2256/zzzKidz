import { ActiveFinalCta } from "@/components/active-layout/active-cta";
import { ActiveItemGrid, ActiveSection } from "@/components/active-layout/active-blocks";
import { ActivePageHero } from "@/components/active-layout/active-page-hero";
import { foundationImages } from "@/content/media";
import {
  foundationOutcomes,
  overallOutcomes,
  schoolBenefits,
  studentBenefits,
} from "@/content/site";

export function ActiveBenefitsPage() {
  return (
    <>
      <ActivePageHero
        eyebrow="Benefits"
        title="Stronger students. Stronger schools."
        description="Holistic development through structured movement — body, mind and lasting school value."
        image={foundationImages[0]}
      />
      <ActiveSection tone="white" eyebrow="For Students" heading="What every child gains">
        <ActiveItemGrid items={studentBenefits} columns={5} />
      </ActiveSection>
      <ActiveSection tone="mint" eyebrow="For Schools" heading="What your school gains">
        <ActiveItemGrid items={schoolBenefits} columns={5} />
      </ActiveSection>
      <ActiveSection tone="purple" eyebrow="Foundation For Life" heading="Long-term outcomes">
        <ActiveItemGrid items={foundationOutcomes} columns={5} tone="dark" />
        <div className="mt-8 flex flex-wrap gap-2">
          {overallOutcomes.map((item) => (
            <span
              key={item}
              className="rounded-md bg-white/15 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </ActiveSection>
      <ActiveFinalCta />
    </>
  );
}
