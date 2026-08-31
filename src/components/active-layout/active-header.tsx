"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { navLinks, siteConfig } from "@/content/site";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const links = navLinks.filter((l) => l.href !== "/");

/** Navy utility bar + purple primary nav — matches activekids.org chrome. */
export function ActiveHeader() {
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
    <header className="sticky top-0 z-[100]">
      {/* Top utility / announcement bar */}
      <div className="hidden bg-[#172c5f] text-white md:block">
        <div className="active-container flex h-10 items-center justify-between gap-4 text-[11px] font-bold tracking-wide">
          <p className="truncate uppercase tracking-[0.08em]">
            {siteConfig.productName} — school fitness &amp; movement labs
          </p>
          <div className="flex items-center gap-3 text-white/80">
            <span className="uppercase">EN</span>
            <Search className="h-3.5 w-3.5" aria-hidden />
          </div>
        </div>
      </div>

      {/* Purple primary nav */}
      <div className="bg-[#7c5cbf] text-white shadow-md">
        <div className="active-container flex h-[4.25rem] items-center justify-between gap-4 lg:h-[4.75rem]">
          <BrandMark
            size="sm"
            className="shrink-0 [&_.font-heading]:text-white [&_span]:text-white [&_span_span]:text-white/70"
          />

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Active primary">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  className={cn(
                    "text-[11px] font-extrabold uppercase tracking-[0.12em] transition-colors",
                    active ? "text-[#ffc215]" : "text-white/90 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden lg:block">
              <ThemeSelector compact />
            </div>
            <Link href={siteConfig.cta.primaryHref} className="active-btn-orange hidden sm:inline-flex">
              Enroll
            </Link>
            <Link
              href="/contact"
              className="active-btn-outline hidden h-10 items-center md:inline-flex"
            >
              Partner
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white xl:hidden"
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
              className="overflow-hidden border-t border-white/15 bg-[#6c35b5] xl:hidden"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: easeOutExpo }}
            >
              <nav className="active-container space-y-1 py-4" aria-label="Active mobile">
                {links.map((link) => (
                  <Link
                    key={`${link.href}-m`}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[48px] items-center rounded-md px-3 text-sm font-extrabold uppercase tracking-[0.1em] text-white hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3">
                  <ThemeSelector />
                </div>
                <Link
                  href={siteConfig.cta.primaryHref}
                  onClick={() => setOpen(false)}
                  className="active-btn mt-3 w-full"
                >
                  Partner With Us
                </Link>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
