# 資料模型

資料模型先定義「網站需要管理哪些資訊」，不急著決定資料從哪裡來。初期會由 `src/content/` 的本地內容檔提供，日後可轉接 CMS。

## 核心資料

### SiteProfile

網站與品牌基本資料。

- `name`：民宿名稱。
- `tagline`：短標語。
- `description`：SEO 與首頁介紹。
- `address`：地址文字。
- `contacts`：電話、Line、Email、社群連結。
- `checkInTime` / `checkOutTime`：入住與退房時間。
- `languages`：網站支援語言。

### MediaAsset

圖片與媒體資料。

- `id`：資產識別。
- `src`：圖片路徑。
- `alt`：替代文字。
- `caption`：圖片說明。
- `credit`：攝影或來源資訊。
- `tags`：房型、外觀、公共空間、景點等分類。

### Property

館別資料，用來區分 Love 館、Tour 館與未來可能新增的住宿空間。

- `id`：館別識別。
- `kind`：館別類型，例如 `love` 或 `tour`。
- `name`：正式館別名稱。
- `slug`：網址或內容識別。
- `summary`：館別簡介。
- `address`：館別地址。
- `featureHighlights`：館別特色。
- `sharedContact`：是否共用全站聯絡方式。
- `displayOrder`：顯示排序。
- `featured`：是否推薦。

### Room

房型資料。

- `id`：房型識別。
- `propertyId`：所屬館別。
- `name`：房型名稱。
- `slug`：網址識別。
- `summary`：列表簡介。
- `description`：詳情介紹。
- `capacity`：標準與最大入住人數。
- `bedSetup`：床型。
- `amenities`：房內設備。
- `photos`：房型照片。
- `rateNote`：價格備註，不在第一階段做動態計價。
- `isBookableAsPrivateStay`：是否可納入包棟。
- `bookingUrl`：未來對應奧丁丁房型訂房連結。
- `lineInquiryUrl`：未來對應 LINE 詢問連結。
- `displayOrder`：顯示排序。
- `featured`：是否推薦。

### Offer

活動與專案。

- `id`：專案識別。
- `title`：專案名稱。
- `slug`：網址識別。
- `period`：適用期間。
- `summary`：摘要。
- `description`：詳細說明。
- `relatedRooms`：適用房型。
- `cta`：詢問按鈕設定。

### BookingInquiry

訂房詢問資料，不代表正式訂單。

- `checkIn`：入住日期。
- `checkOut`：退房日期。
- `guestCount`：入住人數。
- `roomPreference`：房型偏好。
- `contactName`：詢問人姓名。
- `contactMethod`：聯絡方式。
- `message`：其他需求。
- `source`：Line、網站表單、電話等來源。

### Policy

入住與訂房規則。

- `type`：入住、取消、加床、寵物、停車、包棟等。
- `title`：規則標題。
- `content`：規則內容。
- `priority`：顯示順序。

### FAQ

常見問題。

- `question`：問題。
- `answer`：答案。
- `category`：房型、交通、訂房、花火節、包棟等分類。
- `priority`：顯示順序。

### NearbyPlace

附近景點與交通資訊。

- `name`：地點名稱。
- `category`：機場、港口、餐廳、景點、租車等。
- `distanceText`：距離文字。
- `travelTimeText`：交通時間。
- `mapUrl`：地圖連結。
- `description`：補充說明。

## 關係

- `Property` 會被多個 `Room` 引用。
- `Room` 會引用多個 `MediaAsset`。
- `Offer` 可引用多個 `Room`。
- `SiteProfile` 管理全站共用聯絡方式。
- `BookingInquiry` 只收集詢問需要的欄位，不建立付款或即時房況。
- `FAQ` 與 `Policy` 可以在首頁、房型頁與訂房詢問區重複使用。

## 資料原則

同一份資訊只放一個地方。  
例如入住時間只由 `SiteProfile` 或 `Policy` 管理，頁面不手寫第二份，避免之後改資料時漏改。

Phase 6 起，主要內容資料可使用 `contentStatus` 與 `published` 標記狀態。正式網站只顯示 `contentStatus: "published"` 且 `published: true` 的內容。
