import { site } from './site';
import { homeCompact, homeSummaries, type HomeSummary } from './home-summaries';
import type { Lang } from '../lib/i18n';

// Home page text in both languages, same structure. Edit both together (docs/BILINGUAL.md).
export interface HomeText {
  title?: string; slogan: string; position: string; directions: string[]; directionSep: string;
  allWorks: string; resumeTitle: string; resumeCards: { path: string; title: string; text: string }[];
  projectsTitle: string; projectsText: string; coursesTitle: string; coursesText: string; viewAll: string;
  aboutTitle: string; aboutDirection: string; aboutText: string; preference: string;
  contactTitle: string; contactText: string; emailLink: string;
  problem: string; approach: string; outcome: string;
  readCase: string; viewCourse: string; viewProject: string; cardImageAlt: Record<string, string>; workTitles: Record<string, string>;
}

const zh: HomeText = {
  slogan: site.slogan,
  position: '我是游鏡騰，方案設計者。從永續實務與環境教育出發，擅長拆解複雜問題、整合現有資源，設計成能實際運作、並依結果修正的方案。',
  directions: ['氣候韌性與永續方案', '跨領域專案', '系統與流程改善', '遠端／彈性工作'], directionSep: '｜',
  allWorks: '所有作品', resumeTitle: '專業履歷',
  resumeCards: [
    { path: '/resume/', title: '方案設計與問題解決', text: '跨領域專案、方案研發、系統與流程改善' },
    { path: '/teaching/', title: '課程設計與教學合作', text: '課程研發、教材設計、體驗式教學與教師研習' },
  ],
  projectsTitle: '代表專案', projectsText: '從問題、限制到執行與修正，閱讀完整的專案脈絡。',
  coursesTitle: '代表課程', coursesText: '探索學習流程、互動機制，以及試教與回饋如何推進設計。',
  viewAll: '查看所有作品',
  aboutTitle: '關於我', aboutDirection: '從現場經驗，走向下一個方案。',
  aboutText: '我的背景涵蓋環境教育、永續實務、場域建置與跨組織合作。希望將累積的問題分析與方案設計經驗，應用到更廣泛的工作。',
  preference: '偏好遠端或彈性工作，可配合必要場勘與現場協作。',
  contactTitle: '聯絡方式', contactText: '歡迎跨領域方案設計、課程研發、教學及專案合作邀約。', emailLink: 'Email 聯絡',
  problem: '問題｜', approach: '做法｜', outcome: '成果｜',
  readCase: '閱讀完整案例', viewCourse: '查看課程摘要', viewProject: '查看專案摘要', cardImageAlt: {}, workTitles: {},
};

const en: HomeText = {
  slogan: 'Ask why first. Then design solutions that work on site, and keep revising them.',
  position: 'I am Ching-Teng Yu, a solution designer. I start from sustainability practice and environmental education. I am good at breaking complex problems into parts and bringing existing resources together. I design solutions that work in real use and are revised based on results.',
  directions: ['Climate resilience and sustainability programs', 'Cross-field projects', 'Systems and process improvement', 'Remote / flexible work'], directionSep: ' | ',
  allWorks: 'All Works', resumeTitle: 'Resume',
  resumeCards: [
    { path: '/resume/', title: 'Solution Design and Problem Solving', text: 'Cross-field projects, program development, systems and process improvement' },
    { path: '/teaching/', title: 'Course Design and Teaching Collaboration', text: 'Course development, material design, experiential teaching, and teacher training' },
  ],
  projectsTitle: 'Featured Projects', projectsText: 'Read the full project story, from the problem and limits to action and revision.',
  coursesTitle: 'Featured Courses', coursesText: 'See the learning flow, how students interact, and how trial teaching and feedback shaped the design.',
  viewAll: 'View All Works',
  aboutTitle: 'About Me', aboutDirection: 'From field experience to the next solution.',
  aboutText: 'My background covers environmental education, sustainability practice, site building, and work across organizations. I want to use my experience in problem analysis and solution design in a wider range of work.',
  preference: 'I prefer remote or flexible work. I can join site visits and on-site work when needed.',
  contactTitle: 'Contact', contactText: 'I welcome invitations for cross-field solution design, course development, teaching, and project work.', emailLink: 'Email me',
  problem: 'Problem | ', approach: 'Approach | ', outcome: 'Result | ',
  readCase: 'Read the full case', viewCourse: 'View course summary', viewProject: 'View project summary',
  cardImageAlt: {
    'eco-kitchen': 'A curved stove with four cooking holes and a large work table, finished inside a bamboo shelter',
    rainwater: 'The finished rainwater equipment: a black storage barrel with a raised branch pipe on top, a settling pipe on the right, and three taps at the lower left',
    alishan: 'A participant with a covered face works with tools and plant materials in a forest',
    workflow: 'An anonymized remake of the third-stage management website, showing business record search, categories, and navigation',
    'climate-program': 'Plant pots made by students from plastic bottles, standing in a cardboard box',
    'food-carbon': 'An open loose-leaf ingredient handbook showing pictures, origin, price, taste, nutrition, and numbers',
    hunting: 'Students sit around a table in the hunting game and wait for the result. Faces are blurred with a mosaic',
  },
  workTitles: {
    'eco-kitchen': 'Eco Kitchen / Extreme Energy-Saving Stove',
    rainwater: 'Rainwater Collection System at an Elementary School',
    alishan: 'Alishan Hunter Growth Camp',
    workflow: 'Workflow Improvement and Automation',
    'climate-program': 'Climate Resilience Course Program Development',
    'food-carbon': 'Food Carbon Detective',
    hunting: 'Hunting Miracle',
  },
};

