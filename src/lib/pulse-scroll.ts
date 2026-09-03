/** Pinned viewport while the user scrolls through a section runway. */
export const PULSE_PIN_VH = 100;

/** Scroll distance per item for standard Pulse homepage sections (outcomes, etc.). */
export const PULSE_SCROLL_PER_ITEM_VH = 34;

/** Shorter step for long lists so the section does not feel endless. */
export const PULSE_SCROLL_LONG_LIST_VH = 28;

/**
 * Scroll distance per item in focus-carousel sections (activities, how-we-work).
 * Longer runway = more wheel travel per highlight — resists mouse-wheel skips.
 */
export const PULSE_SCROLL_FOCUS_ITEM_VH = 58;

/** Runway for a four-column grid phase (problems / solutions). */
export const PULSE_GRID_PHASE_VH = 56;

/** How long each PE headline stays fully on screen. */
export const PULSE_HEADLINE_HOLD_VH = 110;

/** Scroll distance used to slide from one PE headline to the next. */
export const PULSE_HEADLINE_MOVE_VH = 100;

/** @deprecated Use hold + move constants — kept for older runway math. */
export const PULSE_BEAT_VH = PULSE_HEADLINE_HOLD_VH + PULSE_HEADLINE_MOVE_VH;

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

/**
 * Hold the active item at full strength for most of its slot.
 * Shoulders fade quickly so a wheel tick still lands inside the plateau.
 */
export function pulseFocusOpacityKeyframes(
  center: number,
  halfSpread: number,
): { input: number[]; output: number[] } {
  const s = halfSpread;
  return {
    input: [
      center - s,
      center - s * 0.82,
      center - s * 0.48,
      center + s * 0.48,
      center + s * 0.82,
      center + s,
    ],
    output: [0.08, 0.18, 1, 1, 0.18, 0.08],
  };
}

/** Image/card opacity — same long plateau, dimmer inactive cards. */
export function pulseFocusCardOpacityKeyframes(
  center: number,
  halfSpread: number,
): { input: number[]; output: number[] } {
  const s = halfSpread;
  return {
    input: [
      center - s,
      center - s * 0.82,
      center - s * 0.48,
      center + s * 0.48,
      center + s * 0.82,
      center + s,
    ],
    output: [0.2, 0.36, 1, 1, 0.36, 0.2],
  };
}

/** Dark overlay stays off for the same plateau as card highlight. */
export function pulseFocusOverlayKeyframes(
  center: number,
  halfSpread: number,
): { input: number[]; output: number[] } {
  const s = halfSpread;
  return {
    input: [
      center - s,
      center - s * 0.82,
      center - s * 0.48,
      center + s * 0.48,
      center + s * 0.82,
      center + s,
    ],
    output: [0.72, 0.48, 0, 0, 0.48, 0.72],
  };
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
  const safeCount = Math.max(count, 1);
  const phaseSpan = Math.max(phaseEnd - phaseStart, 0);
  const slot = phaseSpan / safeCount;
  /** Start next item before the previous finishes — smoother cascade. */
  const overlap = 0.26;
  let enterStart = phaseStart + index * slot * (1 - overlap);
  let enterEnd = Math.min(enterStart + slot * 0.94, phaseEnd - slot * 0.04);
  if (enterEnd <= enterStart) {
    enterEnd = Math.min(phaseEnd, enterStart + Math.max(slot * 0.25, 1e-4));
  }
  if (enterEnd <= enterStart) {
    enterStart = Math.max(phaseStart, enterEnd - 1e-4);
  }
  const enterMid = enterStart + (enterEnd - enterStart) * 0.52;
  return { enterStart, enterMid, enterEnd };
}

/**
 * WAAPI keyframe offsets must be in [0, 1] and monotonically increasing.
 * Use this for every scroll-linked useTransform input range.
 */
export function pulseKeyframeOffsets(values: number[]): number[] {
  if (values.length === 0) return [0, 1];

  const epsilon = 1e-4;
  const lastIndex = values.length - 1;
  const maxFirst = Math.max(0, 1 - epsilon * lastIndex);
  let previous = Math.min(Math.max(values[0] ?? 0, 0), maxFirst);
  const offsets = [previous];

  for (let index = 1; index < values.length; index += 1) {
    const remaining = lastIndex - index;
    const ceiling = 1 - remaining * epsilon;
    const next = Math.min(Math.max(values[index] ?? previous, previous + epsilon), ceiling);
    offsets.push(next);
    previous = next;
  }

  return offsets;
}

/** Kept for Fast Refresh compatibility with older PE headline transforms. */
export function pulseBeatWindow(
  beatStart: number,
  beatEnd: number,
): { fadeIn: number; holdStart: number; holdEnd: number; fadeOut: number } {
  const span = Math.max(beatEnd - beatStart, 0);
  const edge = span * 0.1;
  return {
    fadeIn: beatStart + edge * 0.4,
    holdStart: beatStart + edge,
    holdEnd: beatEnd - edge,
    fadeOut: beatEnd - edge * 0.4,
  };
}

/**
 * Map 0–1 local headline progress onto slide indices 0…n-1.
 * Pattern: hold, scroll to next, hold, scroll to next, hold.
 */
export function pulseHeadlineSlideKeyframes(slideCount: number): {
  localInput: number[];
  output: number[];
} {
  const moves = Math.max(slideCount - 1, 0);
  const segments: number[] = [];
  for (let index = 0; index < slideCount; index += 1) {
    segments.push(PULSE_HEADLINE_HOLD_VH);
    if (index < moves) segments.push(PULSE_HEADLINE_MOVE_VH);
  }

  const localInput = pulsePhaseBounds(segments);
  const output: number[] = [];
  for (let index = 0; index < slideCount; index += 1) {
    output.push(index, index);
  }

  return { localInput, output };
}

/** Crossfade edge as a fraction of a phase span. */
export function pulsePhaseFadeEdge(phaseStart: number, phaseEnd: number, ratio = 0.12): number {
  return (phaseEnd - phaseStart) * ratio;
}
