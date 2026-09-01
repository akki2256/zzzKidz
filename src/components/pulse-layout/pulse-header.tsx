"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { PulseStackedMenu } from "@/components/pulse-layout/pulse-stacked-menu";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type PulseHeaderProps = {
  /** When true, header sits over the video hero with transparent chrome. */
  overlay?: boolean;
};

/** Transparent athletic header: logo left, neon CTA + hamburger right. */
export function PulseHeader({ overlay = true }: PulseHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.dataset.pulseMenuOpen = open ? "true" : "false";
    return () => {
      delete document.documentElement.dataset.pulseMenuOpen;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "z-[100] w-full transition-[background,backdrop-filter,border-color] duration-300",
          overlay ? "fixed inset-x-0 top-0" : "sticky top-0",
          overlay && !scrolled
            ? "border-b border-transparent bg-transparent"
            : "border-b border-white/10 bg-[var(--p-panel)] backdrop-blur-md",
        )}
      >
        <div className="pulse-container flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
            aria-label={`${siteConfig.productName} home`}
          >
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full sm:h-11 sm:w-11">
              <Image
                src={siteConfig.logo}
                alt=""
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="font-heading text-xl uppercase tracking-[0.06em] text-white sm:text-2xl">
                {siteConfig.name}
              </span>
              <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 sm:block">
                Kids Move Lab
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden lg:block">
              <ThemeSelector compact />
            </div>
            <Link
              href={siteConfig.cta.primaryHref}
              className="pulse-btn hidden sm:inline-flex"
            >
              {siteConfig.cta.primary}
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--p-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <PulseStackedMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
