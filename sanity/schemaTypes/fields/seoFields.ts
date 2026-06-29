import { defineField } from "sanity";
import { imageAltWarning } from "./validation";

export const seoFields = [
  defineField({
    name: "seoTitle",
    title: "SEO 標題",
    type: "string",
    group: "seo",
    description: "搜尋結果與分享預覽使用的標題；未填時由頁面標題 fallback。",
  }),
  defineField({
    name: "seoDescription",
    title: "SEO 描述",
    type: "text",
    rows: 3,
    group: "seo",
    description: "搜尋結果與分享預覽使用的摘要；未確認前請留空。",
  }),
  defineField({
    name: "canonicalUrl",
    title: "Canonical 網址",
    type: "url",
    group: "seo",
    description: "正式頁面網址；未公開前請留空。",
  }),
  defineField({
    name: "ogImage",
    title: "Open Graph 分享圖",
    type: "image",
    group: "seo",
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: "alt",
        title: "圖片替代文字",
        type: "string",
        validation: imageAltWarning,
        description: "描述圖片內容，供 SEO 與無障礙使用。",
      }),
    ],
    description: "社群分享圖片；未確認正式圖片前請留空。",
  }),
];
