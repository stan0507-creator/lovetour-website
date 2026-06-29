import type { SiteProfileContent } from "../types";

export const siteProfile = {
  name: "樂圖漫遊會館",
  tagline: "Lovetour HomeStay",
  description:
    "樂圖漫遊會館位於澎湖，分為 Love 館與 Tour 館，共提供 12 間客房。我們重視房間的寬敞、整潔與睡眠舒適度，希望旅客在澎湖遊玩一整天後，回到民宿可以真正放鬆、好好休息。",
  address: "澎湖縣馬公市西衛里261-9號",
  contacts: [
    {
      type: "phone",
      label: "訂房電話",
      value: "0905-370-600",
      href: "tel:+886905370600",
      isPrimary: true,
    },
    {
      type: "line",
      label: "LINE ID",
      value: "@tour880",
    },
    {
      type: "email",
      label: "Email",
      value: "lovetour880@gmail.com",
      href: "mailto:lovetour880@gmail.com",
    },
    {
      type: "website",
      label: "官方網站",
      value: "lovetour880.com",
      href: "https://www.lovetour880.com/",
    },
  ],
  checkInTime: "16:00",
  checkOutTime: "11:00",
  contactHours: "08:00-21:00",
  languages: ["zh-Hant"],
  contentStatus: "verified",
  published: false,
} satisfies SiteProfileContent;
