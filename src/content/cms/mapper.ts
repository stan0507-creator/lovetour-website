import type { MediaAsset, SiteProfile } from "../../domain/models";
import type { FAQContent, PropertyContent, RoomPageContent } from "../types";
import type { SanityFAQ, SanityImageRef, SanityProperty, SanityRoom, SanitySiteProfile } from "./types";

const mapPublishedFlag = () => false;

const appendImageParams = (src: string, params: Record<string, string | undefined>): string => {
  const entries = Object.entries(params).filter((entry): entry is [string, string] => Boolean(entry[1]));

  if (entries.length === 0) {
    return src;
  }

  const url = new URL(src);

  entries.forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
};

const cropRectFromSanity = (image: SanityImageRef): string | undefined => {
  const dimensions = image.asset?.metadata?.dimensions;
  const crop = image.crop;

  if (!dimensions?.width || !dimensions.height || !crop) {
    return undefined;
  }

  const left = Math.round((crop.left ?? 0) * dimensions.width);
  const top = Math.round((crop.top ?? 0) * dimensions.height);
  const right = Math.round((crop.right ?? 0) * dimensions.width);
  const bottom = Math.round((crop.bottom ?? 0) * dimensions.height);
  const width = dimensions.width - left - right;
  const height = dimensions.height - top - bottom;

  if (width <= 0 || height <= 0) {
    return undefined;
  }

  return [left, top, width, height].join(",");
};

const objectPositionFromSanity = (image: SanityImageRef): string | undefined => {
  const x = image.hotspot?.x;
  const y = image.hotspot?.y;

  if (typeof x !== "number" || typeof y !== "number") {
    return undefined;
  }

  return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
};

const imageUrlFromSanity = (image: SanityImageRef): string | undefined => {
  const src = image.asset?.url;

  if (!src) {
    return undefined;
  }

  return appendImageParams(src, {
    rect: cropRectFromSanity(image),
  });
};

const imageFromSanity = (
  image: SanityImageRef | undefined,
  fallbackAlt: string,
  tags: MediaAsset["tags"] = ["room"],
): MediaAsset | undefined => {
  const src = image ? imageUrlFromSanity(image) : undefined;

  if (!image || !src) {
    return undefined;
  }

  return {
    id: image.asset?._ref ?? src,
    src,
    alt: image.alt || fallbackAlt,
    objectPosition: objectPositionFromSanity(image),
    tags,
    contentStatus: "verified",
    published: false,
  };
};

export const mapSiteProfile = (profile: SanitySiteProfile): SiteProfile => ({
  name: profile.name,
  tagline: profile.englishName || "Lovetour HomeStay",
  description: profile.slogan || profile.name,
  heroImages: {
    desktop: imageFromSanity(
      profile.heroDesktopImage,
      "樂圖漫遊會館 Love 與 Tour 館雙棟白色建築外觀",
      ["brand", "exterior"],
    ),
    mobile: imageFromSanity(
      profile.heroMobileImage,
      "樂圖漫遊會館 Love 與 Tour 館雙棟白色建築外觀",
      ["brand", "exterior"],
    ),
  },
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
    summary: room.summary || room.name,
    description: room.description,
    capacity: {
      standard: room.recommendedGuests,
      maximum: room.maximumGuests,
    },
    bedSetup: room.bedSetup,
    amenities: room.amenities ?? [],
    photos,
    featureHighlights: [],
    notes: room.notes ?? [],
    bookingUrl: room.bookingUrl ?? room.odingUrl,
    lineInquiryUrl: room.lineInquiryUrl,
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
