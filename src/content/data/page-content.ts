import type { AboutPageContent, VillaRentalContent } from "../types";

export const aboutPageContent = {
  hero: {
    title: "關於樂圖",
    copy: "樂圖漫遊會館不是制式化飯店，而是一間重視人與人互動、希望旅人在澎湖真正放鬆休息的民宿。",
  },
  story: [
    {
      title: "旅途中真正想回去休息的地方",
      copy: "樂圖漫遊會館位於澎湖，分為 Love 館與 Tour 館，共提供 12 間客房。我們重視房間的寬敞、整潔與睡眠舒適度，希望旅客在澎湖遊玩一整天後，回到民宿可以真正放鬆、好好休息。",
    },
    {
      title: "親切、彈性，也迅速協助",
      copy: "除了住宿，我們也提供機場或港口接送、汽機車租賃及旅遊行程代訂等服務，並以親切、彈性及迅速協助旅客解決問題為服務原則。",
    },
    {
      title: "站在旅客角度思考",
      copy: "入住時間雖有明確規定，但如果房間提前整理完成，我們會盡量讓旅客提早入住，避免在炎熱的澎湖提著行李等待。實際安排仍以當日房務整理進度為準。",
    },
  ],
  values: [
    {
      title: "乾淨整潔",
      copy: "把房間與公共空間整理好，是讓旅人安心的第一步。",
    },
    {
      title: "空間寬敞",
      copy: "同行旅人需要能放行李、聊天與休息的餘裕。",
    },
    {
      title: "睡眠舒適",
      copy: "旅行很精彩，但真正補回體力的是睡一個好覺。",
    },
    {
      title: "服務彈性",
      copy: "在不影響其他住客與營運的情況下，盡量提供彈性的協助。",
    },
  ],
  seo: {
    title: "關於樂圖｜樂圖漫遊會館",
    description: "認識樂圖漫遊會館的品牌故事、經營理念與澎湖住宿服務精神。",
    canonicalPath: "/about",
    ogImageId: "media-brand-hero-sea",
  },
  contentStatus: "verified",
  published: false,
} satisfies AboutPageContent;

export const villaRentalContent = {
  hero: {
    title: "Tour 館包棟方案",
    copy: "Tour 館包棟適合 14 到 18 人的家庭、朋友及團體旅遊，適合想共用公共空間、一起聊天與安排澎湖旅程的同行旅客。",
  },
  positioning: {
    title: "把 Tour 館留給同一群旅人",
    copy: "Tour 館共 6 間房，不加床標準容量 18 人，全館合計 9 張雙人床。包棟旅客可使用公共空間，並可依需求詢問 KTV、麻將與烤肉安排。",
  },
  capacityLabel: "適合 14-18 人；不加床標準容量 18 人",
  publicSpaces: ["客廳", "餐桌", "交誼空間", "戶外空間"],
  amenities: ["KTV", "麻將", "烤肉", "冰箱", "開飲機", "微波爐", "電陶爐", "餐具", "電梯"],
  serviceNotes: [
    "包棟訂房請先透過電話聯絡，提供預計入住日期、人數及需求，由民宿人員確認房況與相關細節。",
    "提供機場及港口接送服務，如有需要請於入住前提前預約，並由民宿確認後安排。",
    "入住時間為下午 4 點後，退房時間為上午 11 點前；若房間提前整理完成，會盡量協助提早入住。",
    "晚上 10 點後，戶外請降低音量，避免影響附近住戶。",
  ],
  faqIds: ["faq-private-stay", "faq-transportation", "faq-check-in"],
  seo: {
    title: "包棟方案｜樂圖漫遊會館",
    description: "樂圖漫遊會館 Tour 館包棟草稿內容，適合 14 到 18 人家庭、朋友與團體澎湖旅行。",
    canonicalPath: "/villa-rental",
    ogImageId: "media-room-private-stay",
  },
  contentStatus: "verified",
  published: false,
} satisfies VillaRentalContent;
