import { getCollection, type CollectionEntry } from 'astro:content';
import { pathFor } from './works';

export type Mini = CollectionEntry<'minis'>;

// 版面分兩欄：更多實作（practice）與更多課程（course）。
// category 為日後顯示標籤與分類用，目前不在頁面顯示。
export const miniKinds = {
  practice: { title: '更多實作', note: '順手做出來、解決實際問題的小工具與小製作。', back: '返回更多實作' },
  course: { title: '更多課程', note: '規模較小的課程與教學設計。', back: '返回更多課程' },
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
