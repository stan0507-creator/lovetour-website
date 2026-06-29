import { defineField, defineType } from "sanity";
import { contentStatusField } from "./contentStatus";
import { seoFields } from "./fields/seoFields";
import { requiredWhenPublished, sensitivePolicyWarning, textSafetyValidation } from "./fields/validation";

const policyCategoryTitles: Record<string, string> = {
  "check-in-out": "入住與退房",
  payment: "付款與訂金",
  cancellation: "取消與改期",
  transfer: "接送與交通",
  parking: "停車",
  "extra-bed-child": "加床與兒童",
  "pet-visitor": "寵物與訪客",
  "house-rule": "吸菸與住宿規則",
  "villa-facility": "包棟設備",
  "travel-service": "租車與行程",
  "lost-and-found": "遺失物",
};

export const policy = defineType({
  name: "policy",
  title: "住宿政策",
  type: "document",
  groups: [
    { name: "basic", title: "基本資料", default: true },
    { name: "content", title: "內容編輯" },
    { name: "internal", title: "內部備註" },
    { name: "seo", title: "SEO 設定" },
    { name: "publishing", title: "發布狀態" },
  ],
  fields: [
    defineField({
      name: "category",
      title: "政策分類",
      type: "string",
      group: "basic",
      description: "請選擇政策分類；付款、訂金、取消、押金、寵物、訪客或費用未確認前請先保持草稿。",
      validation: (rule) => [requiredWhenPublished(rule, "政策分類"), sensitivePolicyWarning(rule)],
      options: {
        list: [
          { title: "入住與退房", value: "check-in-out" },
          { title: "付款與訂金", value: "payment" },
          { title: "取消與改期", value: "cancellation" },
          { title: "接送與交通", value: "transfer" },
          { title: "停車", value: "parking" },
          { title: "加床與兒童", value: "extra-bed-child" },
          { title: "寵物與訪客", value: "pet-visitor" },
          { title: "吸菸與住宿規則", value: "house-rule" },
          { title: "包棟設備", value: "villa-facility" },
          { title: "租車與行程", value: "travel-service" },
          { title: "遺失物", value: "lost-and-found" },
        ],
      },
    }),
    defineField({
      name: "title",
      title: "政策標題",
      type: "string",
      group: "basic",
      description: "例如：入住時間、退房時間、接送服務。正式發布前必須確認。",
      validation: (rule) => [requiredWhenPublished(rule, "政策標題"), ...textSafetyValidation(rule)],
    }),
    defineField({
      name: "summary",
      title: "簡短說明",
      type: "text",
      rows: 3,
      group: "content",
      description: "列表或摘要區使用；未確認前請留空。",
      validation: textSafetyValidation,
    }),
    defineField({
      name: "body",
      title: "完整說明",
      type: "text",
      rows: 6,
      group: "content",
      description: "正式政策內容；本階段不匯入完整正式政策。",
      validation: (rule) => [requiredWhenPublished(rule, "完整說明"), ...textSafetyValidation(rule)],
    }),
    defineField({
      name: "publicNote",
      title: "公開補充說明",
      type: "text",
      rows: 3,
      group: "content",
      description: "需要顯示給旅客看的補充內容；未確認費用或限制請留空。",
      validation: textSafetyValidation,
    }),
    defineField({
      name: "internalNote",
      title: "內部備註",
      type: "text",
      rows: 3,
      group: "internal",
      description: "僅供後台記錄，不應顯示在旅客網站。",
      validation: textSafetyValidation,
    }),
    defineField({
      name: "displayOrder",
      title: "排序",
      type: "number",
      group: "publishing",
      initialValue: 10,
      description: "數字越小越前面。",
    }),
    ...seoFields,
    contentStatusField,
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      subtitle: "contentStatus",
    },
    prepare(selection) {
      return {
        title: selection.title || "未命名政策",
        subtitle: [policyCategoryTitles[selection.category] || selection.category, selection.subtitle]
          .filter(Boolean)
          .join(" / "),
      };
    },
  },
});
