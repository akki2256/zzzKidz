import Link from "next/link";
import { siteConfig } from "@/content/site";

/** Centered consultation callout, matching the reference "need help" block. */
export function PremiumConsultationCta() {
  return (
    <section className="py-12 sm:py-14">
      <div className="premium-container text-center">
        <h2 className="premium-display text-2xl text-white sm:text-3xl">
          Need help finding the right program?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
          Request a callback to get your queries answered about space, age groups and Move Lab
          setup.
        </p>
        <Link href={siteConfig.cta.primaryHref} className="premium-btn mt-6">
          Talk to a Triple Z expert
        </Link>
      </div>
    </section>
  );
}

export function PremiumFinalCta() {
  return (
    <section className="pb-16 pt-4">
      <div className="premium-container">
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#1a1230] via-[#120f1f] to-[#0b0912] px-6 py-12 text-center sm:px-10 sm:py-14">
          <h2 className="premium-display text-2xl text-white sm:text-3xl">
            Partner with us. Transform together.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60">
            We take care of everything. You see the difference. Let&apos;s build active kids,
            confident minds and a stronger tomorrow.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={siteConfig.cta.primaryHref} className="premium-btn min-w-[180px]">
              {siteConfig.cta.primary}
            </Link>
            <Link href="/programs" className="premium-btn-outline min-w-[180px]">
              {siteConfig.cta.secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
