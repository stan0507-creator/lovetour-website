export const typographyTokens = {
  fontFamily: {
    sans: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif',
    display: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif',
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    md: "1.125rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "2.5rem",
    "4xl": "3.5rem",
    "5xl": "4.75rem",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  lineHeight: {
    tight: 1.12,
    heading: 1.2,
    normal: 1.6,
    relaxed: 1.75,
  },
  letterSpacing: {
    normal: "0",
    wide: "0.02em",
    wider: "0.04em",
  },
} as const;

export type FontFamilyToken = keyof typeof typographyTokens.fontFamily;
export type FontSizeToken = keyof typeof typographyTokens.fontSize;
export type FontWeightToken = keyof typeof typographyTokens.fontWeight;
export type LineHeightToken = keyof typeof typographyTokens.lineHeight;
export type LetterSpacingToken = keyof typeof typographyTokens.letterSpacing;
