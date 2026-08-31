import Image from "next/image";
import type { SiteImage } from "@/lib/media";

type ActivePageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: SiteImage;
};

/** Subpage hero — full-bleed photo with centered uppercase title. */
export function ActivePageHero({ eyebrow, title, description, image }: ActivePageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[42vh] items-end overflow-hidden sm:min-h-[48vh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#172c5f]/55" />
      <div className="active-container relative z-[1] pb-10 pt-24 text-white sm:pb-12">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#ffc215]">
          {eyebrow}
        </p>
        <h1 className="active-display mt-3 max-w-3xl text-[clamp(1.9rem,5vw,3.25rem)]">{title}</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85">{description}</p>
      </div>
    </section>
  );
}
