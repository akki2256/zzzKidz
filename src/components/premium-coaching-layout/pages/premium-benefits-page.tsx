import {
  PremiumConsultationCta,
  PremiumFinalCta,
} from "@/components/premium-coaching-layout/premium-cta-sections";
import { PremiumPageHero } from "@/components/premium-coaching-layout/premium-page-hero";
import {
  foundationOutcomes,
  overallOutcomes,
  schoolBenefits,
  studentBenefits,
} from "@/content/site";

export function PremiumBenefitsPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Benefits"
        title="Outcomes for"
        titleAccent="Students & Schools"
        description="Holistic development through structured movement — stronger bodies, sharper minds and lasting school value."
        breadcrumbLabel="Benefits"
      />

      <section className="pb-14">
        <div className="premium-container grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="premium-display text-xl text-white sm:text-2xl">
              Benefits for students
            </h2>
            <div className="mt-6 space-y-4">
              {studentBenefits.map((item) => (
                <article key={item.title} className="p-surface p-5">
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[13px] text-white/60">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h2 className="premium-display text-xl text-white sm:text-2xl">
              Benefits for your school
            </h2>
            <div className="mt-6 space-y-4">
              {schoolBenefits.map((item) => (
                <article key={item.title} className="p-surface p-5">
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[13px] text-white/60">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="premium-container">
          <h2 className="premium-display text-xl text-white sm:text-2xl">Foundation for life</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {foundationOutcomes.map((item) => (
              <article key={item.title} className="p-surface p-5">
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-[13px] text-white/60">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {overallOutcomes.map((item) => (
              <span key={item} className="p-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <PremiumConsultationCta />
      <PremiumFinalCta />
    </>
  );
}
