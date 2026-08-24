import { PremiumCoachCards } from "@/components/premium-coaching-layout/premium-coach-cards";
import {
  PremiumConsultationCta,
  PremiumFinalCta,
} from "@/components/premium-coaching-layout/premium-cta-sections";
import { PremiumPageHero } from "@/components/premium-coaching-layout/premium-page-hero";
import { approachPillars, siteConfig, thankYouPillars, trustPillars } from "@/content/site";
import { aboutFeatureImage, heroSlides } from "@/content/media";
import { MediaSlideshow } from "@/components/shared/media-slideshow";

export function PremiumAboutPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="About ZZZKidz"
        title="Introducing"
        titleAccent="Triple Z Kids Move Lab"
        description={`${siteConfig.description} Not just exercise — complete movement education.`}
        breadcrumbLabel="About"
      />

      <section className="pb-14">
        <div className="premium-container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="premium-display text-2xl text-white sm:text-3xl">
              Move better. Get stronger. <span className="text-white/55">Grow together.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              We don&apos;t just build fitness spaces, we build better futures.
            </p>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black">
            <MediaSlideshow
              slides={[aboutFeatureImage, ...heroSlides.slice(0, 3)]}
              variant="inline"
              aspectClassName="aspect-[16/10]"
            />
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="premium-container">
          <h2 className="premium-display text-xl text-white sm:text-2xl">Our approach</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {approachPillars.map((item) => (
              <article key={item.title} className="p-surface p-6">
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="premium-container grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {thankYouPillars.map((item) => (
            <article key={item.title} className="p-surface p-6">
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-[13px] text-white/60">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="premium-container mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map((item) => (
            <article key={item.title} className="p-surface p-5">
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-[13px] text-white/60">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <PremiumCoachCards />
      <PremiumConsultationCta />
      <PremiumFinalCta />
    </>
  );
}
