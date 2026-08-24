import Image from "next/image";
import Link from "next/link";
import { relatedCategoryCards } from "@/content/programs";

/** "Looking for our other programs?" — dark cards with light pill CTAs. */
export function PremiumRelatedPrograms() {
  return (
    <section className="pb-14">
      <div className="premium-container">
        <h2 className="premium-display text-xl text-white sm:text-2xl">
          Looking for our other programs?
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {relatedCategoryCards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.045] text-center"
            >
              <div className="relative aspect-[16/10] w-full bg-white/5">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                <h3 className="text-base font-bold text-white">{card.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-white/55">
                  {card.description}
                </p>
                <Link href={card.href} className="premium-btn mx-auto mt-5">
                  View programs
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
