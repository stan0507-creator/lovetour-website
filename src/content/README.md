# Content

這裡放靜態內容資料層。

目前內容是 sample data，不代表正式營運資料。Phase 6 已加入館別關係與內容狀態，供未來替換真實資料與正式上線過濾使用。

## 結構

- `data/`：各內容類型的 TypeScript sample data，包含館別、房型、FAQ、政策、消息、媒體與站台資料。
- `types.ts`：內容檔專用型別。
- `index.ts`：前台讀取內容時使用的 helper functions。

## 原則

- 前台應優先透過 `src/content/index.ts` 讀資料。
- 內容檔使用 TypeScript `satisfies` 保護資料格式。
- 關聯資料使用 ID，例如房型使用 `photoIds` 關聯媒體。
- 房型使用 `propertyId` 關聯 Love 館或 Tour 館。
- 正式公開內容需同時符合 `contentStatus: "published"` 與 `published: true`。
- 未來轉 Headless CMS 或資料庫時，盡量維持 helper function 介面穩定。
