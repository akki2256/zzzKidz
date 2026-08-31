import Link from "next/link";
import { siteConfig } from "@/content/site";

/** Minimal footer while Pulse is hero-first. */
export function PulseFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--p-panel)] py-8 text-white backdrop-blur-md">
      <div className="pulse-container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs uppercase tracking-[0.14em] text-white/50">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <Link
          href={siteConfig.cta.primaryHref}
          className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--p-accent)] hover:underline"
        >
          {siteConfig.cta.primary}
        </Link>
      </div>
    </footer>
  );
}
