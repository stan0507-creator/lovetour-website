import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

import { buildAllowlist } from "./dry-run-local-content";
import { createDraftPayloadArtifacts, PAYLOAD_WRITE_ENABLED } from "./generate-draft-payload";

const { payload, review } = createDraftPayloadArtifacts("2026-06-29T00:00:00.000Z");
const allowlist = new Set(buildAllowlist());

assert.equal(PAYLOAD_WRITE_ENABLED, false);
assert.equal(review.writeEnabled, false);
assert.equal(payload.length, 27);
assert.equal(review.payloadDocumentCount, 27);
assert.equal(review.includedByCollection.siteProfile, 1);
assert.equal(review.includedByCollection.property, 2);
assert.equal(review.includedByCollection.room, 12);
assert.equal(review.includedByCollection.faq, 6);
assert.equal(review.includedByCollection.policy, 6);
assert.equal(review.excludedDocuments.length, 0);

for (const document of payload) {
  assert.ok(String(document._id).startsWith("drafts."), "payload _id must be a draft ID");
  assert.ok(allowlist.has(String(document._id)), "payload _id must be in allowlist");
  assert.ok(!String(document._id).includes("poc-"), "payload _id must not contain poc-");
  assert.equal(document._rev, undefined);
  assert.equal(document._createdAt, undefined);
  assert.equal(document._updatedAt, undefined);
}

const room = payload.find((document) => document._id === "drafts.room-love-1201") as Record<string, unknown>;
assert.deepEqual(room.property, { _type: "reference", _ref: "property-love" });
assert.equal(room.odingUrl, undefined, "payload must not write legacy odingUrl");
assert.equal(room.coverImage, undefined, "sample coverImage must be omitted");
assert.equal(room.gallery, undefined, "sample gallery must be omitted");

const weatherPolicy = payload.find((document) => document._id === "drafts.policy-weather") as Record<string, unknown>;
assert.equal(weatherPolicy.category, "weather");

assert.deepEqual(review.duplicateIds, []);
assert.deepEqual(review.duplicateSlugs, []);
assert.equal(review.referenceGraph.length, 12);
assert.ok(review.sampleImageOmissions.length > 0);
assert.ok(Object.values(review.validation).every(Boolean), "all payload validation checks must pass");
assert.equal(review.blockingErrors.length, 0);

const payloadText = JSON.stringify(payload);
for (const forbidden of ["後台測試", "待確認", "placeholder", "images.unsplash.com", "undefined"]) {
  assert.ok(!payloadText.includes(forbidden), `payload must not include ${forbidden}`);
}

const source = readFileSync(new URL("./generate-draft-payload.ts", import.meta.url), "utf8");
for (const forbidden of ["createClient", "getCliClient", ".create(", ".createIfNotExists(", ".createOrReplace(", ".patch(", ".delete(", ".transaction(", ".mutate(", ".publish("]) {
  assert.ok(!source.includes(forbidden), `payload generator must not include ${forbidden}`);
}

console.log("Draft payload tests passed.");

