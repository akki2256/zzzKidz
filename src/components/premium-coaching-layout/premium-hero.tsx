"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { heroSlides } from "@/content/media";
import { siteConfig } from "@/content/site";
import { premiumHeroBullets, premiumTrustMetrics } from "@/content/programs";

/** Dark aurora hero: left copy + bullets + chips, right image with floating glass stat cards. */
export function PremiumHero() {
  const heroImage = heroSlides[0];
  const [first, second, third] = premiumTrustMetrics;

  return (
    <section className="relative">
      <div className="premium-container grid items-center gap-10 pb-10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-16 lg:pt-16">
        {/* Left copy */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
            Kids Move Lab Coaching
          </p>
          <h1 className="premium-display mt-4 max-w-xl text-[clamp(1.9rem,4.4vw,3rem)] text-white">
            Build strength &amp; confidence with expert coaches
          </h1>

          <ul className="mt-7 space-y-3.5">
            {premiumHeroBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-[14px] text-white/72">
                <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border border-white/35">
                  <Check className="h-2.5 w-2.5 text-white" aria-hidden />
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          {/* Credibility chips */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            <span className="p-chip">{first.value} {first.label.toLowerCase()}</span>
            <span className="p-chip">
              <Sparkles className="h-3.5 w-3.5 text-[#f0c14b]" aria-hidden />
              {second.value} {second.label.toLowerCase()}
            </span>
            <span className="p-chip">
              <ShieldCheck className="h-3.5 w-3.5 text-[#6d5dfc]" aria-hidden />
              Certified Coaches
            </span>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={siteConfig.cta.primaryHref} className="premium-btn">
              Talk to an expert
            </Link>
            <Link href="/programs" className="premium-btn-outline">
              Explore programs
            </Link>
          </div>
        </div>

        {/* Right media with floating glass stat cards */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[20px] bg-white/5 sm:max-w-md lg:max-w-[26rem]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
            />
          </div>

          {/* Stat card — top */}
          <div className="p-glass absolute left-0 top-6 flex items-center gap-3 px-3.5 py-2.5 sm:left-2 lg:left-0">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={heroSlides[1]?.src ?? heroImage.src}
                alt=""
                fill
                sizes="36px"
                className="object-cover"
                aria-hidden
              />
            </span>
            <span>
              <span className="block text-[10px] font-medium text-white/55">{first.label}</span>
              <span className="block text-sm font-bold text-white">{first.value}</span>
            </span>
          </div>

          {/* Stat card — middle */}
          <div className="p-glass absolute left-0 top-1/2 hidden -translate-y-1/2 items-center gap-3 px-3.5 py-2.5 sm:flex">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={heroSlides[2]?.src ?? heroImage.src}
                alt=""
                fill
                sizes="36px"
                className="object-cover"
                aria-hidden
              />
            </span>
            <span>
              <span className="block text-[10px] font-medium text-white/55">{second.label}</span>
              <span className="block text-sm font-bold text-white">{second.value}</span>
              <span className="mt-0.5 flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[9px] text-[#f0c14b]">
                    ★
                  </span>
                ))}
              </span>
            </span>
          </div>

          {/* Stat card — bottom right */}
          <div className="p-glass absolute -bottom-4 right-0 px-4 py-2.5">
            <span className="block text-[10px] font-medium text-white/55">{third.label}</span>
            <span className="block text-sm font-bold text-white">{third.value}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
