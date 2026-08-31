import Image from "next/image";
import { Play } from "lucide-react";
import { galleryPreviewSlides, heroSlides } from "@/content/media";

/** Full-bleed cinematic hero with centered uppercase headline — activekids.org. */
export function ActiveHero() {
  const image = galleryPreviewSlides[0] ?? heroSlides[0];

  return (
    <section className="relative isolate flex min-h-[58vh] items-center justify-center overflow-hidden sm:min-h-[68vh] lg:min-h-[76vh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#172c5f]/45" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#172c5f]/70 via-transparent to-[#172c5f]/25"
      />

      <div className="active-container relative z-[1] flex flex-col items-center px-4 py-20 text-center text-white">
        <span className="mb-5 grid h-14 w-14 place-items-center rounded-full border-2 border-white/80 bg-white/15 text-white backdrop-blur-sm">
          <Play className="h-6 w-6 fill-current" aria-hidden />
          <span className="sr-only">Play highlight</span>
        </span>
        <h1 className="active-display max-w-4xl text-[clamp(1.85rem,5.5vw,3.75rem)] drop-shadow-md">
          Active play isn&apos;t just fun
          <br />
          — it&apos;s essential!
        </h1>
      </div>
    </section>
  );
}
