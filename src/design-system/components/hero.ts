import type { BaseComponentContract, ComponentAlign } from "./types";

export interface HeroActionContract {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface HeroContract extends BaseComponentContract {
  eyebrow?: string;
  title: string;
  summary?: string;
  mediaAssetId?: string;
  align?: ComponentAlign;
  actions?: HeroActionContract[];
}
