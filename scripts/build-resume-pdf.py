"""Regenerate the committed resume from Astro's HTML; not required by Pages CI.

Optional authoring tools: python -m pip install weasyprint==70.0 pypdf fonttools brotli
Run from the repository root: python scripts/build-resume-pdf.py
After changing text, use --refresh-fonts to refresh the self-hosted glyph subsets.
"""
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.parse import unquote, urlparse
import argparse
import hashlib
import json
import mimetypes
import os
import re
import subprocess
import urllib.request

from lxml import html as lhtml
from pypdf import PdfReader
from weasyprint import HTML
from weasyprint.urls import URLFetcherResponse

ROOT = Path(__file__).resolve().parent.parent
INPUTS = [
    'src/data/resume.json', 'src/components/ResumeDocument.astro',
    'src/pages/resume/index.astro', 'src/styles/resume.css',
    'src/layouts/Base.astro', 'src/styles/global.css', 'src/styles/site-chrome.css',
    'public/fonts/resume-noto-sans-tc.woff2', 'public/fonts/resume-noto-sans-tc-bold.woff2',
]
FONT_URL = 'https://raw.githubusercontent.com/google/fonts/main/ofl/notosanstc/'
BASE = (os.environ.get('PORTFOLIO_BASE') or '/DGCportfolio').rstrip('/')
DATA = json.loads((ROOT / 'src/data/resume.json').read_text())


def strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, list):
        for item in value:
            yield from strings(item)
    elif isinstance(value, dict):
        for key, item in value.items():
            if key not in ('href', 'portfolio'):
                yield from strings(item)


def digest(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()


def refresh_fonts():
    from fontTools.ttLib import TTFont
    from fontTools.varLib.instancer import instantiateVariableFont
    from fontTools import subset
    with TemporaryDirectory(prefix='dgc-resume-fonts-') as tmp:
        source = Path(tmp) / 'source.ttf'
        with urllib.request.urlopen(FONT_URL + 'NotoSansTC%5Bwght%5D.ttf', timeout=60) as response:
            source.write_bytes(response.read())
        text = ''.join(strings(DATA)) + ''.join(chr(n) for n in range(32, 127)) + '完整作品集：下載履歷與合作↗↓'
        target = ROOT / 'public/fonts'
        target.mkdir(exist_ok=True)
        for weight, suffix in [(400, ''), (700, '-bold')]:
            font = instantiateVariableFont(TTFont(source), {'wght': weight}, inplace=True)
            options = subset.Options()
            options.flavor = 'woff2'
            options.recalc_timestamp = False
            sub = subset.Subsetter(options=options)
            sub.populate(text=text)
            sub.subset(font)
            font.flavor = 'woff2'
            font.save(target / f'resume-noto-sans-tc{suffix}.woff2')
        with urllib.request.urlopen(FONT_URL + 'OFL.txt', timeout=30) as response:
            (target / 'OFL-resume-noto-sans-tc.txt').write_bytes(response.read())


def check_font_coverage():
    from fontTools.ttLib import TTFont
    required = {ord(ch) for ch in ''.join(strings(DATA)) if not ch.isspace()}
    for suffix in ('', '-bold'):
        font = TTFont(ROOT / f'public/fonts/resume-noto-sans-tc{suffix}.woff2')
        missing = required - set(font.getBestCmap())
        if missing:
            raise ValueError('履歷字型缺字，請加上 --refresh-fonts 重新產生：' + ''.join(map(chr, sorted(missing))))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--refresh-fonts', action='store_true')
    args = parser.parse_args()
    if args.refresh_fonts:
        refresh_fonts()
    check_font_coverage()
    with TemporaryDirectory(prefix='dgc-resume-build-') as tmp:
        output = Path(tmp)
        subprocess.run(['node', 'scripts/astro.mjs', 'build', '--outDir', str(output)],
                       cwd=ROOT, check=True, env={**os.environ, 'PORTFOLIO_PUBLIC_ONLY': '1'})
        page = lhtml.fromstring((output / 'resume/index.html').read_text())
        # The PDF has no remote resource dependency; omit Base's Google Fonts request.
        for link in page.xpath('//link[starts-with(@href,"https://fonts.")]'):
            link.getparent().remove(link)

        def fetch_local(url, **kwargs):
            parsed = urlparse(url)
            if parsed.netloc != 'shiba19901021.github.io' or not parsed.path.startswith(BASE + '/'):
                raise ValueError('PDF 不允許載入外部資源：' + url)
            file = (output / unquote(parsed.path[len(BASE) + 1:])).resolve()
            if not file.is_relative_to(output.resolve()):
                raise ValueError('資源路徑超出建置目錄')
            return URLFetcherResponse(url, body=file.read_bytes(),
                                      headers={'Content-Type': mimetypes.guess_type(file)[0] or 'application/octet-stream'})

        fetch_local._fail_on_errors = True
        document = HTML(string=lhtml.tostring(page, encoding='unicode'),
                        base_url=f'https://shiba19901021.github.io{BASE}/resume/', url_fetcher=fetch_local)
        pdf = output / 'resume-generated.pdf'
        rendered = document.render()
        rendered.write_pdf(pdf, pdf_identifier=b'DGC-public-resume')
        reader = PdfReader(pdf)
        if len(reader.pages) != 1:
            raise ValueError(f'履歷超出單頁（{len(reader.pages)} 頁），未取代正式 PDF')
        box = reader.pages[0].mediabox
        if abs(float(box.width) - 595.276) > 1 or abs(float(box.height) - 841.89) > 1:
            raise ValueError('PDF 不是 A4 直式')
        normalize = lambda text: re.sub(r'\s+', '', text)
        extracted = normalize(reader.pages[0].extract_text())
        for text in strings(DATA):
            if normalize(text) not in extracted:
                raise ValueError('PDF 文字缺漏：' + text)
        expected = {item['href'] for item in DATA['contacts'] + DATA['cases']}
        actual = {str(a.get_object().get('/A', {}).get('/URI', '')) for a in reader.pages[0].get('/Annots', [])}
        if not expected.issubset(actual):
            raise ValueError('PDF 連結缺漏：' + repr(expected - actual) + '；實際連結：' + repr(actual))
        (ROOT / 'public/resume.pdf').write_bytes(pdf.read_bytes())

    manifest = {'format': 'A4 portrait', 'pages': 1,
                'inputs': {file: digest(ROOT / file) for file in INPUTS},
                'pdf': digest(ROOT / 'public/resume.pdf')}
    (ROOT / 'scripts/resume-pdf-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    assets_file = ROOT / 'scripts/public-assets.json'
    assets = json.loads(assets_file.read_text())
    new_files = ['resume.pdf', 'fonts/resume-noto-sans-tc.woff2',
                 'fonts/resume-noto-sans-tc-bold.woff2', 'fonts/OFL-resume-noto-sans-tc.txt']
    assets = [item for item in assets if item['path'] not in new_files]
    assets += [{'path': file, 'sha256': digest(ROOT / 'public' / file)} for file in new_files]
    assets.sort(key=lambda item: item['path'])
    assets_file.write_text(json.dumps(assets, ensure_ascii=False, indent=2) + '\n')
    print('履歷 PDF 已更新：A4 直式單頁、完整可選取文字、7 個不同連結；素材清單與來源雜湊已同步。')


if __name__ == '__main__':
    main()
