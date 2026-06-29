# Sanity Migration Dry-Run

本資料夾放置 CMS migration 的規劃與 dry-run 工具。Phase 12B 只允許唯讀分析，不允許建立、修改、刪除或發布任何 Sanity document。

## 指令

從專案根目錄執行：

```bash
pnpm run migration:dry-run
```

輸出：

- 終端摘要
- `.migration-reports/phase-12b-dry-run.json`

`.migration-reports/` 已加入 `.gitignore`，不得把完整 report commit 進 Git。

## 零寫入保證

目前 dry-run 工具：

- 不建立 Sanity client。
- 不讀取或使用 write token。
- 不呼叫 create、patch、delete、transaction、publish 或 dataset import。
- 不修改 `drafts.poc-*`。
- 只 import repo 內的 local TypeScript content data 並產生本機 JSON report。

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

目前 dry-run 會真實呈現阻擋項，不用假資料修正：

- Policy `weather` 目前沒有明確 Sanity category mapping。
- Room 目前仍使用 sample/prototype photo IDs，正式照片需後續由業主確認後再處理。
- Policy adapter 尚未接入前台資料流。

