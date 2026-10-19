---
title: 某國小雨水蒐集系統
category: project
order: 2
featured: true
home:
  order: 1
  question: 學校說想收雨水，但收來要做什麼？
  judgement: 先確認教學展示用途，再決定設備配置，並以放水測試修正水路。
  visual: water
  mediaLabel: 用途與水路
visibility: public
detail: true
topics:
  - 校園示範
  - 需求分析
  - 實體系統
problems:
  - clarify
  - iterate
summary: 從「想收雨水」釐清教學展示用途，串起既有材料、施工參與與數位說明，並依放水測試修正水路。
challenge: 校方想收雨水，但用途會影響設備規模、配置與學生參與方式。
decision: 沿用既有集水位置，配合監視器與管線條件規劃路徑；放水後發現初期雨水可能提早進桶，再抬高進桶支管。
delivered: 完成實體系統與互動網站，學生已參與預留的安全施工，並完成放水測試及修正。
boundary: 實際降雨收集表現仍待追蹤；學生解說培訓與後續交接不列為已完成成果。
role: 負責現場評估與方案規劃，安排學生實作並依測試調整管線；互動教材以 AI 協作製作，高處工作由成人處理。
related: []
contexts:
  clarify:
    challenge: 「想收雨水」還沒有說明收來的水要用在哪裡。
    decision: 先確認教學展示用途，再決定配置、學生參與及數位說明。
    delivered: 完成實體示範系統與互動網站，學生參與安全施工。
    boundary: 這是校園示範尺度的交付，未驗證實際降雨表現。
  iterate:
    challenge: 第一次放水時，初期雨水可能沿管壁流入較低的進桶支管，尚未準備收水就流向水桶。
    decision: 抬高進桶支管，使水必須先到達較高位置才會進桶。原有排水接頭的破損另行修復。
    delivered: 完成進桶支管的構造修改，並以互動教材說明操作順序。
    boundary: 構造修改與教學動畫都不等於不同雨勢下的實測或長期收集效能驗證。
