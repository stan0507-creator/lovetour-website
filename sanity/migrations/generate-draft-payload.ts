import { createDryRunReport, type DryRunDocument, writeJsonReport } from "./dry-run-local-content";

export const PAYLOAD_REPORT_PATH = "../.migration-reports/phase-12c-draft-payload.json";
export const REVIEW_REPORT_PATH = "../.migration-reports/phase-12c-payload-review.json";
export const PAYLOAD_WRITE_ENABLED = false;

type FieldStatus = "mapped" | "transformed" | "intentionally omitted" | "unsupported by schema" | "deferred" | "blocked";

interface FieldCoverageEntry {
  field: string;
  status: FieldStatus;
  target?: string;
  reason?: string;
}

export interface DraftPayloadReview {
  generatedAt: string;
  mode: "draft-payload-review";
  source: "local";
  writeEnabled: false;
  payloadPath: string;
  payloadDocumentCount: number;
  includedByCollection: Record<string, number>;
  excludedDocuments: Array<{ targetDraftId: string; sourceId: string; reason: string; blockingErrors: string[] }>;
  dryRunSummary: ReturnType<typeof createDryRunReport>["summary"];
  duplicateIds: string[];
  duplicateSlugs: string[];
  referenceGraph: ReturnType<typeof createDryRunReport>["referenceGraph"];
  sampleImageOmissions: Array<{ targetDraftId: string; imageRequirements: string[] }>;
  fieldCoverage: Record<string, FieldCoverageEntry[]>;
  validation: {
    allIdsAllowed: boolean;
    noPocIds: boolean;
    noPublishedOnlyIds: boolean;
    noMetadataFields: boolean;
    noUndefinedValues: boolean;
    noForbiddenText: boolean;
    noSampleImageUrls: boolean;
    noFakeAssetRefs: boolean;
    jsonRoundTrip: boolean;
    noMutationFunctions: boolean;
  };
  warnings: string[];
  blockingErrors: string[];
}

const forbiddenText = ["後台測試", "待確認", "placeholder"];
const mutationWords = ["createIfNotExists", "createOrReplace", "transaction", "publish", "mutate"];

const collectionKey = (document: DryRunDocument) => document.sourceCollection;

const stripUndefined = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(stripUndefined);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, entryValue]) => entryValue !== undefined)
        .map(([key, entryValue]) => [key, stripUndefined(entryValue)]),
    );
  }

  return value;
};

const payloadFromDocument = (document: DryRunDocument): Record<string, unknown> =>
  stripUndefined(document.payloadPreview) as Record<string, unknown>;

const collectStrings = (value: unknown): string[] => {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectStrings);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }

  return [];
};

const hasKeyDeep = (value: unknown, keys: Set<string>): boolean => {
  if (Array.isArray(value)) {
    return value.some((entry) => hasKeyDeep(entry, keys));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).some(([key, entryValue]) => keys.has(key) || hasKeyDeep(entryValue, keys));
  }

  return false;
};

const fieldCoverageFor = (document: DryRunDocument): FieldCoverageEntry[] => {
  switch (document.sourceCollection) {
    case "siteProfile":
      return [
        { field: "name", status: "mapped", target: "name" },
        { field: "tagline", status: "transformed", target: "englishName" },
        { field: "description", status: "transformed", target: "slogan" },
        { field: "contacts", status: "transformed", target: "phone/email/lineId/websiteUrl" },
        { field: "address", status: "mapped", target: "address" },
        { field: "checkInTime", status: "deferred", reason: "Covered by Policy content, not Site Profile schema." },
        { field: "checkOutTime", status: "deferred", reason: "Covered by Policy content, not Site Profile schema." },
        { field: "languages", status: "unsupported by schema" },
        { field: "published", status: "intentionally omitted", reason: "Sanity document state is separate from contentStatus." },
      ];
    case "property":
      return [
        { field: "id", status: "transformed", target: "_id" },
        { field: "kind", status: "transformed", target: "propertyKey" },
        { field: "name", status: "mapped", target: "name" },
        { field: "slug", status: "deferred", reason: "Current adapter derives slug from propertyKey." },
        { field: "summary", status: "mapped", target: "summary" },
        { field: "address", status: "mapped", target: "address" },
        { field: "featureHighlights", status: "transformed", target: "features" },
        { field: "sharedContact", status: "unsupported by schema" },
        { field: "featured", status: "unsupported by schema" },
        { field: "published", status: "intentionally omitted" },
      ];
    case "room":
      return [
        { field: "id", status: "transformed", target: "_id" },
        { field: "propertyId", status: "transformed", target: "property._ref" },
        { field: "roomNumber", status: "mapped", target: "roomNumber" },
        { field: "name", status: "mapped", target: "name" },
        { field: "slug", status: "transformed", target: "slug.current" },
        { field: "summary", status: "mapped", target: "summary" },
        { field: "description", status: document.payloadPreview.description ? "mapped" : "deferred", target: "description" },
        { field: "capacity.standard", status: "transformed", target: "recommendedGuests" },
        { field: "capacity.maximum", status: "transformed", target: "maximumGuests" },
        { field: "bedSetup", status: "mapped", target: "bedSetup" },
        { field: "amenities", status: "mapped", target: "amenities" },
        { field: "photoIds", status: "deferred", reason: "Sample media omitted; official assets required later." },
        { field: "featureHighlights", status: "unsupported by schema" },
        { field: "notes", status: "mapped", target: "notes" },
        { field: "isBookableAsPrivateStay", status: "unsupported by schema" },
        { field: "bookingUrl", status: document.payloadPreview.bookingUrl ? "mapped" : "deferred", target: "bookingUrl" },
        { field: "lineInquiryUrl", status: document.payloadPreview.lineInquiryUrl ? "mapped" : "deferred", target: "lineInquiryUrl" },
        { field: "published", status: "intentionally omitted" },
      ];
    case "faq":
      return [
        { field: "id", status: "transformed", target: "_id" },
        { field: "category", status: "mapped", target: "category" },
        { field: "question", status: "mapped", target: "question" },
        { field: "answer", status: "mapped", target: "answer" },
        { field: "priority", status: "transformed", target: "displayOrder" },
        { field: "published", status: "intentionally omitted" },
      ];
    case "policy":
      return [
        { field: "id", status: "transformed", target: "_id" },
        { field: "type", status: "transformed", target: "category" },
        { field: "title", status: "mapped", target: "title" },
        { field: "content", status: "transformed", target: "body" },
        { field: "priority", status: "transformed", target: "displayOrder" },
        { field: "published", status: "intentionally omitted" },
      ];
  }
};

