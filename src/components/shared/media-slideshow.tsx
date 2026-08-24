"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/lib/media";
import { Button } from "@/components/ui/button";

type MediaSlideshowProps = {
  slides: SiteImage[];
  variant?: "hero" | "inline" | "lightbox";
  autoPlay?: boolean;
  intervalMs?: number;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
  objectPosition?: string;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  onClose?: () => void;
};

export function MediaSlideshow({
  slides,
  variant = "inline",
  autoPlay = true,
  intervalMs = 5500,
  className,
  aspectClassName = "aspect-[16/9]",
  priority = false,
  objectPosition = "object-center",
  initialIndex = 0,
  onIndexChange,
  onClose,
}: MediaSlideshowProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(initialIndex);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      const wrapped = (next + count) % count;
      setIndex(wrapped);
      onIndexChange?.(wrapped);
    },
    [count, onIndexChange],
  );

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!autoPlay || reduceMotion || count <= 1 || variant === "lightbox") return;
    const timer = window.setInterval(() => goTo(index + 1), intervalMs);
    return () => window.clearInterval(timer);
  }, [autoPlay, reduceMotion, count, index, intervalMs, goTo, variant]);

  useEffect(() => {
    if (variant !== "lightbox") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant, index, goTo, onClose]);

  if (count === 0) return null;

  const current = slides[index];

  if (variant === "hero") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt=""
              fill
              priority={priority}
              sizes="100vw"
              className={cn("object-cover", objectPosition)}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "lightbox") {
    return (
      <div
        className={cn(
          "fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-8",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery slideshow"
      >
        <button
          type="button"
          className="absolute inset-0 cursor-default"
          aria-label="Close gallery"
          onClick={onClose}
        />
        <div className="relative z-10 w-full max-w-6xl">
          <div
            className={cn(
              "relative mx-auto overflow-hidden rounded-2xl bg-black",
              aspectClassName,
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1200px) 100vw, 80vw"
                  className={cn("object-contain", objectPosition)}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-4 text-center text-sm text-white/95">{current.alt}</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Previous image"
              onClick={() => goTo(index - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm text-white/90">
              {index + 1} / {count}
            </span>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Next image"
              onClick={() => goTo(index + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden rounded-2xl border border-border bg-black",
        className,
      )}
    >
      <div className={cn("relative w-full overflow-hidden", aspectClassName)}>
        {/* Keep previous frame underneath so transitions never show empty strips */}
        <div className="absolute inset-0">
          <Image
            src={current.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
            className={cn("object-cover", objectPosition)}
            aria-hidden
            priority={priority}
          />
        </div>

        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
              className={cn("object-cover", objectPosition)}
            />
          </motion.div>
        </AnimatePresence>

        {count > 1 ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute left-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border-white/25 bg-black/55 backdrop-blur-sm sm:left-4"
              aria-label="Previous slide"
              onClick={() => goTo(index - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border-white/25 bg-black/55 backdrop-blur-sm sm:right-4"
              aria-label="Next slide"
              onClick={() => goTo(index + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-white/50 hover:bg-white/80",
                  )}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
