import type { MediaAssetContent } from "../types";

const lovetourExteriorImage =
  "https://cdn.sanity.io/images/47j0q3it/production/7ffeaae5d05dcead9a2c9b7f65fc91a6867f951b-2400x1350.webp";
const lovetourExteriorAlt = "樂圖漫遊會館 Love 與 Tour 館雙棟白色建築外觀";

export const mediaAssets = [
  {
    id: "media-brand-hero-sea",
    src: lovetourExteriorImage,
    alt: lovetourExteriorAlt,
    caption: "樂圖漫遊會館外觀照片。",
    tags: ["brand", "location"],
    contentStatus: "sample",
    published: false,
  },
  {
    id: "media-room-double",
    src: lovetourExteriorImage,
    alt: lovetourExteriorAlt,
    tags: ["room"],
    contentStatus: "sample",
    published: false,
  },
  {
    id: "media-room-family",
    src: lovetourExteriorImage,
    alt: lovetourExteriorAlt,
    tags: ["room"],
    contentStatus: "sample",
    published: false,
  },
  {
    id: "media-room-private-stay",
    src: lovetourExteriorImage,
    alt: lovetourExteriorAlt,
    tags: ["room", "common-area"],
    contentStatus: "sample",
    published: false,
  },
  {
    id: "media-offer-fireworks",
    src: lovetourExteriorImage,
    alt: lovetourExteriorAlt,
    tags: ["offer", "location"],
    contentStatus: "sample",
    published: false,
  },
  {
    id: "media-location-harbor",
    src: lovetourExteriorImage,
    alt: lovetourExteriorAlt,
    tags: ["location"],
    contentStatus: "sample",
    published: false,
  },
  {
    id: "media-news-season",
    src: lovetourExteriorImage,
    alt: lovetourExteriorAlt,
    tags: ["news", "offer"],
    contentStatus: "sample",
    published: false,
  },
  {
    id: "media-news-travel",
    src: lovetourExteriorImage,
    alt: lovetourExteriorAlt,
    tags: ["news", "location"],
    contentStatus: "sample",
    published: false,
  },
] satisfies readonly MediaAssetContent[];
