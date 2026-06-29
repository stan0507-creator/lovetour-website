import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { faqs } from "../../src/content/data/faqs";
import { mediaAssets } from "../../src/content/data/media-assets";
import { policies } from "../../src/content/data/policies";
import { properties } from "../../src/content/data/properties";
import { rooms } from "../../src/content/data/rooms";
import { siteProfile } from "../../src/content/data/site-profile";
import type { FAQContent, PolicyContent, PropertyContent, RoomContent, SiteProfileContent } from "../../src/content/types";

export const DRY_RUN_WRITE_ENABLED = false;
export const REPORT_PATH = "../.migration-reports/phase-12b-dry-run.json";

const FORBIDDEN_TEXT_PATTERNS = [/待確認/u, /後台測試/u, /\bsample\b/iu, /\bplaceholder\b/iu];
const SAMPLE_IMAGE_PATTERNS = [/images\.unsplash\.com/iu, /示意圖/u];
const PROPERTY_TARGET_IDS = new Set(["property-love", "property-tour"]);
const FAQ_CATEGORIES = new Set(["policy", "location", "private-stay", "transport"]);
const POLICY_CATEGORY_MAP: Record<string, string> = {
  "check-in": "check-in-out",
  cancellation: "cancellation",
  "extra-bed": "extra-bed-child",
  parking: "parking",
  transport: "transfer",
  pet: "pet-visitor",
  smoking: "house-rule",
  "private-stay": "villa-facility",
  payment: "payment",
};
const POLICY_CATEGORIES = new Set([
  "check-in-out",
  "payment",
  "cancellation",
  "transfer",
  "parking",
  "extra-bed-child",
  "pet-visitor",
  "house-rule",
  "villa-facility",
  "travel-service",
  "lost-and-found",
]);

export type Readiness = "ready" | "ready-with-warnings" | "blocked";

export interface DryRunDocument {
  sourceCollection: "siteProfile" | "property" | "room" | "faq" | "policy";
  sourceFile: string;
  sourceId: string;
  targetType: "siteProfile" | "property" | "room" | "faq" | "policy";
  targetDraftId: string;
  publishedBaseId: string;
  slug?: string;
  contentStatus?: string;
  requiredFields: Record<string, boolean>;
  optionalFieldsMissing: string[];
  transformations: string[];
  references: Array<{ field: string; targetId: string; sanityRef: string }>;
  unresolvedReferences: string[];
  imageRequirements: string[];
  sampleContent: string[];
  warnings: string[];
  blockingErrors: string[];
  readiness: Readiness;
  payloadPreview: Record<string, unknown>;
}

export interface DryRunReport {
  generatedAt: string;
  mode: "dry-run";
  source: "local";
  targetDataset: string;
  writeEnabled: false;
  documentCounts: Record<string, number>;
  documents: DryRunDocument[];
  warnings: string[];
  blockingErrors: string[];
  referenceGraph: Array<{ from: string; to: string; field: string }>;
  duplicateIds: string[];
  duplicateSlugs: string[];
  sampleAssets: string[];
  summary: {
    total: number;
    ready: number;
    readyWithWarnings: number;
    blocked: number;
  };
}

const draftIdFor = (baseId: string): string => `drafts.${baseId}`;
const baseIdFromDraft = (draftId: string): string => draftId.replace(/^drafts\./, "");

export const buildAllowlist = () => {
  const ids = [
    draftIdFor("site-profile-main"),
    ...properties.map((property) => draftIdFor(property.id)),
    ...rooms.map((room) => draftIdFor(room.id)),
    ...faqs.map((faq) => draftIdFor(faq.id)),
    ...policies.map((policy) => draftIdFor(policy.id)),
  ];

  return ids;
};

const hasValue = (value: unknown): boolean => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== undefined && value !== null;
};

