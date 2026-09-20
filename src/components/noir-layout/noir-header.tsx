"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#noir-programs", label: "Programs", hash: "noir-programs" },
  { href: "/#noir-gallery", label: "Gallery", hash: "noir-gallery" },
  { href: "/#noir-about", label: "About", hash: "noir-about" },
  { href: "/#noir-process", label: "Process", hash: "noir-process" },
  { href: "/#noir-contact", label: "Contact", hash: "noir-contact" },
] as const;

/** Fixed header that recolors to match the active sticky section tile. */
export function NoirHeader() {
  const pathname = usePathname();
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
    <>
      <header
        className="noir-header fixed inset-x-0 top-0 z-[100] border-b border-white/10 transition-[background-color,color] duration-300"
        style={{
          backgroundColor: "var(--n-menu-bg, #0a0a0a)",
          color: "var(--n-menu-fg, #ffffff)",
        }}
      >
        <div className="noir-container flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label={`${siteConfig.productName} home`}
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full sm:h-10 sm:w-10">
              <Image
                src={siteConfig.logo}
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-extrabold uppercase tracking-[0.14em]">
                {siteConfig.name}
              </span>
              <span className="mt-0.5 block text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[var(--n-accent)]">
                Kids Move Lab
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Noir primary">
            {navItems.map((item) => (
              <Link
                key={item.hash}
                href={pathname === "/" ? `#${item.hash}` : item.href}
                className="rounded-full px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] opacity-80 transition-opacity hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <ThemeSelector compact />
            </div>
            <Link href={siteConfig.cta.primaryHref} className="noir-btn hidden md:inline-flex">
              {siteConfig.cta.primary}
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
              aria-expanded={open}
              aria-controls="noir-mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="noir-mobile-nav"
        className={cn(
          "fixed inset-0 z-[99] bg-[#070909]/96 pt-20 backdrop-blur-xl transition-opacity lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav className="noir-container flex flex-col gap-2 py-8" aria-label="Noir mobile">
          {navItems.map((item) => (
            <Link
              key={item.hash}
              href={pathname === "/" ? `#${item.hash}` : item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 text-lg font-bold uppercase tracking-[0.08em] text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 sm:hidden">
            <ThemeSelector />
          </div>
          <Link
            href={siteConfig.cta.primaryHref}
            onClick={() => setOpen(false)}
            className="noir-btn mt-6 inline-flex w-fit"
          >
            {siteConfig.cta.primary}
          </Link>
        </nav>
      </div>
    </>
  );
}
