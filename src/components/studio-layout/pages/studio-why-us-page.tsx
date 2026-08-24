import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StudioFinalCta } from "@/components/studio-layout/studio-cta";
import { StudioPageHero } from "@/components/studio-layout/studio-page-hero";
import { StudioPromiseBand } from "@/components/studio-layout/studio-promise-band";
import { StudioItemGrid, StudioSection } from "@/components/studio-layout/studio-blocks";
import { galleryPreviewSlides } from "@/content/media";
import { faqs, peComparison, whyUsPillars } from "@/content/site";

export function StudioWhyUsPage() {
  return (
    <>
      <StudioPageHero
        eyebrow="Why Triple Z"
        title="Because your students deserve better"
        description="Expertise, safety and complete support — the reasons schools choose the Move Lab over a traditional P.E. period."
        image={galleryPreviewSlides[4] ?? galleryPreviewSlides[0]}
      />

      <StudioSection tone="dark" eyebrow="Why Us" heading="Six reasons schools partner with us">
        <StudioItemGrid items={whyUsPillars} tone="dark" columns={3} />
      </StudioSection>

      {/* Side-by-side comparison — traditional P.E. against the Move Lab */}
      <StudioSection tone="paper" eyebrow="The Difference" heading="Traditional P.E. vs the Move Lab">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="studio-display text-[clamp(1.5rem,3vw,2.1rem)] text-[#55555c]">
              {peComparison.traditional.title}
            </h3>
            <dl className="mt-6 divide-y divide-black/12 border-y border-black/12">
              {peComparison.traditional.points.map((point) => (
                <div key={point.title} className="py-4">
                  <dt className="text-sm font-extrabold uppercase tracking-[0.08em]">
                    {point.title}
                  </dt>
                  <dd className="mt-1 text-sm text-[#55555c]">{point.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="studio-display text-[clamp(1.5rem,3vw,2.1rem)]">
              {peComparison.moveLab.title}
            </h3>
            <dl className="mt-6 divide-y divide-black/12 border-y-2 border-[#0b0b0b]">
              {peComparison.moveLab.points.map((point) => (
                <div key={point.title} className="py-4">
                  <dt className="text-sm font-extrabold uppercase tracking-[0.08em]">
                    {point.title}
                  </dt>
                  <dd className="mt-1 text-sm text-[#55555c]">{point.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </StudioSection>

      <StudioPromiseBand />

      <StudioSection tone="dark" eyebrow="FAQs" heading="Questions schools ask">
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`studio-faq-${i}`}>
              <AccordionTrigger className="text-left text-white">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-white/65">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </StudioSection>

      <StudioFinalCta />
    </>
  );
}
