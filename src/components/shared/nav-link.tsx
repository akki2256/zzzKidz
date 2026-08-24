"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "header" | "mobile" | "footer";
  onNavigate?: () => void;
};

export function NavLink({
  href,
  children,
  className,
  variant = "header",
  onNavigate,
}: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      prefetch
      scroll
      onClick={onNavigate}
      className={cn(
        variant === "header" && [
          "relative inline-flex min-h-[44px] items-center rounded-md px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em]",
          "transition-colors duration-200 ease-out",
          "after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300 after:ease-out",
          "hover:after:scale-x-100 active:opacity-80",
          active ? "text-accent after:scale-x-100" : "text-white/90 hover:text-white",
        ],
        variant === "mobile" && [
          "flex min-h-[48px] items-center rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em]",
          "transition-colors duration-200 ease-out active:scale-[0.99] active:opacity-90",
          active ? "bg-accent-soft text-accent" : "text-foreground hover:bg-white/5",
        ],
        variant === "footer" && [
          "inline-flex min-h-[44px] items-center text-sm text-foreground-muted transition-colors duration-200 hover:text-accent active:opacity-80",
        ],
        className,
      )}
    >
      {children}
    </Link>
  );
}
