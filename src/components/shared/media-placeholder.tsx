import { cn } from "@/lib/utils";

type MediaPlaceholderProps = {
  label: string;
  aspect?: "video" | "square" | "portrait" | "wide" | "hero";
  className?: string;
  caption?: string;
};

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  hero: "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[5/4]",
};

export function MediaPlaceholder({
  label,
  aspect = "wide",
  className,
  caption,
}: MediaPlaceholderProps) {
  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "media-slot rounded-xl",
          aspectMap[aspect],
          "flex items-end p-5 transition-transform duration-500 group-hover:scale-[1.01]",
        )}
        data-label="Image slot"
        role="img"
        aria-label={label}
      >
        <div className="relative z-10 max-w-xs">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">
            Photography
          </p>
          <p className="mt-2 text-sm font-medium text-foreground/90">{label}</p>
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-foreground-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
