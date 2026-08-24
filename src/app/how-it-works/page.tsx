import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { CtaBand } from "@/components/shared/cta-band";
import { FeatureCard } from "@/components/shared/feature-card";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { PremiumHowItWorksPage } from "@/components/premium-coaching-layout/pages/premium-how-it-works-page";
import { StudioHowItWorksPage } from "@/components/studio-layout/pages/studio-how-it-works-page";
import { MultiLayoutPage } from "@/components/theme/multi-layout-page";
import { approachPillars, processSteps } from "@/content/site";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Triple Z Kids Move Lab delivers an end-to-end school fitness solution — from assessment to ongoing support.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <MultiLayoutPage
      original={<OriginalHowItWorksPage />}
      premium={<PremiumHowItWorksPage />}
      studio={<StudioHowItWorksPage />}
    />
  );
}

function OriginalHowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="What We Provide"
        titleAccent="To Your School"
        description="A complete, end-to-end solution — we manage, you benefit."
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={0.03 * i}>
                <article className="h-full rounded-xl border border-border bg-background-elevated p-6">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.1em] text-accent">
                    Step {i + 1}
                  </p>
                  <h2 className="mt-2 font-heading text-xl uppercase leading-snug">
                    {step.title}
                  </h2>
                  <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
                    {step.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background-secondary py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl uppercase">Our Approach</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {approachPillars.map((item, i) => (
              <Reveal key={item.title} delay={0.03 * i}>
                <FeatureCard title={item.title} description={item.description} icon="shield" />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 font-heading text-2xl uppercase text-accent">
            We take care of everything. You see the difference.
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
