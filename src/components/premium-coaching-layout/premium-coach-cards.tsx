import Image from "next/image";
import Link from "next/link";
import { coachCapabilityCards } from "@/content/programs";

/** Coaching support cards in the dark marketplace card language. */
export function PremiumCoachCards() {
  return (
    <section className="pb-14">
      <div className="premium-container">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="premium-display text-xl text-white sm:text-2xl">
              Coaching &amp; training support
            </h2>
            <p className="mt-1.5 text-sm text-white/55">
              Professional coaches, PTI training and ongoing guidance for your school.
            </p>
          </div>
          <Link
            href="/how-it-works"
            className="text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coachCapabilityCards.map((card) => (
            <article
              key={card.id}
              className="flex h-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.045]"
            >
              <div className="relative aspect-[4/3] w-full bg-white/5">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-md bg-[#6d5dfc] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-white">
                  {card.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[15px] font-bold text-white">{card.title}</h3>
                <p className="mt-0.5 text-[11px] text-white/45">{card.specialty}</p>
                <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-white/60">
                  {card.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[13px] font-semibold text-white transition-colors hover:bg-white/15"
                >
                  Talk to an expert
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
