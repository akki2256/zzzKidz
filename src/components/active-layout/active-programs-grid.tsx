import Image from "next/image";
import Link from "next/link";
import { ActiveAsterisk, ActiveStickFigure } from "@/components/active-layout/active-decor";
import { galleryPreviewSlides, programStripImages } from "@/content/media";
import { zones } from "@/content/site";

const cardThemes = [
  { bg: "bg-[#7c5cbf]", accent: "#69c8c6" },
  { bg: "bg-white", accent: "#ec1f8f" },
  { bg: "bg-[#ec1f8f]", accent: "#ffc215" },
  { bg: "bg-[#b6d433]", accent: "#172c5f" },
] as const;

/** Colorful vertical program cards + VIEW ALL — activekids.org offerings strip. */
export function ActiveProgramsGrid() {
  const cards = zones.slice(0, 4).map((zone, i) => ({
    ...zone,
    image: programStripImages[i % programStripImages.length] ?? galleryPreviewSlides[i],
    theme: cardThemes[i % cardThemes.length],
  }));

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="active-container">
        <h2 className="active-display text-center text-[clamp(1.4rem,3vw,2rem)] text-[#172c5f]">
          View Program Offerings
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const light = i === 1 || i === 3;
            return (
              <article
                key={card.title}
                className={`relative flex min-h-[22rem] flex-col overflow-hidden rounded-2xl ${card.theme.bg} ${
                  light ? "border border-[rgba(23,44,95,0.1)] text-[#172c5f]" : "text-white"
                }`}
              >
                <div className="relative mx-auto mt-6 h-36 w-36 overflow-hidden rounded-full border-4 border-white/40 shadow-lg">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>

                {i % 2 === 0 ? (
                  <ActiveStickFigure
                    pose={i === 0 ? "run" : "leap"}
                    color={card.theme.accent}
                    size={48}
                    className="absolute right-3 top-3 opacity-95"
                  />
                ) : (
                  <ActiveAsterisk
                    color={card.theme.accent}
                    size={36}
                    className="absolute right-4 top-4 opacity-90"
                  />
                )}
                <ActiveAsterisk
                  color={card.theme.accent}
                  size={22}
                  variant={i === 3 ? "outline" : "solid"}
                  className="absolute bottom-24 left-4 opacity-70"
                />

                <div className="mt-auto p-5 text-center">
                  <h3 className="active-display text-base">{card.title}</h3>
                  <p
                    className={`mt-2 text-xs font-semibold leading-relaxed ${
                      light ? "text-[#172c5f]/70" : "text-white/85"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/programs" className="active-btn">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
