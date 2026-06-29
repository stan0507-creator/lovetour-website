import { defineField, defineType } from "sanity";
import { contentStatusField } from "./contentStatus";
import { googleMapsUrlField, lineInquiryUrlField, socialLinkFields } from "./fields/linkFields";
import { seoFields } from "./fields/seoFields";
import { textSafetyValidation, urlSafetyValidation } from "./fields/validation";

export const siteProfile = defineType({
  name: "siteProfile",
  title: "品牌與聯絡資料",
  type: "document",
  groups: [
    { name: "basic", title: "基本資料", default: true },
    { name: "contact", title: "聯絡方式" },
    { name: "links", title: "連結設定" },
    { name: "seo", title: "SEO 設定" },
    { name: "publishing", title: "發布狀態" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "民宿正式中文名稱",
      type: "string",
      group: "basic",
      description: "會顯示在網站品牌區與 SEO fallback。正式發布前必須確認。",
      validation: (rule) => [rule.required(), ...textSafetyValidation(rule)],
    }),
    defineField({
      name: "englishName",
      title: "民宿英文名稱",
      type: "string",
      group: "basic",
      description: "選填，供品牌或 SEO 使用；未確認可留空。",
      validation: textSafetyValidation,
    }),
    defineField({
      name: "slogan",
      title: "品牌 Slogan",
      type: "text",
      rows: 2,
      group: "basic",
      description: "網站主要標語。草稿可先測試，正式發布前不可含後台測試文字。",
      validation: textSafetyValidation,
    }),
    defineField({
      name: "phone",
      title: "電話",
      type: "string",
      group: "contact",
      description: "公開聯絡電話。正式發布前必須確認。",
      validation: (rule) => [rule.required(), ...textSafetyValidation(rule)],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      description: "公開聯絡 Email。正式發布前必須確認。",
      validation: (rule) => [rule.required().email(), ...textSafetyValidation(rule)],
    }),
    defineField({
      name: "address",
      title: "地址",
      type: "string",
      group: "contact",
      description: "公開地址。Google Maps 連結請另外填在連結設定。",
      validation: (rule) => [rule.required(), ...textSafetyValidation(rule)],
    }),
    defineField({
      name: "contactHours",
      title: "回覆時間",
      type: "string",
      group: "contact",
      description: "例如：08:00-21:00。未確認可留空。",
      validation: textSafetyValidation,
    }),
    defineField({
      name: "lineId",
      title: "LINE ID",
      type: "string",
      group: "contact",
      description: "只填 LINE ID，例如 @tour880；完整加入好友網址請填在 LINE 詢問網址。",
      validation: textSafetyValidation,
    }),
    lineInquiryUrlField,
    defineField({
      name: "websiteUrl",
      title: "官網網址",
      type: "url",
      group: "links",
      description: "樂圖漫遊官方網站網址，不是 Google Maps 網址。",
      validation: urlSafetyValidation,
    }),
    googleMapsUrlField,
    ...socialLinkFields,
    ...seoFields,
    contentStatusField,
  ],
  preview: {
    select: {
      title: "name",
      englishName: "englishName",
      subtitle: "contentStatus",
    },
    prepare(selection) {
      return {
        title: selection.title || "未命名品牌資料",
        subtitle: [selection.englishName, selection.subtitle].filter(Boolean).join(" / "),
      };
    },
  },
});
