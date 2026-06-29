import type { BaseComponentContract } from "./types";

export type GalleryLayout = "grid" | "carousel" | "masonry";

export interface GalleryItemContract {
  mediaAssetId: string;
  caption?: string;
}

export interface GalleryContract extends BaseComponentContract {
  items: GalleryItemContract[];
  layout?: GalleryLayout;
  aspectRatio?: "1:1" | "4:3" | "3:2" | "16:9";
}
