# Styles

放實際全站 CSS，例如 reset、base、typography、layout utilities 與 motion preferences。

Design tokens 已集中在 `src/design-system/tokens/`。  
此資料夾未來只能消費 tokens，不應重新定義顏色、字級、間距、圓角、陰影或斷點。

Phase 4 已建立 `global.css`，並從 design system 引入 `tokens.css`。
