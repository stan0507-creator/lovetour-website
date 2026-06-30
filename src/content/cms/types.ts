import type { ContentStatus } from "../../domain/models";

export type CmsContentStatus = Exclude<ContentStatus, "sample"> | "archived";

export interface SanityImageRef {
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
  crop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  hotspot?: {
    x?: number;
    y?: number;
  };
  alt?: string;
}

export interface SanitySiteProfile {
  _id: string;
  _type: "siteProfile";
  name: string;
  englishName?: string;
  slogan?: string;
  phone: string;
  email: string;
  address: string;
  contactHours?: string;
  lineId?: string;
  websiteUrl?: string;
  heroDesktopImage?: SanityImageRef;
  heroMobileImage?: SanityImageRef;
  contentStatus: CmsContentStatus;
}

export interface SanityProperty {
  _id: string;
  _type: "property";
  propertyKey: "love" | "tour";
  name: string;
  summary: string;
  description?: string;
  features?: string[];
  address?: string;
  displayOrder?: number;
  contentStatus: CmsContentStatus;
}

export interface SanityRoom {
  _id: string;
  _type: "room";
  property?: SanityProperty;
  roomNumber: string;
  name: string;
  slug?: {
    current?: string;
  };
  recommendedGuests: number;
  maximumGuests?: number;
  bedSetup: string;
  extraBedAvailable?: boolean;
  summary: string;
  description?: string;
  amenities?: string[];
  notes?: string[];
  coverImage?: SanityImageRef;
  gallery?: SanityImageRef[];
  displayOrder?: number;
  bookingUrl?: string;
  odingUrl?: string;
  lineInquiryUrl?: string;
  featured?: boolean;
  contentStatus: CmsContentStatus;
}

export interface SanityFAQ {
  _id: string;
  _type: "faq";
  category: string;
  question: string;
  answer: string;
  displayOrder?: number;
  contentStatus: CmsContentStatus;
}
