export const colorTokens = {
  primary: "#0f8b8d",
  secondary: "#14213d",
  accent: "#e85d4f",
  background: "#fffdf8",
  surface: "#ffffff",
  surfaceMuted: "#eef7f6",
  textPrimary: "#14213d",
  textSecondary: "#5f6f7d",
  border: "rgba(20, 33, 61, 0.14)",
  success: "#2f855a",
  warning: "#d97706",
  error: "#c2410c",
} as const;

export type ColorToken = keyof typeof colorTokens;
