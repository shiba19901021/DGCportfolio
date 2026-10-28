import config from '../data/i18n-config.json';
import { pathFor } from './works';

export type Lang = 'zh' | 'en';

// One switch for the whole English site: false keeps the EN button hidden on Chinese pages
// and keeps English pages noindex. See docs/BILINGUAL.md.
export const englishPublic: boolean = config.englishPublic;
const translated = new Set<string>(config.translatedPaths);

export const ui = {
  zh: {
    htmlLang: 'zh-Hant-TW', skip: '跳至主要內容', brand: '游鏡騰', brandSub: '方案設計與實作',
    brandAria: '游鏡騰，回到首頁', navAria: '主要導覽', home: '首頁', works: '所有作品', about: '關於我',
    footer: '以問題為入口、以系統為工具、以落地成果為驗證的方案設計者。',
    switchAria: '語言', toEnglish: 'View this page in English', toChinese: '切換為中文',
    inChinese: '', preview: '本機閱讀測試版',
  },
  en: {
    htmlLang: 'en', skip: 'Skip to main content', brand: 'Ching-Teng Yu', brandSub: 'Solution design and practice',
    brandAria: 'Ching-Teng Yu, back to home', navAria: 'Main navigation', home: 'Home', works: 'All Works', about: 'About Me',
    footer: 'A solution designer who starts from the problem, uses systems thinking as a tool, and tests ideas in real use.',
    switchAria: 'Language', toEnglish: 'View this page in English', toChinese: '切換為中文',
    inChinese: ' (in Chinese)', preview: 'Local preview',
  },
} as const;

/** True when this path has an English page. */
export function hasEnglish(path: string) {
  return translated.has(path.split('#')[0]);
}

/** Link target for a page in the given language. Untranslated pages fall back to the Chinese page. */
export function localLink(lang: Lang, path: string) {
  if (lang === 'en' && hasEnglish(path)) return { href: pathFor(`/en${path}`), zhOnly: false };
  return { href: pathFor(path), zhOnly: lang === 'en' };
}

// Case page strings.
export const caseUi = {
  zh: { crumbAria: '所在位置', home: '首頁', role: '我的角色：', back: '← 返回所有作品', teaching: '課程設計與教學合作 ↗', related: '接著探索', relatedAria: '的相關作品' },
  en: { crumbAria: 'Breadcrumb', home: 'Home', role: 'My role: ', back: '← Back to All Works', teaching: 'Course Design and Teaching Collaboration ↗', related: 'Keep exploring', relatedAria: ': related works' },
} as const;
