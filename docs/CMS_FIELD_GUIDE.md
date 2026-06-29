# CMS Field Guide

本文件定義正式 CMS 第一階段的 collection、欄位中文名稱、內部 key、必填規則、公開顯示與發布條件。  
欄位分為：

- 常用：業主日常會修改，應放在後台上方。
- 進階：偶爾修改，可折疊或放在進階區。
- 隱藏/唯讀：系統用或開發維護，業主不需日常操作。

## 共用欄位

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | 發布前必須為 `published` |
| 是否上架 | `published` 或 Sanity 文件發布狀態 | 是 | 否 | 進階 | 只由 Owner 發布 |
| 顯示順序 | `displayOrder` | 視 collection | 否 | 常用 | 列表型內容必填 |
| SEO 標題 | `seoTitle` | 選填 | 是 | 進階 | 公開頁建議填寫 |
| SEO 描述 | `seoDescription` | 選填 | 是 | 進階 | 公開頁建議填寫 |
| Open Graph 圖片 | `ogImage` | 選填 | 是 | 進階 | 對外分享頁建議設定 |
| 內部備註 | `internalNotes` | 選填 | 否 | 進階 | 不公開 |

## Site Profile

用途：管理全站品牌與共用聯絡資料。  
對應 TypeScript model：`SiteProfile`

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 民宿正式中文名稱 | `name` | 是 | 是 | 常用 | 名稱確認無誤 |
| 民宿英文名稱 | `englishName` | 選填 | 是 | 常用 | 可空白 |
| 品牌 Slogan | `slogan` | 是 | 是 | 常用 | 不含測試文字 |
| 品牌簡介 | `description` | 是 | 是 | 常用 | 文字經業主確認 |
| 經營理念 | `philosophy` | 選填 | 是 | 常用 | 文字經業主確認 |
| 主要電話 | `phone` | 是 | 是 | 常用 | 格式與號碼確認 |
| Email | `email` | 是 | 是 | 常用 | 格式確認 |
| 地址 | `address` | 是 | 是 | 常用 | 「西衛里」等字詞確認 |
| 回覆時間 | `contactHours` | 選填 | 是 | 常用 | 例如 `08:00-21:00` |
| LINE ID | `lineId` | 選填 | 是 | 常用 | 可顯示 ID，不自動產生 URL |
| LINE 官方網址 | `lineUrl` | 選填 | 是 | 進階 | 未確認不得啟用 LINE CTA |
| Facebook 網址 | `facebookUrl` | 選填 | 是 | 進階 | 必須是正式頁 |
| Instagram 網址 | `instagramUrl` | 選填 | 是 | 進階 | 可空白 |
| Google Maps 網址 | `googleMapsUrl` | 選填 | 是 | 進階 | 未確認不得顯示地圖 CTA |
| 官方網站網址 | `websiteUrl` | 選填 | 是 | 進階 | 正式 domain 確認 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | `published` 才可正式顯示 |

## Property

用途：管理 Love 館與 Tour 館作為建築與房型分類。  
對應 TypeScript model：`PropertyContent`

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 館別識別碼 | `propertyKey` | 是 | 否 | 隱藏/唯讀 | `love` 或 `tour`，不可任意改 |
| 館別名稱 | `name` | 是 | 是 | 常用 | 業主確認 |
| 簡短介紹 | `summary` | 是 | 是 | 常用 | 不含待確認 |
| 詳細介紹 | `description` | 選填 | 是 | 常用 | 可後補 |
| 館別特色 | `features` | 選填 | 是 | 常用 | 可排序 |
| 地址 | `address` | 選填 | 是 | 常用 | 若共用地址需確認 |
| 封面照片 | `coverImage` | 選填 | 是 | 常用 | 照片確認與 alt 完成 |
| 館別相簿 | `gallery` | 選填 | 是 | 常用 | 圖片皆需 alt |
| 停車資訊 | `parkingInfo` | 選填 | 是 | 進階 | 未確認不得發布 |
| 電梯資訊 | `elevatorInfo` | 選填 | 是 | 進階 | 已確認才顯示 |
| 顯示順序 | `displayOrder` | 是 | 否 | 常用 | 數字越小越前 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | `published` 才可正式顯示 |

## Room

