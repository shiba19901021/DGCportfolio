# 游鏡騰｜個人作品集

Astro 靜態網站，包含專案作品、課程設計與跨分類問題探索。

正式網址：https://shiba19901021.github.io/DGCportfolio/

## 本機使用

使用 Node.js 24 與 npm。在專案目錄依序執行：

```sh
npm ci
npm run dev
```

開啟終端顯示的本機網址（包含 `/DGCportfolio/` 子路徑）。

## 更新及發布

1. 編輯 `src/content/works/*.md`；既有作品識別碼及網址維持不變。
2. 圖片只使用已獲公開同意的網站副本，放在 `public/images/`；原始照片與私人資料放在網站外。
3. 新增或更換公開素材時，同步更新 `scripts/public-assets.json` 中的相對路徑與 SHA-256。
4. 執行 `npm run check` 與 `npm run build`。
5. 檢查通過後提交並推送 `main`，GitHub Actions 會建置並更新 Pages。可在儲存庫 Actions 查看結果。

正式建置只顯示 `visibility: public` 的作品。圖片需要明確核准後設定 `approved: true`；這個欄位不是素材授權的替代。

`npm run build` 會檢查公開素材清單、雜湊、作品頁、內部連結與子路徑，並禁止預覽素材進入輸出。

## 私人資料

`preview-media/` 僅供本機開發，不提交 Git，也不複製至建置結果。原始 Notion、私人備份、歷史版本、機密教具與內部紀錄不屬於此儲存庫。

`node_modules/`、`dist/`、`.astro/`、環境檔與備份壓縮檔均忽略。不要把上層「作品集」資料夾整包上傳。

內容模組與新增作品格式見 `CONTENT-MODULES.md` 及 `新增作品.md`。
