export const site = {
  name: '游鏡騰',
  title: '游鏡騰｜方案設計與實作作品',
  slogan: '先問為什麼，再設計能在現場運作、並持續修正的方案。',
  positioning: '以問題為入口、以系統為工具、以落地成果為驗證的方案設計者。',
  email: 'shiba19901021@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dagoshiba/',
  resume: null as string | null,
};

export const categories = {
  project: { label: '專案作品集', path: '/projects/' },
  learning: { label: '課程與教學設計', path: '/learning/' },
  tool: { label: '工具', path: '/projects/' },
  practice: { label: '小型實作', path: '/projects/' },
};

// 首頁精選的具體問題，與探索頁的跨作品問題分類分開管理。
export const homeConfig = { featuredLimit: 4 };

export const problems = [
  { id: 'clarify', title: '需求模糊，先釐清什麼？', short: '釐清需求', description: '當有人提出「想做一個東西」，如何先確認用途，以及真正希望改變的事？' },
  { id: 'coordinate', title: '資源與角色，怎麼一起運作？', short: '整合資源與角色', description: '材料、人力與專業各自存在，如何安排它們之間的關係，形成可執行的方案？' },
  { id: 'flow', title: '同一筆資訊，為什麼一直重填？', short: '改善資訊流程', description: '當資料散落在文件與工具，如何減少重複維護，同時保留工作需要的輸出？' },
  { id: 'iterate', title: '實際試過後，如何修正？', short: '測試與修正', description: '方案做出來之後，測試與使用揭露了什麼？又如何改變下一個版本？' },
] as const;

export const methods = [
  { title: '釐清問題', text: '先確認用途與希望改變的事。雨水案例先問：收來的水要做什麼？' },
  { title: '理解系統與限制', text: '盤點材料、預算、角色與既有習慣，找出彼此牽動的關係。' },
  { title: '設計方案', text: '安排資源與分工。阿里山方案由中心與部落各自主導專業內容。' },
  { title: '實際執行', text: '把方案帶進現場，依人力、條件及變更調整安排。' },
  { title: '測試與迭代', text: '檢查原先假設是否成立。水流、試教與使用回饋都可能讓方案回到修改。' },
];
