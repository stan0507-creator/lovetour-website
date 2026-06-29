# CMS Field Mapping

狀態：Phase 12A 欄位對應表。本文依 2026-06-29 repo 內實際程式碼重新查核，尚未執行任何 Sanity 寫入。

## 查核來源

- Local domain model：`src/domain/models.ts`
- Local content types：`src/content/types.ts`
- Local data：`src/content/data/`
- CMS adapter：`src/content/cms/`
- Sanity schema：`sanity/schemaTypes/`

## Site Profile

| Collection | Local source file | Local field | Local type | Sanity document type | Sanity field | Sanity type | Query support | Mapper support | Required / optional | Default / fallback | Transformation | Validation | Migration status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Site Profile | `src/content/data/site-profile.ts` | `name` | `string` | `siteProfile` | `name` | `string` | Yes | Yes | Sanity required when published | none | direct | required in schema | Ready | Stable value: 樂圖漫遊會館 |
| Site Profile | `src/content/data/site-profile.ts` | `tagline` | `string` | `siteProfile` | `englishName` | `string` | Yes | Yes | Optional | empty string | local tagline currently maps from Sanity English name | none | Needs review | Local `tagline` means English display in current mapper, naming is not exact. |
| Site Profile | `src/content/data/site-profile.ts` | `description` | `string` | `siteProfile` | `slogan` | `string` | Yes | Yes | Optional | empty string | Sanity slogan becomes local description | none | Needs review | Local model has no separate slogan field. |
| Site Profile | `src/content/data/site-profile.ts` | `address` | `Address \| undefined` | `siteProfile` | `address` | `text` | Yes | Yes | Sanity required when published | local address string split minimally | flattened string | required in schema | Ready with transform | Local has structured address; Sanity has single text field. |
| Site Profile | `src/content/data/site-profile.ts` | `contacts.phone` | `ContactChannel[]` | `siteProfile` | `phone` | `string` | Yes | Yes | Sanity required when published | none | first phone channel to phone field | required in schema | Ready | Mapper creates phone contact from Sanity phone. |
| Site Profile | `src/content/data/site-profile.ts` | `contacts.email` | `ContactChannel[]` | `siteProfile` | `email` | `string` | Yes | Yes | Sanity required when published | none | first email channel to email field | email validation | Ready | Mapper creates email contact from Sanity email. |
| Site Profile | `src/content/data/site-profile.ts` | `contacts.line` | `ContactChannel[]` | `siteProfile` | `lineId` | `string` | Yes | Yes | Optional | none | line label only, no URL | none | Ready | LINE full URL remains separate and not queried. |
| Site Profile | `src/content/data/site-profile.ts` | `contacts.website` | `ContactChannel[]` | `siteProfile` | `websiteUrl` | `url` | Yes | Yes | Optional | none | direct URL contact | URL safety validation | Ready | Existing official site URL can map here. |
| Site Profile | `src/content/data/site-profile.ts` | `contactHours` | `string \| undefined` | `siteProfile` | `contactHours` | `string` | Yes | Yes | Optional | none | direct | none | Ready | 08:00-21:00. |
| Site Profile | `src/content/data/site-profile.ts` | `checkInTime` | `string \| undefined` | none | none | none | No | No | Optional | local only | none | none | Gap | Policy currently carries check-in content separately. |
| Site Profile | `src/content/data/site-profile.ts` | `checkOutTime` | `string \| undefined` | none | none | none | No | No | Optional | local only | none | none | Gap | Policy currently carries check-out content separately. |
| Site Profile | `src/content/data/site-profile.ts` | `languages` | `string[]` | none | none | none | No | No | Optional | local only | none | none | Gap | Not needed for first CMS import unless public display depends on it. |
| Site Profile | `src/content/data/site-profile.ts` | `contentStatus` | `ContentStatus` | `siteProfile` | `contentStatus` | `string` | Yes | Partial | Optional | mapper forces verified | status translation | shared status options | Needs review | Mapper does not preserve exact Sanity status. |
| Site Profile | `src/content/data/site-profile.ts` | `published` | `boolean` | Sanity document state | none | document state | No | Yes | Optional | mapper always false | publish isolation | Sanity publish button + contentStatus | Intentional | Published flag is protected by adapter. |
| Site Profile | none | none | none | `siteProfile` | `lineInquiryUrl`, `googleMapsUrl`, `facebookUrl`, `instagramUrl` | `url` | No | No | Optional | empty | none | URL safety validation | Schema-only | Useful later, but not read by current front end. |
| Site Profile | none | none | none | `siteProfile` | `seoTitle`, `seoDescription`, `canonicalUrl`, `ogImage` | string/url/image | No | No | Optional | page props fallback | none | URL/image validation | Schema-only | Shared SEO fields not yet queried or mapped. |

## Property

