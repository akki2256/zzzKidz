import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { foundationImages } from "@/content/media";
import { foundationOutcomes, siteConfig } from "@/content/site";

/** Mission block: full-height media beside an outcome list. */
export function StudioMission() {
  const image = foundationImages[2] ?? foundationImages[0];
  const outcomes = foundationOutcomes.slice(0, 3);

  return (
    <section className="bg-black">
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          <p className="studio-eyebrow text-[#c8ff00]">Our Mission</p>
          <h2 className="studio-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-white">
            {siteConfig.missionLine}
          </h2>

          <dl className="mt-10 divide-y divide-white/12 border-y border-white/12">
            {outcomes.map((outcome) => (
              <div key={outcome.title} className="py-5">
                <dt className="studio-display text-[clamp(1.25rem,2.2vw,1.6rem)] text-white">
                  {outcome.title}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-white/60">
                  {outcome.description}
                </dd>
              </div>
            ))}
          </dl>

          <Link href="/benefits" className="studio-link mt-9 self-start text-white">
            See all outcomes
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
