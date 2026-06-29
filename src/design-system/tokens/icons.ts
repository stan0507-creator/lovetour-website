export const iconTokens = {
  size: {
    xs: "0.875rem",
    sm: "1rem",
    md: "1.25rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  strokeWidth: {
    regular: 1.75,
    strong: 2.25,
  },
} as const;

export type IconSizeToken = keyof typeof iconTokens.size;
export type IconStrokeWidthToken = keyof typeof iconTokens.strokeWidth;