用途：管理 12 間房型的文字、照片、設備與外部訂房連結。  
對應 TypeScript model：`RoomContent` / `RoomPageContent`

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 所屬館別 | `property` | 是 | 是 | 常用 | 必須 reference 已確認 Property |
| 房號 | `roomNumber` | 是 | 是 | 常用 | 不可重複 |
| 正式房名 | `name` | 是 | 是 | 常用 | 不含測試文字 |
| 網址代稱 | `slug` | 是 | 是 | 進階 | 小寫英文數字與連字號，不可重複 |
| 建議入住人數 | `recommendedGuests` | 是 | 是 | 常用 | 已確認 |
| 最多入住人數 | `maximumGuests` | 選填 | 是 | 進階 | 未確認不填、不顯示 |
| 床型及床數 | `bedSetup` | 是 | 是 | 常用 | 已確認 |
| 是否可加床 | `extraBedAvailable` | 選填 | 是 | 常用 | 不等於保證可加床 |
| 簡短介紹 | `summary` | 選填 | 是 | 常用 | 未撰寫可先不公開 |
| 詳細介紹 | `description` | 選填 | 是 | 常用 | 依照片與實際特色撰寫 |
| 房內設備 | `amenities` | 選填 | 是 | 常用 | 可排序 |
| 衛浴設備 | `bathroomAmenities` | 選填 | 是 | 常用 | 可排序 |
| 房型特色 | `featureHighlights` | 選填 | 是 | 常用 | 可共用，也可個別覆寫 |
| 注意事項 | `notes` | 選填 | 是 | 常用 | 已確認規則才顯示 |
| 封面照片 | `coverImage` | 選填 | 是 | 常用 | 正式上線建議必填 |
| 相簿照片 | `gallery` | 選填 | 是 | 常用 | 可排序，每張有 alt |
| 奧丁丁房型網址 | `odingUrl` | 選填 | 是 | 進階 | 未確認不得啟用立即訂房 |
| LINE 詢問網址 | `lineInquiryUrl` | 選填 | 是 | 進階 | 未確認不得啟用 LINE CTA |
| 是否首頁推薦 | `featured` | 選填 | 是 | 常用 | 業主決定 |
| 顯示順序 | `displayOrder` | 是 | 否 | 常用 | 房型列表排序 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | 發布前需通過房型檢查 |

## Villa Rental

用途：管理 Tour 館包棟頁內容。  
對應 TypeScript model：`VillaRentalContent`

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 包棟館別 | `property` | 是 | 是 | 常用 | 目前為 Tour 館 |
| 標題 | `title` | 是 | 是 | 常用 | 業主確認 |
| 簡短介紹 | `summary` | 是 | 是 | 常用 | 不含未確認費用 |
| 適合人數 | `recommendedGuestsText` | 是 | 是 | 常用 | 目前 14-18 人 |
| 標準容量 | `standardCapacity` | 選填 | 是 | 常用 | 不加床 18 人 |
| 最大容量 | `maximumCapacity` | 選填 | 是 | 進階 | 加床上限未確認不得填 |
| 房間配置 | `roomConfiguration` | 是 | 是 | 常用 | 6 間房確認 |
| 床型配置 | `bedConfiguration` | 是 | 是 | 常用 | 9 張雙人床確認 |
| 公共空間 | `commonAreas` | 選填 | 是 | 常用 | 已確認項目 |
| KTV | `ktvInfo` | 選填 | 是 | 常用 | 時間與費用未確認不顯示 |
| 麻將 | `mahjongInfo` | 選填 | 是 | 常用 | 押金未確認不顯示 |
| 烤肉 | `bbqInfo` | 選填 | 是 | 常用 | 使用規則未確認不顯示 |
| 廚房設備 | `kitchenAmenities` | 選填 | 是 | 常用 | 已確認項目 |
| 接送說明 | `transferInfo` | 選填 | 是 | 常用 | 需提前預約並確認 |
| LINE 預設文字 | `linePrefillMessage` | 選填 | 否 | 進階 | LINE URL 確認後使用 |
| 奧丁丁包棟網址 | `odingUrl` | 選填 | 是 | 進階 | 未確認不得啟用 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | 未確認費用不得發布 |

## FAQ

用途：管理常見問題。  
對應 TypeScript model：`FAQContent`

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 分類 | `category` | 是 | 是 | 常用 | 使用固定分類 |
| 問題 | `question` | 是 | 是 | 常用 | 不含測試文字 |
| 回答 | `answer` | 是 | 是 | 常用 | 不含待確認或測試文字 |
| 顯示順序 | `displayOrder` | 是 | 否 | 常用 | 同分類排序 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | 回答確認後才可發布 |

## Policy

用途：管理住宿規則與營運政策。  
對應 TypeScript model：`PolicyContent`

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 規則分類 | `type` | 是 | 是 | 常用 | 固定分類 |
| 標題 | `title` | 是 | 是 | 常用 | 業主確認 |
| 內容 | `body` | 是 | 是 | 常用 | 不含未確認費用 |
| 是否重要 | `highlighted` | 選填 | 是 | 進階 | 重要規則才勾選 |
| 顯示順序 | `displayOrder` | 是 | 否 | 常用 | 排序 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | 付款、取消、押金未確認不得發布 |

## News Article

