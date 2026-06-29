# 分階段開發計畫

## Phase 0：視覺原型

狀態：已完成。  
產物：`prototypes/homepage-v0/`

這一版用來確認風格、首頁資訊密度與民宿氛圍，不是正式工程架構。

## Phase 1：專案地基

狀態：已完成，已確認。  
目標：建立技術選型、資料夾結構、資料模型與開發文件。

完成條件：

- 技術選型已寫入文件。
- 資料夾職責已定義。
- 核心資料模型已定義。
- 正式功能尚未開始實作。
- 已確認後進入 Phase 2。

## Phase 2：內容資料層

狀態：已完成，已確認。  
目標：建立可被前台讀取的 TypeScript 靜態內容資料與讀取 helper，不實作商業功能。

預計產物：

- SiteProfile sample data。
- Room sample data。
- FAQ sample data。
- Policy sample data。
- Offer sample data。
- NearbyPlace sample data。
- MediaAsset sample data。
- 內容讀取 helper functions。
- `docs/CONTENT_MODEL.md`。

## Phase 3：Design System

狀態：已完成，已確認。  
目標：建立共用設計系統、design tokens、元件介面骨架與 UI/Git 規範，不實作頁面或商業功能。

預計產物：

- `src/design-system/tokens/`。
- `src/design-system/components/`。
- `docs/UI_GUIDELINES.md`。
- `docs/GIT_WORKFLOW.md`。
- 不建立首頁、房型頁、FAQ 頁、API、CMS、AI 或訂房功能。

## Phase 4：Homepage Static Prototype

狀態：已完成，已確認。  
目標：建立可在本機預覽的首頁靜態 prototype，使用 Phase 2 sample content 與 Phase 3 design tokens，不實作 CMS、API、AI、訂房、付款或後台功能。

預計產物：

- Astro 專案設定。
- 全站 layout。
- 首頁 route。
- Header / Navbar。
- Hero。
- 品牌特色區塊。
- 房型推薦區塊。
- 包棟推薦區塊。
- FAQ 摘要區塊。
- 交通與聯絡摘要區塊。
- Footer。
- RWD 全域樣式。

## Phase 5：Core Pages and Navigation

狀態：已完成，已確認。  
目標：將首頁延伸為可完整瀏覽的靜態民宿網站雛形，建立主要頁面、導覽與內容呈現，不實作 CMS、API、AI、會員、付款或正式訂房功能。

預計產物：

- 首頁 `/`。
- 關於樂圖 `/about`。
- 房型列表 `/rooms`。
- 單一房型頁 `/rooms/[slug]`。
- 包棟方案 `/villa-rental`。
- 最新消息 `/news`。
- 單篇消息 `/news/[slug]`。
- 常見問題 `/faq`。
- 交通位置 `/location`。
- 聯絡我們 `/contact`。
- 共用元件與 SEO 基礎。

## Phase 6：Real Content Audit and Business Flow Preparation

狀態：已完成，等待確認。  
目標：全面盤點 sample data、placeholder、prototype 文案、示範圖片與未設定 CTA，建立真實內容待補清單、CTA 導流規格、圖片需求清單，並用最小資料模型調整支援館別、房型關係與內容狀態。

預計產物：

- `docs/REAL_CONTENT_CHECKLIST.md`。
- `docs/CTA_FLOW.md`。
- `docs/IMAGE_REQUIREMENTS.md`。
- `Property` / `Building` 館別資料模型。
- `Room.propertyId`、`bookingUrl`、`lineInquiryUrl`、`displayOrder`、`featured`。
- `contentStatus` 與 `published` 發布狀態。
- published helper，供未來正式站過濾公開內容。
- 不建立 CMS、API、AI、會員、付款、正式訂房或奧丁丁串接。

## Phase 7：真實內容替換

狀態：等待確認。  
目標：依照 Phase 6 checklist 將業主提供的真實品牌、館別、房型、包棟、政策、聯絡、SEO 與圖片資料替換進內容層。

## Phase 8：訂房詢問流程

狀態：等待確認。  
目標：建立不含付款的詢問流程，優先串 Line 或表單通知。

## Phase 9：上線準備

狀態：等待確認。  
目標：SEO、效能、可及性、部署設定、正式內容與圖片替換。

## 確認規則

每個階段完成後都需要明確確認，才會進入下一階段。  
若中途改變方向，先更新本文件，再繼續實作。
