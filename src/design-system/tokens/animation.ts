export const animationTokens = {
  duration: {
    instant: "0ms",
    fast: "120ms",
    base: "180ms",
    slow: "280ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    entrance: "cubic-bezier(0, 0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export type DurationToken = keyof typeof animationTokens.duration;
export type EasingToken = keyof typeof animationTokens.easing;