const detectForbiddenText = (values: Array<unknown>): string[] => {
  const hits = new Set<string>();

  const visit = (value: unknown) => {
    if (typeof value === "string") {
      for (const pattern of FORBIDDEN_TEXT_PATTERNS) {
        if (pattern.test(value)) {
          hits.add(pattern.source);
        }
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    if (value && typeof value === "object") {
      Object.values(value).forEach(visit);
    }
  };

  values.forEach(visit);
  return [...hits];
};

const detectSampleImages = (photoIds: string[]): string[] =>
  photoIds.flatMap((photoId) => {
    const asset = mediaAssets.find((mediaAsset) => mediaAsset.id === photoId);
    if (!asset) {
      return [`missing media asset: ${photoId}`];
    }

    const isSample =
      asset.contentStatus === "sample" ||
      SAMPLE_IMAGE_PATTERNS.some((pattern) => pattern.test(asset.src) || pattern.test(asset.alt) || pattern.test(asset.caption ?? ""));

    return isSample ? [`${photoId} (${asset.src})`] : [];
  });

const readinessFor = (warnings: string[], blockingErrors: string[]): Readiness => {
  if (blockingErrors.length > 0) {
    return "blocked";
  }

  return warnings.length > 0 ? "ready-with-warnings" : "ready";
};

const assertAllowedDraftId = (draftId: string, allowlist: Set<string>, blockingErrors: string[]) => {
  if (!draftId.startsWith("drafts.")) {
    blockingErrors.push(`Target ID must be a draft ID: ${draftId}`);
  }

  if (draftId.includes("poc-")) {
    blockingErrors.push(`Target ID must not contain poc-: ${draftId}`);
  }

  if (!allowlist.has(draftId)) {
    blockingErrors.push(`Target ID is not in allowlist: ${draftId}`);
  }
};

const buildDocument = (
  input: Omit<DryRunDocument, "readiness">,
  allowlist: Set<string>,
  payloadValues: unknown[],
): DryRunDocument => {
  const blockingErrors = [...input.blockingErrors];
  const warnings = [...input.warnings];
  const sampleContent = [...input.sampleContent, ...detectForbiddenText(payloadValues)];

  assertAllowedDraftId(input.targetDraftId, allowlist, blockingErrors);

  if (sampleContent.length > 0) {
    blockingErrors.push(`Forbidden placeholder text detected in ${input.targetDraftId}`);
  }

  for (const [field, ok] of Object.entries(input.requiredFields)) {
    if (!ok) {
      blockingErrors.push(`Missing required field: ${field}`);
    }
  }

  return {
    ...input,
    warnings,
    sampleContent,
    blockingErrors,
    readiness: readinessFor(warnings, blockingErrors),
  };
};

const contactValue = (profile: SiteProfileContent, type: string, key: "value" | "href" = "value") =>
  profile.contacts.find((contact) => contact.type === type)?.[key];

const mapSiteProfile = (allowlist: Set<string>): DryRunDocument => {
  const targetDraftId = draftIdFor("site-profile-main");
  const payload = {
    _id: targetDraftId,
    _type: "siteProfile",
    name: siteProfile.name,
    englishName: siteProfile.tagline,
    slogan: siteProfile.description,
    phone: contactValue(siteProfile, "phone"),
    email: contactValue(siteProfile, "email"),
    address: siteProfile.address,
    contactHours: siteProfile.contactHours,
    lineId: contactValue(siteProfile, "line"),
    websiteUrl: contactValue(siteProfile, "website", "href"),
    contentStatus: siteProfile.contentStatus,
  };

  return buildDocument(
    {
      sourceCollection: "siteProfile",
      sourceFile: "src/content/data/site-profile.ts",
      sourceId: "site-profile-main",
      targetType: "siteProfile",
      targetDraftId,
      publishedBaseId: baseIdFromDraft(targetDraftId),
      contentStatus: siteProfile.contentStatus,
      requiredFields: {
        name: hasValue(payload.name),
        phone: hasValue(payload.phone),
        email: hasValue(payload.email),
        address: hasValue(payload.address),
      },
      optionalFieldsMissing: ["lineInquiryUrl", "googleMapsUrl", "facebookUrl", "instagramUrl", "seoTitle", "seoDescription", "canonicalUrl", "ogImage"],
      transformations: [
        "tagline -> englishName",
        "description -> slogan (current adapter compatibility; schema has no separate brand description field)",
        "contacts[] -> phone/email/lineId/websiteUrl",
      ],
      references: [],
      unresolvedReferences: [],
      imageRequirements: ["Open Graph image not migrated in first batch"],
      sampleContent: [],
      warnings: ["Local checkInTime/checkOutTime have no Site Profile schema field; policy migration covers public rules."],
      blockingErrors: [],
      payloadPreview: payload,
    },
    allowlist,
    [payload],
  );
};

const mapProperty = (property: PropertyContent, allowlist: Set<string>): DryRunDocument => {
  const targetDraftId = draftIdFor(property.id);
  const payload = {
    _id: targetDraftId,
    _type: "property",
    propertyKey: property.kind,
    name: property.name,
    summary: property.summary,
    features: property.featureHighlights,
    address: property.address,
    displayOrder: property.displayOrder,
    contentStatus: property.contentStatus,
  };

  return buildDocument(
    {
      sourceCollection: "property",
      sourceFile: "src/content/data/properties.ts",
      sourceId: property.id,
      targetType: "property",
      targetDraftId,
      publishedBaseId: property.id,
      slug: property.slug,
      contentStatus: property.contentStatus,
      requiredFields: {
        propertyKey: hasValue(payload.propertyKey),
        name: hasValue(payload.name),
        summary: hasValue(payload.summary),
        displayOrder: hasValue(payload.displayOrder),
      },
      optionalFieldsMissing: ["description", "coverImage", "gallery", "googleMapsUrl", "lineInquiryUrl", "seoTitle", "seoDescription", "canonicalUrl", "ogImage"],
      transformations: ["kind -> propertyKey", "featureHighlights -> features", "slug is currently derived from propertyKey by adapter"],
      references: [],
      unresolvedReferences: [],
      imageRequirements: ["Property coverImage/gallery skipped until official photos are confirmed"],
      sampleContent: [],
      warnings: property.featured ? ["Local property featured has no Sanity schema field in first batch."] : [],
      blockingErrors: PROPERTY_TARGET_IDS.has(property.id) ? [] : [`Property target is outside first batch: ${property.id}`],
      payloadPreview: payload,
    },
    allowlist,
    [payload],
  );
};

const mapRoom = (room: RoomContent, allowlist: Set<string>): DryRunDocument => {
  const targetDraftId = draftIdFor(room.id);
  const referenceBaseId = room.propertyId;
  const sampleImages = detectSampleImages(room.photoIds);
  const payload = {
    _id: targetDraftId,
    _type: "room",
    property: referenceBaseId ? { _type: "reference", _ref: referenceBaseId } : undefined,
    roomNumber: room.roomNumber,
    name: room.name,
    slug: { current: room.slug },
    recommendedGuests: room.capacity.standard,
    maximumGuests: room.capacity.maximum,
    bedSetup: room.bedSetup,
    summary: room.summary,
    description: room.description,
    amenities: room.amenities,
    notes: room.notes,
    displayOrder: room.displayOrder,
    bookingUrl: room.bookingUrl,
    lineInquiryUrl: room.lineInquiryUrl,
    featured: room.featured,
    contentStatus: room.contentStatus,
  };
  const blockingErrors: string[] = [];
  const warnings: string[] = [];

  if (!referenceBaseId || !PROPERTY_TARGET_IDS.has(referenceBaseId)) {
    blockingErrors.push(`Room property reference is not allowed: ${referenceBaseId ?? "(empty)"}`);
  }

  if (referenceBaseId?.includes("poc-")) {
    blockingErrors.push(`Room property reference must not point to PoC: ${referenceBaseId}`);
  }

  if (sampleImages.length > 0) {
    warnings.push("Room photoIds point to sample/prototype media; official Sanity image assets must be selected later.");
  }

  if (room.capacity.maximum === room.capacity.standard) {
    warnings.push("maximumGuests equals recommendedGuests; confirm maximum capacity before publishing.");
  }

  return buildDocument(
    {
      sourceCollection: "room",
      sourceFile: "src/content/data/rooms.ts",
      sourceId: room.id,
      targetType: "room",
      targetDraftId,
      publishedBaseId: room.id,
      slug: room.slug,
      contentStatus: room.contentStatus,
      requiredFields: {
        property: hasValue(referenceBaseId),
        roomNumber: hasValue(room.roomNumber),
        name: hasValue(room.name),
        slug: hasValue(room.slug),
        recommendedGuests: hasValue(room.capacity.standard),
        bedSetup: hasValue(room.bedSetup),
        displayOrder: hasValue(room.displayOrder),
      },
      optionalFieldsMissing: [
        ...(room.description ? [] : ["description"]),
        ...(room.bookingUrl ? [] : ["bookingUrl"]),
        ...(room.lineInquiryUrl ? [] : ["lineInquiryUrl"]),
        "coverImage",
        "gallery",
        "seoTitle",
        "seoDescription",
        "canonicalUrl",
        "ogImage",
      ],
      transformations: [
        "propertyId -> Sanity reference _ref using base document ID (not drafts. prefix)",
        "slug string -> slug.current",
        "capacity.standard -> recommendedGuests",
        "capacity.maximum -> maximumGuests",
        "photoIds are reported only; official Sanity image assets are not created in dry-run",
        "future migration writes bookingUrl only; odingUrl remains legacy read fallback",
      ],
      references: referenceBaseId ? [{ field: "property", targetId: referenceBaseId, sanityRef: referenceBaseId }] : [],
      unresolvedReferences: referenceBaseId && PROPERTY_TARGET_IDS.has(referenceBaseId) ? [] : [referenceBaseId ?? "(empty)"],
      imageRequirements: sampleImages.length > 0 ? sampleImages : ["No local photoIds detected"],
      sampleContent: [],
      warnings,
      blockingErrors,
      payloadPreview: payload,
    },
    allowlist,
    [payload],
  );
};

const mapFAQ = (faq: FAQContent, allowlist: Set<string>): DryRunDocument => {
  const targetDraftId = draftIdFor(faq.id);
  const payload = {
    _id: targetDraftId,
    _type: "faq",
    category: faq.category,
    question: faq.question,
    answer: faq.answer,
    displayOrder: faq.priority,
    contentStatus: faq.contentStatus,
  };

  return buildDocument(
    {
      sourceCollection: "faq",
      sourceFile: "src/content/data/faqs.ts",
      sourceId: faq.id,
      targetType: "faq",
      targetDraftId,
      publishedBaseId: faq.id,
      contentStatus: faq.contentStatus,
      requiredFields: {
        category: hasValue(faq.category),
        question: hasValue(faq.question),
        answer: hasValue(faq.answer),
        displayOrder: hasValue(faq.priority),
      },
      optionalFieldsMissing: ["seoTitle", "seoDescription", "canonicalUrl", "ogImage"],
      transformations: ["priority -> displayOrder"],
      references: [],
      unresolvedReferences: [],
      imageRequirements: [],
      sampleContent: [],
      warnings: FAQ_CATEGORIES.has(faq.category) ? [] : [`FAQ category is not in schema enum: ${faq.category}`],
      blockingErrors: FAQ_CATEGORIES.has(faq.category) ? [] : [`Invalid FAQ category: ${faq.category}`],
      payloadPreview: payload,
    },
    allowlist,
    [payload],
  );
};

const mapPolicy = (policy: PolicyContent, allowlist: Set<string>): DryRunDocument => {
  const targetDraftId = draftIdFor(policy.id);
  const category = POLICY_CATEGORY_MAP[policy.type];
  const payload = {
    _id: targetDraftId,
    _type: "policy",
    category,
    title: policy.title,
    body: policy.content,
    displayOrder: policy.priority,
    contentStatus: policy.contentStatus,
  };
  const blockingErrors: string[] = [];

  if (!category) {
    blockingErrors.push(`No Policy category mapping for local type: ${policy.type}`);
  } else if (!POLICY_CATEGORIES.has(category)) {
    blockingErrors.push(`Mapped Policy category is not in schema enum: ${category}`);
  }

  return buildDocument(
    {
      sourceCollection: "policy",
      sourceFile: "src/content/data/policies.ts",
      sourceId: policy.id,
      targetType: "policy",
      targetDraftId,
      publishedBaseId: policy.id,
      contentStatus: policy.contentStatus,
      requiredFields: {
        category: hasValue(category),
        title: hasValue(policy.title),
        body: hasValue(policy.content),
      },
      optionalFieldsMissing: ["summary", "publicNote", "internalNote", "seoTitle", "seoDescription", "canonicalUrl", "ogImage"],
      transformations: ["type -> category", "content -> body", "priority -> displayOrder"],
      references: [],
      unresolvedReferences: [],
      imageRequirements: [],
      sampleContent: [],
      warnings: ["Policy adapter is not connected to the front end yet; this payload is for future CMS migration design only."],
      blockingErrors,
      payloadPreview: payload,
    },
    allowlist,
    [payload],
  );
};

const duplicates = (values: string[]): string[] => {
  const seen = new Set<string>();
  const duplicated = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicated.add(value);
    }
    seen.add(value);
  }

  return [...duplicated];
};

