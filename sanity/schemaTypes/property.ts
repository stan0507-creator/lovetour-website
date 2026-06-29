import { defineField, defineType } from "sanity";
import { contentStatusField } from "./contentStatus";
import { imageGalleryField, imageWithAltField } from "./fields/imageFields";
import { googleMapsUrlField, lineInquiryUrlField } from "./fields/linkFields";
import { seoFields } from "./fields/seoFields";
import { textSafetyValidation } from "./fields/validation";

export const property = defineType({
  name: "property",
  title: "館別資料",
  type: "document",
  groups: [
    { name: "basic", title: "基本資料", default: true },
    { name: "content", title: "內容編輯" },
    { name: "media", title: "圖片與相簿" },
    { name: "links", title: "連結設定" },
    { name: "seo", title: "SEO 設定" },
    { name: "publishing", title: "發布狀態" },
  ],
  fields: [
    defineField({
      name: "propertyKey",
      title: "館別識別碼",
      type: "string",
      group: "basic",
      description: "系統用識別碼，Love 館使用 love，Tour 館使用 tour。請勿任意新增其他值。",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "Love 館", value: "love" },
          { title: "Tour 館", value: "tour" },
        ],
      },
    }),
    defineField({
      name: "name",
      title: "館別名稱",
      type: "string",
      group: "basic",
      description: "後台與網站使用的館別名稱，例如 Love 館或 Tour 館。",
      validation: (rule) => [rule.required(), ...textSafetyValidation(rule)],
    }),
    defineField({
      name: "summary",
      title: "簡短介紹",
      type: "text",
      rows: 3,
      group: "content",
      description: "館別摘要。正式發布前不可含待確認或測試文字。",
      validation: (rule) => [rule.required(), ...textSafetyValidation(rule)],
    }),
    defineField({
      name: "description",
      title: "詳細介紹",
      type: "text",
      rows: 5,
      group: "content",
      description: "選填，可放較完整的館別介紹；未確認可留空。",
      validation: textSafetyValidation,
    }),
    defineField({
      name: "features",
      title: "特色",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      description: "一行一個特色，例如空間寬敞、睡眠舒適。未確認請不要填待確認。",
      validation: textSafetyValidation,
    }),
    defineField({
      name: "address",
      title: "地址",
      type: "string",
      group: "basic",
      description: "館別地址。若兩館共用地址可填相同地址。",
      validation: textSafetyValidation,
    }),
    googleMapsUrlField,
    lineInquiryUrlField,
    imageWithAltField({
      name: "coverImage",
      title: "館別封面照片",
      description: "Love / Tour 館封面照片；正式照片未確認前請留空。",
    }),
    imageGalleryField({
      name: "gallery",
      title: "館別相簿",
      description: "館別外觀、入口或公共空間照片，可拖曳排序。",
    }),
    defineField({
      name: "displayOrder",
      title: "排序",
      type: "number",
      group: "publishing",
      initialValue: 10,
      description: "數字越小越前面。",
      validation: (rule) => rule.required().integer().min(0),
    }),
    ...seoFields,
    contentStatusField,
  ],
  preview: {
    select: {
      title: "name",
      propertyKey: "propertyKey",
      subtitle: "contentStatus",
    },
    prepare(selection) {
      return {
        title: selection.title || "未命名館別",
        subtitle: [selection.propertyKey, selection.subtitle].filter(Boolean).join(" / "),
      };
    },
  },
});
