export const breakpointTokens = {
  xs: "360px",
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1440px",
} as const;

export type BreakpointToken = keyof typeof breakpointTokens;
