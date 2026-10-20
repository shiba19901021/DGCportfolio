import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { verifyResume } from './verify-resume.mjs';

async function filesIn(root) {
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const file = path.join(root, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`公開資料不可使用符號連結：${file}`);
    if (entry.isDirectory()) files.push(...await filesIn(file));
    else files.push(file);
  }
  return files;
}
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');

export async function verifyRelease(outDir) {
  const root = process.cwd();
  await verifyResume(root);
  const base = process.env.PORTFOLIO_BASE || '/DGCportfolio';
  const assets = JSON.parse(await readFile(path.join(root, 'scripts/public-assets.json'), 'utf8'));
  const approved = new Map(assets.map(asset => [asset.path, asset.sha256]));
  if (approved.size !== assets.length) throw new Error('公開素材清單有重複路徑');
  const publicRoot = path.join(root, 'public');
  const publicFiles = await filesIn(publicRoot);
  if (publicFiles.length !== approved.size) throw new Error('public 有未核准或遺失的素材');
  for (const file of publicFiles) {
    const rel = path.relative(publicRoot, file).split(path.sep).join('/');
    if (!approved.has(rel) || digest(await readFile(file)) !== approved.get(rel)) throw new Error(`公開素材需先確認並更新清單：${rel}`);
    if (digest(await readFile(path.join(outDir, rel))) !== approved.get(rel)) throw new Error(`建置圖片與核准副本不同：${rel}`);
  }
  const outputFiles = await filesIn(outDir);
  const pages = new Map();
  for (const file of outputFiles) {
    const rel = path.relative(outDir, file).split(path.sep).join('/');
    if (/(?:^|\/)(?:_preview|preview-media|private-source|node_modules|原始資料|私人備份)(?:\/|$)|(?:\.zip|\.7z|\.rar|\.map|\.env|\.pem|\.key)$/i.test(rel)) throw new Error(`建置含私人或非必要檔案：${rel}`);
    if (/\.(?:html|css|js)$/.test(rel)) {
      const text = await readFile(file, 'utf8');
      if (/\/_preview\/|preview-media\/|C:\\Users\\|本機閱讀測試版/.test(text)) throw new Error(`正式輸出仍含預覽路徑或本機標記：${rel}`);
      if (rel.endsWith('.html')) pages.set(file, text);
    }
  }
  let expectedWorks = 0;
  for (const file of await filesIn(path.join(root, 'src/content/works'))) {
    if (!file.endsWith('.md')) continue;
    const text = await readFile(file, 'utf8');
    if (!/^visibility: public\r?$/m.test(text) || !/^detail: true\r?$/m.test(text)) continue;
    expectedWorks++;
    const id = path.basename(file, '.md');
    const target = path.join(outDir, 'works', id, 'index.html');
    if (!pages.has(target)) throw new Error(`已公開作品沒有詳細頁：${id}`);
  }
  let checked = 0;
  for (const [file, html] of pages) {
    const rel = path.relative(outDir, file).split(path.sep).join('/');
    const origin = new URL(`${base}/${rel.replace(/index\.html$/, '')}`, 'https://release.invalid');
    if (/name="robots" content="noindex/.test(html)) throw new Error(`正式頁仍有 noindex：${rel}`);
    for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
      const ref = decode(match[1]);
      const url = new URL(ref, origin);
      if (url.origin !== origin.origin) continue;
      if (!url.pathname.startsWith(base + '/')) throw new Error(`連結缺少子路徑：${rel} -> ${ref}`);
      const relative = decodeURIComponent(url.pathname.slice(base.length + 1));
      const targetPath = path.resolve(outDir, relative);
      if (!targetPath.startsWith(path.resolve(outDir) + path.sep) && targetPath !== path.resolve(outDir)) throw new Error('連結超出輸出目錄');
      let target;
      try { target = (await stat(targetPath)).isDirectory() ? path.join(targetPath, 'index.html') : targetPath; await stat(target); }
      catch { throw new Error(`連結或圖片缺檔：${rel} -> ${ref}`); }
      if (url.hash && pages.has(target)) {
        const id = decodeURIComponent(url.hash.slice(1));
        const ids = Array.from(pages.get(target).matchAll(/\bid="([^"]+)"/g), m => decode(m[1]));
        if (!ids.includes(id)) throw new Error(`頁面錨點不存在：${rel} -> ${ref}`);
      }
      checked++;
    }
  }
  console.log(`正式發布檢查通過：${pages.size} 頁、${expectedWorks} 篇作品、${approved.size} 個核准素材、${checked} 個本地引用；無私人預覽輸出。`);
}
