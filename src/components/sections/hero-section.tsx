"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaLink } from "@/components/shared/cta-link";
import { MediaSlideshow } from "@/components/shared/media-slideshow";
import { Reveal } from "@/components/shared/reveal";
import { heroSlides, programStripImages } from "@/content/media";
import { heroContent, keyActivities, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const programStrip = keyActivities.slice(0, 6).map((title, index) => ({
  title,
  href: "/programs",
  image: programStripImages[index] ?? programStripImages[0],
}));

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <MediaSlideshow slides={heroSlides} variant="hero" priority intervalMs={6000} />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/92" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container-wide relative z-10 flex min-h-[100svh] flex-col justify-between pb-6 pt-10 sm:pb-8 sm:pt-14">
        <div className="flex flex-1 flex-col items-center justify-center px-1 text-center">
          <Reveal className="w-full max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/90 sm:text-sm">
              {heroContent.eyebrow}
            </p>

            <h1 className="mt-5 font-display text-[clamp(3.25rem,12vw,8.5rem)] uppercase text-white">
              Building a{" "}
              <span className="text-accent">Fit</span>
              <span className="block">India</span>
            </h1>

            <p className="mx-auto mt-3 font-heading text-[clamp(1.25rem,3vw,2rem)] uppercase tracking-[0.06em] text-white">
              {heroContent.headlineAccent}
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-white sm:text-lg md:text-xl">
              {heroContent.supporting}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CtaLink href={siteConfig.cta.primaryHref} size="xl" className="min-w-[200px]">
                {siteConfig.cta.primary}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </CtaLink>
              <CtaLink
                href={siteConfig.cta.secondaryHref}
                variant="secondary"
                size="xl"
                className="min-w-[200px] border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white/10"
              >
                {siteConfig.cta.secondary}
              </CtaLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="w-full">
          <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="mx-auto flex w-max min-w-full gap-2 sm:gap-3 lg:grid lg:w-full lg:grid-cols-6 lg:gap-3">
              {programStrip.map((item, index) => (
                <li key={item.title} className="w-[11rem] shrink-0 sm:w-auto">
                  <Link
                    href={item.href}
                    prefetch
                    scroll
                    className={cn(
                      "group flex h-full min-h-[48px] touch-manipulation items-center gap-3 overflow-hidden rounded-lg border px-2 py-2 transition-all duration-200 ease-out active:scale-[0.99]",
                      "border-white/15 bg-black/45 backdrop-blur-md",
                      "hover:border-accent hover:bg-black/65",
                      index === 0 && "border-accent/70",
                    )}
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-white/10">
                      <Image
                        src={item.image.src}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        aria-hidden
                      />
                    </span>
                    <span className="font-heading text-sm uppercase leading-tight tracking-wide text-white group-hover:text-accent">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
