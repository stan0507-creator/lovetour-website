import type {
  ColorToken,
  IconSizeToken,
  RadiusToken,
  ShadowToken,
  SpacingToken,
} from "../tokens";

export type ComponentSize = "sm" | "md" | "lg";
export type ComponentTone = "primary" | "secondary" | "accent" | "neutral" | "success" | "warning" | "error";
export type ComponentAlign = "start" | "center" | "end";
export type ComponentWidth = "content" | "wide" | "full";

export interface BaseComponentContract {
  id?: string;
  testId?: string;
  className?: string;
}

export interface InteractiveComponentContract extends BaseComponentContract {
  ariaLabel?: string;
  disabled?: boolean;
  href?: string;
  rel?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface IconContract {
  name: string;
  label?: string;
  size?: IconSizeToken;
}

export interface TokenStyleContract {
  color?: ColorToken;
  background?: ColorToken;
  padding?: SpacingToken;
  radius?: RadiusToken;
  shadow?: ShadowToken;
}
