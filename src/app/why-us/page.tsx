import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { CtaBand } from "@/components/shared/cta-band";
import { FeatureCard } from "@/components/shared/feature-card";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { PremiumWhyUsPage } from "@/components/premium-coaching-layout/pages/premium-why-us-page";
import { StudioWhyUsPage } from "@/components/studio-layout/pages/studio-why-us-page";
import { MultiLayoutPage } from "@/components/theme/multi-layout-page";
import { peComparison, promises, whyUsPillars } from "@/content/site";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "Why schools choose Triple Z Kids Move Lab — expertise, safety, scientific programs and complete support.",
  alternates: { canonical: "/why-us" },
};

export default function WhyUsPage() {
  return (
    <MultiLayoutPage
      original={<OriginalWhyUsPage />}
      premium={<PremiumWhyUsPage />}
      studio={<StudioWhyUsPage />}
    />
  );
}

function OriginalWhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Us"
        title="Why Triple Z"
        titleAccent="In Your School?"
        description="Because your students deserve the best movement education."
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyUsPillars.map((item, i) => (
              <Reveal key={item.title} delay={0.03 * i}>
                <FeatureCard title={item.title} description={item.description} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background-secondary py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl uppercase">Beyond Traditional P.E.</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-heading text-xl uppercase text-foreground-muted">
                {peComparison.traditional.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {peComparison.traditional.points.map((point) => (
                  <li key={point.title}>
                    <p className="font-semibold">{point.title}</p>
                    <p className="text-sm text-foreground-muted">{point.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-accent/40 bg-accent-soft p-6">
              <h3 className="font-heading text-xl uppercase text-accent">
                {peComparison.moveLab.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {peComparison.moveLab.points.map((point) => (
                  <li key={point.title}>
                    <p className="font-semibold">{point.title}</p>
                    <p className="text-sm text-foreground-muted">{point.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl uppercase text-accent">Our Promise</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-border bg-background-elevated p-5"
              >
                <h3 className="font-heading text-base uppercase">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted">{item.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 font-heading text-2xl uppercase sm:text-3xl">
            We don&apos;t just add fitness to schools,{" "}
            <span className="text-accent">we transform lives.</span>
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
