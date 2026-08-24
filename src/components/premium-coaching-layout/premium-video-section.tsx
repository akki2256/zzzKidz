import { MediaSlideshow } from "@/components/shared/media-slideshow";
import { heroSlides, solutionFeatureImage } from "@/content/media";

export function PremiumVideoSection() {
  return (
    <section className="pb-14">
      <div className="premium-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
            Program Experience
          </p>
          <h2 className="premium-display mt-3 text-2xl text-white sm:text-3xl">
            See the Move Lab in action
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
            Structured sessions, expert supervision and age-appropriate equipment — designed to
            develop complete physical literacy in every child.
          </p>
        </div>
        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black">
          <MediaSlideshow
            slides={[solutionFeatureImage, ...heroSlides.slice(0, 3)]}
            variant="inline"
            aspectClassName="aspect-[16/10]"
            objectPosition="object-center"
            autoPlay
            intervalMs={6000}
          />
        </div>
      </div>
    </section>
  );
}
