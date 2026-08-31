"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PULSE_HERO_VIDEO } from "@/content/pulse-nav";
import { heroSlides } from "@/content/media";
import { heroContent } from "@/content/site";

const footerLinks = [
  { href: "/programs", label: "Explore the Move Lab" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Partner With Us" },
] as const;

/** Full-bleed video hero — Les Mills–inspired athletic composition. */
export function PulseHero() {
  const reduceMotion = useReducedMotion();
  const poster = heroSlides[0];

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-black">
      {reduceMotion ? (
        <Image
          src={poster.src}
          alt={poster.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
      ) : (
        <>
          <video
            className="-z-10 absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster.src}
            aria-hidden
          >
            <source src={PULSE_HERO_VIDEO} type="video/mp4" />
          </video>
          {/* Fallback still for failed video decode */}
          <Image
            src={poster.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
            aria-hidden
          />
        </>
      )}

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/45 to-black/20"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/15" />

      <div className="pulse-container relative w-full pb-12 pt-28 sm:pb-14 lg:pb-16">
        <p className="pulse-eyebrow text-[var(--p-accent)]">{heroContent.eyebrow}</p>

        <h1 className="pulse-display mt-4 max-w-5xl text-[clamp(2.6rem,10vw,6.75rem)] text-white">
          Triple Z Kids{" "}
          <span className="pulse-accent-text">Move Lab</span>
        </h1>

        <p className="mt-5 max-w-2xl text-[11px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-white/88 sm:text-xs sm:tracking-[0.16em]">
          {heroContent.supporting}
        </p>

        <div className="mt-10 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
          <nav
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3"
            aria-label="Hero shortcuts"
          >
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="pulse-underline-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href="#pulse-after-hero"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-end text-white transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--p-accent)] sm:self-auto"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="h-7 w-7" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
