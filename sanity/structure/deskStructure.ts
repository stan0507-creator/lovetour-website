import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("樂圖漫遊會館 CMS PoC")
    .items([
      S.documentTypeListItem("siteProfile").title("品牌與聯絡資料"),
      S.documentTypeListItem("property").title("館別資料"),
      S.documentTypeListItem("room").title("房型資料"),
      S.documentTypeListItem("faq").title("常見問題"),
    ]);

