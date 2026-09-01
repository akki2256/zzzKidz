/** Pinned viewport while the user scrolls through a section runway. */
export const PULSE_PIN_VH = 100;

/** Scroll distance per item for standard Pulse homepage sections (outcomes, etc.). */
export const PULSE_SCROLL_PER_ITEM_VH = 34;

/** Shorter step for long lists so the section does not feel endless. */
export const PULSE_SCROLL_LONG_LIST_VH = 28;

/** Runway for a four-column grid phase (problems / solutions). */
export const PULSE_GRID_PHASE_VH = 56;

/** Runway per full-screen transition headline beat. */
export const PULSE_BEAT_VH = 22;

/** First PE comparison beat — full-screen problems title. */
export const PULSE_PE_TITLE_VH = 28;

/** Total section height = pin viewport + scroll runway. */
export function pulseSectionHeightVh(runwayVh: number): number {
  return PULSE_PIN_VH + runwayVh;
}

/**
 * Map vh segment lengths to cumulative 0–1 progress boundaries.
 * Returns [0, …phaseEnds, 1] aligned with actual scroll runway.
 */
export function pulsePhaseBounds(segmentVh: number[]): number[] {
  const total = segmentVh.reduce((sum, vh) => sum + vh, 0);
  if (total <= 0) return [0, 1];

  let cumulative = 0;
  const bounds: number[] = [0];
  for (const vh of segmentVh) {
    cumulative += vh;
    bounds.push(cumulative / total);
  }
  bounds[bounds.length - 1] = 1;
  return bounds;
}

/** Focus band half-width for carousel-style sections (activities). */
export function pulseFocusSpread(itemCount: number, spread = 0.52): number {
  const steps = Math.max(itemCount - 1, 1);
  return spread / steps;
}

/** Gentle ease-in-out for mapping raw scroll progress. */
export function pulseEaseScroll(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

/** Stagger window for sequential item reveals within one phase. */
export function pulseItemWindow(
  phaseStart: number,
  phaseEnd: number,
  index: number,
  count: number,
): { enterStart: number; enterMid: number; enterEnd: number } {
  const phaseSpan = phaseEnd - phaseStart;
  const slot = phaseSpan / count;
  /** Start next item before the previous finishes — smoother cascade. */
  const overlap = 0.26;
  const enterStart = phaseStart + index * slot * (1 - overlap);
  const enterEnd = Math.min(enterStart + slot * 0.94, phaseEnd - slot * 0.04);
  const enterMid = enterStart + (enterEnd - enterStart) * 0.52;
  return { enterStart, enterMid, enterEnd };
}

/** Fade window for full-screen transition beats. */
export function pulseBeatWindow(
  beatStart: number,
  beatEnd: number,
): { fadeIn: number; holdStart: number; holdEnd: number; fadeOut: number } {
  const span = beatEnd - beatStart;
  const edge = span * 0.11;
  return {
    fadeIn: beatStart + edge,
    holdStart: beatStart + edge * 1.2,
    holdEnd: beatEnd - edge * 1.2,
    fadeOut: beatEnd - edge,
  };
}

/** Crossfade edge as a fraction of a phase span. */
export function pulsePhaseFadeEdge(phaseStart: number, phaseEnd: number, ratio = 0.12): number {
  return (phaseEnd - phaseStart) * ratio;
}
