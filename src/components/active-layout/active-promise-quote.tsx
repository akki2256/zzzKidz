import { ActiveAsterisk, ActiveStickFigure } from "@/components/active-layout/active-decor";
import { promises } from "@/content/site";

/**
 * Pastel mint quote band. Uses catalogue promises — no fabricated testimonials.
 */
export function ActivePromiseQuote() {
  const lead = promises[1] ?? promises[0];

  return (
    <section className="relative overflow-hidden bg-[#d2fefe] py-16 text-center sm:py-20">
      <ActiveStickFigure
        pose="crawl"
        color="#ffc215"
        accent="#ec1f8f"
        size={80}
        className="pointer-events-none absolute bottom-4 left-4 opacity-90 sm:left-10"
      />
      <ActiveAsterisk
        color="#f26038"
        size={44}
        className="pointer-events-none absolute right-6 top-8 opacity-90 sm:right-14"
      />

      <div className="active-container relative z-10 max-w-3xl">
        <p className="active-serif text-[5rem] leading-none text-[#69c8c6]" aria-hidden>
          &ldquo;
        </p>
        <blockquote className="-mt-6 text-[clamp(1.15rem,2.4vw,1.55rem)] font-semibold leading-relaxed text-[#172c5f]">
          {lead.title}. {lead.description} We take care of everything — so schools can focus on
          education while kids move, grow and thrive.
        </blockquote>
        <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.12em] text-[#172c5f]">
          Our Promise To Schools
        </p>
        <p className="mt-1 text-sm text-[#172c5f]/70">{lead.title}</p>
      </div>
    </section>
  );
}