blocks:
  - type: summary
    id: overview
    title: 專案概要
    columns: two
    items:
      - label: 場域
        value: 嘉北國小
      - label: 專案性質
        value: 校園雨水蒐集與環境教育
      - label: 設備規模
        value: 200 公升儲水桶，供教學展示與補充用水
      - label: 工作內容
        value: 現場評估、系統規劃、實作教學、施工調整、互動教材設計
  - type: narrative
    id: existing-site
    title: 現場觀察：利用已經存在的集水條件
    markdown: |-
      現場原本已有局部遮雨屋面、短天溝與排水管。這段短天溝原本用來處理屋頂交接處的雨水。

      我觀察到這裡已經集中部分屋頂雨水，因此沿用既有集水位置，讓新設備接入原本的環境。原排水管的接頭已有破損，也在這次工程中一併修復。
  - type: gallery
    id: existing-site-photos
    layout: pair
    images:
      - src: /images/rainwater/courtyard-before.png
        approved: true
        preview: false
        alt: 施工前的校園角落，可見遮雨屋面、交接處短天溝及右側排水管
        caption: 施工前：短天溝與右側排水管已存在，新系統沿用這個集水位置。
        ratio: natural
        fit: contain
      - src: /images/rainwater/broken-joint.jpg
        approved: true
        preview: false
        alt: 原有橫向排水管接入直管的位置已有破損缺口
        caption: 原橫管接入直管處已有破損，這次改接時一併修復。
        ratio: natural
        fit: contain
  - type: narrative
    id: design-choices
    title: 設計選擇：配合現場，也讓設備容易使用
    markdown: |-
      ### 沿著既有管線走，避開監視器

      從短天溝接出的管線先向右繞行，再折返至沉澱管的位置，配合原有管線，也避開監視器。

      ### 先排放初期雨水，再開始收水

      沉澱管中段加粗為 3.5 吋，增加雜質沉降的空間；底部設置排水閥，讓初期雨水先排走。需要收水時，再關閉排水閥，讓雨水進入儲水桶。

      ### 管線能拆開，才方便後續維護

      在進出水端設置可拆接頭，讓水桶與管線能分離，方便後續清潔與維護。200 公升的儲水桶主要作為校園教學展示設備，也能提供少量雨水供澆灌與清潔使用。
  - type: gallery
    id: completed-equipment
    layout: single
    images:
      - src: /images/rainwater/system.jpg
        approved: true
        preview: false
        alt: 完成的雨水設備，黑色儲水桶上方接入抬高支管，右側為沉澱管，左下有三個水龍頭
        caption: 完成配置：沿屋簷繞行的管線接至右側沉澱管，再連到儲水桶。
        ratio: natural
        fit: contain
  - type: narrative
    id: student-participation
    title: 學生參與：讓建置過程也成為課程
    markdown: |-
      除了直接完成設備，我也提出讓學生參與建置的方案，並獲得校方採用。學生分組組裝 PVC 管件，再到實際設備旁觀察與討論管線配置；高處施工及較高風險的工作則由成人負責。

      後續預計於 2026 年 11 月底前完成學生解說培訓，讓學生能進一步認識設備，並向其他人介紹雨水蒐集系統。
  - type: gallery
    id: student-illustration
    layout: single
    images:
      - src: /images/rainwater/student-participation-illustration.png
        approved: true
        preview: false
        alt: 學生參與情境插圖：在設備旁觀察，以及分組組裝 PVC 管件
        caption: 學生參與情境插圖：分組組裝 PVC 管件，以及完成後的現場觀察。
        ratio: natural
        fit: contain
  - type: comparison
    id: inlet-revision
    title: 施工修改：初期雨水比預期更早進桶
    before:
      label: 修改前｜進桶支管較低
      text: 第一次放水時，發現部分水可能沿管壁流入較低的側向支管，在尚未準備收水時就流向水桶，影響先排放初期雨水的安排。
      image:
        src: /images/rainwater/original-tee.png
        approved: true
        preview: false
        alt: 修改前的現場照片，標記指出沉澱管側邊較低的進桶支管
        caption: ① 較低的側向支管接往桶頂，初期雨水可能提早進桶。
        ratio: natural
        fit: contain
        annotations:
          - label: ① 較低支管
            x: 36.7
            y: 45
    after:
      label: 修改後｜抬高進桶支管
      text: 將通往水桶的支管向上抬高，讓水必須先升至較高位置，才會流向儲水桶，配合先排放、再收水的操作順序。
      image:
        src: /images/rainwater/maintenance-system.png
        approved: true
        preview: false
        alt: 修改後的現場照片，標記指出桶頂上方抬高的進桶支管
        caption: ② 支管先向上抬高，再折回桶頂。
        ratio: natural
        fit: contain
        annotations:
          - label: ② 抬高支管
            x: 54.5
            y: 28.5
    note: ""
  - type: narrative
    id: interactive-teaching
    title: 互動網站：看見管線裡發生的事
    markdown: |-
      照片可以呈現設備外觀，卻不容易看見水如何在管線中流動。因此，我利用 AI 協作製作互動式教學網站，讓學生能直接操作設備，觀察不同情境下的水流變化。

      網站先以真實照片介紹原有場域，再透過設備示意圖說明各段管線的功能。使用者可以操作下雨、排水閥及三個獨立水龍頭，透過動畫觀察初期雨水排放、雜質沉降、儲水與溢流的過程。

      另外也製作簡易操作手冊，方便教師教學及現場使用。
  - type: gallery
    id: teaching-screen
    layout: single
    images:
      - src: /images/rainwater/teaching-operation.png
        approved: true
        preview: false
        alt: 互動教材實際截圖：下雨及排水閥控制、統一設備圖、三個可獨立開關的水龍頭與示意水位
        caption: 互動教材操作畫面：下雨、關閉排水閥，並分別操作水龍頭，觀察水流與示意水位。
        ratio: natural
        fit: contain
  - type: narrative
    id: teaching-links
    markdown: "[體驗互動教材 ↗](https://shiba19901021.github.io/rainwater-prototype/index.html)　／　[查看簡易操作手冊 ↗](https://shiba19901021.github.io/rainwater-prototype/manual.html)"
  - type: results
    id: completed-and-next
    title: 完成成果與後續
    groups:
      - label: 目前完成
        items:
          - 完成校園雨水蒐集設備，以及學生參與的組裝與觀察活動。
          - 依放水時的發現，完成進桶支管的構造修改。
          - 完成可操作的互動式教學網站與簡易操作手冊。
      - label: 規劃用途
        items:
          - 作為教學展示與補充用水設施，供澆灌及合適的校園清潔使用。
      - label: 後續安排
        items:
          - 學生解說培訓預計於 2026 年 11 月底前完成。
  - type: narrative
    id: media-note
    markdown: ""
detailIntro:
  title: 嘉北國小雨水蒐集系統
  subtitle: 從一個收集雨水的想法，到能用於教學的校園設施
  introduction: 嘉北國小希望在校園建置雨水蒐集系統，讓學生觀察雨水如何被收集與利用。我先了解現場環境與教學需求，再依既有設施、可用材料及施工條件規劃管線，安排學生參與部分組裝。完成設備後，再以 AI 協作製作互動教材，讓學生觀察不同操作下的水流。
---
