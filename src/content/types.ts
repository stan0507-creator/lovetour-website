import type {
  ContentStatus,
  FAQ,
  MediaAsset,
  NearbyPlace,
  NewsArticle,
  Offer,
  Policy,
  Property,
  Room,
  SEOContent,
  SiteProfile,
} from "../domain/models";

export type ContentId = string;

export interface ContentRecord {
  id: ContentId;
  contentStatus?: ContentStatus;
  published?: boolean;
  priority?: number;
}

export type SiteProfileContent = SiteProfile;

export type MediaAssetContent = MediaAsset;

export type PropertyContent = Property;

export interface RoomContent extends Omit<Room, "photos"> {
  photoIds: ContentId[];
}

export interface FAQContent extends FAQ, ContentRecord {
  category: string;
}

export interface PolicyContent extends Policy, ContentRecord {}

export interface NearbyPlaceContent extends NearbyPlace, ContentRecord {}

export interface RoomPageContent extends Room {
  featureHighlights: string[];
  notes: string[];
}

export interface PageSectionContent {
  title: string;
  copy: string;
}

export interface AboutPageContent {
  hero: PageSectionContent;
  story: PageSectionContent[];
  values: PageSectionContent[];
  seo: SEOContent;
  contentStatus?: ContentStatus;
  published?: boolean;
}

export interface VillaRentalContent {
  hero: PageSectionContent;
  positioning: PageSectionContent;
  capacityLabel: string;
  publicSpaces: string[];
  amenities: string[];
  serviceNotes: string[];
  faqIds: ContentId[];
  seo: SEOContent;
  contentStatus?: ContentStatus;
  published?: boolean;
}

export interface NewsArticleContent extends NewsArticle {}

export interface ContentSnapshot {
  siteProfile: SiteProfileContent;
  mediaAssets: MediaAssetContent[];
  properties: PropertyContent[];
  rooms: RoomPageContent[];
  faqs: FAQContent[];
  policies: PolicyContent[];
  offers: Offer[];
  nearbyPlaces: NearbyPlaceContent[];
  newsArticles: NewsArticleContent[];
}
