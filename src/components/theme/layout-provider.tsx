"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { trackLayoutChange } from "@/lib/layout/analytics";
import {
  DEFAULT_LAYOUT,
  LAYOUT_COOKIE,
  LAYOUT_STORAGE_KEY,
  resolveSiteLayout,
  type SiteLayout,
} from "@/lib/layout/types";

type LayoutContextValue = {
  layout: SiteLayout;
  setLayout: (layout: SiteLayout) => void;
  isTransitioning: boolean;
};

const LayoutContext = createContext<LayoutContextValue | null>(null);

function persistLayout(layout: SiteLayout) {
  document.cookie = `${LAYOUT_COOKIE}=${layout}; path=/; max-age=31536000; SameSite=Lax`;
  localStorage.setItem(LAYOUT_STORAGE_KEY, layout);
  document.documentElement.dataset.layout = layout;
}

type LayoutProviderProps = {
  children: ReactNode;
  initialLayout?: SiteLayout;
};

export function LayoutProvider({ children, initialLayout = DEFAULT_LAYOUT }: LayoutProviderProps) {
  const [layout, setLayoutState] = useState<SiteLayout>(initialLayout);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.layout = layout;
  }, [layout]);

  useEffect(() => {
    const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
    const resolved = resolveSiteLayout(stored ?? initialLayout);
    if (resolved !== layout) {
      // Reconciles the SSR cookie value with localStorage exactly once on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLayoutState(resolved);
      persistLayout(resolved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync once on mount
  }, []);

  const setLayout = useCallback(
    (next: SiteLayout) => {
      if (next === layout) return;

      setIsTransitioning(true);
      setLayoutState(next);
      persistLayout(next);
      trackLayoutChange(next);

      window.setTimeout(() => setIsTransitioning(false), 280);
    },
    [layout],
  );

  const value = useMemo(
    () => ({ layout, setLayout, isTransitioning }),
    [layout, setLayout, isTransitioning],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
}
