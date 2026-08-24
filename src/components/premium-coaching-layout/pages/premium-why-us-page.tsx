import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PremiumConsultationCta,
  PremiumFinalCta,
} from "@/components/premium-coaching-layout/premium-cta-sections";
import { PremiumPageHero } from "@/components/premium-coaching-layout/premium-page-hero";
import { faqs, peComparison, promises, whyUsPillars } from "@/content/site";

export function PremiumWhyUsPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Why Triple Z"
        title="Why Triple Z"
        titleAccent="in your school?"
        description="Because your students deserve the best movement education."
        breadcrumbLabel="Why Us"
      />

      <section className="pb-14">
        <div className="premium-container grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUsPillars.map((item) => (
            <article key={item.title} className="p-surface p-6">
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-white/60">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-14">
        <div className="premium-container grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="premium-display text-xl text-white/70 sm:text-2xl">
              {peComparison.traditional.title}
            </h2>
            <ul className="mt-6 space-y-4">
              {peComparison.traditional.points.map((point) => (
                <li key={point.title} className="p-surface p-4">
                  <p className="text-sm font-semibold text-white">{point.title}</p>
                  <p className="mt-1 text-[13px] text-white/55">{point.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="premium-display text-xl text-[#8b7dff] sm:text-2xl">
              {peComparison.moveLab.title}
            </h2>
            <ul className="mt-6 space-y-4">
              {peComparison.moveLab.points.map((point) => (
                <li
                  key={point.title}
                  className="rounded-[20px] border border-[#6d5dfc]/35 bg-[#6d5dfc]/[0.08] p-4"
                >
                  <p className="text-sm font-semibold text-white">{point.title}</p>
                  <p className="mt-1 text-[13px] text-white/60">{point.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="premium-container">
          <h2 className="premium-display text-xl text-white sm:text-2xl">Our promise</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((item) => (
              <article key={item.title} className="p-surface p-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] text-white/60">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="premium-display text-xl text-white sm:text-2xl">
              Questions schools ask
            </h2>
            <Accordion type="single" collapsible className="mt-6">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`premium-faq-${i}`}>
                  <AccordionTrigger className="text-white">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-white/60">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <PremiumConsultationCta />
      <PremiumFinalCta />
    </>
  );
}