用途：管理最新消息與文章。  
對應 TypeScript model：`NewsArticleContent`

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 標題 | `title` | 是 | 是 | 常用 | 不含測試文字 |
| 網址代稱 | `slug` | 是 | 是 | 進階 | 不可重複 |
| 摘要 | `summary` | 是 | 是 | 常用 | 業主確認 |
| 分類 | `category` | 是 | 是 | 常用 | 固定分類 |
| 封面圖 | `coverImage` | 選填 | 是 | 常用 | alt 完成 |
| 發布日期 | `publishedAt` | 是 | 是 | 常用 | 正確日期 |
| 內文 | `body` | 是 | 是 | 常用 | 完整確認 |
| SEO 標題 | `seoTitle` | 選填 | 是 | 進階 | 建議填 |
| SEO 描述 | `seoDescription` | 選填 | 是 | 進階 | 建議填 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | `published` 才在列表顯示 |

## Offer

用途：管理活動、優惠或導流內容；不管理正式價格邏輯。  
對應 TypeScript model：`Offer`

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 活動名稱 | `title` | 是 | 是 | 常用 | 業主確認 |
| 網址代稱 | `slug` | 是 | 是 | 進階 | 不可重複 |
| 摘要 | `summary` | 是 | 是 | 常用 | 不含未確認價格 |
| 活動內容 | `body` | 選填 | 是 | 常用 | 可後補 |
| CTA 文字 | `ctaLabel` | 選填 | 是 | 常用 | 例如電話詢問 |
| CTA 連結 | `ctaHref` | 選填 | 是 | 進階 | 未確認不得啟用 |
| 有效期間 | `dateRange` | 選填 | 是 | 進階 | 若有活動期限需填 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | 確認後才可發布 |

## Nearby Place

用途：管理附近景點、交通點與地標。  
對應 TypeScript model：`NearbyPlaceContent`

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 名稱 | `name` | 是 | 是 | 常用 | 業主確認 |
| 分類 | `category` | 是 | 是 | 常用 | 交通、景點、餐飲等 |
| 簡介 | `summary` | 選填 | 是 | 常用 | 可空白 |
| 距離說明 | `distanceText` | 選填 | 是 | 常用 | 不確定不填 |
| 交通時間 | `travelTimeText` | 選填 | 是 | 常用 | 不確定不填 |
| Google Maps 網址 | `mapUrl` | 選填 | 是 | 進階 | 未確認不顯示 |
| 顯示順序 | `displayOrder` | 是 | 否 | 常用 | 排序 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | 確認後才發布 |

## Media Asset

用途：管理圖片與相簿素材。  
對應 TypeScript model：`MediaAsset`

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 圖片檔案 | `image` | 是 | 是 | 常用 | 圖片已確認 |
| 圖片名稱 | `title` | 是 | 否 | 常用 | 方便後台搜尋 |
| 替代文字 | `alt` | 是 | 是 | 常用 | 必填，描述圖片內容 |
| 用途 | `usage` | 是 | 否 | 常用 | 房型封面、相簿、OG 等 |
| 所屬館別 | `property` | 選填 | 否 | 進階 | 可 reference |
| 所屬房型 | `room` | 選填 | 否 | 進階 | 可 reference |
| 是否正式素材 | `approvedForWebsite` | 是 | 否 | 常用 | 未確認不得使用 |
| 顯示順序 | `displayOrder` | 選填 | 否 | 常用 | 相簿排序可用 |
| 原始檔來源 | `sourceNote` | 選填 | 否 | 進階 | 手機、舊官網等 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | 照片確認後才可被內容引用 |

## Site Navigation

用途：管理前台選單與 Footer 連結。  
對應 TypeScript：未來 Navigation config

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 連結文字 | `label` | 是 | 是 | 常用 | 確認 |
| 連結網址 | `href` | 是 | 是 | 常用 | 內部路由或正式外部 URL |
| 顯示位置 | `placement` | 是 | 否 | 常用 | Header / Footer |
| 顯示順序 | `displayOrder` | 是 | 否 | 常用 | 排序 |
| 是否開新視窗 | `openInNewTab` | 選填 | 否 | 進階 | 外部連結可用 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | 確認後才發布 |

## SEO Settings

用途：管理各頁 SEO 與分享圖片。  
對應 TypeScript：page SEO props / metadata

| 中文欄位 | key | 必填 | 公開 | 分類 | 發布條件 |
| --- | --- | --- | --- | --- | --- |
| 頁面識別 | `pageKey` | 是 | 否 | 隱藏/唯讀 | 固定值，不任意改 |
| SEO 標題 | `title` | 是 | 是 | 常用 | 不超長 |
| SEO 描述 | `description` | 是 | 是 | 常用 | 內容確認 |
| Canonical 路徑 | `canonicalPath` | 是 | 是 | 進階 | 開發確認 |
| Open Graph 標題 | `ogTitle` | 選填 | 是 | 進階 | 可沿用 title |
| Open Graph 描述 | `ogDescription` | 選填 | 是 | 進階 | 可沿用 description |
| Open Graph 圖片 | `ogImage` | 選填 | 是 | 常用 | 尺寸建議 1200x630 |
| 內容狀態 | `contentStatus` | 是 | 否 | 常用 | 確認後才發布 |

