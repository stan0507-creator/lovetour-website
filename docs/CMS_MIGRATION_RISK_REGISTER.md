# CMS Migration Risk Register

狀態：Phase 12A 風險登記。本文只用於規劃，尚未建立或執行 migration script，尚未寫入 Sanity。

| Risk ID | Description | Affected content | Likelihood | Impact | Prevention | Detection | Rollback | Owner / confirmation requirement | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | 寫入錯誤的 production dataset 或錯誤 project | All CMS content | Medium | High | import 前顯示 project ID、dataset、document IDs 並停在確認點 | dry-run 報告環境設定；Sanity Studio 人工核對 | 若只建立 drafts，刪除本次 allowlist drafts；不得刪其他文件 | Owner + developer confirmed | Open |
| R-002 | 意外將內容發布 | All public content | Medium | High | migration 只建立 `drafts.<正式ID>`；禁止 publish API | Sanity Studio 檢查 document state；published mode build 檢查 | 下架或 revert published document；需人工確認 | Owner confirmed before any publish | Open |
| R-003 | 覆蓋 PoC drafts | PoC Site Profile, Property, Room, FAQ | Low | High | 正式 ID 不使用 `poc-*`；不使用 `--replace` | dry-run 檢查 target IDs 不含 `poc` | 從 Sanity history 還原；若無法還原則停止並人工處理 | Developer must confirm ID allowlist | Open |
| R-004 | Stable ID 衝突 | First batch documents | Medium | Medium | import 前查詢 target ID 是否存在 | dry-run 標記 `wouldConflict` | 不覆蓋；改由人工決定新 ID 或合併 | Owner confirms conflict handling | Open |
| R-005 | Slug 衝突 | Room pages | Medium | High | dry-run 檢查所有 Room slug 唯一性 | build route check；slug report | 不匯入衝突房型；修正 slug 後重跑 dry-run | Owner confirms slug table | Open |
| R-006 | Dangling reference | Room -> Property | Medium | High | 先建立 Property，再建立 Room；reference 用正式 ID | dry-run resolve reference | 刪除本次錯誤 draft Room 或修正 reference | Developer confirms reference map | Open |
| R-007 | Property reference 指向 PoC document | Room -> Property | Medium | High | reference allowlist 只能是 `property-love` / `property-tour` | dry-run 輸出 reference target | patch draft reference 或刪除錯誤 draft | Owner confirms formal property IDs | Open |
| R-008 | 重複匯入造成重複文件 | First batch documents | Medium | Medium | 使用 stable ID，不用 random ID | dry-run 查 existing IDs | 刪除本次重複建立的 drafts，保留最早正式 ID | Developer confirms idempotency | Open |
| R-009 | Migration script 非 idempotent | All migrated content | Medium | High | 先設計 dry-run；實際 import 使用 allowlist 和 stable ID | 重跑 dry-run 前後比較 | 停止 script；用 Git revert script；Sanity 只處理本次 allowlist | Developer review required | Open |
| R-010 | Sample image 被當成正式照片 | Room, Property media | High | Medium | 第一批不自動匯入 sample media assets | field mapping 標記 image skipped | 移除錯誤 asset reference；不刪原始 asset 除非確認 | Owner confirms official photos | Open |
| R-011 | 空值被填入假資料 | All content | Medium | High | 未確認欄位留空；禁止 `待確認`、`sample`、`placeholder` | dist 搜尋 forbidden terms；Studio validation warning | 移除假資料，退回 draft | Owner confirms missing data | Open |
| R-012 | Required 欄位不足導致 published validation error | All publishable content | Medium | Medium | draft 階段 warning，published 階段 error；dry-run 列出 missing fields | Sanity validation；build/check | 補欄位或維持 draft | Owner provides required content | Open |
| R-013 | Query / mapper 欄位遺漏造成前台看不到 CMS 資料 | Site Profile, Property, Room, FAQ, Policy | High | Medium | 欄位 mapping 表先標記 query/mapper 支援狀態 | Sanity draft build 與 local 比對 | 保留 local fallback；補 mapper/query 後再驗證 | Developer implementation review | Open |
| R-014 | Local 與 Sanity 顯示結果不同 | Public pages | High | Medium | 建立 snapshot comparison 或人工 route checklist | local / sanity draft / sanity published 三模式 build | 切回 local source；修正 mapper | Owner reviews preview | Open |
| R-015 | Rollback 誤刪其他文件 | All Sanity documents | Low | High | rollback 只使用本次 migration allowlist | rollback 前列出 document IDs 並確認 | 停止；使用 Sanity history 或人工復原 | Owner explicit confirmation | Open |
| R-016 | Token 或環境設定進入 Git | Repo security | Medium | High | `.gitignore` 排除 `.env`、`.env.*`、`sanity/.env`；commit 前 secret scan | `git diff --cached --name-only` 與 keyword scan | 立即停止，移除追蹤並 rotate token | Developer + Owner confirm no secrets | Open |
| R-017 | `odingUrl` / `bookingUrl` 欄位混用 | Room booking links | High | Medium | Phase 12B/12C 決定 canonical 欄位；保留 PoC 相容 | field mapping audit；query/mapper review | 不匯入訂房 URL，直到欄位決策完成 | Owner confirms naming and Odingding flow | Open |
| R-018 | Policy 涉及費用與取消規則但內容未確認 | Policy | High | High | 未確認政策不得匯入 published；敏感政策保留 draft | Studio warning/error；content review | 刪除或下架 draft policy | Owner confirms actual rules | Open |
| R-019 | Dry-run report 被誤 commit，造成未來營運資料或個資進入 Git | Migration reports | Medium | Medium | `.migration-reports/` 加入 `.gitignore`；commit 前檢查 staged files | `git diff --cached --name-only` | 從 Git 移除並視內容決定是否 rotate sensitive values | Developer confirms staged files | Open |
| R-020 | Policy local type 無法對應 Sanity category | Policy | High | Medium | dry-run 建立明確 type-to-category mapping，無 mapping 時 blocked | `pnpm run migration:dry-run` blocking errors | 不匯入該 Policy，等待分類決策 | Owner confirms category mapping | Open |
