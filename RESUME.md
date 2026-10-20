# 公版履歷維護

- 正式文字與連結只有一份：`src/data/resume.json`。
- `src/components/ResumeDocument.astro` 同時供線上閱讀及 PDF 排版使用。
- `src/styles/resume.css` 只作用在履歷內；螢幕版可以自然延長，列印版為 A4 直式。
- 既有共用頁首／頁尾不改版；履歷入口設於首頁「專業履歷」區塊，不再顯示浮動選單。
- 網址為 `/DGCportfolio/resume/`，下載為 `/DGCportfolio/resume.pdf`。

## 更新文字或履歷版型

1. 修改資料或履歷專用元件／CSS。
2. 安裝專案既有 npm 依賴；本機另外安裝 PDF 作者工具（不需加入網站依賴）：

   ```sh
   python -m pip install weasyprint==70.0 pypdf fonttools brotli
   ```

   WeasyPrint 需要系統的 Pango 字型排版函式庫。

3. 從專案根目錄產生 PDF：

   ```sh
   python scripts/build-resume-pdf.py
   ```

   新增字元若超過現有字型子集，使用 `--refresh-fonts`。這個選項從 Google Fonts 的 Noto Sans TC 官方來源重新下載字型及 OFL 授權，只保留履歷使用的字元子集。不要上傳完整原始字型或暫存輸出。

4. 產生程式從 Astro 的同一份履歷 HTML 使用列印 CSS 製作 PDF，不連線載入外部資源。它會檢查 A4 單頁、全部正式文字、七個不同連結，並更新 PDF、素材清單及 `scripts/resume-pdf-manifest.json`。
5. 將 PDF 轉成圖片，人工確認沒有裁切、重疊或缺字；再執行 `npm run check`、`npm run build`，並確認桌面與手機閱讀。

PDF 不使用截圖，中文字型已嵌入，可離線閱讀、選取與搜尋。網頁字型子集僅用於履歷，不改變現有作品字型。

## 課程設計與教學合作履歷

第二份資料在 `src/data/teaching.json`，網址為 `/DGCportfolio/teaching/` 及 `/DGCportfolio/teaching.pdf`。它沿用 `ResumeDocument.astro`、`resume.css` 及同一 PDF 產生程式；`teaching.css` 只處理教學專長欄位與該份文件的單頁間距。

```sh
python scripts/build-resume-pdf.py --profile teaching
```

首次產生或需要新增字元時，加上 `--refresh-fonts`，只更新教學履歷的字型子集與素材，不修改公版履歷的字型或 PDF。兩份 PDF 各有自己的來源雜湊紀錄。

共用元件若只新增可選欄位且不影響公版履歷，應先比對原公版履歷的建置 HTML、CSS 及 PDF 雜湊，確認呈現完全相同，再更新其元件來源雜湊；不得因新增第二份文件而擅自重製已確認的 PDF。

首頁「專業履歷」區塊直接連到兩份線上履歷，無浮動選單或額外依賴。`TeachingCooperationLink.astro` 只用於三篇課程作品頁末。

GitHub Actions 繼續使用既有流程，直接發布已確認的 PDF；不需要 Python、瀏覽器或額外部署步驟。建置會檢查 PDF 與資料／排版來源的雜湊，避免網頁已更新而下載檔仍是舊版。這是更新提醒，不能代替轉圖檢視。
