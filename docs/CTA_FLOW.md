# CTA Flow

Phase 6 只定義 CTA 導流規格，不串接奧丁丁、不建立訂房流程、不建立 API、不送出表單。

## 核心原則

- CTA URL 不應硬寫在單一 component 內。
- 房型相關 CTA 優先從內容資料讀取，例如 `Room.bookingUrl`、`Room.lineInquiryUrl`。
- 全站共用 CTA 優先從環境變數或集中設定讀取。
- 真實網址未知時，使用清楚命名的設定欄位，不使用模糊的 `#` 或臨時外部網址。
- 正式上線前，每個公開 CTA 都必須完成點擊測試。

## 建議設定欄位

| 用途 | 建議欄位 | 說明 |
| --- | --- | --- |
| 奧丁丁全站訂房入口 | `PUBLIC_ODING_BOOKING_BASE_URL` | 若未來有全站入口可使用 |
| LINE 官方帳號 | `PUBLIC_LINE_OFFICIAL_URL` | 全站 LINE 詢問預設連結 |
| 包棟 LINE 預設文字 | `PUBLIC_LINE_VILLA_INQUIRY_TEXT` | 用於產生包棟詢問訊息 |
| 電話 | `PUBLIC_CONTACT_PHONE` | 顯示文字用電話 |
| 電話連結 | `PUBLIC_CONTACT_TEL_URL` | `tel:` 格式 |
| Facebook | `PUBLIC_FACEBOOK_URL` | 正式粉專 URL |
| Instagram | `PUBLIC_INSTAGRAM_URL` | 正式 Instagram URL |
| Google Maps | `PUBLIC_GOOGLE_MAPS_URL` | 正式地圖連結 |
| 預設 OG 圖 | `PUBLIC_DEFAULT_OG_IMAGE` | 未指定頁面圖片時使用 |

內容資料層保留：

- `Room.bookingUrl`：單一房型對應奧丁丁訂房頁。
- `Room.lineInquiryUrl`：單一房型 LINE 詢問連結，可帶入房型名稱。
- `Room.propertyId`：判斷房型屬於 Love 館或 Tour 館。
- `Room.featured`：是否首頁或列表推薦。
- `Room.displayOrder`：顯示排序。
- `Room.contentStatus` 與 `Room.published`：公開狀態。

## 按鈕導流規格

| CTA | 未來導向 | 資料來源優先順序 | 目前 Phase 6 狀態 |
| --- | --- | --- | --- |
| 立即訂房 | 對應奧丁丁訂房頁 | `Room.bookingUrl` -> `PUBLIC_ODING_BOOKING_BASE_URL` | 尚未設定真實 URL，只能保留 prototype |
| LINE 詢問 | LINE 官方帳號 | `Room.lineInquiryUrl` -> `PUBLIC_LINE_OFFICIAL_URL` | 尚未設定真實 URL |
| 包棟詢問 | LINE 官方帳號，並帶入包棟詢問文字 | villa rental 設定 -> `PUBLIC_LINE_OFFICIAL_URL` + `PUBLIC_LINE_VILLA_INQUIRY_TEXT` | 尚未設定真實 URL 與文字 |
| 電話詢問 | `tel:` 連結 | `PUBLIC_CONTACT_TEL_URL` -> SiteProfile phone contact | 尚未設定真實電話 |
| 查看房型 | 站內房型頁 | `/rooms` 或 `/rooms/[slug]` | 可使用，屬於站內導覽 |
| 查看最新消息 | 站內消息頁 | `/news` 或 `/news/[slug]` | 可使用，屬於站內導覽 |
| 聯絡我們 | 站內聯絡頁 | `/contact` | 目前僅 prototype 表單，不送出 |

## LINE 包棟詢問文字建議

未來可依實際資料產生文字，例如：

```text
您好，我想詢問 Tour 館包棟：
入住日期：
退房日期：
入住人數：
是否需要 KTV / 麻將 / 烤肉 / 接送：
其他需求：
```

正式實作時需進行 URL encoding，並確認 LINE 官方帳號支援帶入文字的方式。

## 目前需要替換的 placeholder

| 位置 | 目前值 | 後續處理 |
| --- | --- | --- |
| `src/content/data/offers.ts` | `#booking-inquiry-placeholder` | 改用正式 LINE 或奧丁丁入口 |
| `src/components/home/HeroSection.astro` | `#contact` | 改用集中 CTA 設定或站內聯絡頁 |
| 多個 `CTASection` 使用處 | `/contact` | 依 CTA 類型改用設定欄位或內容資料 |
| `src/components/ui/RoomCard.astro` | `/contact` | 依房型 `bookingUrl` 或 fallback 規則導流 |
| `src/components/site/SiteHeader.astro` | `/contact` | 改用 LINE 官方帳號或聯絡頁策略 |
| `src/components/site/SiteFooter.astro` | `/villa-rental` | 若是包棟詢問 CTA，未來改 LINE 包棟詢問 |

## 正式上線前檢查

- 所有「立即訂房」都能導向正確房型的奧丁丁頁。
- 所有「LINE 詢問」都能開啟 LINE 官方帳號。
- 包棟詢問文字正確、可讀、沒有亂碼。
- 電話詢問在手機可以撥號。
- 站內連結沒有 404。
- 沒有 `#booking-inquiry-placeholder`、`#contact` 等臨時錨點留在公開 CTA。
