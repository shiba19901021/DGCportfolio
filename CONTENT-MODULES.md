# 專案內容模組：V0.3

每件作品仍只有 `src/content/works/作品識別碼.md` 一份主要來源。首頁、列表、探索及相關連結沿用同一筆資料。網址由檔名決定，不因模組順序改變。

## 新增或完成一個專案

1. 建立一份作品 Markdown，填標題、摘要、主要分類、問題與主題標籤，以及共通的問題／判斷／交付／角色／邊界。
2. 保持 `detail: false` 時，列表與其他入口會連到專案分類頁的實質摘要。
3. 要建立內頁，設定 `detail: true`，在 `blocks` 選需要的模組，依想要的順序排列。也可沿用原本沒有 blocks 的 Markdown 內文方式。
4. 補充照片時，只加入已核准的網站用副本；填圖片位置、替代文字及圖說。
5. 本機檢查、建置與預覽。分類頁不必改程式；首頁是否出現由原本 featured 與 home 設定決定，問題探索由 problems 決定。

blocks 是選用欄位，模組不要求六種全部使用。相同類型可使用多次，每個模組的 id 必須不同，使用穩定英文短名；它也用來產生頁內導覽。title 是選用標題，空內容的模組不會出現在頁面或導覽。

## 六種模組

| type | 資料 | 用途 |
| --- | --- | --- |
| summary | items: label／value；columns: two或three | 任意數量的摘要欄位，不必填滿三格 |
| narrative | useBody: true，或 paragraphs | 連貫文字；useBody把該檔案下方的Markdown正文放在這個位置 |
| gallery | layout: single或pair；images | 單張、雙圖或多張圖與圖說；手機雙圖改上下排列 |
| timeline | steps: title／text／選用image | 任意數量階段，不必有日期 |
| comparison | before／after各有label、text、選用image；note | 有實際依據的前後比較，手機保留標示上下排列 |
| results | groups: label／items | 區分交付、測試、未驗證及後續工作，沒有固定必填組別 |

## 不重複修改同一份資訊

value、paragraphs中的項目、階段text、對照text、成果items，都可寫一般字串，或使用 `{ source: role }` 形式，引用作品的共通欄位。

可引用：summary、challenge、decision、delivered、boundary、role。只修改來源欄位，其他使用處就會同步更新。

## 最小組合範例

以下只是格式範例，不會自動加入網站。內容請換成該專案的真實資料：

```yaml
detail: true
blocks:
  - type: summary
    id: snapshot
    title: 專案速覽
    columns: two
    items:
      - label: 我的角色
        value: { source: role }
      - label: 交付內容
        value: { source: delivered }
  - type: narrative
    id: story
    title: 問題與設計判斷
    useBody: true
  - type: results
    id: evidence
    title: 成果與驗證
    groups:
      - label: 已完成
        items:
          - { source: delivered }
      - label: 驗證邊界
        items:
          - { source: boundary }
```

Markdown前置資料的結尾 `---` 下方，仍可正常撰寫多段正文、三級標題、連結與清單。useBody只引用一次，避免整篇重複。若要把不同敘事段落插在模組之間，可新增 narrative，使用 paragraphs，每項為一個自然段落。它會呈現為連續文章，不是卡片。

只用結構化blocks而沒有Markdown正文也可以；但detail為true時必須有有效內容，不能產生空頁。

## 照片規則

每張圖片欄位：

```yaml
src: /images/作品識別碼/現場照片.webp
approved: true
alt: 照片可見的內容
caption: 日期、情境與這張照片支持的資訊
ratio: landscape
fit: cover
position: 50% 50%
```

- ratio：landscape為3:2、wide為16:7、portrait為4:5、natural保留原比例。
- fit：cover可裁切，contain完整顯示，圖解通常使用contain或natural。
- position：裁切中心，可按照片修改，不必修改元件。
- 沒有照片：不填images就不顯示照片模組；若確實需要預留已知情境的位置，可用approved:false與placeholder文字，不提供src，也不假裝已有照片。
- 未核准src不會輸出為圖片，但不要把未核准原檔放進public；public中的檔案本身仍會被複製到dist。
- 專案主圖沿用既有image欄位。核准後列表與詳細頁共用，不必維護第二份主圖。

## 目前使用方式（V0.5）

七件作品皆設定detail:true。rainwater.md的正文與模組維持原稿；其餘六件保留原有共通欄位，新增依作品安排的blocks。生態廚房以版本流程為主，阿里山以敘事與分工摘要為主，工作流程以對照為主；課程頁各自使用研發對照、學習流程或開局調整。沒有新增共用元件或改變資料格式。

沒有完整內頁的專案，在列表下方保留原有摘要。直接進入既有錨點會展開對應摘要；停用JavaScript時全部摘要保持可讀。

V0.3沒有新增外部套件、後台、遠端儲存庫或部署流程。


## V0.6：直接保留原稿的段落格式

敘事模組新增選用markdown欄位，原有paragraphs和useBody仍可使用：

```yaml
- type: narrative
  id: design-process
  title: 設計與執行
  markdown: |
    保留完整的原因與過程，不必先拆成摘要卡。

    ### 一個重要選擇

    這裡可以放一般段落、清單、**重點**與引言。
```

章節的小標題id會加上模組id前綴，避免同頁重複。作品連結仍可寫成`/works/作品識別碼/`，輸出時會配合網站base路徑。圖片不放進markdown字串，統一使用gallery等圖片欄位，保留本機預覽與公開授權控制。

本機待授權素材使用approved:false、preview:true，檔案與白名單在preview-media。它不是原始證據庫，只收錄本輪檢查過的九張副本。正式公開前需逐項核准；詳見「新增作品.md」。
