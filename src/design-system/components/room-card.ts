import type { BaseComponentContract } from "./types";

export interface RoomCardContract extends BaseComponentContract {
  roomId: string;
  title: string;
  summary: string;
  mediaAssetId?: string;
  capacityLabel?: string;
  amenityLabels?: string[];
  href?: string;
}
