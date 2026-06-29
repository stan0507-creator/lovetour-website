import { defineField } from "sanity";

export const contentStatusField = defineField({
  name: "contentStatus",
  title: "內容狀態",
  type: "string",
  group: "publishing",
  initialValue: "draft",
  validation: (rule) => rule.required(),
  options: {
    layout: "radio",
    list: [
      { title: "草稿 draft", value: "draft" },
      { title: "已確認 verified", value: "verified" },
      { title: "已發布 published", value: "published" },
      { title: "已下架 archived", value: "archived" },
    ],
  },
  description:
    "內容確認狀態。這和右下角 Sanity 文件 Publish 按鈕是兩層不同概念；正式網站只讀 contentStatus = published 且文件已發布的資料。",
});
