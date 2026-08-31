import Link from "next/link";
import { siteConfig } from "@/content/site";

/** Closing CTA on royal blue — mirrors Active Kids “get started” energy. */
export function ActiveFinalCta() {
  return (
    <section className="bg-[#5261ac] py-16 text-center sm:py-20">
      <div className="active-container max-w-2xl">
        <h2 className="active-display text-[clamp(1.6rem,3.8vw,2.5rem)] text-white">
          How do I get started?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/85">
          Sign up your school — share space, age groups and goals. We&apos;ll guide design, setup,
          coaches and curriculum from there.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={siteConfig.cta.primaryHref} className="active-btn">
            Click Here To Partner
          </Link>
          <Link href="/how-it-works" className="active-btn-outline">
            See How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
