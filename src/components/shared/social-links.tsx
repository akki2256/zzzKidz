import type { ReactNode, SVGProps } from "react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement>;

function InstagramIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function FacebookIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.86c0-2.37 1.4-3.69 3.56-3.69 1.03 0 2.12.19 2.12.19v2.34h-1.2c-1.18 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.9h-2.21V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function YoutubeIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

const socialItems = [
  {
    key: "instagram",
    label: "Instagram",
    href: siteConfig.social.instagram,
    Icon: InstagramIcon,
  },
  {
    key: "facebook",
    label: "Facebook",
    href: siteConfig.social.facebook,
    Icon: FacebookIcon,
  },
  {
    key: "youtube",
    label: "YouTube",
    href: siteConfig.social.youtube,
    Icon: YoutubeIcon,
  },
] as const;

type SocialLinksProps = {
  className?: string;
  /** Visual tone for each layout. */
  tone?: "pulse" | "original";
};

const toneClass: Record<NonNullable<SocialLinksProps["tone"]>, string> = {
  pulse:
    "border-white/15 text-white/70 hover:border-[var(--p-accent)] hover:text-[var(--p-accent)]",
  original:
    "border-border text-foreground-muted hover:border-accent hover:text-accent",
};

/** Instagram / Facebook / YouTube icon row — shared across layouts. */
export function SocialLinks({ className, tone = "pulse" }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)} aria-label="Social media">
      {socialItems.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              toneClass[tone],
              tone === "pulse" && "focus-visible:outline-[var(--p-accent)]",
              tone === "original" && "focus-visible:outline-accent",
            )}
            aria-label={`${label} (opens in a new tab)`}
          >
            <Icon className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Clickable tel: link using the configured E.164 number. */
export function PhoneLink({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a href={`tel:+${siteConfig.contact.phoneE164}`} className={className}>
      {children ?? siteConfig.contact.phone}
    </a>
  );
}
