import Link from "next/link";
import { PulseHowWeWorkScroll } from "@/components/pulse-layout/pulse-how-we-work-scroll";
import { siteConfig } from "@/content/site";

export function PulseHowItWorksPage() {
  return (
    <div className="bg-[#070909] text-white">
      <section className="pulse-container border-b border-white/10 pb-10 pt-28 sm:pb-12 sm:pt-32">
        <p className="pulse-eyebrow text-[var(--p-accent)]">How it works</p>
        <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.6rem,8vw,5.5rem)] uppercase leading-[0.9]">
          What we provide <span className="pulse-accent-text">to your school</span>
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
          A complete, end-to-end Move Lab delivery — we manage the process, you see the difference.
        </p>
      </section>

      <PulseHowWeWorkScroll showIntro={false} />

      <section className="pulse-container py-16 sm:py-20">
        <p className="font-display text-[clamp(1.6rem,4vw,2.8rem)] uppercase leading-[0.95] text-white">
          We take care of everything.{" "}
          <span className="pulse-accent-text">You see the difference.</span>
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={siteConfig.cta.primaryHref} className="pulse-btn">
            {siteConfig.cta.primary}
          </Link>
          <Link href="/programs" className="pulse-btn-secondary">
            Explore the Move Lab
          </Link>
        </div>
      </section>
    </div>
  );
}
