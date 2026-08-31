export type SiteLayout = "original" | "studio" | "active" | "pulse";

export const LAYOUT_COOKIE = "site-layout";
export const LAYOUT_STORAGE_KEY = "site-layout";
export const DEFAULT_LAYOUT: SiteLayout = "original";

export const SITE_LAYOUTS: SiteLayout[] = ["original", "studio", "active", "pulse"];

export const LAYOUT_OPTIONS: { value: SiteLayout; label: string; description: string }[] = [
  {
    value: "original",
    label: "Original",
    description: "Dark cinematic website layout",
  },
  {
    value: "studio",
    label: "Studio",
    description: "Bold editorial fitness-brand layout",
  },
  {
    value: "active",
    label: "Active",
    description: "Bright kids-movement program layout",
  },
  {
    value: "pulse",
    label: "Pulse",
    description: "High-energy athletic video-hero layout",
  },
];

export function isSiteLayout(value: string | undefined | null): value is SiteLayout {
  return (
    value === "original" || value === "studio" || value === "active" || value === "pulse"
  );
}

export function resolveSiteLayout(value: string | undefined | null): SiteLayout {
  return isSiteLayout(value) ? value : DEFAULT_LAYOUT;
}
