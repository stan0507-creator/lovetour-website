# Sanity Owner Hands-on Test

Phase 9B 目標：協助業主完成 Sanity 專案建立、環境設定與實際操作測試。  
本文件只記錄操作測試結果，不存放密碼、驗證碼、token 或任何私密設定。

## 測試紀錄

| # | 測試項目 | 是否成功 | 業主操作感受 | 手機是否可操作 | 遇到的問題 | 是否需要調整欄位名稱 | 是否需要簡化介面 | 是否建議正式採用 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 建立或登入 Sanity 帳號 | 成功 | 待補 | 待測 | 無 | 待評估 | 待評估 | 待評估 |
| 2 | 建立 Sanity project：Lovetour CMS PoC | 成功 | 待補 | 待測 | 無 | 待評估 | 待評估 | 待評估 |
| 3 | 確認 production dataset | 成功 | 待補 | 待測 | 無 | 待評估 | 待評估 | 待評估 |
| 4 | 取得 Project ID 並建立本機 `.env` | 成功 | 待補 | 不適用 | 未寫入 token | 待評估 | 待評估 | 待評估 |
| 5 | 啟動本機 Sanity Studio | 成功 | 待補 | 待測 | Studio URL: http://localhost:3333/ | 待評估 | 待評估 | 待評估 |
| 6 | 修正 Studio Project ID 設定並執行 `pnpm run sanity:build` | 成功 | 待補 | 不適用 | 原本 Studio 讀到 placeholder `replace-with-project-id`，已改為讀取 Studio 專用環境變數 | 待評估 | 待評估 | 待評估 |
| 7 | 完成 Studio 登入並進入後台 | 成功 | 待補 | 待測 | 已看到 Site Profile、Property、Room、FAQ 四個 PoC 類型 | 待評估 | 待評估 | 待評估 |
| 8 | 點選品牌與聯絡資料 | 修正中 | 待補 | 待測 | 發生 Structure Tool `removeChild` 崩潰；已改回 Sanity 預設 Structure Tool 並通過 build | 待評估 | 待評估 | 待評估 |
| 9 | 檢查品牌欄位名稱 | 成功 | 發現欄位顯示容易混淆 | 待測 | 「中文名稱」與「英文名稱」在畫面上不夠清楚，已改為「民宿正式中文名稱」與「民宿英文名稱」 | 是 | 待評估 | 待評估 |
| 10 | 完成本機 Sanity CLI 登入 | 成功 | 待補 | 不適用 | Studio 瀏覽器登入不等於 CLI 登入，已完成 CLI 登入後才能安全匯入 | 待評估 | 待評估 | 待評估 |
| 11 | 匯入 4 筆 PoC 測試資料 | 已修正 | 待補 | 待測 | `dataset import` 會建立 Sanity Published 文件；已改建為 `drafts.*` 草稿文件，並移除誤建的 4 筆 published PoC 文件 | 待評估 | 待評估 | 待評估 |
| 12 | 人工檢查 Site Profile、Property、Room、FAQ 四筆 PoC 資料 | 成功 | 待補 | 待測 | 業主已確認 Love 館、1201 房型與 FAQ 內容正確；Site Profile 畫面已確認為 Draft 狀態 | 待評估 | 待評估 | 待評估 |
| 13 | 修改 Site Profile Slogan 草稿 | 成功 | 待補 | 待測 | 業主於 Studio 修改 Slogan，CLI 已確認草稿文件儲存「（後台測試）」且未發布 | 待評估 | 待評估 | 待評估 |
| 14 | 修改 1201 房型名稱草稿 | 成功 | 待補 | 待測 | 業主於 Studio 修改房型名稱，CLI 已確認草稿文件儲存「（後台測試）」且未發布 | 待評估 | 待評估 | 待評估 |
| 15 | 上傳 1201 房型封面圖片 | 成功 | 待補 | 待測 | 業主於 Studio 上傳封面圖片，CLI 已確認 `coverImage` asset reference 與 alt 已儲存且未發布 | 待評估 | 待評估 | 待評估 |
| 16 | 上傳 1201 房型相簿圖片並調整排序 | 成功 | 待補 | 待測 | 業主於 Studio 上傳 2 張相簿圖片，CLI 已確認 `gallery` 陣列、asset reference、alt 與順序已儲存且未發布 | 待評估 | 待評估 | 待評估 |
| 17 | 修改 FAQ 回答草稿 | 成功 | 待補 | 待測 | 業主於 Studio 修改 FAQ 回答，CLI 已確認草稿文件儲存「（後台測試）」且未發布 | 待評估 | 待評估 | 待評估 |
| 18 | 建立並設定 Sanity preview token | 成功 | 待補 | 不適用 | 業主建立 Viewer token 並填入本機 `.env`；已確認 token 欄位有值，但未顯示或記錄 token 本體 | 待評估 | 待評估 | 待評估 |
| 19 | Astro 本機草稿預覽讀取 Sanity 內容 | 成功 | 待補 | 待測 | 前台頁面已接上 `getContentSnapshotFromSource()`；業主確認本機 draft preview 可看到「後台測試」內容 | 待評估 | 待評估 | 待評估 |
| 20 | Production build 隔離未發布草稿 | 成功 | 待補 | 不適用 | 初次 build 因 `.env` 有 preview token 而被過度保護中斷；已改為 published mode 忽略 preview token。Build 通過，`dist/` 未出現「後台測試」 | 待評估 | 待評估 | 待評估 |
| 21 | 切回 local content source | 成功 | 待補 | 待測 | 業主確認 `PUBLIC_CONTENT_SOURCE=local` 時原網站正常，未顯示 Sanity「後台測試」內容 | 待評估 | 待評估 | 待評估 |
| 22 | 業主操作感受回饋 | 完成 | 普通；內容填寫與圖片上傳可接受，初次登入、Terminal、CLI、英文術語與 Draft/Published 概念較卡 | 待測 | 需要中文化、簡化不必要欄位，並加強發布前提醒與防呆設計 | 是 | 是 | 可以繼續使用 Sanity |

