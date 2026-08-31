"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { pulseNavPanels } from "@/content/pulse-nav";
import { siteConfig } from "@/content/site";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PulseStackedMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function PulseStackedMenu({ open, onClose }: PulseStackedMenuProps) {
  const pathname = usePathname();
  const titleId = useId();
  const reduceMotion = useReducedMotion();
  const pathIndex = (() => {
    const match = pulseNavPanels.findIndex((p) => p.href === pathname);
    return match >= 0 ? match : -1;
  })();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [syncKey, setSyncKey] = useState(`${open}:${pathname}`);
  const nextSyncKey = `${open}:${pathname}`;

  // Clear hover state when the menu opens or the route changes.
  if (syncKey !== nextSyncKey) {
    setSyncKey(nextSyncKey);
    if (open) setActiveIndex(-1);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const active = activeIndex >= 0 ? pulseNavPanels[activeIndex] : undefined;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-[var(--p-panel-deep)] text-white backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.28, ease: easeOutExpo }}
        >
          <h2 id={titleId} className="sr-only">
            Site navigation
          </h2>

          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <Link
              href="/"
              onClick={onClose}
              className="font-heading text-3xl uppercase tracking-[0.04em] text-white sm:text-4xl"
              aria-label={`${siteConfig.productName} home`}
            >
              Z
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <ThemeSelector compact />
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--p-accent)]"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
          </div>

          {/* Desktop / tablet: vertical stacked panels */}
          <div className="relative hidden min-h-0 flex-1 gap-2 px-2 pb-3 md:flex lg:gap-3 lg:px-3">
            {pulseNavPanels.map((panel, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={panel.href}
                  className={cn(
                    "pulse-stack-card relative flex min-w-0 flex-col overflow-hidden",
                    isActive ? "pulse-stack-card-active flex-[1.65]" : "flex-1",
                  )}
                  initial={reduceMotion ? false : { x: -28, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.42,
                    delay: reduceMotion ? 0 : index * 0.045,
                    ease: easeOutExpo,
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocusCapture={() => setActiveIndex(index)}
                >
                  <Link
                    href={panel.href}
                    onClick={onClose}
                    className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5"
                  >
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key={`${panel.href}-media`}
                          className="absolute inset-0 bg-black"
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={reduceMotion ? undefined : { opacity: 0 }}
                          transition={{ duration: 0.32, ease: easeOutExpo }}
                        >
                          <Image
                            src={panel.image.src}
                            alt={panel.image.alt}
                            fill
                            sizes="(max-width: 1024px) 28vw, 18vw"
                            className="object-cover opacity-100"
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/75"
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <span
                      className={cn(
                        "relative z-10 text-[clamp(0.95rem,1.35vw,1.2rem)] font-semibold tracking-tight",
                        isActive
                          ? "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]"
                          : pathIndex === index
                            ? "text-white/75"
                            : "text-white/55",
                      )}
                    >
                      {panel.label}
                    </span>

                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key={`${panel.href}-copy`}
                          className="relative z-10 mt-auto"
                          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                          transition={{ duration: 0.28, ease: easeOutExpo }}
                        >
                          <p className="text-[12px] leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] sm:text-[13px]">
                            {panel.blurb}
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--p-accent)] drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
                            Explore
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                          </span>
                        </motion.div>
                      ) : (
                        <span className="relative z-10" aria-hidden />
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: grey cards; full-bleed photo only when expanded */}
          <div className="min-h-0 flex-1 overflow-y-auto md:hidden">
            <nav className="flex flex-col px-4 pb-8" aria-label="Pulse mobile">
              {pulseNavPanels.map((panel, index) => {
                const isActive = index === activeIndex;
                return (
                  <motion.div
                    key={`m-${panel.href}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.34,
                      delay: reduceMotion ? 0 : index * 0.04,
                      ease: easeOutExpo,
                    }}
                    className={cn(
                      "pulse-stack-card-mobile relative mt-3 overflow-hidden",
                      isActive ? "pulse-stack-card-active min-h-[18rem]" : "min-h-[4.75rem]",
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key={`${panel.href}-m-media`}
                          className="absolute inset-0 bg-black"
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={reduceMotion ? undefined : { opacity: 0 }}
                          transition={{ duration: 0.28, ease: easeOutExpo }}
                        >
                          <Image
                            src={panel.image.src}
                            alt=""
                            fill
                            sizes="100vw"
                            className="object-cover opacity-100"
                            aria-hidden
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/75"
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <button
                      type="button"
                      className="relative z-10 flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                      onClick={() => setActiveIndex(index)}
                      aria-expanded={isActive}
                    >
                      <span
                        className={cn(
                          "text-lg font-semibold",
                          isActive
                            ? "text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]"
                            : "text-white/55",
                        )}
                      >
                        {panel.label}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--p-accent)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: easeOutExpo }}
                          className="relative z-10 overflow-hidden"
                        >
                          <Link href={panel.href} onClick={onClose} className="block px-4 pb-5 pt-8">
                            <p className="text-sm leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                              {panel.blurb}
                            </p>
                            <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--p-accent)]">
                              Open {panel.label}
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                            </span>
                          </Link>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              <div className="mt-6 sm:hidden">
                <ThemeSelector />
              </div>
            </nav>
          </div>

          {active ? (
            <div className="mx-3 mb-3 hidden items-center justify-between gap-6 rounded-2xl bg-[var(--p-panel)] px-8 py-4 backdrop-blur-xl lg:flex">
              <p className="max-w-xl text-sm text-white/55">{active.blurb}</p>
              <Link
                href={siteConfig.cta.primaryHref}
                onClick={onClose}
                className="pulse-btn shrink-0"
              >
                {siteConfig.cta.primary}
              </Link>
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
