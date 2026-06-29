import type { BaseComponentContract, TokenStyleContract } from "./types";

export type CardVariant = "plain" | "outlined" | "elevated";

export interface CardContract extends BaseComponentContract {
  variant?: CardVariant;
  title?: string;
  summary?: string;
  mediaAssetId?: string;
  style?: Pick<TokenStyleContract, "background" | "padding" | "radius" | "shadow">;
}
