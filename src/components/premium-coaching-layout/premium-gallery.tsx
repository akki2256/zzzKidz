import Image from "next/image";
import Link from "next/link";
import { galleryPreviewSlides } from "@/content/media";

export function PremiumGallery() {
  return (
    <section className="pb-14">
      <div className="premium-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
              Gallery
            </p>
            <h2 className="premium-display mt-3 text-2xl text-white sm:text-3xl">
              Movement in every frame
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            View full gallery
          </Link>
        </div>

        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryPreviewSlides.map((image, index) => (
            <figure
              key={image.src}
              className="mb-4 break-inside-avoid overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04]"
            >
              <div
                className={`relative w-full overflow-hidden ${
                  index % 3 === 0
                    ? "aspect-[4/5]"
                    : index % 3 === 1
                      ? "aspect-square"
                      : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
