import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

// Checks every English page against its Chinese page in the built site.
// Errors (block deploy): structure differs, English missing, Chinese text left in English, clearly different numbers.
// Warnings (printed only): uncertain number conversions (萬, million, Chinese numerals) and hedge words (約, 餘, 口頭...).
// Exceptions are reviewed and kept in scripts/i18n-exceptions.json.
const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const ZH_DIGITS = { 一: 1, 二: 2, 兩: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
const EN_WORDS = ['zero', 'one|first|once|an?', 'two|second|twice', 'three|third', 'four|fourth', 'five|fifth', 'six|sixth', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const HEDGES = [
  { zh: /(?<!邀)約|近|概估|概略/, en: /about|approximate|roughly|estimat|nearly|almost|around/i, name: '約／概估' },
  { zh: /餘|以上|逾|超過/, en: /more than|at least|over|or more|a little more|\+/i, name: '餘／以上／逾' },
  { zh: /待確認/, en: /to be confirmed|pending|\bTBC\b/i, name: '待確認' },
  { zh: /口頭/, en: /verbal|oral|spoken/i, name: '口頭' },
];
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const CJK = /[㐀-鿿＀-￯　-〿]/;

async function htmlFiles(root, dir = root) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(root, file));
    else if (entry.name.endsWith('.html')) files.push(path.relative(root, file).split(path.sep).join('/'));
  }
  return files;
}

function parts(html) {
  const main = /<main[\s\S]*?<\/main>/.exec(html)?.[0] ?? '';
  const clean = main.replace(/<(script|style)[\s\S]*?<\/\1>/g, '');
  const attrs = [...clean.matchAll(/\s(?:alt|aria-label)="([^"]*)"/g)].map(m => decode(m[1]));
  const texts = clean.split(/<[^>]+>/).map(t => decode(t).replace(/\s+/g, ' ').trim()).filter(Boolean);
  const meta = {
    title: decode(/<title>([\s\S]*?)<\/title>/.exec(html)?.[1] ?? ''),
    description: decode(/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? ''),
  };
  return { main, texts, attrs, meta };
}
const tags = main => Object.fromEntries(['h1', 'h2', 'h3', 'h4', 'img', 'li', 'a', 'section', 'p', 'dt', 'dd', 'article'].map(t => [t, (main.match(new RegExp(`<${t}[\\s>]`, 'g')) ?? []).length]));

function numbers(text) {
  const normalized = text.replace(/(\d{4})\.(\d{2})(?!\d)/g, '$1 $2');
  const tokens = [];
  for (const m of normalized.matchAll(/(\d+(?:,\d{3})*(?:\.\d+)?)(\s*(?:萬|億|million|billion|thousand))?/gi)) {
    const raw = m[1];
    const amount = Boolean(m[2]) || raw.includes(',');
    const value = raw.replaceAll(',', '').replace(/^0+(?=\d)/, '');
    tokens.push({ value, amount });
  }
  // English month names count as the month number: "April", "May 2026", "Jun 2018".
  const FULL = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  let rest = text;
  rest = rest.replace(/\b(January|February|March|April|June|July|August|September|October|November|December)\b/g, (m) => { tokens.push({ value: String(FULL.indexOf(m.toLowerCase()) + 1), amount: false }); return ' '; });
  rest = rest.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.?(?=\s+\d{4})/g, (m, a) => { tokens.push({ value: String(MONTHS[a.slice(0, 3).toLowerCase()]), amount: false }); return ' '; });
  return tokens;
}

