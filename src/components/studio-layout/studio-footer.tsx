import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/programs", label: "Programs" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/benefits", label: "Benefits" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/why-us", label: "Why Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "For Schools",
    links: [
      { href: "/contact", label: "Partner With Us" },
      { href: "/how-it-works", label: "Setup Process" },
      { href: "/why-us", label: "FAQs" },
    ],
  },
];

/** Oversized wordmark footer with square-edged link columns. */
export function StudioFooter() {
  return (
    <footer className="border-t border-white/12 bg-black">
      <div className="studio-container py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr]">
          <div>
            <p className="studio-display text-[clamp(2.5rem,7vw,4.5rem)] text-white">
              {siteConfig.name}
            </p>
            <p className="studio-eyebrow mt-1 text-[#c8ff00]">Kids Move Lab</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.missionLine}
            </p>
            <Link href={siteConfig.cta.primaryHref} className="studio-btn mt-8">
              {siteConfig.cta.primary}
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="studio-eyebrow text-white/45">{column.title}</h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-xs font-bold uppercase tracking-[0.1em] text-white/75 transition-colors hover:text-[#c8ff00]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/12 pt-8 sm:grid-cols-3">
          <p className="flex items-start gap-2.5 text-xs text-white/60">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#c8ff00]" aria-hidden />
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
              {siteConfig.contact.email}
            </a>
          </p>
          <p className="flex items-start gap-2.5 text-xs text-white/60">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#c8ff00]" aria-hidden />
            {siteConfig.contact.phonePlaceholder}
          </p>
          <p className="flex items-start gap-2.5 text-xs text-white/60">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c8ff00]" aria-hidden />
            Pan India
          </p>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="studio-container flex flex-col gap-2 py-5 text-[11px] uppercase tracking-[0.1em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.productName}
          </p>
          <p>{siteConfig.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
