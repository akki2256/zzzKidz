import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/lib/media";
import { siteConfig } from "@/content/site";

type PulseStubPageProps = {
  title: string;
  description: string;
  image?: SiteImage;
};

/**
 * Temporary inner-page shell for Pulse while only the hero is fully designed.
 * Keeps routing usable from the stacked menu.
 */
export function PulseStubPage({ title, description, image }: PulseStubPageProps) {
  return (
    <section className="relative isolate min-h-[70svh] overflow-hidden bg-black pt-24 text-white">
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="-z-10 object-cover object-center opacity-45"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/40" />
        </>
      ) : null}

      <div className="pulse-container py-16 sm:py-24">
        <p className="pulse-eyebrow text-[var(--p-accent)]">Pulse layout</p>
        <h1 className="pulse-display mt-4 max-w-4xl text-[clamp(2.4rem,8vw,5rem)]">{title}</h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
          {description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="pulse-btn">
            Back to home
          </Link>
          <Link href={siteConfig.cta.primaryHref} className="pulse-btn-secondary">
            {siteConfig.cta.primary}
          </Link>
        </div>
      </div>
    </section>
  );
}
