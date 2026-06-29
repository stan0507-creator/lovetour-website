# Git Workflow

本文件定義樂圖漫遊會館官網的 Git 開發規範。  
目前 Phase 3 只建立規範，不建立 CI/CD 或部署流程。

## Branches

### `main`

正式穩定分支。  
只放已確認、可部署或可回溯的版本。

規則：

- 不直接在 `main` 開發。
- 合併前需確認階段目標完成。
- 若未來建立 CI，`main` 必須通過檢查才能合併。

### `develop`

日常整合分支。  
功能分支完成後先合併到 `develop`，經確認後再進 `main`。

規則：

- 每個階段完成後可合併到 `develop`。
- `develop` 可以包含尚未發布但已確認的工作。

### `feature/*`

新功能或新階段開發分支。

命名範例：

- `feature/design-system`
- `feature/content-model`
- `feature/homepage-sections`
- `feature/room-pages`

規則：

- 每個 feature 應對應清楚範圍。
- 不把多個階段混在同一支 feature。
- 不在 feature 中提前實作被禁止的未來功能。

### `hotfix/*`

正式環境緊急修正分支。

命名範例：

- `hotfix/fix-contact-phone`
- `hotfix/seo-title`

規則：

- 只修緊急問題。
- 修完後需回合併到 `main` 與 `develop`。

## Commit 命名規則

使用簡化版 Conventional Commits：

```text
type(scope): summary
```

常用 type：

- `docs`：文件。
- `feat`：新增功能。
- `fix`：修正錯誤。
- `refactor`：重構但不改行為。
- `style`：樣式或格式。
- `chore`：專案設定與維護。
- `test`：測試。

scope 建議：

- `architecture`
- `content`
- `design-system`
- `components`
- `docs`
- `workflow`

範例：

```text
docs(architecture): add phase 1 architecture document
feat(content): add sample room data
feat(design-system): add base design tokens
docs(workflow): add git branch strategy
```

## Commit 原則

- 一個 commit 做一件清楚的事。
- 不把文件、內容、UI、API 混成一包。
- 階段確認前不要提交下一階段內容。
- commit summary 使用英文小寫動詞，保持簡短。

## Pull Request 原則

未來若使用 PR 流程，每個 PR 需包含：

- 階段名稱。
- 變更摘要。
- 明確列出未做事項。
- 檢查方式。
- 截圖或預覽連結，只在有 UI 實作時提供。

每個階段的 PR 都應遵守該階段邊界；未經確認前，不應提前包含下一階段功能。
