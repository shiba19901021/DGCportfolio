import { getCollection, type CollectionEntry } from 'astro:content';
import { categories } from '../data/site';
import { visibleBlocks } from './case-blocks';

export type Work = CollectionEntry<'works'>;
export function pathFor(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

export async function listedWorks() {
  const all = await getCollection('works');
  const publicOnly = import.meta.env.PORTFOLIO_PUBLIC_ONLY === '1';
  const listed = all.filter(({ data }) => data.visibility === 'public' || (!publicOnly && data.visibility === 'preview'));
  const ids = new Set(all.map(w => w.id));
  for (const work of all) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(work.id)) throw new Error(`作品識別碼需為穩定英文短名：${work.id}`);
    if (work.data.featured && work.data.category !== 'project') throw new Error(`首頁專案精選分類錯誤：${work.id}`);
    if (work.data.detail && !work.body?.trim() && !visibleBlocks(work).length) throw new Error(`完整頁不可沒有內文或有效模組：${work.id}`);
    const blockIds = work.data.blocks.map(block => block.id);
    if (new Set(blockIds).size !== blockIds.length) throw new Error(`內容模組識別碼重複：${work.id}`);
    if (work.data.blocks.filter(block => block.type === 'narrative' && block.useBody).length > 1) throw new Error(`Markdown 正文只需引用一次：${work.id}`);
    for (const key of Object.keys(work.data.contexts)) {
      if (!work.data.problems.includes(key as typeof work.data.problems[number])) throw new Error(`專屬摘要沒有對應問題標籤：${work.id}/${key}`);
    }
    for (const related of work.data.related) {
      if (!ids.has(related.id) || related.id === work.id) throw new Error(`相關作品不存在或連回自己：${work.id}/${related.id}`);
    }
  }
  return listed.sort((a, b) => a.data.order - b.data.order);
}

export function workHref(work: Work) {
  return work.data.detail
    ? pathFor(`/works/${work.id}/`)
    : `${pathFor(categories[work.data.category].path)}#${work.id}`;
}

export function workLinkLabel(work: Work) {
  return work.data.detail ? '閱讀完整案例' : work.data.category === 'learning' ? '查看課程摘要' : '查看專案摘要';
}
