import type { MediaAsset, SiteProfile } from "../../domain/models";
import type { FAQContent, PropertyContent, RoomPageContent } from "../types";
import type { SanityFAQ, SanityImageRef, SanityProperty, SanityRoom, SanitySiteProfile } from "./types";

const mapPublishedFlag = () => false;

const imageFromSanity = (image: SanityImageRef | undefined, fallbackAlt: string): MediaAsset | undefined => {
  const src = image?.asset?.url;

  if (!src) {
    return undefined;
  }

  return {
    id: image.asset?._ref ?? src,
    src,
    alt: image.alt || fallbackAlt,
    tags: ["room"],
    contentStatus: "verified",
    published: false,
  };
};

export const mapSiteProfile = (profile: SanitySiteProfile): SiteProfile => ({
  name: profile.name,
  tagline: profile.englishName || "Lovetour HomeStay",
  description: profile.slogan || profile.name,
  address: profile.address,
  contacts: [
    {
      type: "phone",
      label: "訂房電話",
      value: profile.phone,
      href: `tel:${profile.phone.replaceAll("-", "")}`,
      isPrimary: true,
    },
    ...(profile.lineId
      ? [
          {
            type: "line" as const,
            label: "LINE ID",
            value: profile.lineId,
          },
        ]
      : []),
    {
      type: "email",
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    ...(profile.websiteUrl
      ? [
          {
            type: "website" as const,
            label: "官方網站",
            value: profile.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, ""),
            href: profile.websiteUrl,
          },
        ]
      : []),
  ],
  contactHours: profile.contactHours,
  languages: ["zh-Hant"],
  contentStatus: "verified",
  published: mapPublishedFlag(),
});

export const mapProperty = (property: SanityProperty): PropertyContent => ({
  id: property._id,
  kind: property.propertyKey,
  name: property.name,
  slug: property.propertyKey,
  summary: property.summary,
  address: property.address,
  featureHighlights: property.features ?? [],
  sharedContact: true,
  displayOrder: property.displayOrder,
  contentStatus: "verified",
  published: mapPublishedFlag(),
});

export const mapRoom = (room: SanityRoom): RoomPageContent => {
  const coverImage = imageFromSanity(room.coverImage, `${room.name}封面照片`);
  const gallery = (room.gallery ?? [])
    .map((image) => imageFromSanity(image, `${room.name}相簿照片`))
    .filter((image): image is MediaAsset => Boolean(image));
  const photos = coverImage ? [coverImage, ...gallery] : gallery;

  return {
    id: room._id,
    propertyId: room.property?._id,
    roomNumber: room.roomNumber,
    name: room.name,
    slug: room.slug?.current ?? room._id,
    summary: room.summary || `${room.name}目前為 Sanity PoC 草稿房型。`,
    description: room.description,
    capacity: {
      standard: room.recommendedGuests,
      maximum: room.maximumGuests ?? room.recommendedGuests,
    },
    bedSetup: room.bedSetup,
    amenities: room.amenities ?? [],
    photos,
    featureHighlights: [],
    notes: room.notes ?? [],
    bookingUrl: room.odingUrl,
    displayOrder: room.displayOrder,
    featured: room.featured ?? false,
    contentStatus: "verified",
    published: mapPublishedFlag(),
  };
};

export const mapFAQ = (faq: SanityFAQ): FAQContent => ({
  id: faq._id,
  question: faq.question,
  answer: faq.answer,
  category: faq.category,
  priority: faq.displayOrder,
  contentStatus: "verified",
  published: mapPublishedFlag(),
});
