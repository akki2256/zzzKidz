"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easeOutExpo, springSoft } from "@/lib/motion";
import { mediaPath } from "@/lib/media";

const zzzMeanings = [
  {
    letter: "Z",
    name: "Zumba",
    description: "Rhythm, energy and joyful movement that keeps every child engaged.",
    asset: "/images/brand/pulse-z-1-clean.png",
    image: mediaPath("Gemini_Generated_Image_a8murna8murna8mu.png"),
    imageAlt: "Children moving through an energetic Triple Z Kids training session",
  },
  {
    letter: "Z",
    name: "Zumnastic",
    description: "Strength, balance and body control developed through playful challenges.",
    asset: "/images/brand/pulse-z-2-clean.png",
    image: mediaPath("Screenshot 2026-08-24 235137.png"),
    imageAlt: "Coach guiding a child on gymnastics rings",
  },
  {
    letter: "Z",
    name: "Zumbasana",
    description: "Mindful movement, mobility and confidence for a calmer, stronger mind.",
    asset: "/images/brand/pulse-z-3-clean.png",
    image: mediaPath("Screenshot 2026-08-24 235118.png"),
    imageAlt: "Coach and student discussing movement progress together",
  },
] as const;

const zSlideDuration = 1.35;
const zSlideStagger = 0.52;
const cardRevealDuration = 2.45;

/**
 * Post-hero ZZZ story: the three marks enter from right to left, stack vertically,
 * then open into the meaning of each Z.
 */
export function PulseZzzReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [vertical, setVertical] = useState(Boolean(reduceMotion));
  const [cardsReady, setCardsReady] = useState(Boolean(reduceMotion));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    // Let the final Z complete its long slide before changing orientation.
    const timer = window.setTimeout(() => setVertical(true), 3300);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion]);

  useEffect(() => {
    if (!vertical || reduceMotion) return;

    const timer = window.setTimeout(() => setCardsReady(true), cardRevealDuration * 1000);
    return () => window.clearTimeout(timer);
  }, [vertical, reduceMotion]);

  const previewIndex = cardsReady ? hoveredIndex ?? 0 : null;
  const previewMeaning = previewIndex === null ? undefined : zzzMeanings[previewIndex];

  return (
    <section
      ref={sectionRef}
      id="pulse-after-hero"
      className="relative overflow-hidden border-b border-white/10 bg-[#080808] pb-16 pt-2 sm:pb-24 sm:pt-3"
      aria-label="ZZZ movement programmes"
    >
      <div className="pulse-container">
        <div className="grid gap-12">
          <div className="relative flex min-h-[18rem] flex-col items-start justify-start pt-0 sm:min-h-[22rem] sm:pt-0 lg:min-h-0">
            <div
              aria-hidden
              className="absolute h-64 w-64 rounded-full bg-[var(--p-accent)]/10 blur-3xl sm:h-80 sm:w-80"
            />

            <motion.div
              layout
              className={
                vertical
                  ? "pulse-zzz-stage relative flex w-full max-w-3xl flex-col items-start gap-3 lg:max-w-[58%]"
                  : "pulse-zzz-stage relative flex w-full items-stretch gap-2 sm:gap-3"
              }
              transition={{ layout: springSoft }}
              aria-label="ZZZ movement marks"
            >
              {zzzMeanings.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  layout
                  initial={reduceMotion ? false : { x: "100vw", opacity: 0 }}
                  animate={{
                    x: reduceMotion || inView ? 0 : "100vw",
                    opacity: reduceMotion || inView ? 1 : 0,
                  }}
                  transition={{
                    x: {
                      duration: zSlideDuration,
                      delay: reduceMotion ? 0 : (2 - index) * zSlideStagger,
                      ease: easeOutExpo,
                    },
                    opacity: {
                      duration: 0.45,
                      delay: reduceMotion ? 0 : (2 - index) * zSlideStagger,
                      ease: easeOutExpo,
                    },
                    layout: springSoft,
                  }}
                  className={
                    vertical
                      ? "relative flex w-full items-center gap-2 sm:gap-4"
                      : "relative flex-1"
                  }
                >
                  <motion.div
                    layout
                    animate={{ rotateY: vertical ? [0, 90, 0] : 0 }}
                    transition={{
                      layout: springSoft,
                      rotateY: { duration: 0.82, delay: 0, ease: easeOutExpo },
                    }}
                    className={
                      vertical
                        ? "pulse-zzz-letter pulse-zzz-letter-vertical will-change-transform"
                        : "pulse-zzz-letter will-change-transform"
                    }
                  >
                    <Image
                      src={item.asset}
                      alt={`${item.name} Z mark`}
                      fill
                      sizes="(max-width: 640px) 28vw, 10rem"
                      className="object-contain"
                    />
                  </motion.div>

                  <AnimatePresence>
                    {vertical ? (
                      <motion.div
                        layout
                        className="pulse-zzz-card relative min-w-0 flex-1 overflow-hidden"
                        initial={reduceMotion ? false : { opacity: 0, x: -70, scaleX: 0.08 }}
                        animate={{ opacity: 1, x: 0, scaleX: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0, x: -30 }}
                        tabIndex={cardsReady ? 0 : -1}
                        role="group"
                        aria-label={`Preview ${item.name}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onFocus={() => setHoveredIndex(index)}
                        onBlur={() => setHoveredIndex(null)}
                        transition={{
                          duration: 0.8,
                          delay: reduceMotion ? 0 : 0.35 + index * 0.55,
                          ease: easeOutExpo,
                          layout: springSoft,
                        }}
                      >
                        <motion.div
                          className="pulse-zzz-row flex h-full gap-4 px-4 py-4 sm:px-5 sm:py-5"
                          initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.55,
                            delay: reduceMotion ? 0 : 0.28,
                            ease: easeOutExpo,
                          }}
                        >
                          <div className="min-w-0">
                            <h3 className="pulse-zzz-name text-white">
                              {item.name}
                            </h3>
                            <p className="pulse-zzz-description mt-2 text-white/75">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            <AnimatePresence mode="wait" initial={false}>
              {previewMeaning ? (
                <motion.div
                  key={previewMeaning.name}
                  className="pointer-events-none absolute inset-y-0 -right-10 hidden w-[calc(42%+2.5rem)] lg:block"
                  initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -18, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: easeOutExpo }}
                  aria-live="polite"
                >
                  <div className="pulse-zzz-preview relative h-full overflow-hidden bg-[#080808]">
                    <Image
                      src={previewMeaning.image}
                      alt={previewMeaning.imageAlt}
                      fill
                      sizes="(max-width: 1280px) 32vw, 34rem"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-[var(--p-accent)]/20"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                        Triple Z Kids Move Lab
                      </p>
                      <p className="mt-1 font-heading text-2xl uppercase tracking-[0.04em] text-white sm:text-3xl">
                        {previewMeaning.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
