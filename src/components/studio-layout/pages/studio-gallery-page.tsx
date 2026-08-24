import Image from "next/image";
import { StudioFinalCta } from "@/components/studio-layout/studio-cta";
import { StudioPageHero } from "@/components/studio-layout/studio-page-hero";
import { StudioSection } from "@/components/studio-layout/studio-blocks";
import { galleryImages, galleryPreviewSlides } from "@/content/media";

export function StudioGalleryPage() {
  return (
    <>
      <StudioPageHero
        eyebrow="Gallery"
        title="The Move Lab in motion"
        description="The energy, equipment and student experiences inside Triple Z Kids Move Lab."
        image={galleryPreviewSlides[0]}
      />

      <StudioSection tone="dark" eyebrow="Gallery" heading="Every frame, real movement">
        {/* Edge-to-edge hairline mosaic keeps the square-edged Studio language */}
        <ul className="grid grid-cols-2 gap-px border border-white/14 bg-white/14 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <li
              key={`${image.src}-${index}`}
              className={
                index % 7 === 0
                  ? "relative aspect-square bg-black sm:col-span-2 sm:row-span-2"
                  : "relative aspect-square bg-black"
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading={index < 4 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </StudioSection>

      <StudioFinalCta />
    </>
  );
}
