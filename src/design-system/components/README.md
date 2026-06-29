# Component Library Contracts

Phase 3 只定義元件骨架與介面，不實作 UI。

這裡的檔案描述未來元件應接受哪些資料、可用哪些 variant、以及應引用哪些 design tokens。  
正式 Astro、React 或其他 UI 實作要等後續階段確認後才開始。

## 元件清單

- `Button`
- `Card`
- `Container`
- `Section`
- `Heading`
- `Badge`
- `Hero`
- `Navbar`
- `Footer`
- `Gallery`
- `RoomCard`
- `FAQCard`

## 原則

- 元件只引用 `src/design-system/tokens` 的命名，不寫死色彩、間距或陰影。
- 這些介面不是商業功能，只是未來 UI 實作的規格。
- `RoomCard` 與 `FAQCard` 只描述展示資料結構，不負責訂房、表單送出或 API。
