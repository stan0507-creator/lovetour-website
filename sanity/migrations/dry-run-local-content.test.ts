import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

import { buildAllowlist, createDryRunReport, DRY_RUN_WRITE_ENABLED } from "./dry-run-local-content";

const report = createDryRunReport("2026-06-29T00:00:00.000Z");
const allowlist = buildAllowlist();

assert.equal(DRY_RUN_WRITE_ENABLED, false, "dry-run must declare writeEnabled false");
assert.equal(report.writeEnabled, false, "report must declare writeEnabled false");
assert.equal(report.documentCounts.siteProfile, 1);
assert.equal(report.documentCounts.property, 2);
assert.equal(report.documentCounts.room, 12);
assert.equal(report.documentCounts.faq, 6);
assert.equal(report.documentCounts.policy, 6);
assert.equal(report.summary.total, 27);

assert.deepEqual(allowlist, buildAllowlist(), "stable ID generation must be deterministic");
assert.ok(allowlist.includes("drafts.site-profile-main"), "allowlist includes site profile");
assert.ok(allowlist.includes("drafts.property-love"), "allowlist includes Love property");
assert.ok(allowlist.includes("drafts.room-love-1201"), "allowlist includes local room ID");
assert.ok(!allowlist.some((id) => id.includes("poc-")), "allowlist blocks poc-* IDs");
assert.equal(new Set(allowlist).size, allowlist.length, "allowlist IDs must be unique");

assert.deepEqual(report.duplicateIds, [], "dry-run should not detect duplicate IDs in current local source");
assert.deepEqual(report.duplicateSlugs, [], "dry-run should not detect duplicate slugs in current local source");

const room1201 = report.documents.find((document) => document.sourceId === "room-love-1201");
assert.ok(room1201, "room 1201 must be present");
assert.deepEqual(room1201?.references, [{ field: "property", targetId: "property-love", sanityRef: "property-love" }]);
assert.deepEqual(room1201?.unresolvedReferences, [], "room 1201 reference must resolve");
assert.ok(room1201?.warnings.some((warning) => warning.includes("sample/prototype media")), "sample image warning expected");

const weatherPolicy = report.documents.find((document) => document.sourceId === "policy-weather");
assert.equal(weatherPolicy?.readiness, "ready-with-warnings", "weather policy should map to an explicit schema category");
assert.equal(weatherPolicy?.payloadPreview.category, "weather", "weather policy category must be explicit");

const source = readFileSync(new URL("./dry-run-local-content.ts", import.meta.url), "utf8");
for (const forbidden of [".create(", ".createIfNotExists(", ".createOrReplace(", ".patch(", ".delete(", ".transaction(", ".mutate(", ".publish("]) {
  assert.ok(!source.includes(forbidden), `dry-run source must not include ${forbidden}`);
}

const bookingUrlPriority = (bookingUrl?: string, legacyOdingUrl?: string) => bookingUrl ?? legacyOdingUrl;
assert.equal(bookingUrlPriority("https://booking.example/room", "https://legacy.example/room"), "https://booking.example/room");
assert.equal(bookingUrlPriority(undefined, "https://legacy.example/room"), "https://legacy.example/room");
assert.notEqual("https://booking.example/room", "https://legacy.example/room", "different booking fields should be detectable");

console.log("Migration dry-run tests passed.");
