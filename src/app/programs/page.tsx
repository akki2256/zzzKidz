import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { CtaBand } from "@/components/shared/cta-band";
import { FeatureCard } from "@/components/shared/feature-card";
import { MediaSlideshow } from "@/components/shared/media-slideshow";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { PremiumProgramsPage } from "@/components/premium-coaching-layout/pages/premium-programs-page";
import { StudioProgramsPage } from "@/components/studio-layout/pages/studio-programs-page";
import { MultiLayoutPage } from "@/components/theme/multi-layout-page";
import { galleryImages, heroSlides } from "@/content/media";
import { activities, keyActivities, movementLiteracy, zones } from "@/content/site";

export const metadata: Metadata = {
  title: "Programs & Move Lab",
  description:
    "Explore Triple Z Kids Move Lab zones, activities and complete movement literacy programs for schools.",
  alternates: { canonical: "/programs" },
};

function OriginalProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Inside Your"
        titleAccent="Triple Z Kids Move Lab"
        description="A world-class fitness and movement center in your school — fully equipped, beautifully designed and expertly managed."
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <MediaSlideshow
            slides={heroSlides}
            variant="inline"
            aspectClassName="aspect-[16/9]"
            objectPosition="object-center"
            priority
          />
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl uppercase text-foreground">Activity Zones</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {zones.map((zone, i) => (
              <Reveal key={zone.title} delay={0.03 * i} className="h-full">
                <FeatureCard
                  title={zone.title}
                  description={zone.description}
                  icon="strength"
                  image={galleryImages[i + 2]}
                  className="h-full min-h-[22rem]"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background-secondary py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl uppercase">Key Activities</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {keyActivities.map((activity, i) => (
              <span
                key={activity}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated py-1.5 pl-1.5 pr-4 text-sm"
              >
                <span className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={galleryImages[i + 12]?.src ?? galleryImages[0].src}
                    alt=""
                    fill
                    sizes="32px"
                    className="object-cover"
                    aria-hidden
                  />
                </span>
                {activity}
              </span>
            ))}
          </div>

          <h2 className="mt-14 font-heading text-3xl uppercase">Complete Movement Literacy</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-stretch">
            {movementLiteracy.map((item, i) => (
              <Reveal key={item.title} delay={0.03 * i} className="h-full">
                <FeatureCard title={item.title} description={item.description} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl uppercase">Activities We Offer</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {activities.map((item, i) => (
              <Reveal key={item.title} delay={0.02 * i} className="h-full">
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon="activity"
                  image={galleryImages[i + 20]}
                  className="h-full min-h-[20rem]"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Bring the Move Lab to your school." />
    </>
  );
}

export default function ProgramsPage() {
  return (
    <MultiLayoutPage
      original={<OriginalProgramsPage />}
      premium={<PremiumProgramsPage />}
      studio={<StudioProgramsPage />}
    />
  );
}
