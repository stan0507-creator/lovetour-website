# Design System

Phase 3 建立網站共用設計基礎。  
此資料夾只放 design tokens 與 component contracts，不建立首頁、頁面、CMS、API、AI 或訂房功能。

## 結構

```text
src/design-system/
├── components/
│   ├── badge.ts
│   ├── button.ts
│   ├── card.ts
│   ├── container.ts
│   ├── faq-card.ts
│   ├── footer.ts
│   ├── gallery.ts
│   ├── heading.ts
│   ├── hero.ts
│   ├── index.ts
│   ├── navbar.ts
│   ├── room-card.ts
│   ├── section.ts
│   └── types.ts
├── tokens/
│   ├── animation.ts
│   ├── breakpoints.ts
│   ├── colors.ts
│   ├── design-tokens.ts
│   ├── icons.ts
│   ├── index.ts
│   ├── radius.ts
│   ├── shadow.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── z-index.ts
└── index.ts
```

## 原則

- 設計變數集中放在 `tokens/`。
- 元件檔案只定義介面與可用選項，不實作 UI。
- 未來前台、後台與 AI 輔助介面都應共用同一套 tokens。
- 若需要新增顏色、字級或間距，先更新 tokens，再由元件引用。
