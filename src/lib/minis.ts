import { getCollection, type CollectionEntry } from 'astro:content';
import { pathFor } from './works';

export type Mini = CollectionEntry<'minis'>;

// 每個小專案只歸一個主要分類；沒有作品的分類不會出現。
export const miniCategories = {
  'workflow-ai': '流程與 AI 工具',
  interactive: '互動教材與遊戲',
  'hands-on': '教具與動手做',
  'course-mini': '課程小設計',
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
