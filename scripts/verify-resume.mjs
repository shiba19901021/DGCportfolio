import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

// These are the inputs used to typeset the committed PDF, not a second copy of its text.
export const resumeInputs = [
  'src/data/resume.json', 'src/components/ResumeDocument.astro',
  'src/pages/resume/index.astro', 'src/styles/resume.css',
  'src/layouts/Base.astro', 'src/styles/global.css', 'src/styles/site-chrome.css',
  'public/fonts/resume-noto-sans-tc.woff2', 'public/fonts/resume-noto-sans-tc-bold.woff2',
];
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export async function verifyResume(root = process.cwd()) {
  const manifest = JSON.parse(await readFile(path.join(root, 'scripts/resume-pdf-manifest.json'), 'utf8'));
  if (JSON.stringify(Object.keys(manifest.inputs).sort()) !== JSON.stringify([...resumeInputs].sort())) throw new Error('履歷 PDF 的來源清單不完整');
  for (const file of resumeInputs) {
    if (sha256(await readFile(path.join(root, file))) !== manifest.inputs[file]) throw new Error(`履歷已修改但 PDF 尚未更新：${file}。請執行 python scripts/build-resume-pdf.py`);
  }
  if (sha256(await readFile(path.join(root, 'public/resume.pdf'))) !== manifest.pdf) throw new Error('履歷 PDF 與產生紀錄不一致');
  if (manifest.pages !== 1 || manifest.format !== 'A4 portrait') throw new Error('履歷 PDF 必須為 A4 直式單頁');
  console.log('履歷一致性檢查通過：單一內容來源、PDF 及排版來源雜湊一致。');
}
