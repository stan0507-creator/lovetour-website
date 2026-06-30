export type Locale = "zh-Hant" | "en";

export type ContentStatus = "sample" | "draft" | "verified" | "published";

export type PropertyKind = "love" | "tour";

export type ContactChannelType =
  | "phone"
  | "line"
  | "email"
  | "facebook"
  | "instagram"
  | "website"
  | "booking-platform";

export type MediaTag =
  | "brand"
  | "room"
  | "common-area"
  | "exterior"
  | "location"
  | "offer"
  | "news";

export type PolicyType =
  | "check-in"
  | "cancellation"
  | "extra-bed"
  | "parking"
  | "transport"
  | "pet"
  | "smoking"
  | "private-stay"
  | "payment"
  | "weather";

export type PlaceCategory =
  | "airport"
  | "harbor"
  | "restaurant"
  | "attraction"
  | "transport"
  | "shopping";

export interface ContactChannel {
  type: ContactChannelType;
  label: string;
  value: string;
  href?: string;
  isPrimary?: boolean;
}

export interface SiteProfile {
  name: string;
  tagline: string;
  description: string;
  heroImages?: {
    desktop?: MediaAsset;
    mobile?: MediaAsset;
  };
  address?: string;
  contacts: ContactChannel[];
  checkInTime?: string;
  checkOutTime?: string;
  contactHours?: string;
  languages: Locale[];
  contentStatus?: ContentStatus;
  published?: boolean;
}

export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  objectPosition?: string;
  tags: MediaTag[];
  contentStatus?: ContentStatus;
  published?: boolean;
}

export interface Capacity {
  standard: number;
  maximum: number;
}

export interface Room {
  id: string;
  propertyId?: string;
  roomNumber?: string;
  name: string;
  slug: string;
  summary: string;
  description?: string;
  capacity: Capacity;
  bedSetup?: string;
  amenities: string[];
  photos: MediaAsset[];
  featureHighlights?: string[];
  notes?: string[];
  rateNote?: string;
  isBookableAsPrivateStay?: boolean;
  bookingUrl?: string;
  lineInquiryUrl?: string;
  displayOrder?: number;
  featured?: boolean;
  contentStatus?: ContentStatus;
  published?: boolean;
  priority?: number;
}

export interface Property {
  id: string;
  kind: PropertyKind;
  name: string;
  slug: string;
  summary: string;
  address?: string;
  featureHighlights: string[];
  sharedContact?: boolean;
  displayOrder?: number;
  featured?: boolean;
  contentStatus?: ContentStatus;
  published?: boolean;
}

export interface OfferPeriod {
  startsAt?: string;
  endsAt?: string;
  note?: string;
}

export interface CallToAction {
  label: string;
  href: string;
  channel?: ContactChannelType;
}

export interface Offer {
  id: string;
  title: string;
  slug: string;
  period?: OfferPeriod;
  summary: string;
  description?: string;
  relatedRoomIds?: string[];
  cta?: CallToAction;
  contentStatus?: ContentStatus;
  published?: boolean;
  priority?: number;
}

export interface BookingInquiry {
  checkIn?: string;
  checkOut?: string;
  guestCount?: number;
  roomPreference?: string;
  contactName?: string;
  contactMethod?: ContactChannelType;
  message?: string;
  source?: "website" | "line" | "phone" | "social";
}

export interface Policy {
  type: PolicyType;
  title: string;
  content: string;
  contentStatus?: ContentStatus;
  published?: boolean;
  priority?: number;
}

export interface FAQ {
  question: string;
  answer: string;
  category?: string;
  contentStatus?: ContentStatus;
  published?: boolean;
  priority?: number;
}

export interface NearbyPlace {
  name: string;
  category: PlaceCategory;
  distanceText?: string;
  travelTimeText?: string;
  mapUrl?: string;
  description?: string;
  contentStatus?: ContentStatus;
  published?: boolean;
  priority?: number;
}

export interface SEOContent {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImageId?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImageId?: string;
  publishedAt: string;
  category: string;
  body: string[];
  seo: SEOContent;
  contentStatus?: ContentStatus;
  published: boolean;
  priority?: number;
}
