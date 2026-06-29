import type { ComponentSize, ComponentTone, IconContract, InteractiveComponentContract } from "./types";

export type ButtonVariant = "solid" | "outline" | "ghost" | "text";

export interface ButtonContract extends InteractiveComponentContract {
  label: string;
  variant?: ButtonVariant;
  tone?: ComponentTone;
  size?: ComponentSize;
  iconStart?: IconContract;
  iconEnd?: IconContract;
  isLoading?: boolean;
}
