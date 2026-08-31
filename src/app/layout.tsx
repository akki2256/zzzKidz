import type { Metadata } from "next";
import { Bebas_Neue, Libre_Baskerville, Manrope, Nunito } from "next/font/google";
import { cookies } from "next/headers";
import { RouteScrollManager } from "@/components/layout/route-scroll-manager";
import { OrganizationJsonLd } from "@/components/shared/organization-json-ld";
import { LayoutProvider } from "@/components/theme/layout-provider";
import { SiteChrome } from "@/components/theme/site-chrome";
import { siteConfig } from "@/content/site";
import { resolveSiteLayout, LAYOUT_COOKIE } from "@/lib/layout/types";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

/** Rounded friendly sans for Active (kids-movement) layout. */
const activeSans = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-active-sans",
  display: "swap",
});

/** Serif display for Active mission / quote bands (activekids.org style). */
const activeSerif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-active-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [{ url: siteConfig.logo, type: "image/jpeg" }],
    apple: [{ url: siteConfig.logo }],
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: siteConfig.logo,
        width: 800,
        height: 800,
        alt: `${siteConfig.productName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.logo],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const initialLayout = resolveSiteLayout(cookieStore.get(LAYOUT_COOKIE)?.value);

  return (
    <html
      lang="en"
      data-layout={initialLayout}
      className={`${display.variable} ${body.variable} ${activeSans.variable} ${activeSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans text-base leading-relaxed text-foreground">
        <LayoutProvider initialLayout={initialLayout}>
          <OrganizationJsonLd />
          <RouteScrollManager />
          <SiteChrome>{children}</SiteChrome>
        </LayoutProvider>
      </body>
    </html>
  );
}
