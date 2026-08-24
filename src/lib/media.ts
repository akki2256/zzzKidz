/** Build a public URL for files in /public/images/placeholders */
export function mediaPath(filename: string) {
  return `/images/placeholders/${encodeURIComponent(filename)}`;
}

export type SiteImage = {
  src: string;
  alt: string;
  caption?: string;
};

export function toSiteImage(filename: string, alt: string, caption?: string): SiteImage {
  return { src: mediaPath(filename), alt, caption };
}
