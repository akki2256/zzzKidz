import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
  /** Visual size for header/footer contexts */
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { box: "h-10 w-10", px: 40 },
  md: { box: "h-12 w-12 sm:h-14 sm:w-14", px: 56 },
  lg: { box: "h-16 w-16 sm:h-20 sm:w-20", px: 80 },
} as const;

export function BrandMark({ className, compact = false, size = "md" }: BrandMarkProps) {
  const dims = sizeMap[size];

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${siteConfig.productName} home`}
    >
      <span
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full shadow-[0_0_28px_rgba(225,29,46,0.22)] transition-transform duration-300 group-hover:scale-[1.03]",
          dims.box,
        )}
      >
        <Image
          src={siteConfig.logo}
          alt={`${siteConfig.productName} logo`}
          width={dims.px}
          height={dims.px}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {!compact ? (
        <span className="flex min-w-0 flex-col leading-none">
          <span className="font-heading text-lg uppercase tracking-[0.04em] text-white transition-colors group-hover:text-accent sm:text-xl">
            {siteConfig.name}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/75">
            Kids Move Lab
          </span>
        </span>
      ) : null}
    </Link>
  );
}
