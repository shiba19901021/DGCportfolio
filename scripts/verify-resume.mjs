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
  for (const profile of ['resume', 'teaching', 'resume-en', 'teaching-en']) await verifyDocument(root, profile);
}
async function verifyDocument(root, profile) {
  const kind = profile.startsWith('teaching') ? 'teaching' : 'resume';
  const english = profile.endsWith('-en');
  // Mirrors INPUTS in scripts/build-resume-pdf.py.
  let inputs = resumeInputs;
  if (kind === 'teaching') inputs = [...resumeInputs.map(file => file
    .replace('src/data/resume.json', english ? 'src/data/teaching.en.json' : 'src/data/teaching.json')
    .replace('src/pages/resume/', 'src/pages/teaching/')
    .replace('fonts/resume-', 'fonts/teaching-')), 'src/styles/teaching.css'];
  else if (english) inputs = resumeInputs.map(file => file === 'src/data/resume.json' ? 'src/data/resume.en.json' : file);
  if (english) inputs = [...inputs.map(file => file.replace('src/pages/', 'src/pages/en/').replace(`fonts/${kind}-`, `fonts/${profile}-`)),
    `src/styles/${profile}.css`, 'src/styles/en-print.css'];
  const manifest = JSON.parse(await readFile(path.join(root, `scripts/${profile}-pdf-manifest.json`), 'utf8'));
  if (JSON.stringify(Object.keys(manifest.inputs).sort()) !== JSON.stringify([...inputs].sort())) throw new Error(`${profile} PDF 的來源清單不完整`);
  for (const file of inputs) {
    if (sha256(await readFile(path.join(root, file))) !== manifest.inputs[file]) throw new Error(`履歷已修改但 PDF 尚未更新：${file}。請執行 python scripts/build-resume-pdf.py --profile ${profile}`);
  }
  if (sha256(await readFile(path.join(root, `public/${profile}.pdf`))) !== manifest.pdf) throw new Error('履歷 PDF 與產生紀錄不一致');
  if (manifest.pages !== 1 || manifest.format !== 'A4 portrait') throw new Error('履歷 PDF 必須為 A4 直式單頁');
  console.log(`${profile} 履歷一致性檢查通過：單一內容來源、PDF 及排版來源雜湊一致。`);
}