export const createDryRunReport = (generatedAt = new Date().toISOString()): DryRunReport => {
  const allowlist = new Set(buildAllowlist());
  const documents = [
    mapSiteProfile(allowlist),
    ...properties.map((property) => mapProperty(property, allowlist)),
    ...rooms.map((room) => mapRoom(room, allowlist)),
    ...faqs.map((faq) => mapFAQ(faq, allowlist)),
    ...policies.map((policy) => mapPolicy(policy, allowlist)),
  ];
  const duplicateIds = duplicates(documents.map((document) => document.targetDraftId));
  const duplicateSlugs = duplicates(documents.flatMap((document) => (document.slug ? [document.slug] : [])));

  for (const duplicateId of duplicateIds) {
    documents
      .filter((document) => document.targetDraftId === duplicateId)
      .forEach((document) => document.blockingErrors.push(`Duplicate target ID: ${duplicateId}`));
  }

  for (const duplicateSlug of duplicateSlugs) {
    documents
      .filter((document) => document.slug === duplicateSlug)
      .forEach((document) => document.blockingErrors.push(`Duplicate slug: ${duplicateSlug}`));
  }

  documents.forEach((document) => {
    document.readiness = readinessFor(document.warnings, document.blockingErrors);
  });

  const warnings = documents.flatMap((document) => document.warnings.map((warning) => `${document.targetDraftId}: ${warning}`));
  const blockingErrors = documents.flatMap((document) =>
    document.blockingErrors.map((error) => `${document.targetDraftId}: ${error}`),
  );
  const sampleAssets = [...new Set(documents.flatMap((document) => document.imageRequirements).filter((value) => value.includes("http")))];
  const referenceGraph = documents.flatMap((document) =>
    document.references.map((reference) => ({ from: document.targetDraftId, to: reference.targetId, field: reference.field })),
  );
  const summary = {
    total: documents.length,
    ready: documents.filter((document) => document.readiness === "ready").length,
    readyWithWarnings: documents.filter((document) => document.readiness === "ready-with-warnings").length,
    blocked: documents.filter((document) => document.readiness === "blocked").length,
  };

  return {
    generatedAt,
    mode: "dry-run",
    source: "local",
    targetDataset: process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production",
    writeEnabled: false,
    documentCounts: {
      siteProfile: 1,
      property: properties.length,
      room: rooms.length,
      faq: faqs.length,
      policy: policies.length,
    },
    documents,
    warnings,
    blockingErrors,
    referenceGraph,
    duplicateIds,
    duplicateSlugs,
    sampleAssets,
    summary,
  };
};

const writeReport = (report: DryRunReport) => {
  const reportPath = resolve(process.cwd(), REPORT_PATH);
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return reportPath;
};

const printSummary = (report: DryRunReport, reportPath: string) => {
  console.log("CMS migration dry-run complete (no Sanity writes).");
  console.log(`Report: ${reportPath}`);
  console.log(`Documents: ${report.summary.total}`);
  console.log(`Ready: ${report.summary.ready}`);
  console.log(`Ready with warnings: ${report.summary.readyWithWarnings}`);
  console.log(`Blocked: ${report.summary.blocked}`);
  console.log(`Warnings: ${report.warnings.length}`);
  console.log(`Blocking errors: ${report.blockingErrors.length}`);

  if (report.blockingErrors.length > 0) {
    console.log("Blocking error summary:");
    for (const error of report.blockingErrors) {
      console.log(`- ${error}`);
    }
  }
};

const runCli = () => {
  const report = createDryRunReport();
  const reportPath = writeReport(report);
  printSummary(report, reportPath);
  process.exitCode = report.blockingErrors.length > 0 ? 1 : 0;
};

if (process.argv[1]?.endsWith("dry-run-local-content.ts")) {
  runCli();
}
