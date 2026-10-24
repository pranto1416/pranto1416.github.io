"""Download every remotely hosted image (old Google Site + YouTube thumbnails)
into assets/remote/ and rewrite the site to use the local copies.
Run once from the repo root:  python3 tools/localize_images.py
"""
import hashlib, os, re, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = ['index.html', 'archive.html', 'js/data.js', 'js/main.js']
OUT = os.path.join(ROOT, 'assets', 'remote')
os.makedirs(OUT, exist_ok=True)

pat = re.compile(r"https://(?:sites\.google\.com/sitesv-images-rt/[A-Za-z0-9_\-]+=w\d+|i\.ytimg\.com/vi/[A-Za-z0-9_\-]+/hqdefault\.jpg)")
urls = set()
texts = {}
for f in FILES:
    p = os.path.join(ROOT, f)
    texts[f] = open(p, encoding='utf-8').read()
    urls.update(pat.findall(texts[f]))
# data.js builds Google Site photo URLs from a base + key; expand those too
data = texts['js/data.js']
base = 'https://sites.google.com/sitesv-images-rt/'
for key in re.findall(r"'(AMxu72[A-Za-z0-9_\-]+)'", data):
    for size in ('w800', 'w1920'):
        urls.add(f'{base}{key}={size}')

# YouTube thumbnails built at runtime from video IDs
for f in ('js/data.js', 'index.html'):
    for vid in re.findall(r"(?:vid: '|data-video=\")([A-Za-z0-9_\-]{11})", texts[f]):
        urls.add(f'https://i.ytimg.com/vi/{vid}/hqdefault.jpg')

mapping = {}
for u in sorted(urls):
    name = hashlib.sha1(u.encode()).hexdigest()[:16] + '.jpg'
    dest = os.path.join(OUT, name)
    if not os.path.exists(dest):
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as r, open(dest, 'wb') as fh:
                fh.write(r.read())
            print('ok  ', u[:80])
        except Exception as e:
            print('FAIL', u[:80], e); continue
    mapping[u] = 'assets/remote/' + name

for f, t in texts.items():
    for u, local in mapping.items():
        t = t.replace(u, local)
    open(os.path.join(ROOT, f), 'w', encoding='utf-8').write(t)
# URLs that main.js builds at runtime (photos, thumbnails) are swapped through this map
import json
with open(os.path.join(ROOT, 'js', 'local-images.js'), 'w', encoding='utf-8') as fh:
    fh.write('window.PV_LOCAL = ' + json.dumps(mapping, indent=1) + ';\n')
print(f'\nLocalized {len(mapping)} images into assets/remote/. Commit that folder and js/local-images.js.')
