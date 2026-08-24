import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { siteConfig } from "@/content/site";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/why-us", label: "Why Us" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact Us" },
];

const offeringLinks = [
  { href: "/programs", label: "Programs" },
  { href: "/programs", label: "Activity Zones" },
  { href: "/benefits", label: "Benefits" },
  { href: "/gallery", label: "Gallery" },
];

const resourceLinks = [
  { href: "/how-it-works", label: "Setup Process" },
  { href: "/why-us", label: "FAQs" },
  { href: "/benefits", label: "Outcomes" },
];

/** Inset rounded footer card, matching the reference footer treatment. */
export function PremiumFooter() {
  return (
    <footer className="bg-[#050308] px-4 pb-8 pt-10">
      <div className="premium-container">
        <div className="rounded-[26px] border border-white/8 bg-gradient-to-br from-[#141527] via-[#0f1020] to-[#0b0c16] p-7 sm:p-10">
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div>
              <BrandMark
                size="sm"
                className="[&_span]:text-white [&_.font-heading]:text-white [&_span_span]:text-white/50"
              />
              <p className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/55">
                <span className="font-semibold text-[#6d5dfc]">India</span>
                <span aria-hidden className="text-white/25">
                  |
                </span>
                <span>Pan India Vision</span>
              </p>
              <ul className="mt-5 space-y-3 text-xs text-white/60">
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
                  {siteConfig.contact.phonePlaceholder}
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-white"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
                  {siteConfig.missionLine}
                </li>
              </ul>
            </div>

            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Offerings" links={offeringLinks} />
            <FooterColumn title="Resources" links={resourceLinks} />
          </div>

          <div className="mt-9 border-t border-white/8 pt-6">
            <div className="flex flex-col gap-3 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} {siteConfig.productName}. All rights reserved.
              </p>
              <p className="text-white/55">{siteConfig.slogan}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-bold text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-xs text-white/55 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
