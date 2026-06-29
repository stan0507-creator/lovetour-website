# Sanity Migration Tools

本資料夾放置 CMS migration 的規劃、dry-run 與 draft payload 產生工具。Phase 12B / 12C 只允許本機分析與 JSON 產出，不允許建立、修改、刪除或發布任何 Sanity document。

## 指令

從專案根目錄執行：

```bash
pnpm run migration:dry-run
pnpm run migration:payload
```

輸出：

- 終端摘要
- `.migration-reports/phase-12b-dry-run.json`
- `.migration-reports/phase-12c-draft-payload.json`
- `.migration-reports/phase-12c-payload-review.json`

`.migration-reports/` 已加入 `.gitignore`，不得把完整 report commit 進 Git。

## 零寫入保證

目前 migration 工具：

- 不建立 Sanity client。
- 不讀取或使用 write token。
- 不呼叫 create、patch、delete、transaction、publish 或 dataset import。
- 不修改 `drafts.poc-*`。
- 只 import repo 內的 local TypeScript content data 並產生本機 JSON report。
- 不建立 import runner 或 write client。

## Exit Code

- 沒有 blocking errors：exit code 0
- 有 blocking errors：exit code 1

即使 exit code 1，工具仍會先產生 report。這代表 migration 尚未可安全執行，不代表已對 Sanity 寫入資料。

## 第一批 Allowlist

第一批只分析：

- `drafts.site-profile-main`
- `drafts.property-love`
- `drafts.property-tour`
- `drafts.<local room ID>`
- `drafts.<local FAQ ID>`
- `drafts.<local Policy ID>`

Allowlist 不得包含 `drafts.poc-*`，也不得包含 News、Offer、Nearby Places、Page Content 或 sample media assets。

## Room Booking URL Strategy

Phase 12B 採用以下相容策略：

- `bookingUrl` 是未來 canonical 欄位。
- `odingUrl` 暫時保留為 legacy PoC 欄位。
- CMS query 使用 `coalesce(bookingUrl, odingUrl)`，優先讀取 `bookingUrl`。
- mapper 只輸出 local domain model 的 `bookingUrl`。
- 未來正式 migration payload 只寫入 `bookingUrl`，不新增 `odingUrl`。

## Known Blockers

目前 dry-run 會真實呈現阻擋項，不用假資料修正。

Phase 12C 已依 local 原始內容與 schema 缺口，新增 `weather` Policy category，用於「天候與交通異常」這類長期獨立管理的規則。

目前 warnings：

- Room 目前仍使用 sample/prototype photo IDs，正式照片需後續由業主確認後再處理。
- Policy adapter 尚未接入前台資料流。

## Draft Payload Review

`pnpm run migration:payload` 只產生本機審查檔：

- ready / ready-with-warnings documents 會進入 payload。
- blocked documents 不進入 payload，只會出現在 review report。
- sample、Unsplash、示意圖片全部省略，不產生 asset `_ref`。
- Room reference 使用 base ID，例如 `{ "_type": "reference", "_ref": "property-love" }`。
- payload 只輸出 canonical `bookingUrl`，不輸出新的 legacy `odingUrl`。
- payload 不包含 `_rev`、`_createdAt`、`_updatedAt`。
