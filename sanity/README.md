# Sanity CMS Minimal PoC

Phase 9 只建立最小 Sanity CMS 概念驗證，不建立完整正式後台、不公開部署、不串接奧丁丁 API、不建立付款、訂單、即時房況或 AI。

## PoC 範圍

只包含 4 個 schema：

- Site Profile：品牌與聯絡資料。
- Property：館別資料。
- Room：房型資料。
- FAQ：常見問題。

建議 PoC 測試資料只建立：

- 1 筆 Site Profile。
- 1 筆 Love 館 Property。
- 1 筆房型資料，例如 1201 地中海豪華雙人房。
- 1 筆 FAQ。

不要匯入全部 12 間房。

## 啟動前準備

1. 建立 Sanity 專案與 dataset。
2. 複製 `.env.example` 為 `.env`。
3. 填入：

```text
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
SANITY_API_VERSION=2026-06-27
SANITY_PREVIEW_TOKEN=
PUBLIC_CONTENT_SOURCE=local
```

PoC 預設 `PUBLIC_CONTENT_SOURCE=local`，網站仍讀本地 TypeScript 內容。
Sanity Studio 從 `sanity/` 目錄啟動，請確認 `sanity/.env` 也有 `SANITY_STUDIO_PROJECT_ID` 與 `SANITY_STUDIO_DATASET`。

## 啟動 Studio

```bash
pnpm run sanity:dev
```

若沒有設定 `SANITY_STUDIO_PROJECT_ID`，Studio 會停止啟動並提示補上設定。請先建立 Sanity project，再填入 `sanity/.env`。

## 啟動 Astro

本地內容：

```bash
PUBLIC_CONTENT_SOURCE=local pnpm run dev
```

Sanity PoC 草稿預覽：

```bash
PUBLIC_CONTENT_SOURCE=sanity PUBLIC_CONTENT_MODE=draft pnpm run dev
```

Production 查詢保護測試：

```bash
PUBLIC_CONTENT_SOURCE=sanity PUBLIC_CONTENT_MODE=published pnpm run build
```

Production 不可使用 preview token。

## 建議手動建立的 PoC 測試資料

也可以匯入本 repo 已準備好的 4 筆 PoC 測試資料：

```bash
cd sanity
pnpm exec sanity dataset import seed/poc-documents.ndjson production
```

匯入資料只包含 1 筆 Site Profile、1 筆 Love 館 Property、1 筆 Room、1 筆 FAQ，且 `contentStatus` 都是 `verified`，不是 `published`。PoC 階段不要使用 `--replace`，避免覆蓋既有資料。

注意：`dataset import` 會建立 Sanity 文件層級的 published 文件。Phase 9B 實際操作時若需保留 Sanity 文件草稿狀態，請使用 `seed/poc-draft-documents.json` 建立 `drafts.*` 文件，避免 PoC 內容出現在 Sanity 的 Published 狀態。

### Site Profile

- 中文名稱：樂圖漫遊會館
- 英文名稱：Lovetour HomeStay
- Slogan：我們打造的，不是房間，而是旅途中真正想回去休息的地方。
- 電話：0905-370-600
- Email：lovetour880@gmail.com
- 地址：澎湖縣馬公市西衛里261-9號
- 回覆時間：08:00-21:00
- LINE ID：@tour880
- 官網網址：https://www.lovetour880.com/
- contentStatus：verified

### Property

- 館別識別碼：love
- 館別名稱：Love 館
- 簡短介紹：Love 館以寬敞、整潔與舒適睡眠為核心，提供安靜放鬆的住宿空間，適合情侶、家庭及希望在澎湖旅行後好好休息的旅客。
- 特色：房間空間寬敞、環境乾淨整潔、重視床鋪與睡眠舒適度、適合情侶與家庭入住、適合希望安靜休息的旅客
- 地址：澎湖縣馬公市西衛里261-9號
- 排序：1
- contentStatus：verified

### Room

- 所屬館別：Love 館
- 房號：1201
- 正式房名：地中海豪華雙人房
- slug：love-1201-mediterranean-deluxe-double-room
- 建議入住人數：2
- 最多入住人數：留空
- 床型：一大床
- 是否可加床：true
- 簡短介紹：留空
- 設備：留空
- 注意事項：全館室內禁止吸菸、加床需提前告知、晚上 10 點後請勿大聲喧嘩
- 顯示順序：1
- 奧丁丁網址：留空
- featured：true
- contentStatus：verified

### FAQ

- 分類：入住與退房
- 問題：可以提早入住嗎？
- 回答：若房間提前整理完成，我們會盡量協助提早入住；實際可入住時間仍以當日房務整理進度為準。
- 排序：1
- contentStatus：verified

## 權限需求

PoC 決策：

- Owner：業主本人，可以查看、編輯、確認與發布。
- Editor：櫃檯同仁，可以查看與編輯，但暫時不可正式發布。

Sanity 免費方案是否能完整限制 Editor 發布權限，需依目前官方方案實際能力確認。若免費方案不能完整做角色權限隔離，PoC 只能文件化需求，不可假設權限已完成。

## 驗證清單

- 可登入 Sanity Studio。
- 可修改 Site Profile。
- 可修改 1 間房的房名與介紹。
- 可上傳 1 張測試圖片。
- 可調整相簿排序。
- 可建立與修改 FAQ。
- 可將 contentStatus 從 draft 改為 verified。
- 可用 Astro 本機草稿預覽看到 Sanity 內容。
- production query 不取得未 published 內容。
- 切回 `PUBLIC_CONTENT_SOURCE=local` 後，原網站仍正常。

## 禁止事項

- 不匯入全部 12 間房。
- 不公開部署 Studio。
- 不購買付費方案。
- 不把 token 寫進程式碼。
- 不將內容正式 published。
- 不刪除 `src/content/data/`。
