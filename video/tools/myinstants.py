# Search Myinstants and download a sound for a cue.
#   python3 video/tools/myinstants.py search "page turn"            lists sound files found for a query
#   python3 video/tools/myinstants.py get <sound-path-or-url> <name> saves video/media/sfx/<name>.mp3
# Myinstants sounds are user uploads without a stated licence: fine for a class video, but note them in video/sfx/credits.md.
import re, sys, urllib.parse, urllib.request
BASE = 'https://www.myinstants.com'
def fetch(url): return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'video-sfx'}), timeout=30).read()
if sys.argv[1] == 'search':
    for q in sys.argv[2:]:
        html = fetch(f'{BASE}/en/search/?name={urllib.parse.quote(q)}').decode('utf-8', 'ignore')
        names = re.findall(r'class="instant-link[^"]*"[^>]*>([^<]+)<', html)
        files = re.findall(r"/media/sounds/[^'\"]+\.mp3", html)
        seen = []
        for f in files:
            if f not in seen: seen.append(f)
        print(f'\n== {q}')
        for i, f in enumerate(seen[:12]): print(f'  {f}   {names[i] if i < len(names) else ""}')
elif sys.argv[1] == 'get':
    src, name = sys.argv[2], sys.argv[3]
    url = src if src.startswith('http') else BASE + src
    data = fetch(url); path = f'video/media/sfx/{name}.mp3'
    open(path, 'wb').write(data); print('saved', path, len(data), 'bytes from', url)
    open('video/sfx/credits.md', 'a').write(f'| {name}.mp3 | {url} | Myinstants upload, licence not stated |\n')
