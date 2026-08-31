import Image from "next/image";
import { ActiveFinalCta } from "@/components/active-layout/active-cta";
import { ActiveSection } from "@/components/active-layout/active-blocks";
import { ActivePageHero } from "@/components/active-layout/active-page-hero";
import { galleryImages, galleryPreviewSlides } from "@/content/media";

export function ActiveGalleryPage() {
  return (
    <>
      <ActivePageHero
        eyebrow="Gallery"
        title="The Move Lab in motion"
        description="Energy, equipment and student experiences inside Triple Z Kids Move Lab."
        image={galleryPreviewSlides[0]}
      />
      <ActiveSection tone="white" eyebrow="Gallery" heading="Every frame, real movement">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <li
              key={`${image.src}-${index}`}
              className={
                index % 7 === 0
                  ? "relative aspect-square overflow-hidden rounded-2xl bg-[#d2fefe] sm:col-span-2 sm:row-span-2"
                  : "relative aspect-square overflow-hidden rounded-2xl bg-[#d2fefe]"
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
      </ActiveSection>
      <ActiveFinalCta />
    </>
  );
}
