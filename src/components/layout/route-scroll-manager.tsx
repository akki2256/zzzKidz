"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Instant scroll-to-top on route change — avoids fighting CSS smooth scroll. */
export function RouteScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
