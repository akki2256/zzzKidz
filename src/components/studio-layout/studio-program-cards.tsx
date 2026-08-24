import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleryPreviewSlides } from "@/content/media";
import { zones } from "@/content/site";

/** Three flagship zones presented as full-height editorial cards. */
export function StudioProgramCards() {
  const featured = zones.slice(0, 3);

  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="studio-container">
        <h2 className="studio-display max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] text-white">
          Programs built for every school
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((zone, index) => {
            const image = galleryPreviewSlides[index % galleryPreviewSlides.length];
            return (
              <article key={zone.title} className="group flex flex-col">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/5">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="studio-display mt-6 text-[clamp(1.4rem,2.4vw,1.9rem)] text-white">
                  {zone.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">
                  {zone.description}
                </p>
                <Link href="/programs" className="studio-link mt-6 self-start text-white">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
