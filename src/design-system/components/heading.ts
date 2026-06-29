import type { BaseComponentContract, ComponentAlign } from "./types";
import type { FontSizeToken, FontWeightToken, LineHeightToken } from "../tokens";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingContract extends BaseComponentContract {
  level: HeadingLevel;
  text: string;
  align?: ComponentAlign;
  size?: FontSizeToken;
  weight?: FontWeightToken;
  lineHeight?: LineHeightToken;
}
