import { defineField, defineType } from "sanity";
import { contentStatusField } from "./contentStatus";
import { seoFields } from "./fields/seoFields";
import { textSafetyValidation } from "./fields/validation";

export const faq = defineType({
  name: "faq",
  title: "常見問題",
  type: "document",
  groups: [
    { name: "basic", title: "基本資料", default: true },
    { name: "content", title: "內容編輯" },
    { name: "seo", title: "SEO 設定" },
    { name: "publishing", title: "發布狀態" },
  ],
  fields: [
    defineField({
      name: "category",
      title: "分類",
      type: "string",
      group: "basic",
      description: "旅客會依分類瀏覽問題。若分類不確定，先保持草稿。",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "入住與退房", value: "policy" },
          { title: "交通與接送", value: "location" },
          { title: "包棟", value: "private-stay" },
          { title: "租車與行程", value: "transport" },
        ],
      },
    }),
    defineField({
      name: "question",
      title: "問題",
      type: "string",
      group: "content",
      description: "旅客看到的問題文字。正式發布前不可含測試或待確認文字。",
      validation: (rule) => [rule.required(), ...textSafetyValidation(rule)],
    }),
    defineField({
      name: "answer",
      title: "回答",
      type: "text",
      rows: 5,
      group: "content",
      description: "旅客看到的回答。涉及費用、取消、付款等規則時，必須先確認再發布。",
      validation: (rule) => [rule.required(), ...textSafetyValidation(rule)],
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
      title: "question",
      category: "category",
      subtitle: "contentStatus",
    },
    prepare(selection) {
      return {
        title: selection.title || "未命名問題",
        subtitle: [selection.category, selection.subtitle].filter(Boolean).join(" / "),
      };
    },
  },
});
