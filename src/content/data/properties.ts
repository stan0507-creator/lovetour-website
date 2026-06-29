import type { PropertyContent } from "../types";

const sharedAddress = "澎湖縣馬公市西衛里261-9號";

export const properties = [
  {
    id: "property-love",
    kind: "love",
    name: "樂圖漫遊會館 Love 館",
    slug: "love",
    summary:
      "Love 館作為樂圖漫遊會館的房型分類之一，延續整體品牌重視寬敞、整潔、睡眠舒適與彈性服務的住宿理念。",
    address: sharedAddress,
    featureHighlights: ["寬敞舒適", "乾淨整潔", "具電梯", "適合家庭與朋友同行"],
    sharedContact: true,
    displayOrder: 10,
    featured: true,
    contentStatus: "verified",
    published: false,
  },
  {
    id: "property-tour",
    kind: "tour",
    name: "樂圖漫遊會館 Tour 館",
    slug: "tour",
    summary:
      "Tour 館作為樂圖漫遊會館的房型分類之一，也是目前包棟方案的主要館別，適合家庭、朋友與多人團體旅遊。",
    address: sharedAddress,
    featureHighlights: ["Tour 館包棟", "公共空間", "KTV", "麻將", "烤肉", "具電梯"],
    sharedContact: true,
    displayOrder: 20,
    featured: true,
    contentStatus: "verified",
    published: false,
  },
] satisfies readonly PropertyContent[];
