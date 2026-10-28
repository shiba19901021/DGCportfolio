# 中英雙語維護說明

英文版在 `/en/...`，中文網址不變。**改任何一邊的內容，都要同時改另一邊。** 建置時 `scripts/verify-i18n.mjs` 會比對兩邊（結構、數字、未翻譯的中文），明確不一致會擋部署，不確定的換算（萬／million、中文數字、約／餘等語氣）只出提醒。

## 要一起維護的檔案

| 內容 | 中文 | 英文 |
|---|---|---|
| 7 個案例頁（全文、圖說、替代文字） | `src/content/works/<id>.md` | `src/content/works-en/<id>.md` |
| 2 個小專案頁 | `src/content/minis/<id>.md` | `src/content/minis-en/<id>.md` |
| 首頁文字、7 個作品標題、卡片圖說 | `src/data/home-i18n.ts`（zh） | 同檔（en） |
| 首頁案例摘要、一行簡述 | `src/data/home-summaries.ts` | `src/data/home-i18n.ts`（`homeSummariesEn`、`homeCompactEn`） |
| 所有作品頁（索引）的摘要與文字 | 各案例 `src/content/works/<id>.md` 的 `summary` 欄位 | `src/data/works-index-i18n.ts` |
| 導覽、頁尾、語言切換文字、案例頁固定文字 | `src/lib/i18n.ts`（`ui.zh`、`caseUi.zh`） | 同檔（`ui.en`、`caseUi.en`） |
| 方案設計履歷（網頁＋PDF） | `src/data/resume.json` | `src/data/resume.en.json` |
| 教學履歷（網頁＋PDF） | `src/data/teaching.json` | `src/data/teaching.en.json` |

**案例與小專案的英文檔必須與中文檔結構完全一致**（區塊 id 與順序、區塊類型、圖片路徑、related 的 id、類別、順序、是否公開、problems 等）；文字可以不同。建置時 `src/lib/works.ts`（`assertMirror`）與 `src/lib/minis.ts` 會檢查，不一致就直接建置失敗。新增案例時：兩邊各建一個檔，並把 `/works/<id>/` 加進 `translatedPaths`。

改履歷 JSON 後要重產 PDF：`python3 scripts/build-resume-pdf.py --profile resume|teaching|resume-en|teaching-en`（文字有變時加 `--refresh-fonts`）。改到共用版型或 `Base.astro` 也會讓 PDF 雜湊失效，四份都要重產。英文 PDF 內的案例連結指向 `/en/works/...`。

## 英文寫作約定
- 英文維持 B1–B2：常見字、短句、不華麗，不比中文說得更肯定。
- 保留中文的不確定語氣：約→about、概估→rough estimate、以上→or more／at least、餘→a little more、待確認→to be confirmed、口頭→verbal。
- 金額：「8 萬餘元」→ about NT$80,000 or a little more；「80 萬以上」→ at least NT$800,000；數字與中文一致。
- 不寫校名、地名等中文頁已匿名的資訊；不加中文沒有的內容、次數或人數。
- 圖片沿用中文原圖；英文圖說與替代文字註明圖中文字為中文；匿名化重製的圖保留「匿名化重製」說明。
- 尚無英文版的連結指向中文頁，並標 "(in Chinese)"。

## 上線開關（單一開關：`englishPublic`）
`src/data/i18n-config.json` 的 `englishPublic` 控制所有上線行為，目前為 `false`：

| | `false`（目前） | `true`（上線） |
|---|---|---|
| 中文頁的 EN 按鈕 | 不顯示 | 有英文版的頁面顯示 |
| 英文頁 `noindex` | 有 | 移除 |
| hreflang（`zh-Hant-TW`、`en`、`x-default`＝中文頁）與 canonical | 不輸出 | 只在有中英對照的頁面輸出 |
| `sitemap.xml`（中英文頁，含 hreflang 配對） | 不產生 | 建置時由 `scripts/make-sitemap.mjs` 產生 |

沒有英文版的舊頁（`/projects/`、`/learning/`、`/explore/`）不論開關，都沒有 EN 按鈕與 hreflang，維持中文。`verify-i18n.mjs` 會檢查開關狀態與輸出一致（例如開關關閉時不得出現 hreflang／sitemap，開啟時 hreflang 必須成對互指）。

## 其他
- `translatedPaths`（已有英文版的頁面）：列入後英文頁的連結才會指向英文版。
- 例外名單（可留在英文頁的中文專有名詞、可不同的數字）：`scripts/i18n-exceptions.json`（目前專有名詞：游鏡騰、山林悠遊網、學森林）。
- 案例頁統計欄位（`SummaryBlock`）的數字拆分同時接受中文與英文逗號。
