import { PremiumCoachCards } from "@/components/premium-coaching-layout/premium-coach-cards";
import {
  PremiumConsultationCta,
  PremiumFinalCta,
} from "@/components/premium-coaching-layout/premium-cta-sections";
import { PremiumHowItWorks } from "@/components/premium-coaching-layout/premium-how-it-works";
import { PremiumPageHero } from "@/components/premium-coaching-layout/premium-page-hero";
import { approachPillars, processSteps } from "@/content/site";

export function PremiumHowItWorksPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="How It Works"
        title="A complete,"
        titleAccent="end-to-end solution"
        description="From planning to progress — we are with you at every step."
        breadcrumbLabel="How It Works"
      />

      <PremiumHowItWorks />

      <section className="pb-14">
        <div className="premium-container">
          <h2 className="premium-display text-xl text-white sm:text-2xl">Every step covered</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {processSteps.map((step, i) => (
              <article key={step.title} className="p-surface p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8b7dff]">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 text-lg font-bold text-white">{step.title}</h3>
                <ul className="mt-3 space-y-2 text-[13px] text-white/60">
                  {step.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="premium-container grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {approachPillars.map((item) => (
            <article key={item.title} className="p-surface p-5">
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-[13px] text-white/60">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <PremiumCoachCards />
      <PremiumConsultationCta />
      <PremiumFinalCta />
    </>
  );
}
