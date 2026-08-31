import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { CtaBand } from "@/components/shared/cta-band";
import { MediaSlideshow } from "@/components/shared/media-slideshow";
import { PageHero } from "@/components/shared/page-hero";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { ActiveGalleryPage } from "@/components/active-layout/pages/active-gallery-page";
import { PulseGalleryPage } from "@/components/pulse-layout/pages/pulse-gallery-page";
import { StudioGalleryPage } from "@/components/studio-layout/pages/studio-gallery-page";
import { MultiLayoutPage } from "@/components/theme/multi-layout-page";
import { galleryImages, heroSlides } from "@/content/media";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography from Triple Z Kids Move Lab facilities, programs, coaching, and student experiences.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <MultiLayoutPage
      original={<OriginalGalleryPage />}
      studio={<StudioGalleryPage />}
      active={<ActiveGalleryPage />}
      pulse={<PulseGalleryPage />}
    />
  );
}

function OriginalGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Move Lab"
        titleAccent="Moments"
        description="Training, coaching, and student movement inside Triple Z Kids Move Labs."
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <MediaSlideshow
            slides={heroSlides}
            variant="inline"
            aspectClassName="aspect-[16/9]"
            objectPosition="object-center"
            priority
          />
        </Container>
      </section>

      <section className="border-b border-border bg-background-secondary py-16 sm:py-20">
        <Container>
          <GalleryGrid images={galleryImages} />
        </Container>
      </section>

      <CtaBand title="Ready to see this in your school?" />
    </>
  );
}
