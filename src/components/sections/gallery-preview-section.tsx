import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { MediaSlideshow } from "@/components/shared/media-slideshow";
import { Reveal } from "@/components/shared/reveal";
import { galleryPreviewSlides } from "@/content/media";

export function GalleryPreviewSection() {
  return (
    <section className="border-b border-border bg-background-secondary py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                Gallery
              </p>
              <h2 className="mt-3 font-heading text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">
                Move Lab <span className="text-accent">Moments</span>
              </h2>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-foreground-muted">
                Training, coaching, and student movement inside Triple Z Kids Move Labs.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-foreground"
            >
              View full gallery
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <MediaSlideshow
            slides={galleryPreviewSlides}
            variant="inline"
            aspectClassName="aspect-[16/9]"
            objectPosition="object-center"
            priority
          />
        </Reveal>
      </Container>
    </section>
  );
}
