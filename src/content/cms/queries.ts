export const publishedFilter = 'contentStatus == "published"';

export const previewFilter = 'contentStatus in ["draft", "verified", "published"]';

export const contentStatusFilter = (mode: "draft" | "published"): string =>
  mode === "published" ? publishedFilter : previewFilter;

export const siteProfileQuery = (mode: "draft" | "published"): string => `
  *[_type == "siteProfile" && ${contentStatusFilter(mode)}] | order(_updatedAt desc)[0] {
    _id,
    _type,
    name,
    englishName,
    slogan,
    phone,
    email,
    address,
    contactHours,
    lineId,
    websiteUrl,
    contentStatus
  }
`;

export const propertiesQuery = (mode: "draft" | "published"): string => `
  *[_type == "property" && ${contentStatusFilter(mode)}] | order(displayOrder asc) {
    _id,
    _type,
    propertyKey,
    name,
    summary,
    description,
    features,
    address,
    displayOrder,
    contentStatus
  }
`;

export const roomsQuery = (mode: "draft" | "published"): string => `
  *[_type == "room" && ${contentStatusFilter(mode)}] | order(displayOrder asc) {
    _id,
    _type,
    property->{
      _id,
      _type,
      propertyKey,
      name,
      summary,
      description,
      features,
      address,
      displayOrder,
      contentStatus
    },
    roomNumber,
    name,
    slug,
    recommendedGuests,
    maximumGuests,
    bedSetup,
    extraBedAvailable,
    summary,
    description,
    amenities,
    notes,
    coverImage{
      ...,
      asset->{_ref, url}
    },
    gallery[]{
      ...,
      asset->{_ref, url}
    },
    displayOrder,
    "bookingUrl": coalesce(bookingUrl, odingUrl),
    odingUrl,
    lineInquiryUrl,
    featured,
    contentStatus
  }
`;

export const faqsQuery = (mode: "draft" | "published"): string => `
  *[_type == "faq" && ${contentStatusFilter(mode)}] | order(displayOrder asc) {
    _id,
    _type,
    category,
    question,
    answer,
    displayOrder,
    contentStatus
  }
`;
