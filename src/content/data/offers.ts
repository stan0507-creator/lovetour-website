import type { Offer } from "../../domain/models";

export const offers = [
  {
    id: "offer-fireworks-season",
    title: "澎湖花火節住宿詢問",
    slug: "penghu-fireworks-season",
    period: {
      note: "sample data：實際日期依當年度公告調整。",
    },
    summary: "花火節期間住宿需求較高，預留專案內容模型供後續管理。",
    description:
      "此為 sample offer，用來測試活動專案是否能關聯房型、期間與 CTA。",
    relatedRoomIds: ["room-double", "room-family", "room-private-stay"],
    cta: {
      label: "詢問花火節房況",
      href: "#booking-inquiry-placeholder",
      channel: "line",
    },
    contentStatus: "sample",
    published: false,
    priority: 10,
  },
  {
    id: "offer-private-stay",
    title: "好友家庭包棟方案",
    slug: "private-stay-package",
    summary: "適合多人同行的包棟住宿 sample 專案。",
    description:
      "包棟可能同時出現在 Room 與 Offer，後續需依實際經營方式決定資料歸屬。",
    relatedRoomIds: ["room-private-stay"],
    cta: {
      label: "詢問包棟",
      href: "#booking-inquiry-placeholder",
      channel: "line",
    },
    contentStatus: "sample",
    published: false,
    priority: 20,
  },
] satisfies readonly Offer[];
