import Link from "next/link";
import { siteConfig } from "@/content/site";

type NoirStubPageProps = {
  title: string;
  description?: string;
};

/**
 * Minimal dark stub so Noir is selectable site-wide before inner pages are built.
 */
export function NoirStubPage({
  title,
  description = "This page is coming soon in the Noir layout. The homepage is ready — explore it while we finish the rest.",
}: NoirStubPageProps) {
  return (
    <section className="border-b border-white/10">
      <div className="noir-container flex min-h-[70svh] flex-col justify-center py-24 sm:py-28">
        <p className="noir-eyebrow text-[var(--n-accent)]">Noir layout</p>
        <h1 className="noir-display mt-4 max-w-[16ch] text-[clamp(2.8rem,9vw,5.5rem)] text-white">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="noir-btn">
            Back to home
          </Link>
          <Link href={siteConfig.cta.primaryHref} className="noir-btn-secondary">
            {siteConfig.cta.primary}
          </Link>
        </div>
      </div>
    </section>
  );
}
