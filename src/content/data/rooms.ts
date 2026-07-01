import type { RoomContent } from "../types";

const commonAmenities = ["冷暖氣", "電視", "冰箱", "Wi-Fi", "吹風機", "熱水壺"];
const bathroomAmenities = ["獨立衛浴", "乾濕分離", "盥洗用品", "毛巾"];
const commonFeatures = ["寬敞舒適", "乾淨整潔", "睡眠舒適"];
const commonNotes = ["全館室內禁止吸菸。", "如需加床，請於訂房前或入住前提前告知。", "晚上 10 點後請勿大聲喧嘩。"];

const createRoom = (room: {
  id: string;
  propertyId: "property-love" | "property-tour";
  roomNumber: string;
  name: string;
  slug: string;
  standardGuests: number;
  bedSetup: string;
  photoIds: string[];
  displayOrder: number;
}): RoomContent => ({
  id: room.id,
  propertyId: room.propertyId,
  roomNumber: room.roomNumber,
  name: room.name,
  slug: room.slug,
  summary: `建議 ${room.standardGuests} 位入住，配置 ${room.bedSetup}，適合在澎湖旅途中好好休息。`,
  capacity: {
    standard: room.standardGuests,
  },
  bedSetup: room.bedSetup,
  amenities: [...commonAmenities, ...bathroomAmenities],
  photoIds: room.photoIds,
  featureHighlights: commonFeatures,
  notes: commonNotes,
  isBookableAsPrivateStay: room.propertyId === "property-tour",
  displayOrder: room.displayOrder,
  featured: false,
  contentStatus: "verified",
  published: false,
  priority: room.displayOrder,
});

export const rooms = [
  createRoom({
    id: "room-love-1201",
    propertyId: "property-love",
    roomNumber: "1201",
    name: "地中海豪華雙人房",
    slug: "love-1201-mediterranean-deluxe-double-room",
    standardGuests: 2,
    bedSetup: "一大床",
    photoIds: ["media-room-double"],
    displayOrder: 1,
  }),
  createRoom({
    id: "room-love-1202",
    propertyId: "property-love",
    roomNumber: "1202",
    name: "漫波雙人房",
    slug: "love-1202-wave-double-room",
    standardGuests: 2,
    bedSetup: "一大床",
    photoIds: ["media-room-double"],
    displayOrder: 2,
  }),
  createRoom({
    id: "room-love-1203",
    propertyId: "property-love",
    roomNumber: "1203",
    name: "旅人四人房",
    slug: "love-1203-traveler-quad-room",
    standardGuests: 4,
    bedSetup: "兩大床",
    photoIds: ["media-room-family"],
    displayOrder: 3,
  }),
  createRoom({
    id: "room-love-1301",
    propertyId: "property-love",
    roomNumber: "1301",
    name: "VIP沐月星空四人房",
    slug: "love-1301-vip-moon-starlight-quad-room",
    standardGuests: 4,
    bedSetup: "兩大床",
    photoIds: ["media-room-family"],
    displayOrder: 4,
  }),
  createRoom({
    id: "room-love-1302",
    propertyId: "property-love",
    roomNumber: "1302",
    name: "森旅3人房",
    slug: "love-1302-forest-travel-triple-room",
    standardGuests: 3,
    bedSetup: "一大一小床",
    photoIds: ["media-room-family"],
    displayOrder: 5,
  }),
  createRoom({
    id: "room-love-1303",
    propertyId: "property-love",
    roomNumber: "1303",
    name: "晴空四人房",
    slug: "love-1303-sunny-sky-quad-room",
    standardGuests: 4,
    bedSetup: "兩大床",
    photoIds: ["media-room-family"],
    displayOrder: 6,
  }),
  createRoom({
    id: "room-tour-2201",
    propertyId: "property-tour",
    roomNumber: "2201",
    name: "愛情海豪華雙人房",
    slug: "tour-2201-aegean-deluxe-double-room",
    standardGuests: 2,
    bedSetup: "一大床",
    photoIds: ["media-room-double"],
    displayOrder: 7,
  }),
  createRoom({
    id: "room-tour-2202",
    propertyId: "property-tour",
    roomNumber: "2202",
    name: "旅圖四人房A",
    slug: "tour-2202-travel-map-quad-room-a",
    standardGuests: 4,
    bedSetup: "兩大床",
    photoIds: ["media-room-family"],
    displayOrder: 8,
  }),
  createRoom({
    id: "room-tour-2203",
    propertyId: "property-tour",
    roomNumber: "2203",
    name: "隱夏雙人房",
    slug: "tour-2203-hidden-summer-double-room",
    standardGuests: 2,
    bedSetup: "一大床",
    photoIds: ["media-room-double"],
    displayOrder: 9,
  }),
  createRoom({
    id: "room-tour-2301",
    propertyId: "property-tour",
    roomNumber: "2301",
    name: "VIP沐星星空四人房",
    slug: "tour-2301-vip-star-starlight-quad-room",
    standardGuests: 4,
    bedSetup: "兩大床",
    photoIds: ["media-room-family"],
    displayOrder: 10,
  }),
  createRoom({
    id: "room-tour-2302",
    propertyId: "property-tour",
    roomNumber: "2302",
    name: "旅圖四人房B",
    slug: "tour-2302-travel-map-quad-room-b",
    standardGuests: 4,
    bedSetup: "兩大床",
    photoIds: ["media-room-family"],
    displayOrder: 11,
  }),
  createRoom({
    id: "room-tour-2303",
    propertyId: "property-tour",
    roomNumber: "2303",
    name: "湛藍雙人房",
    slug: "tour-2303-azure-double-room",
    standardGuests: 2,
    bedSetup: "一大床",
    photoIds: ["media-room-double"],
    displayOrder: 12,
  }),
] satisfies readonly RoomContent[];
