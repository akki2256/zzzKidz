"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easeOutExpo } from "@/lib/motion";

const zzzMeanings = [
  {
    letter: "Z",
    name: "Zumba",
    description: "Rhythm, energy and joyful movement that keeps every child engaged.",
    asset: "/images/brand/pulse-z-1.png",
  },
  {
    letter: "Z",
    name: "Zumnastic",
    description: "Strength, balance and body control developed through playful challenges.",
    asset: "/images/brand/pulse-z-2.png",
  },
  {
    letter: "Z",
    name: "Zumnasana",
    description: "Mindful movement, mobility and confidence for a calmer, stronger mind.",
    asset: "/images/brand/pulse-z-3.png",
  },
] as const;

const zSlideDuration = 1.35;
const zSlideStagger = 0.52;

/**
 * Post-hero ZZZ story: the three marks enter from right to left, stack vertically,
 * then open into the meaning of each Z.
 */
export function PulseZzzReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [vertical, setVertical] = useState(Boolean(reduceMotion));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    // Let the final Z complete its long slide before changing orientation.
    const timer = window.setTimeout(() => setVertical(true), 3300);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="pulse-after-hero"
      className="relative overflow-hidden border-b border-white/10 bg-[#080808] pb-16 pt-2 sm:pb-24 sm:pt-3"
      aria-label="ZZZ movement programmes"
    >
      <div className="pulse-container">
        <div className="grid gap-12">
          <div className="relative flex min-h-[18rem] flex-col items-start justify-start pt-0 sm:min-h-[22rem] sm:pt-0">
            <div
              aria-hidden
              className="absolute h-64 w-64 rounded-full bg-[var(--p-accent)]/10 blur-3xl sm:h-80 sm:w-80"
            />

            <motion.div
              layout
              className={
                vertical
                  ? "pulse-zzz-stage relative flex w-full max-w-3xl flex-col items-start gap-3"
                  : "pulse-zzz-stage relative flex w-full items-stretch gap-2 sm:gap-3"
              }
              transition={{ duration: 0.65, ease: easeOutExpo }}
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
                    transition={{ duration: 0.72, delay: 0, ease: easeOutExpo }}
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
                        transition={{
                          duration: 0.8,
                          delay: reduceMotion ? 0 : 0.35 + index * 0.55,
                          ease: easeOutExpo,
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
          </div>
        </div>
      </div>
    </section>
  );
}
