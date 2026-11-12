#!/usr/bin/env python3
"""Generate or edit images for Six Flights through the OpenAI Images API.

The API key is never read here. In the cloud session a network proxy injects it for
api.openai.com; elsewhere, export OPENAI_API_KEY and it is passed to curl through the
environment (never written to disk or logged).

  tools/gen_image.py NAME --prompt-file art-source/prompts/NAME.txt --size 2400x1600 [--n 2]
      [--model gpt-image-2.6-flare] [--quality high] [--ref a.png --ref b.png] [--transparent]

Outputs art-source/candidates/NAME-<k>.png and appends a line to art-source/provenance.jsonl.
"""
import argparse, base64, datetime, json, os, pathlib, subprocess, sys, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'art-source' / 'candidates'

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('name'); ap.add_argument('--prompt-file', required=True)
    ap.add_argument('--size', default='1536x1024'); ap.add_argument('--n', type=int, default=1)
    ap.add_argument('--model', default='gpt-image-2.6-flare'); ap.add_argument('--quality', default='high')
    ap.add_argument('--ref', action='append', default=[]); ap.add_argument('--transparent', action='store_true')
    ap.add_argument('--tag', default='')
    a = ap.parse_args()
    prompt = pathlib.Path(a.prompt_file).read_text().strip()
    OUT.mkdir(parents=True, exist_ok=True)
    auth = ['-H', 'Authorization: Bearer ' + os.environ['OPENAI_API_KEY']] if os.environ.get('OPENAI_API_KEY') else []
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f: resp_path = f.name
    if a.ref:
        cmd = ['curl', '-sS', '--max-time', '300', 'https://api.openai.com/v1/images/edits', *auth,
               '-F', 'model=' + a.model, '-F', 'prompt=' + prompt, '-F', 'size=' + a.size, '-F', 'n=' + str(a.n), '-F', 'quality=' + a.quality]
        for r in a.ref: cmd += ['-F', 'image[]=@' + r]
        if a.transparent: cmd += ['-F', 'background=transparent']
    else:
        body = {'model': a.model, 'prompt': prompt, 'size': a.size, 'n': a.n, 'quality': a.quality, 'output_format': 'png'}
        if a.transparent: body['background'] = 'transparent'
        cmd = ['curl', '-sS', '--max-time', '300', 'https://api.openai.com/v1/images/generations', *auth,
               '-H', 'Content-Type: application/json', '-d', json.dumps(body)]
    subprocess.run(cmd + ['-o', resp_path], check=True)
    data = json.load(open(resp_path)); os.unlink(resp_path)
    if 'data' not in data:
        print(json.dumps(data.get('error', data))[:600], file=sys.stderr); sys.exit(1)
    stamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    files = []
    for k, item in enumerate(data['data']):
        p = OUT / f"{a.name}{'-' + a.tag if a.tag else ''}-{stamp}-{k}.png"
        p.write_bytes(base64.b64decode(item['b64_json'])); files.append(str(p.relative_to(ROOT)))
    with open(ROOT / 'art-source' / 'provenance.jsonl', 'a') as log:
        log.write(json.dumps({'when': stamp, 'asset': a.name, 'model': a.model, 'size': a.size, 'quality': a.quality, 'n': a.n,
                              'refs': a.ref, 'transparent': a.transparent, 'prompt_file': a.prompt_file, 'prompt': prompt,
                              'files': files, 'usage': data.get('usage')}, ensure_ascii=False) + '\n')
    print('\n'.join(files)); print('usage', data.get('usage'))

if __name__ == '__main__': main()
