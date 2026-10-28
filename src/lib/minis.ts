import { getCollection, type CollectionEntry } from 'astro:content';
import { pathFor } from './works';

export type Mini = CollectionEntry<'minis'>;

// 版面分兩欄：更多實作（practice）與更多課程（course）。
// category 為日後顯示標籤與分類用，目前不在頁面顯示。
export const miniKinds = {
  practice: { title: '更多實作', back: '返回更多實作' },
  course: { title: '更多課程', back: '返回更多課程' },
} as const;

export const miniEstimateNote = '依實際作業經驗概略估算';

export async function listedMinis() {
  const all = await getCollection('minis');
  const publicOnly = import.meta.env.PORTFOLIO_PUBLIC_ONLY === '1';
  for (const mini of all) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(mini.id)) throw new Error(`小專案識別碼需為穩定英文短名：${mini.id}`);
    if (mini.data.image && mini.data.image.approved && !mini.data.image.alt) throw new Error(`小專案圖片需有替代文字：${mini.id}`);
  }
  return all
    .filter(({ data }) => data.visibility === 'public' || (!publicOnly && data.visibility === 'preview'))
    .sort((a, b) => a.data.order - b.data.order);
}

export const miniHref = (mini: Mini) => pathFor(`/minis/${mini.id}/`);

// ---- English small-project pages ---------------------------------------------------------
// src/content/minis-en/<id>.md mirrors the Chinese file: same fields and the same number of steps, usage
// items, limits and estimate lines. Only the text differs. Checked at build.
export const miniUi = {
  zh: { crumbAria: '所在位置', home: '首頁', role: '我的角色：', problem: '原本的問題', steps: '做法與流程', estimate: '處理時間', usage: '使用狀況', limits: '風險與限制', note: miniEstimateNote, back: (kind: keyof typeof miniKinds) => `← ${miniKinds[kind].back}` },
  en: { crumbAria: 'Breadcrumb', home: 'Home', role: 'My role: ', problem: 'The Original Problem', steps: 'Approach and Process', estimate: 'Time Needed', usage: 'How It Has Been Used', limits: 'Risks and Limits', note: 'Rough estimate based on actual work experience', back: (_kind: keyof typeof miniKinds) => '← Back to More Projects' },
} as const;
export const miniKindTitleEn = { practice: 'More Projects', course: '' } as const;

export async function englishMinis() {
  const zhAll = await getCollection('minis');
  const result = new Map<string, CollectionEntry<'minisEn'>>();
  for (const en of await getCollection('minisEn')) {
    const zh = zhAll.find(mini => mini.id === en.id);
    if (!zh) throw new Error(`英文小專案沒有對應的中文版：${en.id}`);
    const z = zh.data; const e = en.data;
    const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
    const bad = [
      ['kind', z.kind !== e.kind], ['category', z.category !== e.category], ['icon', z.icon !== e.icon], ['order', z.order !== e.order],
      ['visibility', z.visibility !== e.visibility], ['steps', z.steps.length !== e.steps.length], ['usage', z.usage.length !== e.usage.length],
      ['limits', z.limits.length !== e.limits.length], ['estimate', (z.estimate?.split('\n').length ?? 0) !== (e.estimate?.split('\n').length ?? 0)],
      ['role', Boolean(z.role) !== Boolean(e.role)], ['built', Boolean(z.built) !== Boolean(e.built)], ['blurb', Boolean(z.blurb) !== Boolean(e.blurb)],
      ['image', !same(z.image && { src: z.image.src, approved: z.image.approved }, e.image && { src: e.image.src, approved: e.image.approved })],
    ].filter(([, differs]) => differs).map(([name]) => name);
    if (bad.length) throw new Error(`英文小專案與中文版結構不一致：${en.id}（${bad.join('、')}）`);
    if (e.kind === 'course' && !miniKindTitleEn.course) throw new Error(`英文版尚無「更多課程」標題，請先補上：${en.id}`);
    result.set(en.id, en);
  }
  return result;
}
