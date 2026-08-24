import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { StudioPageHero } from "@/components/studio-layout/studio-page-hero";
import { StudioItemGrid, StudioSection } from "@/components/studio-layout/studio-blocks";
import { heroSlides } from "@/content/media";
import { siteConfig, trustPillars } from "@/content/site";

export function StudioContactPage() {
  return (
    <>
      <StudioPageHero
        eyebrow="Contact"
        title="Partner with us"
        description="Share your school details and we'll guide you through the next step — space, age groups and Move Lab setup."
        image={heroSlides[4] ?? heroSlides[0]}
      />

      <section className="bg-[#f1f1ef] py-16 text-[#0b0b0b] sm:py-20">
        <div className="studio-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="studio-eyebrow text-[#55555c]">Talk To The Team</p>
            <h2 className="studio-display mt-4 text-[clamp(1.9rem,4.5vw,3rem)]">
              One partner. Complete solution.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#55555c]">
              From planning to progress — we are with you at every step.
            </p>

            <dl className="mt-10 divide-y divide-black/12 border-y border-black/12">
              <div className="flex items-center gap-3 py-4">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <dt className="sr-only">Email</dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm font-bold hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-3 py-4">
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                <dt className="sr-only">Phone</dt>
                <dd className="text-sm text-[#55555c]">
                  {siteConfig.contact.phonePlaceholder}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border border-black/12 bg-white p-6 sm:p-9">
            <h2 className="studio-display text-[clamp(1.4rem,2.6vw,1.9rem)]">Enquiry form</h2>
            <p className="mt-2 text-sm text-[#55555c]">
              Tell us about your school and goals. We&apos;ll follow up with next steps.
            </p>
            <div className="studio-form mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <StudioSection tone="dark" heading="Why schools trust us">
        <StudioItemGrid items={trustPillars} tone="dark" columns={4} />
      </StudioSection>
    </>
  );
}
