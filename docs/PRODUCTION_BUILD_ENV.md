# Production Build Environment

本文件記錄正式建置網站時，若要讀取 Sanity published content，必須設定的公開環境變數。

## Sanity Published Build

正式建置使用 Sanity 作為內容來源時，請設定：

```bash
PUBLIC_CONTENT_SOURCE=sanity
PUBLIC_CONTENT_MODE=published
PUBLIC_SANITY_PROJECT_ID=47j0q3it
PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2026-06-27
```

本機驗證指令：

```bash
PUBLIC_CONTENT_SOURCE=sanity \
PUBLIC_CONTENT_MODE=published \
PUBLIC_SANITY_PROJECT_ID=47j0q3it \
PUBLIC_SANITY_DATASET=production \
SANITY_API_VERSION=2026-06-27 \
pnpm run build
```

成功建置後，首頁應讀取 Sanity published Site Profile，並輸出首頁桌機與手機 Hero 圖。

## Guard Rule

當 `PUBLIC_CONTENT_SOURCE=sanity` 時，以下欄位不可缺少：

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`

若缺少其中任一欄位，建置會直接失敗，不會安靜退回 local content。這是為了避免正式網站在部署時誤用本機 fallback 內容。

## Local Build

若要明確使用本機內容來源：

```bash
PUBLIC_CONTENT_SOURCE=local pnpm run build
```

未設定 `PUBLIC_CONTENT_SOURCE` 時，維持既有 local fallback 行為。

## Security Notes

- Published build 不需要 token。
- 不得將 `SANITY_PREVIEW_TOKEN` 或任何 secret 寫入 Git。
- 部署平台必須設定與本文件相同的 public env。
- `PUBLIC_*` 環境變數會進入前端 build，不得放入密碼、token 或私密資料。
