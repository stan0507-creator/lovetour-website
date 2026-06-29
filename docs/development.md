# 開發文件

## 分階段工作方式

每個階段都遵守以下順序：

1. 確認該階段目標。
2. 只實作該階段需要的範圍。
3. 檢查手機與桌機基本體驗。
4. 更新文件。
5. 停下來等待確認。

## Phase 6 狀態

Phase 6 完成真實內容盤點、CTA 導流規格、圖片需求清單與最小資料模型補強。  
目前可以啟動 Astro 預覽主要頁面，但不建立 CMS、API、AI、會員、付款、正式訂房、奧丁丁串接或後台功能。

可以查看上一版原型：

```bash
python3 -m http.server 4173
```

然後打開：

```text
http://127.0.0.1:4173/prototypes/homepage-v0/
```

## 技術命令

目前可用指令：

```bash
npm run dev
npm run build
npm run preview
npm run check
```

在目前 Codex sandbox 中，建議加上：

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

## 命名規範

- 資料型別使用 PascalCase，例如 `Room`、`Offer`。
- 檔案與資料夾使用 kebab-case，例如 `booking-inquiry`。
- 內容資料的 `slug` 使用英文小寫與連字號。
- UI 元件名稱要描述用途，例如 `RoomCard`、`SectionHeading`。
- Design System tokens 統一放在 `src/design-system/tokens/`。
- Component contracts 統一放在 `src/design-system/components/`。
- Astro route 只放在 `src/pages/`，API routes 尚未開放。
- Contact form 只能做 prototype UI 與前端欄位檢查，不可送出資料。

## 內容維護原則

- 館別、房型、FAQ、政策、活動專案應由內容檔管理，不直接散落在頁面。
- 正式網站只能顯示 `contentStatus: "published"` 且 `published: true` 的內容。
- `sample`、`draft`、`verified` 內容不可公開上線。
- Love 館與 Tour 館應透過 `Property` 與 `Room.propertyId` 建立關係。
- 每張圖片都要有 `alt`。
- 價格若會變動，先用「價格備註」呈現，避免寫死過期房價。
- 聯絡方式與 CTA URL 集中管理，避免電話、LINE 或奧丁丁連結多處不一致。

## 品質檢查

每個可瀏覽階段至少檢查：

- 桌機與手機版沒有水平溢出。
- 主要 CTA 清楚可點。
- 圖片沒有破圖。
- 標題層級合理。
- 基本 SEO meta 存在。
- 表單不會真的送出未確認的資料。
