import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../preview-media/', import.meta.url));
async function entries() {
  const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
  return manifest.map(entry => {
    const source = path.resolve(root, entry.file);
    if (!source.startsWith(root) || !/^\/_preview\/[a-z0-9/-]+\.(png|jpg|webp)$/.test(entry.url)) throw new Error('預覽素材路徑錯誤');
    return { ...entry, source };
  });
}
export default function previewMedia() {
  return {
    name: 'local-preview-media',
    hooks: {
      'astro:config:setup': ({ command, updateConfig }) => {
        if (command !== 'dev' || process.env.PORTFOLIO_PUBLIC_ONLY === '1') return;
        updateConfig({ vite: { plugins: [{
          name: 'local-preview-media-dev',
          configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
              let requested = new URL(req.url || '/', 'http://localhost').pathname;
              const base = server.config.base.replace(/\/$/, '');
              if (base && requested.startsWith(base + '/')) requested = requested.slice(base.length);
              if (!requested.startsWith('/_preview/')) return next();
              try {
                const item = (await entries()).find(entry => entry.url === requested);
                if (!item) { res.statusCode = 404; return res.end(); }
                res.setHeader('Content-Type', item.url.endsWith('.png') ? 'image/png' : item.url.endsWith('.jpg') ? 'image/jpeg' : 'image/webp');
                res.setHeader('X-Robots-Tag', 'noindex, nofollow');
                res.end(await readFile(item.source));
              } catch { res.statusCode = 404; res.end(); }
            });
          },
        }] } });
      },
    },
  };
}
