import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PhoneLink, SocialLinks } from "@/components/shared/social-links";
import { siteConfig } from "@/content/site";

const footerLinks = [
  { href: "/programs", label: "Programs" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

/** Compact dark footer for the Noir layout. */
export function NoirFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#050505] text-white">
      <div className="noir-container grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${siteConfig.productName} home`}>
            <span className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image src={siteConfig.logo} alt="" width={40} height={40} className="object-cover" />
            </span>
            <span>
              <span className="block text-sm font-extrabold uppercase tracking-[0.14em]">
                {siteConfig.name}
              </span>
              <span className="mt-0.5 block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--n-accent)]">
                Kids Move Lab
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">{siteConfig.description}</p>
          <SocialLinks className="mt-6" tone="pulse" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-white/40">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-[var(--n-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 text-sm text-white/65">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-start gap-2.5 transition-colors hover:text-[var(--n-accent)]"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--n-accent)]" aria-hidden />
              {siteConfig.contact.email}
            </a>
            <p className="inline-flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--n-accent)]" aria-hidden />
              <PhoneLink className="hover:text-[var(--n-accent)]" />
            </p>
            <p className="inline-flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--n-accent)]" aria-hidden />
              Pan India
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="noir-container flex flex-col gap-2 py-5 text-[0.68rem] uppercase tracking-[0.14em] text-white/35 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.productName}
          </p>
          <p>{siteConfig.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
