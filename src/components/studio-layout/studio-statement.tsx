import { siteConfig } from "@/content/site";

/** Large editorial statement block on paper white. */
export function StudioStatement() {
  return (
    <section className="bg-[#f1f1ef] py-16 text-[#0b0b0b] sm:py-20 lg:py-24">
      <div className="studio-container max-w-5xl">
        <p className="text-[clamp(1.35rem,3.4vw,2.4rem)] font-bold leading-[1.25] tracking-[-0.015em]">
          {siteConfig.description} We build the space, train the coaches and run the
          programs — so every child can move better, get stronger and grow with confidence.
        </p>
        <p className="studio-eyebrow mt-8 text-[#55555c]">— {siteConfig.productName}</p>
      </div>
    </section>
  );
}
