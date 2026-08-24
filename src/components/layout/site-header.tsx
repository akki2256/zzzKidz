"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { CtaLink } from "@/components/shared/cta-link";
import { NavLink } from "@/components/shared/nav-link";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/content/site";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const primaryNav = navLinks.filter((link) => link.href !== "/");

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] transition-colors duration-200",
        isHome
          ? "border-b border-white/10 bg-black/40 backdrop-blur-xl"
          : "border-b border-border/80 bg-background/90 backdrop-blur-xl",
      )}
    >
      <div className="container-wide grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 sm:h-[4.5rem]">
        <BrandMark />

        <nav
          className="hidden items-center justify-center gap-0.5 xl:flex"
          aria-label="Primary"
        >
          {primaryNav.map((link) => (
            <NavLink key={link.href} href={link.href} variant="header">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden md:block">
            <ThemeSelector compact />
          </div>
          <div className="hidden lg:block">
            <CtaLink href={siteConfig.cta.primaryHref} size="sm" className="rounded-full px-5">
              {siteConfig.cta.primary}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </CtaLink>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[90] bg-black/55 xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={closeMenu}
            />
            <motion.div
              id="mobile-nav"
              className="relative z-[95] border-t border-border bg-background shadow-[var(--shadow-soft)] xl:hidden"
              initial={reduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: easeOutExpo }}
            >
              <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    variant="mobile"
                    onNavigate={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="mt-3 border-t border-border pt-4 md:hidden">
                  <ThemeSelector />
                </div>
                <CtaLink
                  href={siteConfig.cta.primaryHref}
                  className="mt-3 w-full rounded-full"
                  onClick={closeMenu}
                >
                  {siteConfig.cta.primary}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </CtaLink>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
