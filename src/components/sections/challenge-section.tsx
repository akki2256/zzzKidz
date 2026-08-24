import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { StaggerGrid, StaggerItem } from "@/components/shared/stagger-grid";
import { challengeImages, foundationImages } from "@/content/media";
import { challengeItems, foundationOutcomes } from "@/content/site";

export function ChallengeSection() {
  return (
    <section className="border-b border-border bg-surface-light py-16 text-foreground-inverse sm:py-24">
      <Container>
        <Reveal direction="scale">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              Why Movement Matters
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
              Why <span className="text-accent">Movement</span> Matters More Than Ever
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-foreground-inverse-muted sm:text-lg">
              Today&apos;s children don&apos;t just need sports. They need movement skills for life.
            </p>
          </div>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <h3 className="text-center font-heading text-sm uppercase tracking-[0.12em] text-accent">
              The Challenge Today
            </h3>
          </Reveal>
          <StaggerGrid className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {challengeItems.map((item, i) => (
              <StaggerItem key={item.title} variant="blur">
                <article className="card-shine group relative h-full overflow-hidden rounded-xl bg-foreground-inverse text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={challengeImages[i]?.src ?? challengeImages[0].src}
                      alt={challengeImages[i]?.alt ?? item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-display text-3xl font-bold text-accent/90">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h4 className="mt-2 font-heading text-lg uppercase leading-snug">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">{item.description}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>

        <div className="mt-16">
          <Reveal>
            <h3 className="text-center font-heading text-sm uppercase tracking-[0.12em] text-accent">
              Movement Builds the Foundation for Life
            </h3>
          </Reveal>
          <StaggerGrid className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
            {foundationOutcomes.map((item, i) => (
              <StaggerItem key={item.title} variant={i % 2 === 0 ? "fadeUp" : "scale"}>
                <article className="card-shine group h-full overflow-hidden rounded-xl border border-border-dark bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-soft)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={foundationImages[i]?.src ?? foundationImages[0].src}
                      alt={foundationImages[i]?.alt ?? item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.1em] text-accent">
                      0{i + 1}
                    </p>
                    <h4 className="mt-3 font-heading text-lg uppercase leading-snug text-foreground-inverse">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-base font-medium leading-relaxed text-foreground-inverse-muted">
                      {item.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </Container>
    </section>
  );
}
