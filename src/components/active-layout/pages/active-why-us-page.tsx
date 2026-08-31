import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActiveFinalCta } from "@/components/active-layout/active-cta";
import { ActiveItemGrid, ActiveSection } from "@/components/active-layout/active-blocks";
import { ActivePageHero } from "@/components/active-layout/active-page-hero";
import { ActivePromiseQuote } from "@/components/active-layout/active-promise-quote";
import { galleryPreviewSlides } from "@/content/media";
import { faqs, peComparison, whyUsPillars } from "@/content/site";

export function ActiveWhyUsPage() {
  return (
    <>
      <ActivePageHero
        eyebrow="Why Triple Z"
        title="Because your students deserve better"
        description="Expertise, safety and complete support — why schools choose the Move Lab."
        image={galleryPreviewSlides[4] ?? galleryPreviewSlides[0]}
      />
      <ActiveSection tone="white" eyebrow="Why Us" heading="Six reasons schools partner with us">
        <ActiveItemGrid items={whyUsPillars} columns={3} />
      </ActiveSection>

      <ActiveSection tone="mint" eyebrow="The Difference" heading="Traditional P.E. vs the Move Lab">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[rgba(23,44,95,0.1)] bg-white p-6">
            <h3 className="text-lg font-extrabold uppercase text-[#172c5f]/55">
              {peComparison.traditional.title}
            </h3>
            <dl className="mt-5 divide-y divide-[rgba(23,44,95,0.1)]">
              {peComparison.traditional.points.map((point) => (
                <div key={point.title} className="py-3">
                  <dt className="text-sm font-extrabold text-[#172c5f]">{point.title}</dt>
                  <dd className="mt-1 text-sm text-[#172c5f]/70">{point.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl bg-[#7c5cbf] p-6 text-white shadow-lg">
            <h3 className="text-lg font-extrabold uppercase text-[#ffc215]">
              {peComparison.moveLab.title}
            </h3>
            <dl className="mt-5 divide-y divide-white/15">
              {peComparison.moveLab.points.map((point) => (
                <div key={point.title} className="py-3">
                  <dt className="text-sm font-extrabold">{point.title}</dt>
                  <dd className="mt-1 text-sm text-white/80">{point.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ActiveSection>

      <ActivePromiseQuote />

      <ActiveSection tone="royal" eyebrow="FAQ" heading="Questions schools ask">
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`active-faq-${i}`} className="border-white/20">
              <AccordionTrigger className="text-left text-white">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-white/80">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ActiveSection>

      <ActiveFinalCta />
    </>
  );
}
