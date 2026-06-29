import type { BaseComponentContract, ComponentWidth } from "./types";
import type { SpacingToken } from "../tokens";

export interface ContainerContract extends BaseComponentContract {
  width?: ComponentWidth;
  paddingX?: SpacingToken;
  paddingY?: SpacingToken;
}
