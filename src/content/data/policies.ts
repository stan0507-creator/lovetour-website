import type { PolicyContent } from "../types";

export const policies = [
  {
    id: "policy-check-in",
    type: "check-in",
    title: "入住與退房",
    content:
      "入住時間為下午 4 點後，退房時間為上午 11 點前。若房間提前整理完成，我們會盡量協助提早入住；實際可入住時間仍以當日房務整理進度為準。",
    contentStatus: "verified",
    published: false,
    priority: 10,
  },
  {
    id: "policy-transportation",
    type: "transport",
    title: "接送與旅遊協助",
    content:
      "樂圖漫遊會館提供機場及港口接送服務，如有需要，請於入住前提前告知抵達時間、班機或船班資訊及同行人數，以便安排。接送需提前預約並由民宿確認。也可協助汽車、機車租賃及澎湖旅遊行程代訂。",
    contentStatus: "verified",
    published: false,
    priority: 20,
  },
  {
    id: "policy-extra-bed",
    type: "extra-bed",
    title: "加床需求",
    content:
      "部分房型可加床，如有需求請於訂房前或入住前提前告知。實際可加床數量、適用房型與費用，需由民宿依房型及入住人數確認。",
    contentStatus: "verified",
    published: false,
    priority: 30,
  },
  {
    id: "policy-smoking",
    type: "smoking",
    title: "室內禁菸",
    content:
      "全館室內禁止吸菸。如有吸菸需求，請先向民宿人員詢問適合位置，並避免影響其他旅客及附近住戶。",
    contentStatus: "verified",
    published: false,
    priority: 40,
  },
  {
    id: "policy-private-stay",
    type: "private-stay",
    title: "Tour 館包棟",
    content:
      "Tour 館包棟適合 14 到 18 人的家庭、朋友及團體旅遊。全館包含 6 間房、9 張雙人床，並具備公共空間、KTV、麻將、烤肉與簡易廚房設備。晚上 10 點後，戶外請降低音量，避免影響附近住戶。",
    contentStatus: "verified",
    published: false,
    priority: 50,
  },
  {
    id: "policy-weather",
    type: "weather",
    title: "天候與交通異常",
    content:
      "如遇颱風、停航或停飛等不可抗力因素，請與民宿聯絡，將依實際交通及公告情況協助處理。",
    contentStatus: "verified",
    published: false,
    priority: 60,
  },
] satisfies readonly PolicyContent[];