| Collection | Local source file | Local field | Local type | Sanity document type | Sanity field | Sanity type | Query support | Mapper support | Required / optional | Default / fallback | Transformation | Validation | Migration status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Property | `src/content/data/properties.ts` | `id` | `ContentId` | `property` | `_id` | document ID | Yes | Yes | Required by migration | stable ID | `property-love` / `property-tour` | migration check | Ready | Must not use PoC ID. |
| Property | `src/content/data/properties.ts` | `kind` | `"love" \| "tour"` | `property` | `propertyKey` | `string` | Yes | Yes | Sanity required | none | direct | required | Ready | Mapper also derives slug from this. |
| Property | `src/content/data/properties.ts` | `name` | `string` | `property` | `name` | `string` | Yes | Yes | Sanity required when published | none | direct | required | Ready | Love 館 / Tour 館. |
| Property | `src/content/data/properties.ts` | `slug` | `Slug` | none | none | none | No | Yes | Optional | propertyKey fallback | derived from `propertyKey` | none | Needs review | Current Sanity schema has no independent property slug field. |
| Property | `src/content/data/properties.ts` | `summary` | `string` | `property` | `summary` | `text` | Yes | Yes | Sanity required when published | none | direct | required | Ready | |
| Property | `src/content/data/properties.ts` | `address` | `Address \| undefined` | `property` | `address` | `text` | Yes | Yes | Optional | none | structured to string | none | Ready with transform | |
| Property | `src/content/data/properties.ts` | `featureHighlights` | `string[]` | `property` | `features` | `array<string>` | Yes | Yes | Optional | `[]` | direct array | none | Ready | |
| Property | `src/content/data/properties.ts` | `sharedContact` | `boolean \| undefined` | none | none | none | No | No | Optional | local only | none | none | Gap | May be handled by Site Profile. |
| Property | `src/content/data/properties.ts` | `displayOrder` | `number \| undefined` | `property` | `displayOrder` | `number` | Yes | Yes | Sanity required | 10 | direct | required integer | Ready | |
| Property | `src/content/data/properties.ts` | `featured` | `boolean \| undefined` | none | none | none | No | No | Optional | false | none | none | Gap | Not present in Property schema. |
| Property | `src/content/data/properties.ts` | `contentStatus` | `ContentStatus` | `property` | `contentStatus` | `string` | Yes | Partial | Optional | mapper forces verified | status translation | shared status options | Needs review | Mapper does not preserve exact status. |
| Property | none | none | none | `property` | `coverImage`, `gallery` | image / array<image> | No | No | Optional | empty | Sanity asset | image alt warning | Schema-only | First migration should skip until official photos are confirmed. |
| Property | none | none | none | `property` | `googleMapsUrl`, `lineInquiryUrl` | `url` | No | No | Optional | empty | none | URL safety validation | Schema-only | Links can be filled later. |
| Property | none | none | none | `property` | SEO fields | string/url/image | No | No | Optional | page fallback | none | URL/image validation | Schema-only | Not yet queried or mapped. |

## Room

