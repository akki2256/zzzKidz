import { Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { PremiumPageHero } from "@/components/premium-coaching-layout/premium-page-hero";
import { siteConfig } from "@/content/site";

export function PremiumContactPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Contact"
        title="Partner With Us."
        titleAccent="Transform Together."
        description="Let's build a Fit India — one school at a time. Share your school details and we'll guide you through the next step."
        breadcrumbLabel="Contact"
      />

      <section className="pb-20">
        <div className="premium-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="premium-display text-xl text-white sm:text-2xl">Talk to the team</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              One partner. Complete solution. Better future for every child. From planning to
              progress — we are with you at every step.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="rounded-xl border border-dashed border-white/15 px-4 py-3 text-white/50">
                Phone: {siteConfig.contact.phonePlaceholder}
              </li>
            </ul>
          </div>
          <div className="p-surface p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white">Enquiry form</h2>
            <p className="mt-2 text-sm text-white/55">
              Tell us about your school and goals. We&apos;ll follow up with next steps.
            </p>
            <div className="premium-form mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
