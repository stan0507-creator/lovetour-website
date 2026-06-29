# Real Content Checklist

Phase 6 目標是審查 sample data、placeholder 與 prototype 內容，準備替換成樂圖漫遊會館的真實營運資料。  
本文件不代表正式內容，不自行猜測房名、價格、地址、電話、政策或訂房連結。

## 上線內容門檻

正式網站只能顯示同時符合以下條件的內容：

- `contentStatus: "published"`
- `published: true`

目前靜態網站仍是 prototype，可保留 sample 內容供業主檢查版型。正式上線前，所有 sample、draft、verified 但未 published 的內容都不可公開。

## 目前示範內容盤點

| 類型 | 位置 | 目前狀態 | 替換需求 |
| --- | --- | --- | --- |
| 品牌基本資料 | `src/content/data/site-profile.ts` | 描述含 Phase 2 sample data，地址為示意地址 | 補正式名稱、簡介、地址、聯絡方式、回覆時間 |
| LINE | `src/content/data/site-profile.ts` | `@lovetour-sample` 與 sample LINE URL | 補 LINE 官方帳號 ID 與正式連結 |
| 電話 | `src/content/data/site-profile.ts` | `06-000-0000`、`tel:+88660000000` | 補正式訂房電話與 tel 格式 |
| Facebook | `src/content/data/site-profile.ts` | `https://www.facebook.com/` | 補正式粉專 URL |
| Email | `src/content/data/site-profile.ts` | `hello@lovetour880.example` | 補正式 Email |
| 館別資料 | `src/content/data/properties.ts` | Love 館與 Tour 館名稱、地址、特色皆待提供 | 補正式館名、地址、定位、特色 |
| 虛構房型名稱 | `src/content/data/rooms.ts` | `海風雙人房`、`漫遊四人房`、`好友包棟方案` | 補每個正式房名、館別、slug |
| 房型內容 | `src/content/data/rooms.ts` | 容量、床型、設備、注意事項皆為 sample | 補實際人數、床型、設備、照片、訂房連結 |
| 包棟資料 | `src/content/data/rooms.ts`、`src/content/data/page-content.ts` | Tour 館包棟、8-12 人、KTV/麻將/烤肉等為 sample | 補正式人數、空間、設備、使用規則、詢問流程 |
| 關於頁文案 | `src/content/data/page-content.ts` | sample 品牌故事與經營理念 | 業主確認或改寫為正式品牌文案 |
| 最新消息 | `src/content/data/news.ts` | 花火節、包棟、交通三篇皆為 sample news | 補正式文章或先下架 |
| 活動專案 | `src/content/data/offers.ts` | 花火節與包棟專案為 sample offer | 補正式活動、期間、CTA 或先不發布 |
| FAQ | `src/content/data/faqs.ts` | 入住、包棟、交通、房價答案多為 sample | 補正式營運規則與常見問題 |
| Policy | `src/content/data/policies.ts` | 入住、取消、停車、包棟規則為 sample | 補正式政策 |
| NearbyPlace | `src/content/data/nearby-places.ts` | 距離為 `sample distance` | 補實際距離、車程、地圖連結 |
| 示範照片 | `src/content/data/media-assets.ts` | 全部為 Unsplash URL 與示意圖 alt | 補民宿實拍照與正式 alt |
| CTA placeholder | 多個頁面與元件 | `/contact`、`#contact`、`#booking-inquiry-placeholder` | 依 `docs/CTA_FLOW.md` 改成設定欄位或正式網址 |
| 聯絡表單 | `src/pages/contact.astro` | Prototype form，只做前端檢查，不送出 | 正式送出流程要等未來階段確認 |
| Google Maps | `src/pages/location.astro` | Google Maps placeholder | 未來再決定 iframe 或 API Key 串接 |
| 舊視覺原型 | `prototypes/homepage-v0/` | Phase 0 prototype，含錨點 CTA 與示範 FAQ | 保留參考，不作正式內容來源 |

## 品牌資料

業主需提供：

- 正式中文名稱
- 英文名稱
- 品牌簡介
- 經營理念
- Logo 檔案，建議提供 SVG、PNG 透明底與深淺色版本
- Slogan
- 是否要保留「我們打造的，不是房間，而是旅途中真正想回去休息的地方。」作為首頁主軸

## 館別資料

業主需提供：

- Love 館正式名稱
- Tour 館正式名稱
- 各館地址
- 各館特色
- 各館外觀照片
- 各館是否共用電話、LINE、Email、Facebook
- 各館是否有不同入住動線、停車位置或接送方式

## 房型資料

每個房型需提供：

- 所屬館別
- 正式房名
- slug，建議使用英文小寫與連字號
- 建議入住人數
- 最多入住人數
- 床型
- 是否可加床
- 房內設備
- 衛浴設備
- 房型特色
- 注意事項
- 照片需求，至少 1 張封面與 4-8 張相簿
- 奧丁丁對應訂房連結
- LINE 詢問是否需要帶入預設文字
- 顯示排序
- 是否首頁推薦
- 是否公開

## 包棟資料

業主需提供：

- 包棟館別
- 可入住人數
- 房間配置
- 公共空間
- KTV 使用規則
- 麻將使用規則
- 烤肉空間與使用規則
- 停車資訊
- 接送服務
- 使用時間及注意事項
- 夜間音量與押金規則
- LINE 詢問流程
- 奧丁丁是否提供包棟訂房入口

## 營運規則

業主需提供：

- 入住時間
- 退房時間
- 提前入住原則
- 延後退房原則
- 接送服務
- 停車資訊
- 早餐資訊
- 付款方式
- 訂金規則
- 取消規則
- 寵物規則
- 吸菸規則
- 兒童與加床規則
- 租車及行程代訂
- 節慶、連假、花火節是否有特殊規則

## 聯絡資料

業主需提供：

- 電話
- LINE 官方帳號連結
- Facebook
- Instagram
- Email
- Google Maps 連結
- 營業或回覆時間
- 是否有不同語言或不同聯絡窗口

## SEO 資料

業主需提供：

- 首頁標題
- 首頁描述
- 各頁 SEO title
- 各頁 SEO description
- Open Graph 圖片
- favicon
- 主要關鍵字，例如澎湖民宿、澎湖包棟、馬公住宿等
- 是否有品牌英文名稱或固定英文拼法

## 取得真實資料前不可公開

以下內容在取得真實資料與業主確認前不可公開：

- 房型名稱、容量、床型、設備與注意事項
- 包棟人數、包棟價格相關說明、KTV/麻將/烤肉/押金/夜間規則
- 地址、電話、LINE、Facebook、Instagram、Email
- 入住、退房、取消、訂金、付款、寵物、吸菸與加床政策
- 機場、港口、景點距離與接送說明
- 花火節、連假、活動專案與最新消息
- 所有 Unsplash 示意照片
- 所有 placeholder CTA 與訂房連結
