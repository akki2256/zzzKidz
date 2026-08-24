import { socialProofItems } from "@/content/programs";
import { trustPillars } from "@/content/site";

export function PremiumSocialProof() {
  return (
    <section className="pb-14">
      <div className="premium-container">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
            Our Promise
          </p>
          <h2 className="premium-display mt-3 text-2xl text-white sm:text-3xl">
            What schools value from Triple Z
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Approved programme commitments — not fabricated reviews. Real outcomes schools can
            expect from the Move Lab partnership.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {socialProofItems.map((item) => (
            <blockquote key={item.id} className="p-surface flex h-full flex-col p-6">
              <p className="premium-display text-lg leading-snug text-white">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-auto pt-6 text-xs font-bold uppercase tracking-[0.1em] text-[#8b7dff]">
                {item.context}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map((item) => (
            <article key={item.title} className="p-surface p-5">
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
