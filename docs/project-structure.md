# 資料夾結構

正式專案會逐步往以下結構演進。Phase 1 只建立骨架與說明，不實作完整功能。

```text
.
├── docs/
│   ├── architecture.md
│   ├── CTA_FLOW.md
│   ├── CONTENT_MODEL.md
│   ├── data-model.md
│   ├── development.md
│   ├── GIT_WORKFLOW.md
│   ├── IMAGE_REQUIREMENTS.md
│   ├── phase-plan.md
│   ├── project-structure.md
│   ├── REAL_CONTENT_CHECKLIST.md
│   └── UI_GUIDELINES.md
├── prototypes/
│   └── homepage-v0/
│       ├── index.html
│       ├── script.js
│       └── styles.css
├── public/
│   └── assets/
│       └── README.md
├── src/
│   ├── app/
│   │   └── README.md
│   ├── components/
│   │   ├── home/
│   │   │   └── *.astro
│   │   ├── site/
│   │   │   └── *.astro
│   │   ├── ui/
│   │   │   └── *.astro
│   │   └── README.md
│   ├── content/
│   │   ├── data/
│   │   │   ├── faqs.ts
│   │   │   ├── media-assets.ts
│   │   │   ├── nearby-places.ts
│   │   │   ├── offers.ts
│   │   │   ├── policies.ts
│   │   │   ├── properties.ts
│   │   │   ├── rooms.ts
│   │   │   └── site-profile.ts
│   │   ├── index.ts
│   │   ├── README.md
│   │   └── types.ts
│   ├── design-system/
│   │   ├── components/
│   │   │   ├── README.md
│   │   │   └── *.ts
│   │   ├── tokens/
│   │   │   └── *.ts
│   │   ├── index.ts
│   │   └── README.md
│   ├── domain/
│   │   └── models.ts
│   ├── features/
│   │   ├── booking-inquiry/
│   │   │   └── README.md
│   │   ├── rooms/
│   │   │   └── README.md
│   │   └── site-content/
│   │       └── README.md
│   ├── layouts/
│   │   ├── MainLayout.astro
│   │   └── README.md
│   ├── pages/
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── faq.astro
│   │   ├── index.astro
│   │   ├── location.astro
│   │   ├── news/
│   │   │   ├── [slug].astro
│   │   │   └── index.astro
│   │   ├── rooms/
│   │   │   ├── [slug].astro
│   │   │   └── index.astro
│   │   └── villa-rental.astro
│   └── styles/
│       ├── global.css
│       └── README.md
├── astro.config.mjs
├── .gitignore
├── package.json
└── README.md
```

## 職責說明

`docs/` 放專案決策與開發規範。每次進入下一階段前，先確認文件是否仍符合方向。

`prototypes/` 放設計或互動原型。原型可以看、可以參考，但不是正式功能來源。

`public/assets/` 放會被網站直接引用的靜態資產，例如照片、favicon、社群分享圖。

`src/app/` 保留給日後更複雜的 app-level 組織，目前 Phase 4 使用 Astro 標準 `src/pages/`。

`src/components/` 放 Phase 4 首頁 prototype 的 Astro 元件。`home/` 放首頁區塊，`site/` 放 Header/Footer，`ui/` 放可重用的小型 UI。

`src/content/` 放可被資料模型驗證的內容檔，例如館別、房型、FAQ、活動專案。Phase 2 先使用 TypeScript sample data，Phase 6 加入真實內容狀態與館別關係，未來可轉 Headless CMS 或資料庫。

`src/design-system/` 放 Phase 3 共用設計基礎，包含 design tokens 與 component contracts。正式 UI 實作前，設計變數都應集中在此。

`src/domain/` 放不依賴框架的資料型別與領域規則。

`src/features/` 依照民宿官網功能切模組，避免所有程式堆在 pages 或 components。

`src/layouts/` 放頁面版型，例如官網主版型、文章版型、房型詳情版型。

`src/pages/` 放 Astro route。Phase 5 已建立主要靜態頁面與動態靜態 route，沒有 API route。

`src/styles/` 放全域樣式與排版基礎，並引用 `src/design-system/tokens/tokens.css`。
