import type { FAQContent } from "../types";

export const faqs = [
  {
    id: "faq-check-in",
    question: "入住與退房時間是幾點？",
    answer:
      "入住時間為下午 4 點後，退房時間為上午 11 點前。若房間提前整理完成，我們會主動通知，並盡量協助旅客提早入住。",
    category: "policy",
    contentStatus: "verified",
    published: false,
    priority: 10,
  },
  {
    id: "faq-early-check-in",
    question: "可以提前入住嗎？",
    answer:
      "若房間提前整理完成，我們會盡量協助提早入住；實際可入住時間仍以當日房務整理進度為準。",
    category: "policy",
    contentStatus: "verified",
    published: false,
    priority: 20,
  },
  {
    id: "faq-transportation",
    question: "有提供機場或港口接送嗎？",
    answer:
      "樂圖漫遊會館提供機場及港口接送服務，如有需要，請於入住前提前告知抵達時間、班機或船班資訊及同行人數，以便安排。接送需由民宿確認後才算完成預約。",
    category: "location",
    contentStatus: "verified",
    published: false,
    priority: 30,
  },
  {
    id: "faq-extra-bed",
    question: "房型可以加床嗎？",
    answer:
      "部分房型可加床，如有需求請於訂房前或入住前提前告知。實際可加床數量、適用房型與費用，需由民宿依房型及入住人數確認。",
    category: "policy",
    contentStatus: "verified",
    published: false,
    priority: 40,
  },
  {
    id: "faq-private-stay",
    question: "Tour 館可以包棟嗎？",
    answer:
      "Tour 館包棟適合 14 到 18 人的家庭、朋友及團體旅遊。不加床的標準入住容量為 18 人，包棟訂房請先透過電話聯絡確認日期、人數與需求。",
    category: "private-stay",
    contentStatus: "verified",
    published: false,
    priority: 50,
  },
  {
    id: "faq-rental-and-tours",
    question: "可以協助租車或安排澎湖行程嗎？",
    answer:
      "如有汽車、機車租賃或澎湖旅遊行程安排需求，可提前向我們詢問，我們將協助提供相關資訊與代訂服務。",
    category: "transport",
    contentStatus: "verified",
    published: false,
    priority: 60,
  },
] satisfies readonly FAQContent[];
