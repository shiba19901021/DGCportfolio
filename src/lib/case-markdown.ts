import { satteri } from '@astrojs/markdown-satteri';

const renderer = satteri({ features: { smartPunctuation: false } }).createRenderer({ syntaxHighlight: false });
export async function renderCaseMarkdown(markdown: string, blockId: string) {
  const result = await (await renderer).render(markdown);
  if (result.metadata.localImagePaths.length || result.metadata.remoteImagePaths.length) throw new Error('敘事圖片請使用 gallery 模組，才能保留授權與預覽控制。');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return result.code
    .replace(/id="([^"]+)"/g, (_, id) => `id="${blockId}-${id}"`)
    .replace(/href="#([^"]+)"/g, (_, id) => `href="#${blockId}-${id}"`)
    .replace(/href="(\/[^\"]*)"/g, (_, href) => `href="${base}${href}"`);
}
