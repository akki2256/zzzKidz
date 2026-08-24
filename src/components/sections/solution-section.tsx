import { Container } from "@/components/shared/container";
import { FeatureCard } from "@/components/shared/feature-card";
import { MediaSlideshow } from "@/components/shared/media-slideshow";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerGrid, StaggerItem } from "@/components/shared/stagger-grid";
import { solutionFeatureImage } from "@/content/media";
import { peComparison, solutionPillars } from "@/content/site";

const pillarIcons = ["school", "users", "activity", "clipboard", "heart"] as const;

export function SolutionSection() {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <Reveal direction="right">
            <SectionHeader
              eyebrow="Beyond Traditional P.E."
              title="It's Time to Upgrade to a"
              titleAccent="Movement Revolution"
              description="Traditional P.E. is limited. Triple Z Kids Move Lab brings a structured, scientific and exciting approach to develop complete physical literacy in every child."
            />
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <MediaSlideshow
              slides={[solutionFeatureImage]}
              variant="inline"
              autoPlay={false}
              aspectClassName="aspect-[16/9]"
              objectPosition="object-center"
            />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:items-stretch">
          <Reveal direction="right" className="h-full">
            <div className="card-shine flex h-full flex-col rounded-xl border border-border bg-background-secondary p-6 sm:p-8">
              <h3 className="font-heading text-xl uppercase text-foreground-muted">
                {peComparison.traditional.title}
              </h3>
              <ul className="mt-6 flex flex-1 flex-col justify-between gap-4">
                {peComparison.traditional.points.map((point) => (
                  <li key={point.title}>
                    <p className="font-semibold text-foreground">{point.title}</p>
                    <p className="text-[0.95rem] leading-relaxed text-foreground-muted">
                      {point.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.08} className="h-full">
            <div className="card-shine flex h-full flex-col rounded-xl border border-accent/40 bg-accent-soft p-6 sm:p-8">
              <h3 className="font-heading text-xl uppercase text-accent">
                {peComparison.moveLab.title}
              </h3>
              <ul className="mt-6 flex flex-1 flex-col justify-between gap-4">
                {peComparison.moveLab.points.map((point) => (
                  <li key={point.title}>
                    <p className="font-semibold text-foreground">{point.title}</p>
                    <p className="text-[0.95rem] leading-relaxed text-foreground-muted">
                      {point.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="mt-14">
        <Container>
          <Reveal direction="blur">
            <SectionHeader
              eyebrow="All-in-One"
              title="Our All-in-One"
              titleAccent="School Fitness Solution"
            />
          </Reveal>
        </Container>

        <Container className="mt-8">
          <StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {solutionPillars.map((item, i) => (
              <StaggerItem key={item.title} variant={i % 2 === 0 ? "fadeUp" : "scale"}>
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  index={`0${i + 1}`}
                  icon={pillarIcons[i] ?? "spark"}
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </div>
    </section>
  );
}
