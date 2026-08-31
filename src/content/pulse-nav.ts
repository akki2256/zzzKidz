import { toSiteImage } from "@/lib/media";
import type { SiteImage } from "@/lib/media";

export type PulseNavPanel = {
  href: string;
  label: string;
  blurb: string;
  image: SiteImage;
};

const img = (filename: string, alt: string): SiteImage => toSiteImage(filename, alt);

/** Stacked-menu panels — each card uses a distinct Move Lab photo. */
export const pulseNavPanels: PulseNavPanel[] = [
  {
    href: "/about",
    label: "About",
    blurb: "Not just exercise — movement education for every school.",
    image: img(
      "Screenshot 2026-08-24 235137.png",
      "Coach guiding a student on gymnastics rings in a Move Lab",
    ),
  },
  {
    href: "/programs",
    label: "Programs",
    blurb: "Zones, activities and movement literacy built for school spaces.",
    image: img(
      "Screenshot 2026-08-24 234918.png",
      "Functional training session in a Triple Z Kids Move Lab",
    ),
  },
  {
    href: "/how-it-works",
    label: "How It Works",
    blurb: "From site assessment to ongoing coaching support — end to end.",
    image: img(
      "Gemini_Generated_Image_d4z7jed4z7jed4z7.png",
      "Students using rings, parallel bars, and battle ropes",
    ),
  },
  {
    href: "/benefits",
    label: "Benefits",
    blurb: "Stronger bodies, sharper minds and brighter futures for students.",
    image: img(
      "Screenshot 2026-08-24 234730.png",
      "Confident student in Triple Z Move Lab apparel",
    ),
  },
  {
    href: "/why-us",
    label: "Why Us",
    blurb: "Expertise, safety, scientific programs and complete school support.",
    image: img(
      "Screenshot 2026-08-24 235118.png",
      "Student on trampoline rebound training in a Move Lab",
    ),
  },
  {
    href: "/gallery",
    label: "Gallery",
    blurb: "Inside Triple Z Kids Move Lab facilities and training sessions.",
    image: img(
      "Gemini_Generated_Image_22ywf322ywf322yw.png",
      "Group training session across multiple Move Lab stations",
    ),
  },
  {
    href: "/contact",
    label: "Contact",
    blurb: "Partner with us to bring a Move Lab to your school.",
    image: img(
      "Screenshot 2026-08-24 235448.png",
      "Active kids training together in the Move Lab",
    ),
  },
];

export const PULSE_HERO_VIDEO = "/videos/pulse-hero.mp4";
