import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { PremiumContactPage } from "@/components/premium-coaching-layout/pages/premium-contact-page";
import { StudioContactPage } from "@/components/studio-layout/pages/studio-contact-page";
import { MultiLayoutPage } from "@/components/theme/multi-layout-page";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact / Partner With Us",
  description:
    "Enquire about bringing Triple Z Kids Move Lab to your school. Partner with ZZZKidz for a complete fitness solution.",
  alternates: { canonical: "/contact" },
};

function OriginalContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Partner With Us"
        titleAccent="Transform Together"
        description="Let's build a Fit India — one school at a time. Share your school details and we'll guide you through the next step."
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-heading text-2xl uppercase">Talk to the Team</h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              One partner. Complete solution. Better future for every child. From planning to
              progress — we are with you at every step.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="rounded-md border border-dashed border-border px-3 py-2 text-foreground-muted">
                Phone: {siteConfig.contact.phonePlaceholder}
              </li>
            </ul>
            <p className="mt-8 font-heading text-xl uppercase leading-snug">
              Let&apos;s move together.{" "}
              <span className="text-accent">Let&apos;s grow together.</span>
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background-elevated p-6 sm:p-8">
            <h2 className="font-heading text-xl uppercase">Enquiry Form</h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Tell us about your school and goals. We&apos;ll follow up with next steps.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <MultiLayoutPage
      original={<OriginalContactPage />}
      premium={<PremiumContactPage />}
      studio={<StudioContactPage />}
    />
  );
}
