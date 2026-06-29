# UI Guidelines

Phase 3 建立共用 UI 規範。  
本文件只定義設計方向與使用規則，不建立頁面、不實作商業功能。

## 品牌設計理念

樂圖漫遊會館的網站應該呈現「澎湖海島、乾淨舒適、可信任、好詢問」的感覺。  
視覺不追求過度裝飾，而是讓旅客快速理解住宿資訊、房型差異、交通位置與聯絡方式。

設計關鍵字：

- 清爽：留白充足，資訊分層清楚。
- 親切：文字直接、不誇張，適合民宿品牌。
- 可信任：價格、規則、房型、照片與聯絡方式要一致。
- 海島感：使用海色、深藍、珊瑚色與溫暖背景，不做單一色系堆疊。

## 色彩規範

色彩必須引用 `src/design-system/tokens/colors.ts`，不可在元件內自行寫死。

核心色彩：

- `primary`：海島主色，用於主要 CTA、重點狀態。
- `secondary`：深藍文字與穩定感，用於標題與深色區塊。
- `accent`：珊瑚色，用於重要提醒與少量視覺重點。
- `background`：全站背景色。
- `surface`：卡片、面板與表面。
- `surfaceMuted`：淡色區塊背景。
- `textPrimary`：主要文字。
- `textSecondary`：次要說明文字。
- `border`：分隔線與卡片邊框。
- `success`：成功狀態。
- `warning`：提醒狀態。
- `error`：錯誤狀態。

使用原則：

- 主要 CTA 優先使用 `primary` 或 `accent`，同一畫面避免兩者大量競爭。
- 大面積背景以 `background`、`surface`、`surfaceMuted` 為主。
- 深色區塊可用 `secondary`，但不可讓整站變成沉重深色系。
- `success`、`warning`、`error` 只用在狀態回饋，不作為裝飾色。

## 字體規範

字體必須引用 `src/design-system/tokens/typography.ts`。

預設字體：

- 中文：`Noto Sans TC`、`PingFang TC`、`Microsoft JhengHei`
- 系統 fallback：`system-ui`
- 程式碼或識別碼：mono token

使用原則：

- H1 只用於頁面主標題。
- H2 用於主要區塊標題。
- H3 用於卡片或次級區塊。
- 內文行高使用 `normal` 或 `relaxed`。
- 字距預設使用 `normal`，只有小標籤或英文輔助文字可使用 `wide`。

## 間距規範

間距必須引用 `src/design-system/tokens/spacing.ts`。

基本規則：

- 小元件內距：`3`、`4`、`5`
- 卡片內距：`5`、`6`
- 區塊上下留白：`16`、`20`、`24`
- 頁面大段落：`24`、`32`

使用原則：

- 頁面區塊之間用 spacing token，不在元件內寫固定像素。
- 手機版優先降低上下留白，不壓縮文字可讀性。
- 卡片之間的 gap 應明顯小於大區塊之間的 gap。

## RWD 規範

斷點必須引用 `src/design-system/tokens/breakpoints.ts`。

建議斷點：

- `xs`：360px，小型手機。
- `sm`：480px，大型手機。
- `md`：768px，平板。
- `lg`：1024px，小型桌機。
- `xl`：1280px，桌機。
- `2xl`：1440px，寬螢幕。

使用原則：

- 先確保手機可讀，再擴展桌機排版。
- 固定格式元件要定義穩定尺寸或比例，避免 hover、圖片載入或文字長短造成跳動。
- 手機版導覽、表單與卡片不可水平溢出。
- 文字不使用 viewport width 縮放。

## Icon 使用規範

Icon 規格必須引用 `src/design-system/tokens/icons.ts`。

使用原則：

- 圖示用於輔助辨識，不取代必要文字。
- 常見操作優先使用可辨識圖示，例如電話、Line、地圖、選單、關閉。
- 不熟悉的圖示需要搭配文字或 tooltip。
- Icon 尺寸使用 `sm`、`md`、`lg`，避免任意像素。
- Icon stroke 使用 `regular`，重要操作可使用 `strong`。

## 房型圖片建議比例

房型圖片是轉換關鍵，建議未來正式照片採用以下比例：

- 房型卡片：`4:3`
- 房型詳情主圖：`3:2`
- 房內設備或角落細節：`1:1`
- 橫幅情境照片：`16:9`

圖片原則：

- 優先使用真實房間照片。
- 避免過暗、過度模糊、過度裁切。
- 每張圖都要有清楚 `alt`。
- 同一房型的照片色調與亮度盡量一致。

## Banner 建議尺寸

網站 banner 建議：

- 首頁 hero：至少 `1920x1080`
- 區塊 banner：至少 `1600x900`
- 手機 hero 替代圖：至少 `1080x1440`
- 活動專案 banner：至少 `1600x900`

若同一張圖同時用於桌機與手機，重要主體應放在畫面中央偏上，避免手機裁切後看不到重點。

## Open Graph 圖片尺寸

社群分享圖片建議：

- Open Graph：`1200x630`
- Twitter / X large summary：`1200x628`
- Line 分享預覽：使用 `1200x630`，文字不要太靠邊。

OG 圖片建議包含：

- 民宿名稱。
- 一張清楚主視覺。
- 短標語或地點。

## SEO 圖片規格

SEO 與效能建議：

- 主要圖片提供 WebP 或 AVIF。
- 原圖保留高解析，但前台輸出應依 viewport 使用適當尺寸。
- 圖片檔名使用英文小寫與連字號，例如 `sea-breeze-double-room.webp`。
- 每張重要圖片需要 `alt`，且描述實際內容，不堆關鍵字。
- 房型頁主圖建議寬度至少 1200px。

## Phase 3 禁做事項

本階段不建立：

- 首頁。
- 房型頁。
- FAQ 頁。
- Astro pages。
- API。
- CMS。
- AI。
- 奧丁丁串接。
- 訂房或付款功能。
