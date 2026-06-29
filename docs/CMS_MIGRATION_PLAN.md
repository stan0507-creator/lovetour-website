# CMS Migration Plan

狀態：Phase 12A 規劃文件。本文只定義遷移策略，不建立 migration script，不執行 Sanity import，不寫入 production dataset。

## 1. 目的與範圍

Phase 12 的目的，是把目前已驗證的 TypeScript 內容資料，規劃成可安全搬入 Sanity CMS 的流程。第一批只處理已具備正式 CMS schema、且已在 Phase 11 完成基礎可用性檢查的內容。

第一批 collection：

- Site Profile
- Property
- Room
- FAQ
- Policy

本階段只產出規劃、欄位對應與風險登記。任何實際寫入 Sanity 的動作，都必須留到後續 phase，並在執行前再次停在確認點。

## 2. 不在本批範圍內的內容

以下內容延後，不納入第一批 migration：

- News
- Offer
- Nearby Place
- Page Content
- sample media assets
- 尚未有正式 Sanity schema 的內容
- 房價、即時房況、訂單與付款
- 奧丁丁 API 串接
- AI 功能
- 正式照片整理、轉檔與上傳

這些內容不得為了 migration 方便而臨時塞進既有 collection。

## 3. Local Source 與 Sanity Source 的角色

Local source 目前仍是可靠 fallback，來源位於 `src/content/data/`。Sanity source 是未來讓業主可視化編輯的內容來源。

正式 migration 前需保留以下原則：

- `PUBLIC_CONTENT_SOURCE=local` 時，網站完全使用本機 TypeScript 資料。
- `PUBLIC_CONTENT_SOURCE=sanity` 且 `PUBLIC_CONTENT_MODE=draft` 時，可讀取 Sanity draft / verified 內容做本機預覽。
- `PUBLIC_CONTENT_SOURCE=sanity` 且 `PUBLIC_CONTENT_MODE=published` 時，只可讀取 `contentStatus == "published"` 的內容。
- Production build 不得因為 `.env` 存在 preview token 而讀到草稿。
- Local source 不得在第一批 migration 後立即刪除。

## 4. 第一批 Collection

第一批 migration 的建立順序：

1. Site Profile
2. Property
3. Room
4. FAQ
5. Policy

Room 需要 reference 到 Property，因此必須在 Property draft 建立完成且 ID 穩定後才處理 Room。

## 5. Stable Document ID 規則

正式 document ID 暫定如下：

| Collection | ID 規則 |
| --- | --- |
| Site Profile | `site-profile-main` |
| Property | `property-love`, `property-tour` |
| Room | 使用 local 穩定 ID，例如 `room-love-1201` |
| FAQ | 使用穩定語意 ID，例如 `faq-check-in` |
| Policy | 使用穩定語意 ID，例如 `policy-cancellation` |

重要限制：

- 不得使用 `poc-*` 作為正式 ID。
- 不得覆蓋 `drafts.poc-*`。
- 第一批匯入只能建立 `drafts.<正式ID>`。
- 不得直接建立 published document。
- 若正式 ID 已存在，migration 必須先 dry-run 報告衝突，不可直接覆蓋。

## 6. Slug 規則

Room slug 維持目前已確認規則：

- 全部使用小寫英文字母、數字及連字號。
- 不使用中文、空格或底線。
- 每個 slug 不可重複。
- 格式以館別、房號及簡化英文房型名稱組成。
- 若未來需要調整 slug，需先檢查既有網址、內部連結與 SEO 影響。

Property slug 目前由 CMS mapper 依 `propertyKey` 推導，後續若需要獨立 slug 欄位，需先評估是否會影響既有 URL。

## 7. Reference 建立順序

Reference 建立順序：

1. 建立 `drafts.property-love` 與 `drafts.property-tour`。
2. 建立 Room draft 時，`property` reference 指向對應正式 Property ID。
3. migration dry-run 必須檢查每間 Room 的 `propertyId` 是否能找到正式 Property。
4. 不得讓正式 Room reference 指向 `drafts.poc-property-love`。

## 8. Draft-only Import 原則

正式資料第一次匯入 Sanity 時，只能建立 draft：

- 建立 ID：`drafts.<正式ID>`
- `contentStatus` 預設為 `verified` 或 `draft`，不得設為 `published`。
- 不得呼叫 Sanity document publish。
- 不得建立無 `drafts.` 前綴的正式文件。
- 含有未確認欄位時，欄位應留空，不得填入 `待確認`、假網址或示範資料。

## 9. Idempotency 原則

後續 migration script 必須可重複 dry-run，且不得因重複執行造成重複文件或覆蓋 PoC。

建議原則：

- 使用固定 stable ID 檢查目標文件是否存在。
- dry-run 先列出 `wouldCreate`、`wouldSkip`、`wouldConflict`。
- 實際 import 前需使用明確的 allowlist。
- 不使用 `--replace`。
- 不使用不受控的 random ID。
- 不以 title 或 slug 當唯一比對依據。

## 10. Dry-run 流程

後續 Phase 12B / 12C 才能設計 dry-run script。建議 dry-run 輸出：

- source collection
- local source file
- local ID
- target Sanity draft ID
- target document type
- action: create / skip / conflict / invalid
- missing required fields
- unresolved references
- slug conflicts
- image asset fields skipped
- fields not supported by query / mapper

Dry-run 不得呼叫任何 Sanity create、patch、delete、publish 或 import。

## 11. 實際 Import 前確認點

正式 import 前需停下並確認：

- 目標 project ID 與 dataset。
- `.env` 不含錯誤的 production token。
- target IDs 清單。
- 不會覆蓋 `drafts.poc-*`。
- 所有 Room reference 都指向正式 Property ID。
- 所有未確認欄位會留空。
- 不包含 sample media assets。
- import 只建立 `drafts.<正式ID>`。

