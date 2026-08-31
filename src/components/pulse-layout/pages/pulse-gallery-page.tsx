import { PulseStubPage } from "@/components/pulse-layout/pulse-stub-page";
import { galleryImages } from "@/content/media";

export function PulseGalleryPage() {
  return (
    <PulseStubPage
      title="Gallery"
      description="Photography from Triple Z Kids Move Lab facilities, programmes, coaching and student experiences."
      image={galleryImages[0]}
    />
  );
}