| Collection | Local source file | Local field | Local type | Sanity document type | Sanity field | Sanity type | Query support | Mapper support | Required / optional | Default / fallback | Transformation | Validation | Migration status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Room | `src/content/data/rooms.ts` | `id` | `ContentId` | `room` | `_id` | document ID | Yes | Yes | Required by migration | stable ID | direct stable ID | migration check | Ready | Example: `room-love-1201`. |
| Room | `src/content/data/rooms.ts` | `propertyId` | `ContentId \| undefined` | `room` | `property` | reference<Property> | Yes | Yes | Sanity required when published | none | local ID to Sanity reference | required | Ready with reference order | Must point to formal property ID, not PoC. |
| Room | `src/content/data/rooms.ts` | `roomNumber` | `string \| undefined` | `room` | `roomNumber` | `string` | Yes | Yes | Sanity required when published | none | direct | required | Ready | |
| Room | `src/content/data/rooms.ts` | `name` | `string` | `room` | `name` | `string` | Yes | Yes | Sanity required when published | none | direct | required | Ready | |
| Room | `src/content/data/rooms.ts` | `slug` | `Slug` | `room` | `slug` | `slug` | Yes | Yes | Sanity required when published | `_id` fallback in mapper | local string to slug.current | required | Ready | Must check duplicate slugs before import. |
| Room | `src/content/data/rooms.ts` | `summary` | `string` | `room` | `summary` | `text` | Yes | Yes | Optional | PoC fallback text in mapper | direct | warning only | Needs review | Mapper fallback contains PoC wording; avoid in published mode. |
| Room | `src/content/data/rooms.ts` | `description` | `string \| undefined` | `room` | `description` | `text` | Yes | Yes | Optional | none | direct | none | Ready | Empty for unconfirmed details. |
| Room | `src/content/data/rooms.ts` | `capacity.standard` | `number` | `room` | `recommendedGuests` | `number` | Yes | Yes | Sanity required when published | none | direct | required integer | Ready | |
| Room | `src/content/data/rooms.ts` | `capacity.maximum` | `number \| undefined` | `room` | `maximumGuests` | `number` | Yes | Yes | Optional | mapper falls back to recommendedGuests | direct | integer | Needs review | User requested max guests not displayed until confirmed. |
| Room | `src/content/data/rooms.ts` | `bedSetup` | `string \| undefined` | `room` | `bedSetup` | `string` | Yes | Yes | Sanity required when published | none | direct | required | Ready | |
| Room | `src/content/data/rooms.ts` | none | none | `room` | `extraBedAvailable` | `boolean` | Yes | No | Optional | false in Studio | none | none | Gap | Local model has no direct field; current copy encodes add-bed in notes. |
| Room | `src/content/data/rooms.ts` | `amenities` | `string[]` | `room` | `amenities` | `array<string>` | Yes | Yes | Optional | `[]` | direct | none | Ready | |
| Room | `src/content/data/rooms.ts` | `photoIds` | `ContentId[]` | `room` | `coverImage`, `gallery` | image / array<image> | Yes | Yes | Optional | generated CMS media assets | Sanity asset to `MediaAsset` | image alt warning | Needs asset plan | Existing sample images must not be treated as official photos. |
| Room | `src/content/data/rooms.ts` | `featureHighlights` | `string[] \| undefined` | none | none | none | No | No | Optional | empty | none | none | Gap | Potential content loss if not added or intentionally skipped. |
| Room | `src/content/data/rooms.ts` | `notes` | `string[] \| undefined` | `room` | `notes` | `array<string>` | Yes | Yes | Optional | `[]` | direct | forbidden terms warning/error | Ready | |
| Room | `src/content/data/rooms.ts` | `isBookableAsPrivateStay` | `boolean \| undefined` | none | none | none | No | No | Optional | false | none | none | Gap | Villa rental is not in first batch Room schema. |
| Room | `src/content/data/rooms.ts` | `bookingUrl` | `string \| undefined` | `room` | `odingUrl` | `url` | Yes | Yes | Optional | empty | maps `odingUrl` to local `bookingUrl` | URL safety validation | Ambiguous | See odingUrl audit below. |
| Room | `src/content/data/rooms.ts` | `bookingUrl` | `string \| undefined` | `room` | `bookingUrl` | `url` | No | No | Optional | empty | none | URL safety validation | Schema-only | Duplicate purpose with `odingUrl`. Needs decision. |
| Room | `src/content/data/rooms.ts` | `lineInquiryUrl` | `string \| undefined` | `room` | `lineInquiryUrl` | `url` | No | No | Optional | empty | none | URL safety validation | Schema-only | Not yet queried or mapped. |
| Room | `src/content/data/rooms.ts` | `displayOrder` | `number \| undefined` | `room` | `displayOrder` | `number` | Yes | Yes | Sanity required | 10 | direct | required integer | Ready | |
| Room | `src/content/data/rooms.ts` | `featured` | `boolean \| undefined` | `room` | `featured` | `boolean` | Yes | Yes | Optional | false | direct | none | Ready | |
| Room | `src/content/data/rooms.ts` | `contentStatus` | `ContentStatus` | `room` | `contentStatus` | `string` | Yes | Partial | Optional | mapper forces verified | status translation | shared status options | Needs review | Mapper does not preserve exact status. |
| Room | none | none | none | `room` | SEO fields | string/url/image | No | No | Optional | page fallback | none | URL/image validation | Schema-only | Not yet queried or mapped. |

### Room `odingUrl` 查核結果

`odingUrl` 不是單純報告抄寫錯誤，目前實際存在於程式碼中：

| Item | Actual file path | Actual field name |
| --- | --- | --- |
| Local type | `src/domain/models.ts` | `bookingUrl` |
| Sanity schema | `sanity/schemaTypes/room.ts` | `odingUrl` |
| Sanity shared schema field | `sanity/schemaTypes/fields/linkFields.ts` | `bookingUrl` |
| Query | `src/content/cms/queries.ts` | `odingUrl` |
| Mapper | `src/content/cms/mapper.ts` | `room.odingUrl` -> `bookingUrl` |
| CMS TypeScript type | `src/content/cms/types.ts` | `odingUrl` |

結論：

- schema 內同時存在 `odingUrl` 與 `bookingUrl`。
- query 目前只取 `odingUrl`。
- mapper 目前把 `odingUrl` 當作前台 domain model 的 `bookingUrl`。
- local domain model 沒有 `odingUrl`。
- 這會造成後續正式 migration 欄位語意不清。

建議：

