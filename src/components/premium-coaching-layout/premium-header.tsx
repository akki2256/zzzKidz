"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { Button } from "@/components/ui/button";
import { premiumPrimaryNav } from "@/content/premium-nav";
import { siteConfig } from "@/content/site";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Centered floating header bar over the aurora hero, like the reference site. */
export function PremiumHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Collapse the mobile menu whenever navigation lands on a new route.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[100] pt-2 sm:pt-3">
      <div className="premium-container">
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-300 lg:justify-center lg:gap-8",
            scrolled
              ? "border border-white/10 bg-[rgba(16,12,24,0.82)] shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
        >
          <BrandMark
            size="sm"
            className="shrink-0 [&_span]:text-white [&_.font-heading]:text-white [&_span_span]:text-white/55"
          />

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Premium primary">
            {premiumPrimaryNav.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  prefetch
                  scroll
                  className={cn(
                    "text-[13px] font-medium transition-colors",
                    active ? "text-white" : "text-white/65 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden xl:block">
              <ThemeSelector compact />
            </div>
            <Link
              href={siteConfig.cta.primaryHref}
              className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[12px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:inline-flex"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15">
                <Phone className="h-2.5 w-2.5" aria-hidden />
              </span>
              Talk to an expert
            </Link>
            <Link
              href="/programs"
              className="hidden rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12px] font-semibold text-white/85 transition-colors hover:bg-white/12 lg:inline-flex"
            >
              Explore Programs
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-white lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="premium-container mt-2 lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: easeOutExpo }}
          >
            <nav
              className="rounded-3xl border border-white/10 bg-[rgba(16,12,24,0.95)] p-3 backdrop-blur-xl"
              aria-label="Premium mobile"
            >
              {premiumPrimaryNav.map((link) => (
                <Link
                  key={`${link.href}-${link.label}-mobile`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center rounded-2xl px-4 text-[15px] font-medium text-white/90 hover:bg-white/8"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-white/10 pt-4">
                <ThemeSelector />
              </div>
              <Link
                href={siteConfig.cta.primaryHref}
                onClick={() => setOpen(false)}
                className="premium-btn mt-4 w-full"
              >
                Talk to an expert
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
