import { defineField } from "sanity";
import { urlSafetyValidation } from "./validation";

export const lineInquiryUrlField = defineField({
  name: "lineInquiryUrl",
  title: "LINE 詢問網址",
  type: "url",
  group: "links",
  description: "LINE 官方完整網址尚未確認前請留空，不要自行組合網址。",
  validation: urlSafetyValidation,
});

export const bookingUrlField = defineField({
  name: "bookingUrl",
  title: "訂房連結",
  type: "url",
  group: "links",
  description: "未來可放奧丁丁對應訂房頁；未確認前請留空。",
  validation: urlSafetyValidation,
});

export const googleMapsUrlField = defineField({
  name: "googleMapsUrl",
  title: "Google Maps 網址",
  type: "url",
  group: "links",
  description: "Google 地圖商家分享連結；未確認前請留空。",
  validation: urlSafetyValidation,
});

export const socialLinkFields = [
  defineField({
    name: "facebookUrl",
    title: "Facebook 網址",
    type: "url",
    group: "links",
    description: "官方 Facebook 連結；未確認前請留空。",
    validation: urlSafetyValidation,
  }),
  defineField({
    name: "instagramUrl",
    title: "Instagram 網址",
    type: "url",
    group: "links",
    description: "官方 Instagram 連結；未確認前請留空。",
    validation: urlSafetyValidation,
  }),
];
