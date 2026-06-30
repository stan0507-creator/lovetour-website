import type { SiteProfile } from "../../domain/models";
import type { FAQContent, PropertyContent, RoomPageContent } from "../types";
import {
  assertSanityConfig,
  createSanityClient,
  getCmsContentMode,
  getContentSource,
  hasSanityConfig,
} from "./client";
import { faqsQuery, propertiesQuery, roomsQuery, siteProfileQuery } from "./queries";
import { mapFAQ, mapProperty, mapRoom, mapSiteProfile } from "./mapper";
import type { SanityFAQ, SanityProperty, SanityRoom, SanitySiteProfile } from "./types";

export interface CmsPocSnapshot {
  siteProfile?: SiteProfile;
  properties: PropertyContent[];
  rooms: RoomPageContent[];
  faqs: FAQContent[];
}

export const shouldUseSanityContent = (): boolean => {
  if (getContentSource() !== "sanity") {
    return false;
  }

  assertSanityConfig();

  return hasSanityConfig();
};

export const getSanityPocSnapshot = async (): Promise<CmsPocSnapshot | undefined> => {
  if (!shouldUseSanityContent()) {
    return undefined;
  }

  const client = createSanityClient();

  if (!client) {
    return undefined;
  }

  const mode = getCmsContentMode();
  const [siteProfile, properties, rooms, faqs] = await Promise.all([
    client.fetch<SanitySiteProfile | null>(siteProfileQuery(mode)),
    client.fetch<SanityProperty[]>(propertiesQuery(mode)),
    client.fetch<SanityRoom[]>(roomsQuery(mode)),
    client.fetch<SanityFAQ[]>(faqsQuery(mode)),
  ]);

  return {
    siteProfile: siteProfile ? mapSiteProfile(siteProfile) : undefined,
    properties: properties.map(mapProperty),
    rooms: rooms.map(mapRoom),
    faqs: faqs.map(mapFAQ),
  };
};

export { assertSanityConfig, createSanityClient, getCmsContentMode, getContentSource, hasSanityConfig };
export type { SanityFAQ, SanityProperty, SanityRoom, SanitySiteProfile };
