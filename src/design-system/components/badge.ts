import type { BaseComponentContract, ComponentSize, ComponentTone, IconContract } from "./types";

export type BadgeVariant = "soft" | "solid" | "outline";

export interface BadgeContract extends BaseComponentContract {
  label: string;
  tone?: ComponentTone;
  variant?: BadgeVariant;
  size?: ComponentSize;
  iconStart?: IconContract;
}
