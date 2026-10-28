import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { verifyRelease } from './verify-release.mjs';
import { makeSitemap } from './make-sitemap.mjs';

const args = process.argv.slice(2);
const result = spawnSync(process.execPath, ['scripts/astro.mjs', 'build', ...args], {
  stdio: 'inherit', env: { ...process.env, PORTFOLIO_PUBLIC_ONLY: '1' },
});
if (result.status !== 0) process.exit(result.status ?? 1);
const outputIndex = args.indexOf('--outDir');
const outDir = resolve(outputIndex >= 0 ? args[outputIndex + 1] : 'dist');
const { englishPublic } = JSON.parse(await readFile('src/data/i18n-config.json', 'utf8'));
await makeSitemap(outDir, { englishPublic });
await verifyRelease(outDir);
