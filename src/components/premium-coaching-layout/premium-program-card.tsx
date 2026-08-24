"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ProgramCatalogItem } from "@/content/programs";
import { cn } from "@/lib/utils";

const typeBadge: Record<ProgramCatalogItem["type"], { label: string; className: string }> = {
  zone: { label: "Zone", className: "bg-[#6d5dfc]" },
  activity: { label: "Activity", className: "bg-[#e0446d]" },
  literacy: { label: "Literacy", className: "bg-[#2f7ef7]" },
};

type PremiumProgramCardProps = {
  program: ProgramCatalogItem;
  className?: string;
};

/**
 * Dark marketplace card mirroring the reference coach-card composition.
 * Uses only real catalogue fields — no invented ratings, slots or names.
 */
export function PremiumProgramCard({ program, className }: PremiumProgramCardProps) {
  const badge = typeBadge[program.type];

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.045] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]",
        className,
      )}
    >
      {/* Photo + overlapping type badge */}
      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
          <Image
            src={program.image.src}
            alt={program.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 300px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0812] via-transparent to-transparent"
          />
        </div>
        <span
          className={cn(
            "absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_6px_18px_rgba(0,0,0,0.45)]",
            badge.className,
          )}
        >
          {badge.label}
        </span>
      </div>

      {/* Title + meta */}
      <div className="px-4 pt-5 text-center">
        <h3 className="truncate text-[15px] font-bold text-white">{program.title}</h3>
        <p className="mt-1 text-[11px] text-white/50">
          {program.category} · {program.format}
        </p>
      </div>

      {/* Inner panel — highlights */}
      <div className="mt-4 flex flex-1 flex-col px-3 pb-3">
        <div className="p-panel flex flex-1 flex-col p-3">
          <p className="text-center text-[11px] font-medium text-white/60">
            {program.audience}
          </p>
          <div className="mt-2.5 flex items-center gap-1.5">
            {program.highlights.slice(0, 2).map((chip) => (
              <span
                key={chip}
                className="flex-1 truncate rounded-md border border-white/10 bg-white/[0.06] px-2 py-1.5 text-center text-[10px] font-semibold text-white/80"
              >
                {chip}
              </span>
            ))}
            <Link
              href="/programs"
              aria-label={`More about ${program.title}`}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.06] text-white/70 transition-colors hover:bg-white/15 hover:text-white"
            >
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>

        <Link
          href="/contact"
          className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full bg-[#f4f2f7] text-[13px] font-bold text-[#100c18] transition-colors hover:bg-white"
        >
          See plans
        </Link>
      </div>
    </article>
  );
}
