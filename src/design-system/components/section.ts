import type { BaseComponentContract, ComponentAlign, ComponentWidth } from "./types";
import type { ColorToken, SpacingToken } from "../tokens";

export interface SectionContract extends BaseComponentContract {
  title?: string;
  eyebrow?: string;
  summary?: string;
  align?: ComponentAlign;
  width?: ComponentWidth;
  background?: ColorToken;
  paddingY?: SpacingToken;
}
