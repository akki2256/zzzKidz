"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { NoirHomeScrollRoot } from "@/components/noir-layout/noir-home-scroll-root";
import { NoirSection } from "@/components/noir-layout/noir-section";
import { NoirStickyMenuSync } from "@/components/noir-layout/noir-sticky-menu-sync";
import { PhoneLink } from "@/components/shared/social-links";
import { galleryPreviewSlides, heroSlides } from "@/content/media";
import {
  activities,
  heroContent,
  keyActivities,
  processSteps,
  siteConfig,
  whyUsPillars,
} from "@/content/site";
import { cn } from "@/lib/utils";

const programItems = activities.slice(0, 8);
const processPreview = processSteps.slice(0, 6);
const whyPreview = whyUsPillars.slice(0, 4);

function NoirHero() {
  const heroImage = heroSlides[0];

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden border-b border-white/10"
      aria-labelledby="noir-hero-heading"
    >
      <div className="absolute inset-0 h-full w-full" aria-hidden>
        <Image
          src={heroImage.src}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1400px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070909] via-[#070909]/75 to-[#070909]/35" />
        <div className="absolute inset-0 bg-[#070909]/25" />
      </div>

      <div className="noir-container relative z-10 pb-16 pt-28 sm:pb-20 sm:pt-32">
        <p className="noir-eyebrow text-[var(--n-accent)] motion-safe:animate-[noir-fade-up_0.55s_ease_both]">
          {heroContent.eyebrow}
        </p>
        <h1
          id="noir-hero-heading"
          className="noir-display mt-4 max-w-[14ch] text-[clamp(3.2rem,12vw,7.5rem)] text-white motion-safe:animate-[noir-fade-up_0.6s_ease_0.05s_both]"
        >
          {siteConfig.name}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 motion-safe:animate-[noir-fade-up_0.55s_ease_0.1s_both] sm:text-lg">
          {heroContent.supporting}
        </p>
        <div className="mt-8 flex flex-wrap gap-3 motion-safe:animate-[noir-fade-up_0.5s_ease_0.16s_both]">
          <Link href={siteConfig.cta.primaryHref} className="noir-btn">
            {siteConfig.cta.primary}
          </Link>
          <a href="#noir-programs" className="noir-btn-secondary">
            {siteConfig.cta.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}

function ProgramsPanel() {
  return (
    <div className="space-y-8">
      <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
        Age-wise movement programs that build strength, coordination, confidence and lasting
        fitness habits inside your school.
      </p>
      <ul className="flex flex-wrap gap-2" aria-label="Key activities">
        {keyActivities.map((label) => (
          <li
            key={label}
            className="rounded-full border border-white/15 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white/80"
          >
            {label}
          </li>
        ))}
      </ul>
      <div className="grid gap-3 sm:grid-cols-2">
        {programItems.map((item) => (
          <article
            key={item.title}
            className="border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[var(--n-accent)]/40"
          >
            <h3 className="text-sm font-extrabold uppercase tracking-[0.08em] text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
          </article>
        ))}
      </div>
      <Link href="/programs" className="noir-btn-secondary">
        Explore programs
      </Link>
    </div>
  );
}

function GalleryPanel() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
        Training, coaching, and student movement inside Triple Z Kids Move Labs.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
        {galleryPreviewSlides.map((slide, index) => (
          <figure
            key={slide.src}
            className={cn(
              "noir-gallery-item relative aspect-[4/3]",
              index === 0 && "col-span-2 aspect-[16/9] md:col-span-2",
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes={
                index === 0
                  ? "(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 40vw"
                  : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 22vw"
              }
              className="object-cover"
            />
            <figcaption className="noir-gallery-caption">
              <span className="text-xs font-semibold leading-snug text-white">{slide.alt}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery" className="noir-btn-secondary">
        View gallery
      </Link>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
        {siteConfig.description}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {whyPreview.map((item) => (
          <article key={item.title} className="border border-white/10 bg-white/[0.03] p-4">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[var(--n-accent)]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
          </article>
        ))}
      </div>
      <Link href="/why-us" className="noir-btn-secondary">
        Why partner with us
      </Link>
    </div>
  );
}

function ProcessPanel() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
        A complete, end-to-end solution — we manage, you benefit.
      </p>
      <ol className="grid gap-3 sm:grid-cols-2">
        {processPreview.map((step, index) => (
          <li key={step.title} className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[var(--n-accent)]">
              Step {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-sm font-extrabold uppercase tracking-[0.06em] text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{step.points[0]}</p>
          </li>
        ))}
      </ol>
      <Link href="/how-it-works" className="noir-btn-secondary">
        How it works
      </Link>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="space-y-8">
      <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
        Let&apos;s build a Fit India — one school at a time. Share your school details and
        we&apos;ll guide you through the next step.
      </p>
      <ul className="space-y-4 text-sm">
        <li>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex items-center gap-2 text-white transition-colors hover:text-[var(--n-accent)]"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden />
            {siteConfig.contact.email}
          </a>
        </li>
        <li>
          <PhoneLink className="inline-flex items-center gap-2 text-white transition-colors hover:text-[var(--n-accent)]" />
        </li>
        <li>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white transition-colors hover:text-[var(--n-accent)]"
          >
            WhatsApp {siteConfig.contact.phone}
          </a>
        </li>
      </ul>
      <Link href={siteConfig.cta.primaryHref} className="noir-btn">
        {siteConfig.cta.primary}
      </Link>
    </div>
  );
}

/** Dark Boxus-inspired one-page homepage for the Noir layout. */
export function NoirHomePage() {
  return (
    <NoirHomeScrollRoot>
      <NoirStickyMenuSync />
      <NoirHero />
      <NoirSection id="noir-programs" number="01" title="Programs" tone="green" align="left">
        <ProgramsPanel />
      </NoirSection>
      <NoirSection id="noir-gallery" number="02" title="Gallery" tone="violet" align="right">
        <GalleryPanel />
      </NoirSection>
      <NoirSection id="noir-about" number="03" title="Why Us" tone="amber" align="left">
        <AboutPanel />
      </NoirSection>
      <NoirSection id="noir-process" number="04" title="Process" tone="rose" align="right">
        <ProcessPanel />
      </NoirSection>
      <NoirSection id="noir-contact" number="05" title="Contact" tone="green" align="left">
        <ContactPanel />
      </NoirSection>
    </NoirHomeScrollRoot>
  );
}
