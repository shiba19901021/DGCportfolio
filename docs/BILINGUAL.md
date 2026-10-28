# 中英雙語維護說明

英文版在 `/en/...`，中文網址不變。**改任何一邊的內容，都要同時改另一邊。** 建置時 `scripts/verify-i18n.mjs` 會比對兩邊（結構、數字、未翻譯的中文），明確不一致會擋部署，不確定的換算（萬／million、中文數字、約／餘等語氣）只出提醒。

## 要一起維護的檔案

| 內容 | 中文 | 英文 |
|---|---|---|
| 首頁文字、7 個作品標題、卡片圖說 | `src/data/home-i18n.ts`（zh） | 同檔（en） |
| 首頁案例摘要、一行簡述 | `src/data/home-summaries.ts` | `src/data/home-i18n.ts`（`homeSummariesEn`、`homeCompactEn`） |
| 導覽、頁尾、語言切換文字 | `src/lib/i18n.ts`（`ui.zh`） | 同檔（`ui.en`） |
| 方案設計履歷（網頁＋PDF） | `src/data/resume.json` | `src/data/resume.en.json` |
| 教學履歷（網頁＋PDF） | `src/data/teaching.json` | `src/data/teaching.en.json` |

改履歷 JSON 後要重產 PDF：`python3 scripts/build-resume-pdf.py --profile resume|teaching|resume-en|teaching-en`（文字有變時加 `--refresh-fonts`）。

## 開關與待辦
- `src/data/i18n-config.json`：`englishPublic`（false＝中文頁不顯示 EN、英文頁 noindex）；`translatedPaths`（已有英文版的頁面，列入後英文頁的連結才會指向英文版）。
- 英文履歷的案例連結目前指向中文案例頁，案例翻譯完成後改成 `/en/works/...`，並把 `caseLinkLabel` 的「(in Chinese)」拿掉。
- 例外名單（可留在英文頁的中文專有名詞、可不同的數字）：`scripts/i18n-exceptions.json`。
