import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";

const exploreLinks = [
  { href: "/programs", label: "Programs" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/benefits", label: "Benefits" },
  { href: "/gallery", label: "Gallery" },
] as const;

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/why-us", label: "Why Us" },
  { href: "/contact", label: "Contact" },
] as const;

const schoolLinks = [
  { href: "/contact", label: "Partner With Us" },
  { href: "/how-it-works", label: "Setup Process" },
  { href: "/programs", label: "Explore the Move Lab" },
] as const;

const linkColumns = [
  { title: "Explore", links: exploreLinks },
  { title: "Company", links: companyLinks },
  { title: "For Schools", links: schoolLinks },
] as const;

/**
 * Production Pulse footer — brand, sitemap columns, contact, and legal bar.
 */
export function PulseFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#070909] text-white">
      <div className="pulse-container py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.35fr)] lg:gap-16">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label={`${siteConfig.productName} home`}
            >
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={siteConfig.logo}
                  alt=""
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-extrabold uppercase tracking-[0.14em]">
                  {siteConfig.name}
                </span>
                <span className="mt-0.5 block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--p-accent)]">
                  Kids Move Lab
                </span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-white/40">
              {siteConfig.missionLine}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={siteConfig.cta.primaryHref} className="pulse-btn">
                {siteConfig.cta.primary}
              </Link>
              <Link href={siteConfig.cta.secondaryHref} className="pulse-btn-secondary">
                {siteConfig.cta.secondary}
              </Link>
            </div>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3">
            {linkColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-white/45">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-[var(--p-accent)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-3">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex items-start gap-2.5 text-sm text-white/65 transition-colors hover:text-[var(--p-accent)]"
          >
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--p-accent)]" aria-hidden />
            <span>{siteConfig.contact.email}</span>
          </a>

          <p className="inline-flex items-start gap-2.5 text-sm text-white/65">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--p-accent)]" aria-hidden />
            <span>
              {siteConfig.contact.phone ?? siteConfig.contact.phonePlaceholder}
            </span>
          </p>

          <p className="inline-flex items-start gap-2.5 text-sm text-white/65">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--p-accent)]" aria-hidden />
            <span>Pan India</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/40">
        <div className="pulse-container flex flex-col gap-3 py-5 text-[0.68rem] uppercase tracking-[0.14em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.productName}. All rights reserved.
          </p>
          <p className="text-white/35">{siteConfig.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
