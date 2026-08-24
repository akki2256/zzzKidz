import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "@/content/media";
import { heroContent, siteConfig } from "@/content/site";

/** Full-bleed photographic hero with oversized condensed headline. */
export function StudioHero() {
  const image = heroSlides[0];

  return (
    <section className="relative isolate flex min-h-[82vh] items-end overflow-hidden bg-black lg:min-h-[88vh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/25"
      />

      <div className="studio-container pb-14 pt-28 sm:pb-16 lg:pb-20">
        <p className="studio-eyebrow text-[#c8ff00]">{heroContent.eyebrow}</p>
        <h1 className="studio-display mt-5 max-w-4xl text-[clamp(2.75rem,9vw,7rem)] text-white">
          {heroContent.headline}
          <br />
          {heroContent.headlineAccent}
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base">
          {heroContent.supporting}
        </p>

        {/* Three audience paths, mirroring the reference's single-line entry points */}
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href={siteConfig.cta.primaryHref} className="studio-btn">
            {siteConfig.cta.primary}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/programs" className="studio-btn-ghost">
            Explore Programs
          </Link>
          <Link href="/how-it-works" className="studio-btn-ghost">
            How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
