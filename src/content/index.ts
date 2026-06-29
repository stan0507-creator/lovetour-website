import type { Offer } from "../domain/models";
import { faqs } from "./data/faqs";
import { mediaAssets } from "./data/media-assets";
import { nearbyPlaces } from "./data/nearby-places";
import { newsArticles } from "./data/news";
import { offers } from "./data/offers";
import { aboutPageContent, villaRentalContent } from "./data/page-content";
import { policies } from "./data/policies";
import { properties } from "./data/properties";
import { rooms } from "./data/rooms";
import { siteProfile } from "./data/site-profile";
import type {
  AboutPageContent,
  ContentId,
  ContentSnapshot,
  FAQContent,
  MediaAssetContent,
  NearbyPlaceContent,
  NewsArticleContent,
  PolicyContent,
  PropertyContent,
  RoomPageContent,
  RoomContent,
  SiteProfileContent,
  VillaRentalContent,
} from "./types";
import { getSanityPocSnapshot, shouldUseSanityContent } from "./cms";

const byPriority = <T>(items: readonly T[]): T[] =>
  [...items].sort((left, right) => {
    const leftPriority = (left as { priority?: number }).priority ?? 999;
    const rightPriority = (right as { priority?: number }).priority ?? 999;

    return leftPriority - rightPriority;
  });

const findById = <T extends { id: ContentId }>(
  items: readonly T[],
  id: ContentId,
): T | undefined => items.find((item) => item.id === id);

const allMediaAssets: readonly MediaAssetContent[] = mediaAssets;
const allProperties: readonly PropertyContent[] = properties;

type PublishableContent = {
  contentStatus?: string;
  published?: boolean;
};

export type ContentMode = "draft" | "published";

export const getContentMode = (): ContentMode => {
  if (import.meta.env.PUBLIC_CONTENT_MODE === "draft") {
    return "draft";
  }

  if (import.meta.env.DEV) {
    return "draft";
  }

  return "published";
};

export const isDraftContentMode = (): boolean => getContentMode() === "draft";

const resolveMediaAssets = (ids: readonly ContentId[]): MediaAssetContent[] =>
  ids
    .map((id) => findById(allMediaAssets, id))
    .filter((asset): asset is MediaAssetContent => Boolean(asset));

const hydrateRoom = (room: RoomContent): RoomPageContent => {
  const { photoIds, ...roomFields } = room;

  return {
    ...roomFields,
    featureHighlights: room.featureHighlights ?? [],
    notes: room.notes ?? [],
    photos: resolveMediaAssets(photoIds),
  };
};

export const getSiteProfile = (): SiteProfileContent => siteProfile;

export const getMediaAssets = (): MediaAssetContent[] => byPriority(allMediaAssets);

export const getMediaAssetById = (id: ContentId): MediaAssetContent | undefined =>
  findById(allMediaAssets, id);

export const getProperties = (): PropertyContent[] =>
  byPriority(allProperties).filter(isVisibleContent);

export const getPublishedMediaAssets = (): MediaAssetContent[] =>
  getMediaAssets().filter(isPublishedContent);

export const getPropertyById = (id: ContentId): PropertyContent | undefined =>
  findById(allProperties, id);

export const getPropertyBySlug = (slug: string): PropertyContent | undefined =>
  getProperties().find((property) => property.slug === slug);

export const getPublishedProperties = (): PropertyContent[] =>
  getProperties().filter(isPublishedContent);

export const getRoomEntries = (): RoomContent[] => byPriority(rooms);

export const getAllRoomEntries = (): RoomContent[] => byPriority(rooms);

export const getRooms = (): RoomPageContent[] =>
  getAllRoomEntries().filter(isVisibleContent).map(hydrateRoom);

export const getPublishedRooms = (): RoomPageContent[] =>
  getRooms().filter(isPublishedContent);

export const getRoomBySlug = (slug: string): RoomPageContent | undefined =>
  getRooms().find((room) => room.slug === slug);

export const getRoomPageBySlug = (slug: string): RoomPageContent | undefined =>
  getRoomBySlug(slug);

