"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import {
  filterPrograms,
  programCategories,
  type ProgramCategory,
  type ProgramType,
} from "@/content/programs";
import { PremiumCategoryRail } from "@/components/premium-coaching-layout/premium-category-nav";
import { PremiumProgramCard } from "@/components/premium-coaching-layout/premium-program-card";
import { cn } from "@/lib/utils";

type PremiumProgramDiscoveryProps = {
  heading?: string;
  breadcrumbLabel?: string;
  limit?: number;
  showViewAll?: boolean;
  initialCategory?: ProgramCategory | "all";
};

export function PremiumProgramDiscovery({
  heading,
  breadcrumbLabel,
  limit,
  showViewAll = true,
  initialCategory = "all",
}: PremiumProgramDiscoveryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProgramCategory | "all">(initialCategory);
  const [type, setType] = useState<ProgramType | "all">("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [lastInitialCategory, setLastInitialCategory] = useState(initialCategory);

  // Follow the ?category= query param when the category rail changes routes.
  if (lastInitialCategory !== initialCategory) {
    setLastInitialCategory(initialCategory);
    setCategory(initialCategory);
  }

  const results = useMemo(() => {
    const filtered = filterPrograms({ query, category, type });
    return limit ? filtered.slice(0, limit) : filtered;
  }, [query, category, type, limit]);

  const activeLabel = category === "all" ? "All Programs" : `${category} Programs`;
  const title = heading ?? activeLabel;

  return (
    <section className="pb-12 pt-4 sm:pt-6" id="programs">
      <div className="premium-container grid gap-8 lg:grid-cols-[186px_1fr] lg:gap-10">
        <PremiumCategoryRail />

        <div className="min-w-0">
          {/* Heading + breadcrumb */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">{title}</h2>
              <nav aria-label="Breadcrumb" className="mt-1.5">
                <ol className="flex flex-wrap items-center gap-1.5 text-[11px] text-white/40">
                  <li>
                    <Link href="/" className="hover:text-white/70">
                      Homepage
                    </Link>
                  </li>
                  <li aria-hidden>›</li>
                  <li>
                    <Link href="/programs" className="hover:text-white/70">
                      Programs
                    </Link>
                  </li>
                  <li aria-hidden>›</li>
                  <li className="font-semibold text-white/75">
                    {breadcrumbLabel ?? activeLabel}
                  </li>
                </ol>
              </nav>
            </div>

            {/* Search + filters toolbar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-11 min-w-[15rem] flex-1 items-center rounded-full border border-white/12 bg-white/[0.05] pl-4 pr-1">
                <Search className="mr-2 h-4 w-4 shrink-0 text-white/40" aria-hidden />
                <label className="flex-1">
                  <span className="sr-only">Search programs</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search programs..."
                    className="h-9 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                  />
                </label>
                <span className="rounded-full bg-[#f4f2f7] px-4 py-1.5 text-[12px] font-bold text-[#100c18]">
                  Search
                </span>
              </div>

              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                aria-expanded={filtersOpen}
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-4 text-sm font-medium text-white/80 hover:text-white"
              >
                Filters
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    filtersOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </div>
          </div>

          {/* Filter panel */}
          {filtersOpen ? (
            <div className="premium-form mt-4 flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <label className="text-sm">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
                  Category
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProgramCategory | "all")}
                  className="h-10 rounded-xl border border-white/12 bg-white/[0.06] px-3 text-sm text-white"
                >
                  <option value="all">All Categories</option>
                  {programCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
                  Type
                </span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ProgramType | "all")}
                  className="h-10 rounded-xl border border-white/12 bg-white/[0.06] px-3 text-sm text-white"
                >
                  <option value="all">All Types</option>
                  <option value="zone">Zones</option>
                  <option value="activity">Activities</option>
                  <option value="literacy">Movement Literacy</option>
                </select>
              </label>
              {(query || category !== "all" || type !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                    setType("all");
                  }}
                  className="self-end text-sm font-semibold text-white/60 underline-offset-4 hover:text-white hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
          ) : null}

          {/* Results */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((program) => (
              <PremiumProgramCard key={program.id} program={program} />
            ))}
          </div>

          {results.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center text-sm text-white/55">
              No programs match your search. Try a different term or clear the filters.
            </p>
          ) : null}

          {showViewAll && limit ? (
            <div className="mt-8 flex justify-center">
              <Link href="/programs" className="premium-btn-outline">
                View all
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
