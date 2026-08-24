"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { navLinks, siteConfig } from "@/content/site";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const studioNav = navLinks.filter((link) => link.href !== "/");

/** Solid black bar with uppercase nav and a single neon CTA. */
export function StudioHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[100] border-b border-white/12 bg-black">
      <div className="studio-container flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <BrandMark
          size="sm"
          className="shrink-0 [&_span]:text-white [&_.font-heading]:text-white [&_span_span]:text-white/60"
        />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Studio primary">
          {studioNav.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                scroll
                className={cn(
                  "text-[11px] font-extrabold uppercase tracking-[0.14em] transition-colors",
                  active ? "text-[#c8ff00]" : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden xl:block">
            <ThemeSelector compact />
          </div>
          <Link
            href={siteConfig.cta.primaryHref}
            className="hidden h-10 items-center gap-2 rounded-full bg-[#c8ff00] px-5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0b0b0b] transition-colors hover:bg-[#d9ff4d] sm:inline-flex"
          >
            {siteConfig.cta.primary}
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00] focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="overflow-hidden border-t border-white/12 bg-black lg:hidden"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: easeOutExpo }}
          >
            <nav className="studio-container py-4" aria-label="Studio mobile">
              {studioNav.map((link) => (
                <Link
                  key={`${link.href}-mobile`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center justify-between border-b border-white/10 text-sm font-extrabold uppercase tracking-[0.12em] text-white"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 text-[#c8ff00]" aria-hidden />
                </Link>
              ))}
              <div className="mt-6">
                <ThemeSelector />
              </div>
              <Link
                href={siteConfig.cta.primaryHref}
                onClick={() => setOpen(false)}
                className="studio-btn mt-6 w-full"
              >
                {siteConfig.cta.primary}
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
