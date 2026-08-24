import { Container } from "@/components/shared/container";
import { AnimatedPills } from "@/components/shared/animated-pills";
import { FeatureCard } from "@/components/shared/feature-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerGrid, StaggerItem } from "@/components/shared/stagger-grid";
import { galleryImages } from "@/content/media";
import { activities, keyActivities, movementLiteracy, zones } from "@/content/site";

export function ProgramsPreviewSection() {
  return (
    <section className="border-b border-border bg-background-secondary py-16 sm:py-20">
      <Container>
        <Reveal direction="blur">
          <SectionHeader
            eyebrow="Inside the Move Lab"
            title="A World-Class Fitness & Movement Center"
            titleAccent="In Your School"
            description="We transform an area in your school into a safe, engaging and high-energy fitness hub — fully equipped, beautifully designed and expertly managed."
          />
        </Reveal>
      </Container>

      <Container className="mt-10">
        <StaggerGrid className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" stagger={0.1}>
          {zones.map((zone, i) => (
            <StaggerItem key={zone.title} variant="scale">
              <FeatureCard
                title={zone.title}
                description={zone.description}
                icon="strength"
                image={galleryImages[i + 2]}
                className="h-full min-h-[20rem]"
              />
            </StaggerItem>
          ))}
        </StaggerGrid>
        <p className="mt-4 text-sm text-foreground-muted">
          Designed according to available school space and age groups.
        </p>
      </Container>

      <Container>
        <div className="mt-14">
          <Reveal>
            <h3 className="font-heading text-2xl uppercase">Our Key Activities</h3>
          </Reveal>
          <AnimatedPills items={keyActivities} className="mt-5" />
        </div>

        <div className="mt-14">
          <StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-stretch">
            {movementLiteracy.map((item, i) => (
              <StaggerItem key={item.title} variant={i % 2 === 0 ? "fadeUp" : "blur"}>
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon="activity"
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </Container>

      <Container className="mt-14">
        <Reveal direction="scale">
          <h3 className="font-heading text-2xl uppercase">Activities We Offer</h3>
        </Reveal>
        <StaggerGrid
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.06}
        >
          {activities.map((item, i) => (
            <StaggerItem key={item.title} variant={i % 3 === 0 ? "fadeLeft" : i % 3 === 1 ? "fadeUp" : "fadeRight"}>
              <article className="card-shine group flex h-full min-h-[11rem] flex-col rounded-xl border border-border bg-background-elevated p-5 transition-colors duration-300 hover:border-accent/40 hover:shadow-[var(--shadow-glow)]">
                <h4 className="font-heading min-h-[2.75rem] text-base uppercase leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-accent">
                  {item.title}
                </h4>
                <p className="mt-2 flex-1 text-sm text-foreground-muted line-clamp-3">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
