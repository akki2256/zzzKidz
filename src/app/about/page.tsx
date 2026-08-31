import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { CtaBand } from "@/components/shared/cta-band";
import { FeatureCard } from "@/components/shared/feature-card";
import { MediaSlideshow } from "@/components/shared/media-slideshow";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ActiveAboutPage } from "@/components/active-layout/pages/active-about-page";
import { PulseAboutPage } from "@/components/pulse-layout/pages/pulse-about-page";
import { StudioAboutPage } from "@/components/studio-layout/pages/studio-about-page";
import { MultiLayoutPage } from "@/components/theme/multi-layout-page";
import {
  approachPillars,
  siteConfig,
  thankYouPillars,
  trustPillars,
} from "@/content/site";
import { aboutFeatureImage, heroSlides } from "@/content/media";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.productName} — a complete school fitness and movement solution.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <MultiLayoutPage
      original={<OriginalAboutPage />}
      studio={<StudioAboutPage />}
      active={<ActiveAboutPage />}
      pulse={<PulseAboutPage />}
    />
  );
}

function OriginalAboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ZZZKidz"
        title="Introducing"
        titleAccent="Triple Z Kids Move Lab"
        description="A complete movement and fitness solution for schools. We build in-school Fitness Labs, deliver engaging programs and trained coaches to help every child move better, get stronger and grow with confidence."
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Our Purpose
            </p>
            <h2 className="mt-3 font-heading text-3xl uppercase leading-tight sm:text-4xl">
              Move better. Get stronger.{" "}
              <span className="text-accent">Grow together.</span>
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              {siteConfig.description} Not just exercise — it&apos;s complete movement education.
            </p>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              We don&apos;t just build fitness spaces, we build better futures.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <MediaSlideshow
              slides={[aboutFeatureImage, ...heroSlides.slice(0, 3)]}
              variant="inline"
              aspectClassName="aspect-[16/9]"
              objectPosition="object-center"
            />
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-border bg-background-secondary py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl uppercase">Our Approach</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {approachPillars.map((item, i) => (
              <Reveal key={item.title} delay={0.03 * i}>
                <FeatureCard title={item.title} description={item.description} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl uppercase">What Partnership Means</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {thankYouPillars.map((item, i) => (
              <Reveal key={item.title} delay={0.03 * i}>
                <FeatureCard title={item.title} description={item.description} icon="heart" />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-border bg-background-elevated p-5"
              >
                <h3 className="font-heading text-base uppercase">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Together, let's build active kids, confident minds and a stronger tomorrow."
        description="Thank you for considering a healthier future for your students. We look forward to partnering with you."
      />
    </>
  );
}
