---
title: 工作流程改善與自動化
category: project
order: 4
featured: true
home:
  order: 4
  question: 明明是同一筆資料，為什麼要填好幾次？
  judgement: 重整資料來源與取用關係，減少重複維護，保留必要文件輸出。
  visual: data
  mediaLabel: 資訊與流程
visibility: public
detail: true
topics:
  - 資訊設計
  - 資料重用
  - 工具整合
problems:
  - flow
summary: 先整理資料從哪裡產生、由哪些工作取用，再用公式與跨表連動減少重複維護，保留必要的文件輸出。
challenge: 業務紀錄、統計、工作日誌與文件使用相同資訊，卻分散維護並反覆核對。
decision: 重新設計來源與取用關係，運用公式及跨表連動，同時保留同事需要的文件與列印格式。
delivered: 既有資料能跨流程取用，形成報表、圖表與查詢資訊；其中一項業務統計約一小時內完成，為原稿概略估計，僅限該項作業。
boundary: 部分介面由 AI 協助製作，不代表所有系統全自動同步；不公開原始內部表單或真實業務資料。
role: 主動發現工作流程中的重複作業，設計資料連動與文件處理方式，並透過 AI 協作製作管理介面，依實際使用需求持續調整。
related: []
contexts: {}
blocks:
  - type: narrative
    id: repeated-records
    title: 同一筆業務資料，為什麼要整理好幾次？
    markdown: |-
      中心的業務執行總紀錄，記錄已經執行的課程、活動與場次。這些資訊除了用於課程與活動管理，也會出現在工作日誌、不同類型的業務統計，以及期中報告等行政文件裡。

      早期不同工作表之間缺乏足夠的資料連動，同一筆資料常需要人工複製、整理與核對。一項資訊改變後，可能得跟著修改五、六個位置；漏掉其中一處，數字就會對不起來。每次整理報告，也得再查找一次資料，確認各處紀錄是否一致。
  - type: gallery
    id: excel-records-image
    layout: single
    images:
      - src: /images/workflow/excel-records.png
        approved: true
        preview: false
        alt: 第一階段 Excel 業務執行紀錄的匿名化重製示意，呈現課程、服務與費用等欄位
        caption: 第一階段介面匿名化重製示意：業務紀錄以 Excel 工作表整理。
        ratio: natural
        fit: contain
  - type: narrative
    id: reusable-records
    title: 先把資料整理好，讓日誌與統計接著使用
    markdown: |-
      原本的 Excel 已經使用簡單的加減乘除公式，但資料在不同工作表之間，仍有許多需要手動搬移的地方。我先從原有檔案開始，整理各份資料的關係，逐步利用 VLOOKUP 等公式，讓工作表引用已經填過的資訊。

      後來轉向 Google Sheets，再依不同工作需求加入 QUERY 與跨表連動。例如，業務紀錄已有的日期、課程名稱，可以供工作日誌取用；不同類型的業務統計，也能從既有課程、活動與場次資料中整理，不必每次重新複製一份。

      這些引用是在使用過程中一項項加入的。主要業務資料輸入後，讓需要它的工作表接著使用；日誌中的其他工作內容仍由人工補充，原始紀錄與統計結果也保留必要核對。
  - type: gallery
    id: sheets-records-image
    layout: single
    images:
      - src: /images/workflow/sheets-records.png
        approved: true
        preview: false
        alt: 第二階段 Google Sheets 業務紀錄的匿名化重製示意，呈現分類欄位與不同用途的工作表
        caption: 第二階段介面匿名化重製示意：以 Google Sheets 整理業務欄位，供不同工作取用。
        ratio: natural
        fit: contain
  - type: narrative
    id: keep-familiar-input
    title: 不強迫換工具，讓資料繼續往下一步走
    markdown: |-
      試算表讓資料能夠重用，但查詢管理資訊、整理報告統計與圖表，還有進一步簡化的空間。我利用 AI 協助製作管理網站，依實際工作決定需要的功能，再測試、調整資料呈現與操作方式。

      原本，我希望同事直接在網站輸入業務紀錄。不過，實際負責紀錄的同事更習慣 Google Sheets，覺得原有表格比較容易掌控。我沒有要求對方換掉熟悉的工具，而是將輸入與後續分析分開安排。

      最後，業務負責人繼續在 Google Sheets 輸入與管理紀錄。每個月結束後，再下載當月資料，上傳至管理網站，由網站處理後續的查詢、統計、分析與報告資訊。這樣保留了同事原本的工作方式，也讓整理好的資料能繼續用在下一步。
  - type: gallery
    id: management-interface-image
    layout: single
    images:
      - src: /images/workflow/management-interface.png
        approved: true
        preview: false
        alt: 第三階段管理網站的匿名化重製示意，呈現業務紀錄查詢、分類與管理導覽
        caption: 第三階段介面匿名化重製示意：管理網站提供業務紀錄查詢與資訊整理。
        ratio: natural
        fit: contain
  - type: narrative
    id: report-use
    markdown: |-
      ### 讓期中報告接著使用整理好的資料

      編寫期中報告時，需要彙整執行場次、不同類型的業務統計，並準備相關數據、圖表與分析資訊。早期這項工作常要花數小時查找、分類、核對與製圖，有時甚至占去大半天或一天。

      後來將業務資料匯入網站，就能先產生報告需要的統計結果與圖表，再取用到正式報告中。依實際作業經驗概略估算，這項統計整理工作由數小時縮短至約一小時內；報告撰寫則接著使用整理好的結果。

      管理網站目前已用於業務執行場次、週會與課程檢討資訊，以及報告所需的查詢與分析。年底才會需要的歷年資料統計功能，我先留待有實際需求時再製作。
  - type: narrative
    id: leave-documents
    title: 假單仍然要交，但不用逐張重填
    markdown: |-
      請假文件是另一個相對獨立的改善。原本以 Word 製作假單，每張都要重新填寫。組織仍然需要正式文件，我便保留原有格式，改變準備資料與產生文件的方式。

      我將請假資料集中在 Excel 管理，核對代理人與日期，再搭配 Word 合併列印產生假單。月底可以集中處理多張文件，減少逐張填寫相同資料的工作，也保留送審所需的格式與人工檢查。
  - type: comparison
    id: leave-document-comparison
    before:
      label: 改善前
      text: 每份 Word 假單分別填寫資料，再逐份核對並輸出。
    after:
      label: 改善後
      text: Excel 整理請假資料、核對代理人與日期，再以 Word 合併列印批次產生正式文件。
  - type: gallery
    id: leave-mail-merge
    layout: single
    images:
      - src: /images/workflow/leave-mail-merge.webp
        approved: true
        preview: false
        alt: 請假單匿名化範例，保留姓名、請假事由、假別及起訖時間等合併列印欄位，不含真實個人資料。
        caption: 假單合併列印欄位的匿名化範例：保留正式表單格式，姓名、事由與起訖時間等欄位由整理好的資料帶入。
        ratio: natural
        fit: contain
  - type: narrative
    id: everyday-use
    title: 其他工作，也從少整理一次開始
    markdown: |-
      週會紀錄原本使用 Word，後來調整到 Google Sheets，方便累積、共同查詢，也保留需要的列印格式。工作安排則配合 Google Calendar 等既有工具處理，部分週會與課程檢討資訊再納入網站，讓需要時能較快找到紀錄。

      辦公室約五位同事已使用相關業務表單，平常仍以既有表單處理工作；公式調整與網站修改主要由我負責，隨著實際使用繼續調整。

      這些改善不是一次完成的系統建置，而是在日常工作中，隨著新的需求與使用經驗，一步步調整出來的做法。
detailIntro:
  title: 工作流程改善與自動化
  subtitle: 從重複填寫紀錄，到讓資料接著用在日誌與報告
  introduction: 在多年日常工作中，我逐步整理業務紀錄的引用關係，減少日誌與統計反覆填寫相同資訊。後來以 AI 協作製作管理網站，保留同事熟悉的表格輸入方式，再定期匯入資料供查詢、統計與報告使用；請假等行政文件則依實際需求另外改善。
---
