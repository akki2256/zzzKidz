export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const springSnappy = {
  type: "spring" as const,
  stiffness: 380,
  damping: 28,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
};

export const viewportOnce = {
  once: true,
  margin: "-60px" as const,
};
