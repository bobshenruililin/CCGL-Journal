# Search Openverse for sound effects. Works without an account.
# usage: python3 video/tools/sfx_search.py "page turn" [more queries...]   (add --by to include CC BY as well as CC0)
# Download from the printed page, rename to the cue's file name, put it in video/media/sfx/, and record it in video/sfx/credits.md.
import json, sys, urllib.parse, urllib.request
licence = 'cc0,by' if '--by' in sys.argv else 'cc0'
for q in [a for a in sys.argv[1:] if not a.startswith('--')]:
    url = 'https://api.openverse.org/v1/audio/?' + urllib.parse.urlencode({'q': q, 'page_size': 8, 'license': licence})
    data = json.load(urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'video-sfx-search'}), timeout=30))
    print(f'\n== {q} ({data["result_count"]} results)')
    for r in data['results']:
        d = (r.get('duration') or 0) / 1000
        print(f'  {r["license"].upper():4} {d:6.1f}s  {r["title"][:44]:44}  {r["foreign_landing_url"]}')