## 12. 驗證流程

每次 migration 相關變更需驗證：

- `pnpm run check`
- `pnpm run sanity:build`
- local source build
- Sanity draft mode build
- Sanity published mode build
- published build 的 `dist/` 不包含 `待確認`、`後台測試`、`sample`、`placeholder`
- Sanity Studio 中 PoC drafts 仍存在
- Git diff 沒有不相關前台改動

## 13. Rollback 流程

Phase 12A 不執行寫入，因此 rollback 僅需 Git revert 文件變更。

未來若已執行 draft-only import，rollback 原則：

- 只針對本次 migration 建立的 `drafts.<正式ID>`。
- 不刪除 `drafts.poc-*`。
- 不刪除無法確認來源的文件。
- rollback 前先輸出即將刪除的 ID 清單並停在確認點。
- 若正式 published 文件已存在，rollback 不得自動刪除，需人工判斷。

## 14. Local Fallback 保留策略

正式 CMS 第一階段完成後，仍需保留 local source fallback：

- 本機開發可用 local source 快速驗證前台。
- Sanity token 或網路異常時，local source 不應被破壞。
- local verified data 可作為內容備份與對照基準。
- 移除 local data 必須是獨立 phase，不可與 migration 同時進行。

## 15. PoC 文件隔離規則

PoC 文件只用於後台操作驗證，不可作為正式內容來源：

- `drafts.poc-site-profile`
- `drafts.poc-property-love`
- `drafts.poc-room-love-1201`
- `drafts.poc-faq-check-in`

後續 migration 不得：

- 覆蓋 PoC drafts。
- 將 PoC drafts 改名為正式文件。
- 讓正式 Room reference 指向 PoC Property。
- 發布 PoC documents。

## 16. Production Dataset 安全規則

production dataset 是目前 Sanity PoC 使用的 dataset，因此任何寫入都需額外謹慎。

安全規則：

- Phase 12A 不執行任何 Sanity 寫入。
- 後續 import 前需先確認 project ID 與 dataset。
- 不使用 `--replace`。
- 不使用 write token 做讀取驗證。
- 不把 token 寫入 Git。
- 不把 `.env` 或 `sanity/.env` 加入 Git。
- 所有寫入前需先完成 dry-run。

## 17. Phase 12B Dry-run Tool

Phase 12B 已新增唯讀 dry-run 工具：

```bash
pnpm run migration:dry-run
```

工具位置：

- `sanity/migrations/dry-run-local-content.ts`
- `sanity/migrations/dry-run-local-content.test.ts`
- `sanity/migrations/README.md`

Report 位置：

- `.migration-reports/phase-12b-dry-run.json`

`.migration-reports/` 已加入 `.gitignore`，不得 commit 完整 report，避免未來營運資料或個資被寫入 Git。

Dry-run 安全原則：

- 完全不建立 Sanity client。
- 不使用 write token。
- 不呼叫 Sanity create、patch、delete、transaction、publish 或 dataset import。
- 只讀取 repo 內 local TypeScript content data。
- 若存在 blocking errors，exit code 為 1，但仍會先產生 report。

## 18. Room Booking URL Canonical Strategy

Phase 12B 採用以下策略：

- `bookingUrl` 作為未來 canonical 欄位。
- `odingUrl` 暫時保留為 legacy PoC 相容欄位，不刪除。
- GROQ query 使用 `coalesce(bookingUrl, odingUrl)`，優先讀取 `bookingUrl`，缺少時 fallback 到 `odingUrl`。
- mapper 最終只輸出 local domain model 的 `bookingUrl`。
- 未來正式 migration payload 只寫入 `bookingUrl`，不新增新的 `odingUrl` 值。
- 現有 PoC document 不 patch、不遷移、不修改。

## 19. Phase 12B Known Blockers

Phase 12B dry-run 曾真實回報以下阻擋項：

- `policy-weather` 的 local type `weather` 尚未有明確 Sanity Policy category mapping。

目前 warnings 主要來自：

- Room 仍使用 sample/prototype photo IDs，正式照片需後續由業主確認後再建立 Sanity image assets。
- Room `maximumGuests` 目前等於建議入住人數，正式發布前仍需確認是否應公開。
- Policy adapter 尚未接入前台資料流。

## 20. Phase 12C Draft Payload Design

Phase 12C 新增本機 payload 產生工具：

```bash
pnpm run migration:payload
```

輸出：

- `.migration-reports/phase-12c-draft-payload.json`
- `.migration-reports/phase-12c-payload-review.json`

規則：

- 只產生本機 JSON，不連線 Sanity。
- 不建立 Sanity client，不使用 write token。
- 不建立 import runner。
- 不呼叫 create、patch、delete、transaction、publish 或 dataset import。
- 只有 `ready` 與 `ready-with-warnings` documents 會進入 payload。
- `blocked` documents 只會出現在 review report。
- payload document `_id` 必須是 `drafts.<stable-base-id>`。
- payload 不包含 `_rev`、`_createdAt`、`_updatedAt`。
- Room reference 使用 base ID，不使用 `drafts.` 前綴。
- sample / Unsplash / 示意圖片全部省略，review report 標記 requires-real-asset。

## 21. Policy Weather Category Decision

Phase 12C 重新檢查 local `policy-weather` 內容：

> 如遇颱風、停航或停飛等不可抗力因素，請與民宿聯絡，將依實際交通及公告情況協助處理。

這不是單純取消規則，而是天候、船班、航班與不可抗力的長期營運政策。因此已在 Sanity Policy schema 新增 `weather` category，中文名稱為「天候與交通異常」。

這個決策避免把天候政策硬塞到 `cancellation`，也讓未來後台可以獨立管理。
