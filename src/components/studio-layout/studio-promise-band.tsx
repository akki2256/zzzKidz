import { promises } from "@/content/site";

/**
 * Commitment band. The reference site runs member testimonials here; this
 * project has no verified reviews, so it presents the programme promises
 * instead rather than fabricating social proof.
 */
export function StudioPromiseBand() {
  return (
    <section className="bg-[#f1f1ef] py-16 text-[#0b0b0b] sm:py-20">
      <div className="studio-container">
        <p className="studio-eyebrow text-[#55555c]">Our Promise</p>
        <h2 className="studio-display mt-4 max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)]">
          What every school can expect
        </h2>

        <div className="mt-12 grid gap-px border border-black/12 bg-black/12 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((promise) => (
            <article key={promise.title} className="bg-[#f1f1ef] p-7">
              <h3 className="studio-display text-[clamp(1.3rem,2.2vw,1.75rem)]">
                {promise.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#55555c]">
                {promise.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
