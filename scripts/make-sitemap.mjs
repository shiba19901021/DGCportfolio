import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Writes dist/sitemap.xml only while englishPublic is true (src/data/i18n-config.json).
// Lists every indexable page (Chinese and English). Pages that have an English counterpart carry hreflang alternates,
// with x-default pointing to the Chinese page. While englishPublic is false no sitemap is written.
export const SITE = 'https://shiba19901021.github.io';

async function htmlFiles(root, dir = root) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(root, file));
    else if (entry.name.endsWith('.html')) files.push(path.relative(root, file).split(path.sep).join('/'));
  }
  return files.sort();
}

export async function makeSitemap(outDir, { englishPublic }) {
  if (!englishPublic) return null;
  const base = process.env.PORTFOLIO_BASE || '/DGCportfolio';
  const url = rel => `${SITE}${base}/${rel.replace(/index\.html$/, '')}`;
  const files = await htmlFiles(outDir);
  const entries = [];
  for (const rel of files) {
    const html = await readFile(path.join(outDir, rel), 'utf8');
    if (/name="robots" content="noindex/.test(html)) continue;
    const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
    const links = alternates.map(m => `    <xhtml:link rel="alternate" hreflang="${m[1]}" href="${m[2]}"/>`).join('\n');
    entries.push(`  <url>\n    <loc>${url(rel)}</loc>${links ? '\n' + links : ''}\n  </url>`);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
  await writeFile(path.join(outDir, 'sitemap.xml'), xml);
  return entries.length;
}
