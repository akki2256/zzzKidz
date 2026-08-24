import { Container } from "@/components/shared/container";
import { FeatureCard } from "@/components/shared/feature-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerGrid, StaggerItem } from "@/components/shared/stagger-grid";
import { faqs, promises, whyUsPillars } from "@/content/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const whyIcons = ["spark", "activity", "shield", "users", "clipboard", "school"] as const;

export function WhyUsHomeSection() {
  return (
    <section className="border-b border-border bg-background-secondary py-16 sm:py-20">
      <Container>
        <Reveal direction="blur">
          <SectionHeader
            eyebrow="Why Triple Z"
            title="Why Triple Z"
            titleAccent="In Your School?"
            description="Because your students deserve the best movement education."
          />
        </Reveal>
      </Container>

      <Container className="mt-10">
        <StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUsPillars.map((item, i) => (
            <StaggerItem key={item.title} variant={i % 2 === 0 ? "fadeUp" : "scale"}>
              <FeatureCard
                title={item.title}
                description={item.description}
                icon={whyIcons[i] ?? "users"}
                index={`0${i + 1}`}
                className="h-full"
              />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>

      <Container>
        <Reveal direction="scale" className="mt-14">
          <div className="card-shine rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="font-heading text-xl uppercase text-accent">Our Promise</h3>
            <StaggerGrid className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
              {promises.map((item) => (
                <StaggerItem key={item.title} variant="fadeUp">
                  <div className="min-h-[5.5rem] rounded-lg border border-transparent p-3 transition-colors duration-300 hover:border-accent/25 hover:bg-accent-soft/30">
                    <p className="font-heading text-sm uppercase">{item.title}</p>
                    <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
            <p className="mt-8 font-heading text-2xl uppercase leading-tight">
              We don&apos;t just add fitness to schools,{" "}
              <span className="text-accent">we transform lives.</span>
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal direction="right">
            <SectionHeader
              eyebrow="FAQs"
              title="Questions Schools Ask"
              description="Clear answers drawn from our school fitness solution."
            />
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
