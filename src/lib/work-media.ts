import type { Work } from './works';

// Select approved case media by block, keeping its source and alt text in one place.
const selections: Record<string, { block: string; index?: number; fit?: 'contain' }> = {
  'eco-kitchen': { block: 'completed-space' },
  rainwater: { block: 'completed-equipment' },
  alishan: { block: 'field-photos' },
  workflow: { block: 'management-interface-image', fit: 'contain' },
  'climate-program': { block: 'course-example', index: 1 },
  'food-carbon': { block: 'ingredient-handbook' },
  hunting: { block: 'waiting-for-hunt' },
};

export function workMedia(work: Work) {
  const selection = selections[work.id];
  const block = work.data.blocks.find(block => block.id === selection?.block);
  const image = block?.type === 'gallery' ? block.images[selection.index ?? 0] : undefined;
  if (!image?.src || !image.approved || image.preview || !image.alt) {
    throw new Error(`作品卡片缺少核准的正式圖片：${work.id}`);
  }
  return { ...image, fit: selection.fit ?? image.fit };
}