export const getFAQs = (category?: string): FAQContent[] => {
  const sortedFAQs = byPriority(faqs).filter(isVisibleContent);

  if (!category) {
    return sortedFAQs;
  }

  return sortedFAQs.filter((faq) => faq.category === category);
};

export const getPublishedFAQs = (category?: string): FAQContent[] =>
  getFAQs(category).filter(isPublishedContent);

export const getPolicies = (type?: PolicyContent["type"]): PolicyContent[] => {
  const sortedPolicies = byPriority(policies).filter(isVisibleContent);

  if (!type) {
    return sortedPolicies;
  }

  return sortedPolicies.filter((policy) => policy.type === type);
};

export const getPublishedPolicies = (type?: PolicyContent["type"]): PolicyContent[] =>
  getPolicies(type).filter(isPublishedContent);

export const getOffers = (): Offer[] => byPriority(offers).filter(isVisibleContent);

export const getPublishedOffers = (): Offer[] => getOffers().filter(isPublishedContent);

export const getOfferBySlug = (slug: string): Offer | undefined =>
  getOffers().find((offer) => offer.slug === slug);

const getVisibleSingleton = <T extends PublishableContent>(item: T): T | undefined =>
  isVisibleContent(item) ? item : undefined;

export const getAboutPageContent = (): AboutPageContent | undefined =>
  getVisibleSingleton(aboutPageContent);

export const getVillaRentalContent = (): VillaRentalContent | undefined =>
  getVisibleSingleton(villaRentalContent);

export const getNewsArticles = (): NewsArticleContent[] =>
  byPriority(newsArticles).filter(isVisibleContent);

export const getPublishedNewsArticles = (): NewsArticleContent[] =>
  byPriority(newsArticles).filter(isPublishedContent);

export const getNewsArticleBySlug = (slug: string): NewsArticleContent | undefined =>
  getNewsArticles().find((article) => article.slug === slug);

export const getNearbyPlaces = (
  category?: NearbyPlaceContent["category"],
): NearbyPlaceContent[] => {
  const sortedPlaces = byPriority(nearbyPlaces).filter(isVisibleContent);

  if (!category) {
    return sortedPlaces;
  }

  return sortedPlaces.filter((place) => place.category === category);
};

export const getPublishedNearbyPlaces = (
  category?: NearbyPlaceContent["category"],
): NearbyPlaceContent[] => getNearbyPlaces(category).filter(isPublishedContent);

export const getContentSnapshot = (): ContentSnapshot => ({
  siteProfile: getSiteProfile(),
  mediaAssets: getMediaAssets(),
  properties: getProperties(),
  rooms: getRooms(),
  faqs: getFAQs(),
  policies: getPolicies(),
  offers: getOffers(),
  nearbyPlaces: getNearbyPlaces(),
  newsArticles: getNewsArticles(),
});

export const getContentSnapshotFromSource = async (): Promise<ContentSnapshot> => {
  const localSnapshot = getContentSnapshot();

  if (!shouldUseSanityContent()) {
    return localSnapshot;
  }

  const sanitySnapshot = await getSanityPocSnapshot();

  if (!sanitySnapshot) {
    return localSnapshot;
  }

  return {
    ...localSnapshot,
    siteProfile: sanitySnapshot.siteProfile ?? localSnapshot.siteProfile,
    properties: sanitySnapshot.properties.length > 0 ? sanitySnapshot.properties : localSnapshot.properties,
    rooms: sanitySnapshot.rooms.length > 0 ? sanitySnapshot.rooms : localSnapshot.rooms,
    faqs: sanitySnapshot.faqs.length > 0 ? sanitySnapshot.faqs : localSnapshot.faqs,
  };
};

export * from "./cms";

export const isPublishedContent = (item: PublishableContent): boolean =>
  item.contentStatus === "published" && item.published === true;

export const isVerifiedDraftContent = (item: PublishableContent): boolean =>
  item.contentStatus === "verified" && item.published === false;

export const isVisibleContent = (item: PublishableContent): boolean => {
  if (getContentMode() === "published") {
    return isPublishedContent(item);
  }

  return isPublishedContent(item) || isVerifiedDraftContent(item);
};