export const createDraftPayloadArtifacts = (generatedAt = new Date().toISOString()) => {
  const dryRun = createDryRunReport(generatedAt);
  const includedDocuments = dryRun.documents.filter((document) => document.readiness !== "blocked");
  const payload = includedDocuments.map(payloadFromDocument);
  const payloadJson = JSON.stringify(payload);
  const strings = collectStrings(payload);
  const ids = payload.map((document) => String(document._id));
  const validation = {
    allIdsAllowed: ids.every((id) => dryRun.documents.some((document) => document.targetDraftId === id)),
    noPocIds: ids.every((id) => !id.includes("poc-")),
    noPublishedOnlyIds: ids.every((id) => id.startsWith("drafts.")),
    noMetadataFields: !hasKeyDeep(payload, new Set(["_rev", "_createdAt", "_updatedAt"])),
    noUndefinedValues: !payloadJson.includes("undefined"),
    noForbiddenText: !strings.some((value) => forbiddenText.some((pattern) => value.includes(pattern))),
    noSampleImageUrls: !strings.some((value) => value.includes("images.unsplash.com")),
    noFakeAssetRefs: !strings.some((value) => value.startsWith("image-") && value.includes("-fake")),
    jsonRoundTrip: JSON.stringify(JSON.parse(payloadJson)) === payloadJson,
    noMutationFunctions: !mutationWords.some((word) => payloadJson.includes(word)),
  };
  const includedByCollection = includedDocuments.reduce<Record<string, number>>((accumulator, document) => {
    const key = collectionKey(document);
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});
  const fieldCoverage = Object.fromEntries(includedDocuments.map((document) => [document.targetDraftId, fieldCoverageFor(document)]));
  const sampleImageOmissions = dryRun.documents
    .filter((document) => document.imageRequirements.some((requirement) => requirement.includes("http")))
    .map((document) => ({ targetDraftId: document.targetDraftId, imageRequirements: document.imageRequirements }));
  const excludedDocuments = dryRun.documents
    .filter((document) => document.readiness === "blocked")
    .map((document) => ({
      targetDraftId: document.targetDraftId,
      sourceId: document.sourceId,
      reason: "blocking-errors",
      blockingErrors: document.blockingErrors,
    }));
  const validationErrors = Object.entries(validation)
    .filter(([, ok]) => !ok)
    .map(([key]) => `Payload validation failed: ${key}`);
  const review: DraftPayloadReview = {
    generatedAt,
    mode: "draft-payload-review",
    source: "local",
    writeEnabled: false,
    payloadPath: PAYLOAD_REPORT_PATH,
    payloadDocumentCount: payload.length,
    includedByCollection,
    excludedDocuments,
    dryRunSummary: dryRun.summary,
    duplicateIds: dryRun.duplicateIds,
    duplicateSlugs: dryRun.duplicateSlugs,
    referenceGraph: dryRun.referenceGraph,
    sampleImageOmissions,
    fieldCoverage,
    validation,
    warnings: dryRun.warnings,
    blockingErrors: [...dryRun.blockingErrors, ...validationErrors],
  };

  return { payload, review };
};

const printSummary = (review: DraftPayloadReview, payloadPath: string, reviewPath: string) => {
  console.log("CMS draft payload generation complete (local files only, no Sanity writes).");
  console.log(`Payload: ${payloadPath}`);
  console.log(`Review: ${reviewPath}`);
  console.log(`Payload documents: ${review.payloadDocumentCount}`);
  console.log(`Excluded documents: ${review.excludedDocuments.length}`);
  console.log(`Warnings: ${review.warnings.length}`);
  console.log(`Blocking errors: ${review.blockingErrors.length}`);
};

const runCli = () => {
  const { payload, review } = createDraftPayloadArtifacts();
  const payloadPath = writeJsonReport(payload, PAYLOAD_REPORT_PATH);
  const reviewPath = writeJsonReport(review, REVIEW_REPORT_PATH);
  printSummary(review, payloadPath, reviewPath);
  process.exitCode = review.blockingErrors.length > 0 ? 1 : 0;
};

if (process.argv[1]?.endsWith("generate-draft-payload.ts")) {
  runCli();
}

