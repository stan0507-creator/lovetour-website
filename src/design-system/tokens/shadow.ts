export const shadowTokens = {
  none: "none",
  sm: "0 1px 2px rgba(20, 33, 61, 0.08)",
  md: "0 8px 24px rgba(20, 33, 61, 0.12)",
  lg: "0 18px 48px rgba(20, 33, 61, 0.16)",
} as const;

export type ShadowToken = keyof typeof shadowTokens;
