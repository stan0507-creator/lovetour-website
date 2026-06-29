import { animationTokens } from "./animation";
import { breakpointTokens } from "./breakpoints";
import { colorTokens } from "./colors";
import { iconTokens } from "./icons";
import { radiusTokens } from "./radius";
import { shadowTokens } from "./shadow";
import { spacingTokens } from "./spacing";
import { typographyTokens } from "./typography";
import { zIndexTokens } from "./z-index";

export const designTokens = {
  color: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  breakpoint: breakpointTokens,
  animation: animationTokens,
  icon: iconTokens,
  zIndex: zIndexTokens,
} as const;

export type DesignTokens = typeof designTokens;
