import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";

export function StudioFinalCta() {
  return (
    <section className="border-t border-white/12 bg-black py-20 sm:py-24">
      <div className="studio-container text-center">
        <h2 className="studio-display mx-auto max-w-3xl text-[clamp(2.25rem,7vw,5rem)] text-white">
          Partner with us. Transform together.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
          We take care of everything. You see the difference.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={siteConfig.cta.primaryHref} className="studio-btn">
            {siteConfig.cta.primary}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/programs" className="studio-btn-ghost">
            {siteConfig.cta.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
