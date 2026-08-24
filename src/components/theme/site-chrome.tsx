"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PremiumFooter } from "@/components/premium-coaching-layout/premium-footer";
import { PremiumHeader } from "@/components/premium-coaching-layout/premium-header";
import { StudioFooter } from "@/components/studio-layout/studio-footer";
import { StudioHeader } from "@/components/studio-layout/studio-header";
import { useLayout } from "@/components/theme/layout-provider";

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const { layout } = useLayout();

  if (layout === "premium") {
    return (
      <div className="premium-shell flex min-h-full flex-1 flex-col">
        <PremiumHeader />
        <main className="premium-main flex-1">{children}</main>
        <PremiumFooter />
      </div>
    );
  }

  if (layout === "studio") {
    return (
      <div className="flex min-h-full flex-1 flex-col bg-black">
        <StudioHeader />
        <main className="studio-main flex-1">{children}</main>
        <StudioFooter />
      </div>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
