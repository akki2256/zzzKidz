"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardMarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop */
  duration?: number;
  gapClassName?: string;
  cardClassName?: string;
  ariaLabel?: string;
  /** Tailwind from-* color for edge fades */
  edgeFromClassName?: string;
};

/**
 * Equal-height horizontal marquee used for premium feature strips.
 * Duplicates the track for a seamless loop. Pauses on hover.
 */
export function CardMarquee({
  children,
  className,
  duration = 42,
  gapClassName = "gap-4",
  cardClassName = "w-[18rem] sm:w-[20rem]",
  ariaLabel = "Scrolling features",
  edgeFromClassName = "from-background",
}: CardMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const items = React.Children.toArray(children).filter(Boolean);
  const track = reduceMotion ? items : [...items, ...items];

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6",
          className,
        )}
        aria-label={ariaLabel}
        role="region"
      >
        <div className={cn("flex w-max items-stretch", gapClassName)}>
          {items.map((child, index) => (
            <div key={index} className={cn("flex shrink-0", cardClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-label={ariaLabel}
      role="region"
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r to-transparent sm:w-16",
          edgeFromClassName,
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l to-transparent sm:w-16",
          edgeFromClassName,
        )}
      />

      <div
        className={cn(
          "marquee-track flex w-max items-stretch hover:[animation-play-state:paused]",
          gapClassName,
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {track.map((child, index) => (
          <div
            key={index}
            className={cn("flex shrink-0", cardClassName)}
            aria-hidden={index >= items.length}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