export const homeText: Record<Lang, HomeText> = { zh, en };

// English versions of the home cards. Same ids and fields as the Chinese data.
export const homeSummariesEn: Record<string, HomeSummary> = {
  'eco-kitchen': {
    problem: 'An unused space and old teaching tools needed a new use. Few contractors do natural building, and there was no written quote. Two builders with contract experience gave verbal estimates: hiring outside help for the whole job at this size would cost at least NT$800,000.',
    approach: 'I used natural building skills and turned part of the work into a do-it-yourself workshop. I combined existing materials with help from participants, and used what we learned from the failed kiln to revise the design.',
    outcome: 'It was built together in an eight-day workshop. Building costs were about NT$80,000 or a little more (materials, tools, meals, and supplies). It opened in late 2024 and is still used for courses and training. The building process also became hands-on learning.',
  },
  rainwater: {
    problem: 'The school wanted to collect rainwater. The system also had to help students understand the water cycle and how the equipment works.',
    approach: 'I replanned the water paths around the need for teaching and display. I combined existing materials with students\' help in building, and used water-release tests to find problems and adjust the design.',
    outcome: 'A 200-liter rainwater collection system was built, along with an assembly activity with student participation. The water-release test showed that the first flush of rain entered the barrel too early. This was fixed by raising the branch pipe into the barrel. An interactive teaching website was also completed.',
  },
  workflow: {
    problem: 'Administrative data was spread across different forms and files. Filling in, updating, and organizing the same data again and again added to the team\'s workload.',
    approach: 'I reviewed where data comes from and how it is used. Formulas, linked sheets, and automatic document output reduced repeated input and upkeep.',
    outcome: 'Data preparation and chart making for reports went from several hours to about one hour or less (estimated from actual work; report writing not included). About 5 colleagues use the related business forms, and I maintain the management website.',
  },
  hunting: {
    problem: 'Ideas such as cooperation, limited resources, and environmental ethics are hard to understand through talks alone. Students need to face the choices themselves.',
    approach: 'Limited resources, cooperation, and environmental ethics became game rules. Difficulty, guidance, and game materials were adjusted after trial plays and real teaching.',
    outcome: 'It was used for the lessons before the Alishan Hunter Growth Camp. After probability estimates, a trial play with colleagues, and real teaching, it changed to dice rolls, added starting dried meat, and switched to durable hard cards for the game materials.',
  },
};

export const homeCompactEn: Record<string, string> = {
  alishan: 'Connected the center\'s lessons before camp with the tribal experience, made clear who leads each area of expertise, and adjusted the plan as transport, group size, and venue changed.',
  'climate-program': 'A team project that brought six courses together. The resource-cycle course was redesigned from trial-teaching observations, and the new lesson plan went into real teaching.',
  'food-carbon': 'Students choose ingredients twice, with new information shown in a set order, and compare their food choices. This leads to real cooking and resource cycling. From 2025 to 2026: 30+ sessions and 800+ participants in total. Listed in the official course introduction on the Shanlin Youyou website (山林悠遊網).',
};

export function homeSummary(lang: Lang, id: string) {
  return lang === 'en' ? homeSummariesEn[id] : homeSummaries[id];
}
export function homeCompactText(lang: Lang, id: string) {
  return lang === 'en' ? homeCompactEn[id] : homeCompact[id];
}
