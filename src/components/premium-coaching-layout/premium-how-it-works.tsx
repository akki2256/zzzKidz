import { premiumHowItWorksSteps } from "@/content/programs";

export function PremiumHowItWorks() {
  return (
    <section className="pb-14">
      <div className="premium-container">
        <h2 className="premium-display text-xl text-white sm:text-2xl">How it works</h2>
        <p className="mt-1.5 max-w-2xl text-sm text-white/55">
          From discovery to measurable progress — a clear path for every school.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {premiumHowItWorksSteps.map((step) => (
            <article key={step.step} className="p-surface p-5">
              <p className="text-sm font-extrabold text-[#8b7dff]">{step.step}</p>
              <h3 className="mt-3 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