export async function verifyI18n(outDir, { englishPublic = false } = {}) {
  const exceptions = JSON.parse(await readFile(path.join(process.cwd(), 'scripts/i18n-exceptions.json'), 'utf8'));
  const base = process.env.PORTFOLIO_BASE || '/DGCportfolio';
  const files = await htmlFiles(outDir);
  const englishFiles = files.filter(file => file.startsWith('en/'));
  const errors = [];
  const warnings = [];
  const chineseLinks = new Map();
  for (const file of englishFiles) {
    const zhFile = file.slice(3);
    if (!files.includes(zhFile)) { errors.push(`${file}：沒有對應的中文頁 ${zhFile}`); continue; }
    const [en, zh] = await Promise.all([readFile(path.join(outDir, file), 'utf8'), readFile(path.join(outDir, zhFile), 'utf8')]);
    const E = parts(en);
    const Z = parts(zh);
    if (!/<html lang="en"/.test(en)) errors.push(`${file}：<html lang> 不是 en`);
    if (!englishPublic && !/name="robots" content="noindex/.test(en)) errors.push(`${file}：英文版尚未公開，應為 noindex`);
    if (englishPublic && /name="robots" content="noindex/.test(en)) errors.push(`${file}：英文版已公開，不應有 noindex`);
    const te = tags(E.main); const tz = tags(Z.main);
    for (const tag of Object.keys(te)) if (te[tag] !== tz[tag]) errors.push(`${file}：<${tag}> 數量與中文不同（中文 ${tz[tag]}／英文 ${te[tag]}）`);
    if (E.texts.length !== Z.texts.length) errors.push(`${file}：文字區塊數量與中文不同（中文 ${Z.texts.length}／英文 ${E.texts.length}）`);
    if (E.attrs.length !== Z.attrs.length) errors.push(`${file}：圖片說明／aria-label 數量與中文不同（中文 ${Z.attrs.length}／英文 ${E.attrs.length}）`);
    if (!E.meta.title || !E.meta.description) errors.push(`${file}：缺少英文 title 或 description`);
    for (const [key, value] of Object.entries(E.meta)) {
      let rest = value;
      for (const allowed of exceptions.allowCjk) rest = rest.replaceAll(allowed, '');
      if (/[\u3400-\u9fff]/.test(rest)) errors.push(`${file}：英文頁 ${key} 仍有中文`);
    }
    const pairs = [];
    if (E.texts.length === Z.texts.length) E.texts.forEach((t, i) => pairs.push([Z.texts[i], t, `文字 #${i + 1}`]));
    if (E.attrs.length === Z.attrs.length) E.attrs.forEach((t, i) => pairs.push([Z.attrs[i], t, `說明 #${i + 1}`]));
    for (const [zhText, enText, where] of pairs) {
      const label = `${file} ${where}「${enText.slice(0, 40)}」`;
      let rest = enText;
      for (const allowed of exceptions.allowCjk) rest = rest.replaceAll(allowed, '');
      if (/[\u3400-\u9fff]/.test(rest)) errors.push(`${label}：英文頁仍有未翻譯的中文`);
      if (CJK.test(zhText) && !/[A-Za-z0-9]/.test(enText) && !/^[|,，／｜–—↗↓→]+$/.test(enText.trim())) errors.push(`${label}：中文有內容，英文沒有對應文字`);
      const zn = numbers(zhText); const en = numbers(enText);
      const ignored = new Set(exceptions.numbers.filter(x => x.page === file).map(x => x.token));
      const left = en.filter(x => !x.amount && !ignored.has(x.value));
      for (const token of zn.filter(x => !x.amount && !ignored.has(x.value))) {
        const at = left.findIndex(x => x.value === token.value);
        if (at >= 0) left.splice(at, 1);
        else errors.push(`${label}：中文有數字 ${token.value}，英文沒有`);
      }
      for (const token of left) errors.push(`${label}：英文有數字 ${token.value}，中文沒有`);
      if (zn.some(x => x.amount) !== en.some(x => x.amount)) warnings.push(`${label}：金額寫法不同（萬／million／千分位），請人工確認`);
      for (const m of zhText.matchAll(/([二兩三四五六七八九]|十[一二]?)(?=[套天人位場份次個小時年月階])|(一)(?=[套天人位場次小時年月階])/g)) {
        const digit = m[1] ?? m[2];
        const value = ZH_DIGITS[digit] ?? (digit === '十' ? 10 : 10 + (ZH_DIGITS[digit[1]] ?? 0));
        if (!new RegExp(`\\b(${value}|${EN_WORDS[value] ?? value})\\b`, 'i').test(enText)) warnings.push(`${label}：中文「${m[0]}」，英文找不到 ${value} 或 ${EN_WORDS[value]}`);
      }
      for (const hedge of HEDGES) if (hedge.zh.test(zhText) && !hedge.en.test(enText)) warnings.push(`${label}：中文有「${hedge.name}」語氣，英文沒有對應用語`);
    }
    for (const m of en.matchAll(/\bhref="([^"]+)"/g)) {
      const ref = decode(m[1]);
      if (!ref.startsWith(base + '/') || ref.startsWith(base + '/en/') || /\.(pdf|css|js|png|jpe?g|webp|svg|woff2?)$/i.test(ref)) continue;
      if (!chineseLinks.has(file)) chineseLinks.set(file, new Set());
      chineseLinks.get(file).add(ref);
    }
  }
  // Launch switch (englishPublic): hreflang, canonical, EN button and sitemap must all follow the same flag.
  const hreflangOf = html => Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m => [m[1], decode(m[2])]));
  let sitemap = null;
  try { sitemap = await readFile(path.join(outDir, 'sitemap.xml'), 'utf8'); } catch { /* none */ }
  for (const file of files) {
    const html = await readFile(path.join(outDir, file), 'utf8');
    const hl = hreflangOf(html);
    const isEn = file.startsWith('en/');
    const hasSwitch = /class="lang-switch"/.test(html);
    if (!englishPublic) {
      if (Object.keys(hl).length || /<link rel="canonical"/.test(html)) errors.push(`${file}：英文版尚未公開，不應有 hreflang 或 canonical`);
      if (!isEn && hasSwitch) errors.push(`${file}：英文版尚未公開，中文頁不應顯示 EN 按鈕`);
      continue;
    }
    const counterpart = isEn ? file.slice(3) : `en/${file}`;
    const paired = files.includes(isEn ? file.slice(3) : `en/${file}`) && (isEn || englishFiles.includes(`en/${file}`));
    if (!paired) {
      if (Object.keys(hl).length || hasSwitch) errors.push(`${file}：沒有對應英文頁，不應有 hreflang 或語言切換`);
      continue;
    }
    for (const key of ['zh-Hant-TW', 'en', 'x-default']) if (!hl[key]) errors.push(`${file}：缺少 hreflang ${key}`);
    if (hl['x-default'] && hl['x-default'] !== hl['zh-Hant-TW']) errors.push(`${file}：x-default 應指向中文頁`);
    const zhUrl = hl['zh-Hant-TW']; const enUrl = hl.en;
    if (zhUrl && enUrl && (!enUrl.includes('/en/') || enUrl.replace('/en/', '/') !== zhUrl)) errors.push(`${file}：hreflang 中英文網址不成對（${zhUrl}／${enUrl}）`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== (isEn ? enUrl : zhUrl)) errors.push(`${file}：canonical 應指向自己`);
    const other = hreflangOf(await readFile(path.join(outDir, counterpart), 'utf8'));
    if (JSON.stringify(other) !== JSON.stringify(hl)) errors.push(`${file}：與 ${counterpart} 的 hreflang 不一致`);
    if (!hasSwitch) errors.push(`${file}：英文版已公開，應顯示語言切換`);
  }
  if (!englishPublic && sitemap) errors.push('英文版尚未公開，不應產生 sitemap.xml');
  if (englishPublic) {
    if (!sitemap) errors.push('英文版已公開，缺少 sitemap.xml');
    else for (const file of englishFiles) {
      const loc = `${file.replace(/index\.html$/, '')}`;
      if (!sitemap.includes(`${base}/${loc}</loc>`)) errors.push(`sitemap.xml 缺少 ${file}`);
    }
  }
  if (errors.length) throw new Error(`中英文對照檢查失敗（${errors.length} 項）：\n- ${errors.join('\n- ')}`);
  for (const warning of warnings) console.warn(`i18n 提醒：${warning}`);
  console.log(`中英文對照檢查通過：${englishFiles.length} 頁；${warnings.length} 項提醒（不擋部署）。`);
  for (const [file, refs] of chineseLinks) console.log(`  ${file} 仍連到中文頁：${[...refs].join('、')}`);
}
