export type SiteLayout = "original" | "pulse" | "noir";

export const LAYOUT_COOKIE = "site-layout";
export const LAYOUT_STORAGE_KEY = "site-layout";
export const DEFAULT_LAYOUT: SiteLayout = "pulse";

export const SITE_LAYOUTS: SiteLayout[] = ["original", "pulse", "noir"];

export const LAYOUT_OPTIONS: { value: SiteLayout; label: string; description: string }[] = [
  {
    value: "original",
    label: "Original",
    description: "Dark cinematic website layout",
  },
  {
    value: "pulse",
    label: "Pulse",
    description: "High-energy athletic video-hero layout",
  },
  {
    value: "noir",
    label: "Noir",
    description: "Dark editorial one-page layout with sticky section tiles",
  },
];

export function isSiteLayout(value: string | undefined | null): value is SiteLayout {
  return value === "original" || value === "pulse" || value === "noir";
}

export function resolveSiteLayout(value: string | undefined | null): SiteLayout {
  return isSiteLayout(value) ? value : DEFAULT_LAYOUT;
}
