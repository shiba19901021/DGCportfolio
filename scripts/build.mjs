import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { verifyRelease } from './verify-release.mjs';

const args = process.argv.slice(2);
const result = spawnSync(process.execPath, ['scripts/astro.mjs', 'build', ...args], {
  stdio: 'inherit', env: { ...process.env, PORTFOLIO_PUBLIC_ONLY: '1' },
});
if (result.status !== 0) process.exit(result.status ?? 1);
const outputIndex = args.indexOf('--outDir');
await verifyRelease(resolve(outputIndex >= 0 ? args[outputIndex + 1] : 'dist'));
