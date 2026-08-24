"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { programCategories } from "@/content/programs";
import { cn } from "@/lib/utils";

/**
 * Vertical category rail (desktop) / horizontal scroll strip (mobile),
 * matching the reference site's coaching category navigation.
 */
export function PremiumCategoryRail() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("category");
  const onPrograms = pathname.startsWith("/programs");

  const items = [
    { label: "All Programs", href: "/programs", value: null as string | null },
    ...programCategories.map((category) => ({
      label: category,
      href: `/programs?category=${encodeURIComponent(category)}`,
      value: category as string | null,
    })),
  ];

  return (
    <nav aria-label="Program categories" className="min-w-0 lg:sticky lg:top-24">
      <p className="hidden pb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40 lg:block">
        Categories
      </p>
      <ul
        className={cn(
          "flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0",
        )}
      >
        {items.map((item) => {
          const isActive =
            item.value === null ? onPrograms && !active : active === item.value;
          return (
            <li key={item.label} className="shrink-0 lg:shrink">
              <Link
                href={item.href}
                className={cn(
                  "block whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] transition-colors lg:rounded-lg lg:px-3 lg:py-2.5 lg:whitespace-normal",
                  isActive
                    ? "bg-white/12 font-semibold text-white lg:bg-white/10"
                    : "bg-white/[0.04] text-white/60 hover:text-white lg:bg-transparent lg:hover:bg-white/[0.06]",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
