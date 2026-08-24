import { Mail } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { Container } from "@/components/shared/container";
import { CtaLink } from "@/components/shared/cta-link";
import { NavLink } from "@/components/shared/nav-link";
import { navLinks, siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background-secondary">
      <div className="gradient-red-bar px-4 py-5 text-center">
        <p className="font-heading text-sm uppercase tracking-[0.1em] text-white sm:text-base">
          {siteConfig.slogan}
        </p>
      </div>

      <Container wide className="grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <BrandMark size="lg" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground-muted">
            {siteConfig.description}
          </p>
          <div className="mt-6">
            <CtaLink href={siteConfig.cta.primaryHref}>{siteConfig.cta.primary}</CtaLink>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-sm uppercase tracking-[0.1em] text-foreground">
            Explore
          </h2>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} variant="footer">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm uppercase tracking-[0.1em] text-foreground">
            Connect
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="rounded-md border border-dashed border-border px-3 py-2 text-xs">
              Phone: {siteConfig.contact.phonePlaceholder}
            </li>
            <li className="pt-2 text-foreground">
              One partner. Complete solution.
              <br />
              Better future for every child.
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-5">
        <Container
          wide
          className="flex flex-col gap-2 text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {new Date().getFullYear()} {siteConfig.productName}. All rights reserved.
          </p>
          <p>{siteConfig.missionLine}</p>
        </Container>
      </div>
    </footer>
  );
}
