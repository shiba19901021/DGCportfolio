import type { Lang } from '../lib/i18n';

// All Works page text in both languages (same structure). Edit both together (docs/BILINGUAL.md).
export const worksIndexText = {
  zh: { title: '所有作品｜游鏡騰', heading: '所有作品', projects: '代表專案', courses: '代表課程', back: '← 返回首頁', practice: '更多實作', course: '更多課程' },
  en: {
    title: 'All Works | Ching-Teng Yu', heading: 'All Works', projects: 'Featured Projects', courses: 'Featured Courses', back: '← Back to Home',
    practice: 'More Projects',
    // No English "More Courses" title yet: the build fails if a course mini appears before one is added.
    course: '',
  },
} as const;

// English one-paragraph summaries shown on the All Works cards (zh: `summary` in src/content/works/*.md).
export const workSummariesEn: Record<string, string> = {
  'eco-kitchen': 'Brought an unused space, old teaching tools, and scattered resources together into one site. It was built through a team workshop, and the lessons from the failed kiln went back into the design.',
  rainwater: 'Started from the idea of "collecting rain" and worked out its use for teaching and display. It connects existing materials, student help in building, and digital explanation, and the water path was fixed after the water-release test.',
  alishan: 'Connected the center\'s lessons before camp with the tribal experience, made clear who leads each area of expertise, and adjusted the plan as transport, group size, and venue changed.',
  workflow: 'First mapped where data comes from and which tasks use it. Then used formulas and linked sheets to reduce repeated upkeep, while keeping the document output that is needed.',
  'climate-program': 'A team project that brought six courses together. The resource-cycle course was redesigned from trial-teaching observations, and the new lesson plan went into real teaching.',
  'food-carbon': 'Students choose ingredients twice, with new information shown in a set order, so they can compare food choices. This leads to real cooking and resource cycling.',
  hunting: 'Turned cooperation, limited resources, and environmental ethics into choices in a game, and adjusted the guidance, difficulty, and game materials after trial plays and real teaching.',
};

// English card text for the small projects (zh: title and blurb/summary in src/content/minis/*.md).
export const miniCardsEn: Record<string, { title: string; text: string }> = {
  'questionnaire-ocr': {
    title: 'Questionnaire Recognition and Data Preparation',
    text: 'A helper tool built with AI that turns scans of paper questionnaires into data in a set format. A person then checks the results.',
  },
  'community-building-simulator': {
    title: 'Community Building Simulator',
    text: 'A self-made interactive water resources simulator. Teachers place facilities in class, then see the results of rain and drought.',
  },
};

export const worksText = (lang: Lang) => worksIndexText[lang];
