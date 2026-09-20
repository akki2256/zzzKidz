import { Mail, Phone } from "lucide-react";
import { PulseContactForm } from "@/components/pulse-layout/pulse-contact-form";
import { PhoneLink, SocialLinks } from "@/components/shared/social-links";
import { siteConfig } from "@/content/site";

type PulseContactSectionProps = {
  /** Use h1 on the dedicated contact page; h2 on the homepage. */
  headingLevel?: "h1" | "h2";
};

/**
 * Premium Pulse contact block — enquiry form + direct contact channels.
 * Anchored at `#pulse-contact` for menu / CTA deep links.
 */
export function PulseContactSection({ headingLevel = "h2" }: PulseContactSectionProps) {
  const Heading = headingLevel;

  return (
    <section
      id="pulse-contact"
      className="pulse-contact-section relative isolate scroll-mt-24 overflow-hidden border-t border-white/10 bg-[#070909] text-white"
      aria-labelledby="pulse-contact-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(19,255,114,0.09),transparent_42%),radial-gradient(ellipse_at_88%_78%,rgba(19,255,114,0.05),transparent_40%)]"
      />

      <div className="pulse-container relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 xl:gap-20">
          <div className="max-w-xl">
            <p className="pulse-eyebrow text-[var(--p-accent)]">Contact</p>
            <Heading
              id="pulse-contact-heading"
              className="pulse-display mt-4 text-[clamp(2.4rem,7vw,4.4rem)]"
            >
              Partner with us
            </Heading>
            <p className="mt-5 text-sm leading-relaxed text-white/65 sm:text-base">
              Enquire about bringing Triple Z Kids Move Lab to your school. Share a few details
              and we&apos;ll guide the next step with clarity and care.
            </p>

            <ul className="mt-9 space-y-4">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="group inline-flex items-start gap-3 text-sm text-white/75 transition-colors hover:text-[var(--p-accent)]"
                >
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.03] transition-colors group-hover:border-[var(--p-accent)]/45">
                    <Mail className="h-3.5 w-3.5 text-[var(--p-accent)]" aria-hidden />
                  </span>
                  <span className="pt-2">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.03]">
                    <Phone className="h-3.5 w-3.5 text-[var(--p-accent)]" aria-hidden />
                  </span>
                  <PhoneLink className="pt-2 transition-colors hover:text-[var(--p-accent)]" />
                </span>
              </li>
            </ul>

            <SocialLinks className="mt-8" tone="pulse" />
          </div>

          <div className="pulse-contact-panel">
            <div className="border-b border-white/10 pb-5">
              <h3 className="font-display text-[clamp(1.35rem,3vw,1.75rem)] uppercase tracking-[0.03em]">
                Enquiry form
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Tell us about your school and goals. We&apos;ll follow up with next steps.
              </p>
            </div>
            <div className="mt-6">
              <PulseContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
