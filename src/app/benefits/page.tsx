import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { PremiumBenefitsPage } from "@/components/premium-coaching-layout/pages/premium-benefits-page";
import { StudioBenefitsPage } from "@/components/studio-layout/pages/studio-benefits-page";
import { MultiLayoutPage } from "@/components/theme/multi-layout-page";
import {
  foundationOutcomes,
  overallOutcomes,
  schoolBenefits,
  studentBenefits,
} from "@/content/site";

function BenefitCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="flex h-full min-h-[8.75rem] flex-col rounded-xl border border-border bg-background-elevated p-5 sm:p-6">
      <h3 className="font-heading text-base uppercase leading-snug tracking-wide text-foreground sm:text-lg">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-foreground-muted">
        {description}
      </p>
    </article>
  );
}

export const metadata: Metadata = {
  title: "Benefits & Outcomes",
  description:
    "Benefits for students and schools from Triple Z Kids Move Lab — stronger bodies, sharper minds and brighter futures.",
  alternates: { canonical: "/benefits" },
};

export default function BenefitsPage() {
  return (
    <MultiLayoutPage
      original={<OriginalBenefitsPage />}
      premium={<PremiumBenefitsPage />}
      studio={<StudioBenefitsPage />}
    />
  );
}

function OriginalBenefitsPage() {
  return (
    <>
      <PageHero
        eyebrow="Benefits & Outcomes"
        title="A Fit Child Today,"
        titleAccent="A Stronger Nation Tomorrow"
        description="We don't just build strong bodies, we build stronger lives."
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl uppercase text-accent">
              Benefits for Students
            </h2>
            <div className="mt-6 grid gap-3">
              {studentBenefits.map((item, i) => (
                <Reveal key={item.title} delay={0.03 * i}>
                  <BenefitCard title={item.title} description={item.description} />
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-heading text-3xl uppercase text-foreground">
              Benefits for Your School
            </h2>
            <div className="mt-6 grid gap-3">
              {schoolBenefits.map((item, i) => (
                <Reveal key={item.title} delay={0.03 * i}>
                  <BenefitCard title={item.title} description={item.description} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background-secondary py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl uppercase text-foreground">
            Impact on Every Child
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-stretch">
            {foundationOutcomes.map((item) => (
              <article
                key={item.title}
                className="flex h-full min-h-[10rem] flex-col rounded-xl border border-border bg-background-elevated p-5"
              >
                <h3 className="font-heading text-base uppercase text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-foreground-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {overallOutcomes.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-8 text-[0.95rem] leading-relaxed text-foreground-muted">
            Lifelong habits — creating active kids today who grow into healthy, responsible and
            confident adults.
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
