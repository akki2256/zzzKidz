import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { ActiveItemGrid, ActiveSection } from "@/components/active-layout/active-blocks";
import { ActivePageHero } from "@/components/active-layout/active-page-hero";
import { heroSlides } from "@/content/media";
import { siteConfig, trustPillars } from "@/content/site";

export function ActiveContactPage() {
  return (
    <>
      <ActivePageHero
        eyebrow="Contact Us"
        title="Partner with us"
        description="Share your school details and we'll guide the next step — space, age groups and Move Lab setup."
        image={heroSlides[4] ?? heroSlides[0]}
      />

      <section className="bg-[#d2fefe] py-14 sm:py-16">
        <div className="active-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="active-serif text-[clamp(1.5rem,3.2vw,2.2rem)] text-[#172c5f]">
              One partner. Complete solution.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#172c5f]/75">
              From planning to progress — we are with you at every step.
            </p>
            <dl className="mt-8 space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                <Mail className="h-4 w-4 text-[#ec1f8f]" aria-hidden />
                <dd>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm font-bold text-[#172c5f] hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                <Phone className="h-4 w-4 text-[#7c5cbf]" aria-hidden />
                <dd className="text-sm text-[#172c5f]/70">{siteConfig.contact.phonePlaceholder}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
            <h2 className="active-display text-[clamp(1.2rem,2.4vw,1.6rem)] text-[#172c5f]">
              Enquiry form
            </h2>
            <p className="mt-2 text-sm text-[#172c5f]/70">
              Tell us about your school and goals. We&apos;ll follow up with next steps.
            </p>
            <div className="active-form mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <ActiveSection tone="royal" heading="Why schools trust us">
        <ActiveItemGrid items={trustPillars} columns={4} tone="dark" />
      </ActiveSection>
    </>
  );
}
