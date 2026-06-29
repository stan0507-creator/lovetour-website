# Content Model

Phase 2 建立內容資料層。Phase 6 補上真實內容審查欄位與館別關係。  
目前內容使用 TypeScript sample data，給前台 prototype 讀取與檢查資料模型使用；不串 API、不建立後台 CMS、不做 AI。

## 內容資料位置

```text
src/content/
├── data/
│   ├── faqs.ts
│   ├── media-assets.ts
│   ├── nearby-places.ts
│   ├── offers.ts
│   ├── policies.ts
│   ├── properties.ts
│   ├── rooms.ts
│   └── site-profile.ts
├── index.ts
└── types.ts
```

`src/content/data/` 是目前的靜態 sample data。  
`src/content/types.ts` 定義內容檔使用的 TypeScript 型別。  
`src/content/index.ts` 提供讀取 helper，未來前台應優先從 helper 讀資料，而不是直接讀散落的資料檔。

## ContentStatus 與發布規則

Phase 6 新增內容狀態：

- `sample`：示範資料，不可公開上線。
- `draft`：草稿，待整理。
- `verified`：已確認內容，但尚未安排公開。
- `published`：可公開內容。

正式網站只能顯示同時符合以下條件的內容：

- `contentStatus: "published"`
- `published: true`

目前靜態 prototype 仍可讀取 sample helper 以檢查版型；正式上線前應改用 published helper 或等效的 CMS filter。

## SiteProfile

用途：管理全站共用的品牌、聯絡、地址與入住退房資訊。

目前欄位：

- `name`：民宿名稱。
- `tagline`：短標語。
- `description`：SEO 與品牌描述。
- `address`：地址文字。
- `contacts`：電話、Line、Email、社群等聯絡方式。
- `checkInTime`：入住時間。
- `checkOutTime`：退房時間。
- `contactHours`：聯絡或回覆時間。
- `languages`：內容支援語言。
- `contentStatus`：內容狀態。
- `published`：是否公開。

未來 CMS 對應：  
建議為 singleton collection，例如 `site_profile`。後台只需要一筆資料，供全站共用。

未來資料庫對應：  
可為 `site_profiles` table 的單筆設定資料，聯絡方式可拆為 `contact_channels` table。

## MediaAsset

用途：集中管理圖片與媒體資訊，避免圖片路徑、替代文字與來源散落各頁。

目前欄位：

- `id`：媒體識別。
- `src`：圖片路徑。
- `alt`：替代文字。
- `caption`：圖片說明。
- `credit`：來源或攝影資訊。
- `tags`：圖片分類，例如 `room`、`location`、`offer`。
- `contentStatus`：內容狀態。
- `published`：是否公開。

未來 CMS 對應：  
可對應到 CMS asset library。`id` 對應 asset id，`alt`、`caption`、`tags` 作為 asset metadata。

未來資料庫對應：  
可建立 `media_assets` table，並透過 join table 關聯房型、活動或頁面。

## Property

用途：管理館別，例如 Love 館與 Tour 館，讓房型與包棟資料可以明確歸屬。

目前欄位：

- `id`：館別識別。
- `kind`：館別類型，目前為 `love` 或 `tour`。
- `name`：館別正式名稱。
- `slug`：網址或內容識別。
- `summary`：館別摘要。
- `address`：館別地址。
- `featureHighlights`：館別特色。
- `sharedContact`：是否共用全站聯絡資訊。
- `displayOrder`：顯示排序。
- `featured`：是否推薦。
- `contentStatus`：內容狀態。
- `published`：是否公開。

未來 CMS 對應：  
建議為 `properties` 或 `buildings` collection，房型使用 relation 指向館別。

未來資料庫對應：  
可建立 `properties` table，`rooms.property_id` 作為外鍵。

## Room

用途：管理房型資料，供房型列表、房型詳情、首頁摘要與詢問流程使用。

目前欄位：

- `id`：房型識別。
- `propertyId`：所屬館別，例如 Love 館或 Tour 館。
- `name`：房型名稱。
- `slug`：網址識別。
- `summary`：列表摘要。
- `description`：詳情介紹。
- `capacity`：標準與最大入住人數。
- `bedSetup`：床型。
- `amenities`：設備清單。
- `photoIds`：關聯的媒體 ID。
- `featureHighlights`：房型特色。
- `notes`：注意事項。
- `rateNote`：價格備註。
- `isBookableAsPrivateStay`：是否可納入包棟。
- `bookingUrl`：未來對應奧丁丁房型訂房連結。
- `lineInquiryUrl`：未來對應房型 LINE 詢問連結。
- `displayOrder`：顯示排序。
- `featured`：是否推薦。
- `contentStatus`：內容狀態。
- `published`：是否公開。
- `priority`：顯示排序。

目前資料檔使用 `photoIds`，helper 讀取時會組合成前台可用的 `photos`。  
這是為了未來更容易轉成 CMS relation 或資料庫 foreign key。

未來 CMS 對應：  
建議為 `rooms` collection。照片欄位使用 relation 到 asset library，或 CMS 內建 media field。

未來資料庫對應：  
可建立 `rooms` table、`room_amenities` table、`room_media_assets` join table。

## FAQ

用途：管理常見問題，可被首頁、訂房詢問、房型頁、政策頁重複使用。

目前欄位：

- `id`：FAQ 識別。
- `question`：問題。
- `answer`：答案。
- `category`：分類，例如 `booking`、`policy`、`location`。
- `contentStatus`：內容狀態。
- `published`：是否公開。
- `priority`：顯示排序。

未來 CMS 對應：  
建議為 `faqs` collection，支援分類與排序。

未來資料庫對應：  
可建立 `faqs` table，分類可先用文字欄位，日後再拆 `faq_categories`。

## Policy