## 目前狀態

- 已登入 Sanity。
- 已建立本機 `.env`，並填入 Project ID 與 production dataset。
- 已啟動本機 Sanity Studio：http://localhost:3333/。
- 已修正 Sanity Studio 專用 Project ID 與 dataset 設定。
- `pnpm run sanity:build` 已通過。
- 已重新啟動 Studio 並完成 Studio 登入確認。
- 點選「品牌與聯絡資料」時曾發生 Structure Tool 崩潰。
- 已將自訂 Structure Tool 改回 Sanity 預設結構，並通過 `pnpm run sanity:build`。
- 已調整品牌資料欄位標題，避免「中文名稱 / 英文名稱」在後台中造成混淆。
- 已完成本機 Sanity CLI 登入。
- 曾使用不含 `--replace` 的方式匯入 4 筆 PoC 測試資料，但 Sanity 將其建立為文件層級 Published。
- 已建立 4 筆 `drafts.*` 草稿文件，並移除誤建的 4 筆 published PoC 文件。
- 已確認 4 筆草稿資料的 `contentStatus` 均為 `verified`。
- 業主已在 Studio 後台確認 4 筆 PoC 資料內容正確。
- 業主已成功修改 Site Profile Slogan，並確認儲存在 Sanity 草稿文件。
- 業主已成功修改 1201 房型名稱，並確認儲存在 Sanity 草稿文件。
- 業主已成功上傳 1201 房型封面圖片，並確認儲存在 Sanity 草稿文件。
- 業主已成功上傳 1201 房型相簿圖片並調整排序，確認儲存在 Sanity 草稿文件。
- 業主已成功修改 FAQ 回答，並確認儲存在 Sanity 草稿文件。
- 業主已建立 Sanity Viewer preview token，並填入本機 `.env`。
- Astro 本機草稿預覽已確認可讀取 Sanity 草稿內容。
- Production build 已確認不顯示未發布 Sanity 草稿內容。
- 切回 local content source 後，原網站已確認正常運作。
- 業主操作感受已記錄：Sanity 可繼續採用，但正式後台需中文化、簡化欄位，並加強 Draft/Published 發布提醒與防呆。

## 業主操作感受

- 整體操作感受：普通。
- 主要卡點：第一次登入、Terminal 指令、CLI 登入、部分英文與技術名詞，以及 Draft / Published 差異需要引導。
- 內容填寫與圖片上傳：可接受，不是主要障礙。
- 正式採用意見：可以繼續使用 Sanity。
- 後續改善方向：欄位盡量中文化、簡化不必要欄位，發布前增加提醒或防呆設計。

## Phase 10 正式化規劃結論

Phase 9B 測試結果支持繼續以 Sanity 作為正式 CMS 第一候選，但正式實作前需完成以下規劃與防呆設計：

- 後台欄位需以繁體中文命名，並把技術欄位整理為「常用」、「進階」、「隱藏或唯讀」。
- Owner 與 Editor 權限需在正式採用前再次確認；若免費方案無法完全限制 Editor 發布，需透過流程與發布檢查降低風險。
- Draft / Verified / Published / Archived 的差異需在後台文件與發布流程中清楚說明。
- Production 網站只可讀取 `contentStatus == "published"` 且已正式發布的內容。
- 本機 draft preview 可讀取 draft / verified 內容，但不得公開部署預覽網址。
- TypeScript verified data 與 local source fallback 需保留到 CMS 穩定運作後再評估是否退場。
- 照片需分成原始照片、網站壓縮圖片、Sanity asset、封面圖與相簿，不可直接把未確認照片視為正式素材。
- Phase 10 只建立規格文件，不擴充完整 schema、不匯入 12 間房、不修改 PoC 草稿資料。

Phase 10 對應文件：

- `docs/CMS_IMPLEMENTATION_PLAN.md`：正式 CMS 第一階段範圍、執行順序、分批匯入與回退方式。
- `docs/CMS_FIELD_GUIDE.md`：每個 collection 的用途、欄位、發布條件與欄位分級。
- `docs/CMS_PUBLISHING_RULES.md`：草稿、確認、發布、下架流程與防呆規則。

## 安全紀錄

- 未記錄密碼。
- 未記錄驗證碼。
- 未記錄 token。
- `.env` 已由 `.gitignore` 排除，不應提交到 Git。
- 未公開部署 Studio 或網站。
- 未購買付費方案。
- 未將任何內容設為 published。
