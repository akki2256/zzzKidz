import Image from "next/image";
import type { SiteImage } from "@/lib/media";

type StudioPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: SiteImage;
};

/** Shorter full-bleed media band used at the top of every Studio subpage. */
export function StudioPageHero({ eyebrow, title, description, image }: StudioPageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[52vh] items-end overflow-hidden bg-black sm:min-h-[58vh]">
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
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/30"
      />
      <div className="studio-container pb-12 pt-24 sm:pb-16">
        <p className="studio-eyebrow text-[#c8ff00]">{eyebrow}</p>
        <h1 className="studio-display mt-4 max-w-3xl text-[clamp(2.25rem,7vw,5rem)] text-white">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75">{description}</p>
      </div>
    </section>
  );
}
