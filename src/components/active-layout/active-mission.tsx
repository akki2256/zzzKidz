import Link from "next/link";
import { ActiveAsterisk, ActiveStickFigure } from "@/components/active-layout/active-decor";
import { siteConfig } from "@/content/site";

/** Mint mission band with serif headline + magenta CTA. */
export function ActiveMission() {
  return (
    <section className="relative overflow-hidden bg-[#d2fefe] py-14 text-center sm:py-16 lg:py-20">
      <ActiveAsterisk
        color="#f26038"
        size={52}
        className="pointer-events-none absolute left-4 top-6 opacity-90 sm:left-10"
      />
      <ActiveStickFigure
        pose="run"
        color="#a2b6df"
        size={72}
        className="pointer-events-none absolute right-3 top-4 opacity-95 sm:right-10"
      />
      <ActiveAsterisk
        color="#3aa8a6"
        size={34}
        variant="outline"
        className="pointer-events-none absolute bottom-8 left-[12%] hidden sm:block"
      />

      <div className="active-container relative z-10 max-w-3xl">
        <h2 className="active-serif text-[clamp(1.55rem,3.6vw,2.55rem)] text-[#172c5f]">
          {siteConfig.productName} is on a mission to make physical activity and play part of every
          child&apos;s day.
        </h2>
        <p className="mt-5 text-sm font-semibold text-[#172c5f]/80 sm:text-base">
          Want to help us provide more movement and play for kids?
        </p>
        <Link href={siteConfig.cta.primaryHref} className="active-btn mt-7">
          Sign Up For Free
        </Link>
      </div>
    </section>
  );
}
