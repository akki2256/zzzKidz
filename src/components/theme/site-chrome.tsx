"use client";

import type { ReactNode } from "react";
import { ActiveFooter } from "@/components/active-layout/active-footer";
import { ActiveHeader } from "@/components/active-layout/active-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PulseFooter } from "@/components/pulse-layout/pulse-footer";
import { PulseHeader } from "@/components/pulse-layout/pulse-header";
import { StudioFooter } from "@/components/studio-layout/studio-footer";
import { StudioHeader } from "@/components/studio-layout/studio-header";
import { useLayout } from "@/components/theme/layout-provider";

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const { layout } = useLayout();

  if (layout === "studio") {
    return (
      <div className="flex min-h-full flex-1 flex-col bg-black">
        <StudioHeader />
        <main className="studio-main flex-1">{children}</main>
        <StudioFooter />
      </div>
    );
  }

  if (layout === "active") {
    return (
      <div className="flex min-h-full flex-1 flex-col overflow-x-hidden bg-white">
        <ActiveHeader />
        <main className="active-main flex-1 overflow-x-hidden">{children}</main>
        <ActiveFooter />
      </div>
    );
  }

  if (layout === "pulse") {
    return (
      <div className="flex min-h-full flex-1 flex-col bg-black">
        <PulseHeader />
        <main className="pulse-main flex-1">{children}</main>
        <PulseFooter />
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
