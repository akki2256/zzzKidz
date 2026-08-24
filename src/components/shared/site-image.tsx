import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/lib/media";

type SiteImageProps = {
  image: SiteImage;
  aspect?: "video" | "square" | "portrait" | "wide" | "hero" | "fill";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  hero: "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[5/4]",
  fill: "relative h-full min-h-[12rem] w-full",
};

export function SiteImageBlock({
  image,
  aspect = "wide",
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: SiteImageProps) {
  const isFill = aspect === "fill";

  return (
    <figure className={cn("group overflow-hidden", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-border bg-background-elevated",
          !isFill && aspectMap[aspect],
          isFill && aspectMap.fill,
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "object-cover transition-transform duration-700 group-hover:scale-[1.03]",
            imageClassName,
          )}
        />
      </div>
      {image.caption ? (
        <figcaption className="mt-3 text-sm text-foreground-muted">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}
