import { Container } from "@/components/shared/container";
import { AnimatedPills } from "@/components/shared/animated-pills";
import { FeatureCard } from "@/components/shared/feature-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerGrid, StaggerItem } from "@/components/shared/stagger-grid";
import {
  approachPillars,
  overallOutcomes,
  processSteps,
  schoolBenefits,
  studentBenefits,
} from "@/content/site";

function BenefitCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="card-shine flex h-full min-h-[8.75rem] flex-col rounded-xl border border-border bg-background-elevated p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[var(--shadow-glow)] sm:p-6">
      <h4 className="font-heading text-base uppercase leading-snug tracking-wide text-foreground sm:text-lg">
        {title}
      </h4>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-foreground-muted">
        {description}
      </p>
    </article>
  );
}

export function ProcessBenefitsSection() {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container>
        <Reveal direction="blur">
          <SectionHeader
            eyebrow="What We Provide"
            title="A Complete, End-to-End Solution"
            titleAccent="We Manage, You Benefit"
            description="From planning to progress — we are with you at every step."
          />
        </Reveal>

        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
          {processSteps.map((step, i) => (
            <StaggerItem key={step.title} variant="fadeUp">
              <article className="card-shine flex h-full min-h-[14rem] flex-col rounded-xl border border-border bg-background-elevated p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <p className="font-display text-xs font-bold uppercase tracking-[0.1em] text-accent">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 font-heading text-lg uppercase leading-snug text-foreground">
                  {step.title}
                </h3>
                <ul className="mt-3 flex-1 space-y-2 text-[0.95rem] leading-relaxed text-foreground-muted">
                  {step.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <div className="mt-14">
          <Reveal>
            <h3 className="font-heading text-2xl uppercase text-foreground">Our Approach</h3>
          </Reveal>
          <StaggerGrid className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-stretch">
            {approachPillars.map((item, i) => (
              <StaggerItem key={item.title} variant={i % 2 === 0 ? "scale" : "fadeUp"}>
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon="shield"
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-2">
          <div>
            <Reveal direction="right">
              <h3 className="font-heading text-2xl uppercase text-accent">
                Benefits for Students
              </h3>
            </Reveal>
            <StaggerGrid className="mt-5 grid gap-3" stagger={0.06}>
              {studentBenefits.map((item) => (
                <StaggerItem key={item.title} variant="fadeRight">
                  <BenefitCard title={item.title} description={item.description} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
          <div>
            <Reveal direction="left">
              <h3 className="font-heading text-2xl uppercase text-foreground">
                Benefits for Your School
              </h3>
            </Reveal>
            <StaggerGrid className="mt-5 grid gap-3" stagger={0.06}>
              {schoolBenefits.map((item) => (
                <StaggerItem key={item.title} variant="fadeLeft">
                  <BenefitCard title={item.title} description={item.description} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </div>

        <Reveal direction="scale" className="mt-14">
          <div className="card-shine rounded-2xl border border-border bg-background-elevated p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-highlight">
              Overall Outcome
            </p>
            <p className="mt-3 max-w-2xl font-heading text-2xl uppercase leading-tight text-foreground sm:text-3xl">
              We don&apos;t just build strong bodies, we build stronger lives.
            </p>
            <AnimatedPills items={overallOutcomes} className="mt-6" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
