"use client";

import { useEffect } from "react";
import { noirMenuSyncColors, type NoirTileTone } from "@/components/noir-layout/noir-section";

const DEFAULT_MENU = { bg: "#0a0a0a", fg: "#ffffff" };

function applyMenuColors(bg: string, fg: string) {
  const root = document.documentElement;
  root.style.setProperty("--n-menu-bg", bg);
  root.style.setProperty("--n-menu-fg", fg);
}

/**
 * Observes Noir sections and syncs the fixed header colors to the active tile.
 */
export function NoirStickyMenuSync() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-noir-section]"),
    );
    if (sections.length === 0) return;

    const headerOffset = 72;

    const update = () => {
      let active: HTMLElement | null = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerOffset + 8 && rect.bottom > headerOffset + 120) {
          active = section;
        }
      }

      if (!active) {
        applyMenuColors(DEFAULT_MENU.bg, DEFAULT_MENU.fg);
        return;
      }

      const tone = (active.dataset.noirTone ?? "green") as NoirTileTone;
      const colors = noirMenuSyncColors[tone] ?? DEFAULT_MENU;
      applyMenuColors(colors.bg, colors.fg);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      applyMenuColors(DEFAULT_MENU.bg, DEFAULT_MENU.fg);
    };
  }, []);

  return null;
}
