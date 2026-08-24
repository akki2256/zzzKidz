import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutFeatureImage, solutionFeatureImage } from "@/content/media";

const tiles = [
  {
    eyebrow: "Move Lab Setup",
    title: "The complete in-school fitness lab",
    description:
      "Zone planning, international-standard equipment, safety flooring and professional installation — designed around your available space.",
    href: "/how-it-works",
    cta: "See the process",
    image: solutionFeatureImage,
  },
  {
    eyebrow: "Coaches & Training",
    title: "Certified coaches, or we train your PTI",
    description:
      "Trained, passionate coaches who deliver every session — plus ongoing guidance and support for your existing staff.",
    href: "/why-us",
    cta: "Why schools choose us",
    image: aboutFeatureImage,
  },
] as const;

/** Two square-edged promotional tiles with media and a text link. */
export function StudioPromoTiles() {
  return (
    <section className="bg-black">
      <div className="grid lg:grid-cols-2">
        {tiles.map((tile) => (
          <article key={tile.eyebrow} className="group relative isolate overflow-hidden">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[4/3]">
              <Image
                src={tile.image.src}
                alt={tile.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <p className="studio-eyebrow text-[#c8ff00]">{tile.eyebrow}</p>
              <h2 className="studio-display mt-3 max-w-md text-[clamp(1.6rem,3.6vw,2.5rem)] text-white">
                {tile.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                {tile.description}
              </p>
              <Link href={tile.href} className="studio-link mt-6 text-white">
                {tile.cta}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
