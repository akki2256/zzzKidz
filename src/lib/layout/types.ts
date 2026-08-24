export type SiteLayout = "original" | "premium" | "studio";

export const LAYOUT_COOKIE = "site-layout";
export const LAYOUT_STORAGE_KEY = "site-layout";
export const DEFAULT_LAYOUT: SiteLayout = "original";

export const SITE_LAYOUTS: SiteLayout[] = ["original", "premium", "studio"];

export const LAYOUT_OPTIONS: { value: SiteLayout; label: string; description: string }[] = [
  {
    value: "original",
    label: "Original",
    description: "Dark cinematic website layout",
  },
  {
    value: "premium",
    label: "Premium",
    description: "Dark coaching-marketplace layout",
  },
  {
    value: "studio",
    label: "Studio",
    description: "Bold editorial fitness-brand layout",
  },
];

export function isSiteLayout(value: string | undefined | null): value is SiteLayout {
  return value === "original" || value === "premium" || value === "studio";
}

export function resolveSiteLayout(value: string | undefined | null): SiteLayout {
  return isSiteLayout(value) ? value : DEFAULT_LAYOUT;
}
