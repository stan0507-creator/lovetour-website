export const publishedFilter = 'contentStatus == "published"';

export const previewFilter = 'contentStatus in ["draft", "verified", "published"]';

export const pocDraftExclusionFilter = '!(_id match "drafts.poc-*") && !(_id match "poc-*")';

export const contentStatusFilter = (mode: "draft" | "published"): string =>
  `${mode === "published" ? publishedFilter : previewFilter} && ${pocDraftExclusionFilter}`;

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
    heroDesktopImage{
      ...,
      asset->{_ref, url, metadata{dimensions}}
    },
    heroMobileImage{
      ...,
      asset->{_ref, url, metadata{dimensions}}
    },
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
      asset->{_ref, url, metadata{dimensions}}
    },
    gallery[]{
      ...,
      asset->{_ref, url, metadata{dimensions}}
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