用途：管理入住、取消、停車、包棟等規則。

目前欄位：

- `id`：政策識別。
- `type`：政策類型，例如 `check-in`、`cancellation`。
- `title`：標題。
- `content`：內容。
- `contentStatus`：內容狀態。
- `published`：是否公開。
- `priority`：顯示排序。

未來 CMS 對應：  
建議為 `policies` collection，讓業主可維護各類規則。

未來資料庫對應：  
可建立 `policies` table。若政策有版本需求，未來再加 `effective_from`、`effective_to`。

## Offer

用途：管理活動專案，例如花火節、包棟、淡旺季方案。

目前欄位：

- `id`：專案識別。
- `title`：專案名稱。
- `slug`：網址識別。
- `period`：適用期間或備註。
- `summary`：摘要。
- `description`：詳細內容。
- `relatedRoomIds`：關聯房型。
- `cta`：行動按鈕設定。
- `contentStatus`：內容狀態。
- `published`：是否公開。
- `priority`：顯示排序。

未來 CMS 對應：  
建議為 `offers` collection，房型使用 relation 欄位，CTA 可用 nested object。

未來資料庫對應：  
可建立 `offers` table 與 `offer_rooms` join table。

## NearbyPlace

用途：管理交通、附近景點、港口、機場、餐飲與租車資訊。

目前欄位：

- `id`：地點識別。
- `name`：地點名稱。
- `category`：分類，例如 `airport`、`harbor`、`restaurant`。
- `distanceText`：距離文字。
- `travelTimeText`：交通時間文字。
- `mapUrl`：地圖連結。
- `description`：補充說明。
- `contentStatus`：內容狀態。
- `published`：是否公開。
- `priority`：顯示排序。

未來 CMS 對應：  
建議為 `nearby_places` collection，可依分類顯示在交通頁或首頁摘要。

未來資料庫對應：  
可建立 `nearby_places` table。若需要地圖搜尋，再加 latitude、longitude。

## AboutPageContent

用途：管理關於樂圖頁的品牌故事、經營理念與價值主張，避免文案直接散落在 component。

目前欄位：

- `hero`：頁面主標與摘要。
- `story`：品牌故事段落。
- `values`：乾淨、空間、睡眠品質、服務彈性等價值卡片。
- `seo`：SEO title、description、canonical 與 OG image。
- `contentStatus`：內容狀態。
- `published`：是否公開。

未來 CMS 對應：  
建議為 singleton page collection，例如 `about_page`。

## VillaRentalContent

用途：管理包棟方案頁，包括 Tour 館定位、適合旅人、可入住人數、公共空間、KTV、麻將、烤肉、停車、接送與包棟 FAQ。

目前欄位：

- `hero`：頁面主標與摘要。
- `positioning`：包棟定位文案。
- `capacityLabel`：可入住人數文字。
- `publicSpaces`：公共空間。
- `amenities`：KTV、麻將、烤肉、停車、接送等。
- `serviceNotes`：服務提醒。
- `faqIds`：關聯 FAQ。
- `seo`：SEO metadata。
- `contentStatus`：內容狀態。
- `published`：是否公開。

未來 CMS 對應：  
建議為 singleton page collection，例如 `villa_rental_page`，設備與服務提醒可用 repeatable fields。

## NewsArticle

用途：管理最新消息列表與單篇文章。

目前欄位：

- `title`：標題。
- `summary`：摘要。
- `coverImageId`：封面圖。
- `publishedAt`：發布日期。
- `category`：分類。
- `body`：內文段落。
- `seo`：SEO title、description、canonical 與 OG image。
- `slug`：網址識別。
- `contentStatus`：內容狀態。
- `published`：是否發布。
- `priority`：排序。

未來 CMS 對應：  
建議為 `news_articles` collection，支援 draft/published 狀態、封面圖 relation 與 SEO 欄位。

## Content Helpers

目前 helper 位於 `src/content/index.ts`。

可用讀取方式：

- `getSiteProfile()`
- `getMediaAssets()`
- `getMediaAssetById(id)`
- `getPublishedMediaAssets()`
- `getProperties()`
- `getPropertyById(id)`
- `getPropertyBySlug(slug)`
- `getPublishedProperties()`
- `getRoomEntries()`
- `getRooms()`
- `getRoomBySlug(slug)`
- `getPublishedRooms()`
- `getFAQs(category?)`
- `getPublishedFAQs(category?)`
- `getPolicies(type?)`
- `getPublishedPolicies(type?)`
- `getOffers()`
- `getOfferBySlug(slug)`
- `getPublishedOffers()`
- `getNearbyPlaces(category?)`
- `getPublishedNearbyPlaces(category?)`
- `getAboutPageContent()`
- `getVillaRentalContent()`
- `getNewsArticles(includeUnpublished?)`
- `getNewsArticleBySlug(slug)`
- `getPublishedNewsArticles()`
- `getContentSnapshot()`
- `isPublishedContent(item)`

`getRoomEntries()` 回傳原始內容格式，保留 `photoIds`。  
`getRooms()` 回傳前台較好使用的資料格式，會把 `photoIds` 轉成 `photos`。

## 未來轉換策略

目前資料檔使用 TypeScript `satisfies` 驗證格式。未來可以分五步轉換：

1. 先把 sample data 替換成正式內容檔。
2. 將確認完成的內容標記為 `verified`。
3. 上線前只把可公開內容標記為 `published` 並設定 `published: true`。
4. 若需要業主自行維護，將 `src/content/data/` 轉成 Headless CMS collections。
5. 若需要庫存、訂單、付款或權限，再評估資料庫與後端 API。

只要前台持續透過 `src/content/index.ts` helper 讀資料，底層從 TypeScript 檔案換成 CMS 或資料庫時，前台改動會比較小。
