import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 只讀取 dist，不能存取來源、內部筆記或任意本機檔案。
const root = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const port = Number(process.env.PORT || 4321);
const base = (process.env.PORTFOLIO_BASE || '/DGCportfolio').replace(/\/$/, '');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.pdf': 'application/pdf' };
const server = http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method || '')) { res.writeHead(405); return res.end(); }
    const requestUrl = new URL(req.url || '/', 'http://localhost');
    let requested = decodeURIComponent(requestUrl.pathname);
    if (requested.includes('\\') || requested.includes('\0') || requested.split('/').some(s => s.startsWith('.'))) { res.writeHead(403); return res.end(); }
    if (base && requested === base) { res.writeHead(302, { Location: base + '/' + requestUrl.search }); return res.end(); }
    if (base && !requested.startsWith(base + '/')) { res.writeHead(302, { Location: base + requested + requestUrl.search }); return res.end(); }
    if (base) requested = requested.slice(base.length);
    let file = path.resolve(root, '.' + requested);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('找不到這個頁面，請回到首頁。'); }
});
server.on('error', error => { console.error(`無法啟動預覽：${error.message}。可關閉其他預覽，或設定 PORT 使用另一個連接埠。`); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`本機預覽：http://127.0.0.1:${port}${base}/\n只供本機存取。按 Ctrl+C 結束。`));
