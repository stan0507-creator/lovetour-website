# 樂圖漫遊會館官網

這個專案會採取分階段、模組化的方式重建樂圖漫遊會館官網。  
目前狀態是 **Phase 6：Real Content Audit and Business Flow Preparation**，已完成真實內容盤點、CTA 導流規格、圖片需求清單與最小資料模型補強。此階段仍未實作 CMS、API、AI、會員、付款、正式訂房、奧丁丁串接或後台功能。

## 目前產出

- `prototypes/homepage-v0/`：上一版視覺原型，保留作為設計方向參考。
- `docs/architecture.md`：技術選型與系統邊界。
- `docs/project-structure.md`：資料夾職責。
- `docs/data-model.md`：民宿官網核心資料模型。
- `docs/CONTENT_MODEL.md`：內容資料層、欄位用途與未來 CMS 對應方式。
- `docs/REAL_CONTENT_CHECKLIST.md`：真實營運資料待補清單與 sample/placeholder 盤點。
- `docs/CTA_FLOW.md`：未來訂房、LINE、包棟、電話與站內 CTA 導流規格。
- `docs/IMAGE_REQUIREMENTS.md`：正式照片、比例、最低尺寸與用途需求。
- `docs/UI_GUIDELINES.md`：品牌 UI、色彩、字體、RWD、圖片規格。
- `docs/GIT_WORKFLOW.md`：分支策略與 commit 命名規範。
- `docs/development.md`：後續開發規範。
- `docs/phase-plan.md`：分階段開發計畫與確認點。
- `src/content/`：Phase 2 靜態內容資料層。
- `src/content/data/properties.ts`：Phase 6 館別 sample data，用來區分 Love 館與 Tour 館。
- `src/design-system/`：Phase 3 設計系統與 component contracts。
- `src/pages/index.astro`：Phase 4 首頁靜態 prototype route。
- `src/pages/`：Phase 5 主要靜態頁面與動態靜態 route。
- `src/components/home/`：首頁 section 元件。
- `src/components/site/`：Header / Footer。
- `src/components/ui/`：跨頁共用 UI。
- `src/layouts/MainLayout.astro`：主版型。
- `src/`：正式 Astro 專案程式碼，目前包含靜態頁面、共用元件、內容資料層與設計系統，仍不包含商業交易功能。

## 階段原則

每個階段完成後都停下來等確認。  
確認後才進入下一階段，避免一次做太多、後續難維護。

## 下一個確認點

請先確認 Phase 6 的真實內容盤點、CTA 規格、圖片需求與最小資料模型調整。確認後才會進入 Phase 7。

## 本機預覽

```bash
ASTRO_TELEMETRY_DISABLED=1 pnpm run dev
```

或先 build 後預覽：

```bash
ASTRO_TELEMETRY_DISABLED=1 pnpm run build
ASTRO_TELEMETRY_DISABLED=1 pnpm run preview
```
