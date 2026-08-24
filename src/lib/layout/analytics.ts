import type { SiteLayout } from "@/lib/layout/types";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLayoutChange(layout: SiteLayout) {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({
    event: "layout_changed",
    layout,
  });

  window.gtag?.("event", "layout_changed", { layout });
}
