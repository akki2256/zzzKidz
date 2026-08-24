import { GalleryGrid } from "@/components/sections/gallery-grid";
import { MediaSlideshow } from "@/components/shared/media-slideshow";
import { PremiumGallery } from "@/components/premium-coaching-layout/premium-gallery";
import {
  PremiumConsultationCta,
  PremiumFinalCta,
} from "@/components/premium-coaching-layout/premium-cta-sections";
import { PremiumPageHero } from "@/components/premium-coaching-layout/premium-page-hero";
import { galleryImages, galleryPreviewSlides } from "@/content/media";

export function PremiumGalleryPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Gallery"
        title="Move Lab"
        titleAccent="In Motion"
        description="Explore the energy, equipment and student experiences inside Triple Z Kids Move Lab."
        breadcrumbLabel="Gallery"
      />

      <section className="pb-14">
        <div className="premium-container overflow-hidden rounded-[20px] border border-white/10 bg-black">
          <MediaSlideshow
            slides={galleryPreviewSlides}
            variant="inline"
            aspectClassName="aspect-[16/9]"
            priority
          />
        </div>
      </section>

      <PremiumGallery />

      <section className="pb-16">
        <div className="premium-container">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      <PremiumConsultationCta />
      <PremiumFinalCta />
    </>
  );
}
