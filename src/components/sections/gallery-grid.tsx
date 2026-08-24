"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaSlideshow } from "@/components/shared/media-slideshow";
import type { SiteImage } from "@/lib/media";
import { cn } from "@/lib/utils";

type GalleryGridProps = {
  images: SiteImage[];
  className?: string;
};

export function GalleryGrid({ images, className }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className={cn(
          "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          className,
        )}
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-background-elevated text-left"
            onClick={() => setLightboxIndex(index)}
            aria-label={`Open gallery image: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="line-clamp-2 text-xs font-medium text-white/90">{image.alt}</span>
            </span>
          </button>
        ))}
      </div>

      {lightboxIndex !== null ? (
        <MediaSlideshow
          slides={images}
          variant="lightbox"
          autoPlay={false}
          initialIndex={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
          aspectClassName="aspect-[16/10] max-h-[75vh]"
        />
      ) : null}
    </>
  );
}