- Phase 12A 先記錄，不修改程式碼。
- Phase 12B 或 Phase 12C 應決定 canonical 欄位。
- 若選 `bookingUrl` 為 canonical，需保留 `odingUrl` 相容讀取一段時間，避免破壞 PoC 草稿。
- 若選 `odingUrl` 為奧丁丁專用欄位，需在 schema、query、mapper、文件中明確命名用途。

## FAQ

| Collection | Local source file | Local field | Local type | Sanity document type | Sanity field | Sanity type | Query support | Mapper support | Required / optional | Default / fallback | Transformation | Validation | Migration status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FAQ | `src/content/data/faqs.ts` | `id` | `ContentId` | `faq` | `_id` | document ID | Yes | Yes | Required by migration | stable ID | direct stable ID | migration check | Ready | Use semantic ID. |
| FAQ | `src/content/data/faqs.ts` | `category` | `string` | `faq` | `category` | `string` | Yes | Yes | Sanity required when published | none | direct | required | Ready | |
| FAQ | `src/content/data/faqs.ts` | `question` | `string` | `faq` | `question` | `string` | Yes | Yes | Sanity required when published | none | direct | required | Ready | |
| FAQ | `src/content/data/faqs.ts` | `answer` | `string` | `faq` | `answer` | `text` | Yes | Yes | Sanity required when published | none | direct | required | Ready | |
| FAQ | `src/content/data/faqs.ts` | `priority` | `number \| undefined` | `faq` | `displayOrder` | `number` | Yes | Yes | Sanity required | 10 | priority to displayOrder | required integer | Ready | |
| FAQ | `src/content/data/faqs.ts` | `contentStatus` | `ContentStatus` | `faq` | `contentStatus` | `string` | Yes | Partial | Optional | mapper forces verified | status translation | shared status options | Needs review | Mapper does not preserve exact status. |
| FAQ | none | none | none | `faq` | SEO fields | string/url/image | No | No | Optional | page fallback | none | URL/image validation | Schema-only | FAQ-level SEO may not be needed. |

## Policy

| Collection | Local source file | Local field | Local type | Sanity document type | Sanity field | Sanity type | Query support | Mapper support | Required / optional | Default / fallback | Transformation | Validation | Migration status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Policy | `src/content/data/policies.ts` | `id` | `ContentId` | `policy` | `_id` | document ID | No | No | Required by migration | stable ID | direct stable ID | migration check | Schema-only | No CMS policy query yet. |
| Policy | `src/content/data/policies.ts` | `type` | `string` | `policy` | `category` | `string` | No | No | Sanity required when published | none | type to category | required | Needs mapper/query | Category naming requires confirmation. |
| Policy | `src/content/data/policies.ts` | `title` | `string` | `policy` | `title` | `string` | No | No | Sanity required when published | none | direct | required | Needs mapper/query | |
| Policy | `src/content/data/policies.ts` | `content` | `string` | `policy` | `body` | `text` | No | No | Sanity required when published | none | content to body | required | Needs mapper/query | |
| Policy | `src/content/data/policies.ts` | `priority` | `number \| undefined` | `policy` | `displayOrder` | `number` | No | No | Optional | 10 | priority to displayOrder | integer | Needs mapper/query | |
| Policy | `src/content/data/policies.ts` | `contentStatus` | `ContentStatus` | `policy` | `contentStatus` | `string` | No | No | Optional | keep local | status translation | shared status options | Needs mapper/query | |
| Policy | `src/content/data/policies.ts` | `published` | `boolean` | Sanity document state | none | document state | No | No | Optional | false | publish isolation | Sanity publish button + contentStatus | Intentional | |
| Policy | none | none | none | `policy` | `summary`, `publicNote`, `internalNote` | text | No | No | Optional | empty | none | warning for sensitive topics | Schema-only | Useful for CMS editing but not yet local equivalent. |
| Policy | none | none | none | `policy` | SEO fields | string/url/image | No | No | Optional | page fallback | none | URL/image validation | Schema-only | Not yet queried or mapped. |

## 重要缺口摘要

- Policy schema 已存在，但 CMS adapter 尚未 query / mapper / type 支援。
- Room `odingUrl` 與 `bookingUrl` 欄位語意重疊，需後續決策。
- Site Profile、Property、Room、FAQ、Policy 的 SEO schema 欄位尚未被 query / mapper 使用。
- Property 與 Room 圖片欄位可在 schema 中管理，但正式照片尚未確認，不應進入第一批自動匯入。
- Local 有些欄位目前 Sanity 沒有對應，例如 Property `featured`、Room `featureHighlights`、Room `isBookableAsPrivateStay`。
- Sanity 有些欄位目前 local 沒有對應，例如圖片 alt、SEO、Google Maps URL、社群連結。
- 目前 mapper 多數會把 CMS 內容轉成 `contentStatus: "verified"`、`published: false`，尚未完整保留 Sanity 狀態。

