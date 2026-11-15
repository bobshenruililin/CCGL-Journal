# Composites one section. usage (from the repo root): python3 video/tools/compose.py video/sections/<id> video/out/<id>.mp4
# Run video/tools/section.mjs for the same section first.
import json, subprocess, sys, math
src, out = sys.argv[1].rstrip('/'), sys.argv[2]
d = 'video/work/' + src.split('/')[-1]
cfg = json.load(open(f'{src}/config.json')); subs = json.load(open(f'{d}/layers.json'))['subs']
dur = cfg['duration']; adds = cfg.get('addLessons', []); big = cfg.get('big', [])
inp = ['-i', cfg['base']]; n = 1
def still(path):
    global n; inp.extend(['-loop', '1', '-t', str(dur), '-i', path]); n += 1; return n - 1
f = ["[0:v]split=2[b0][b1]",
     "[b0]scale=2200:-2,crop=1920:1080,boxblur=40:5,eq=brightness=-0.42:saturation=0.7:contrast=0.8[bg]",
     "[b1]crop=1600:1060:180:10,scale=1340:888[book]", "[bg][book]overlay=560:24[v]"]
last = 'v'; k = 0
def lay(src, x, y, enable=None):
    global last, k
    f.append(f"[{last}][{src}]overlay={x}:{y}" + (f":enable='{enable}'" if enable else '') + f"[o{k}]"); last = f'o{k}'; k += 1
for i, g in enumerate(big):
    s = still(f'{d}/big-{i}.png'); t0, t1 = g['t0'], g.get('t1', dur + 1)
    fx = f"[{s}:v]format=rgba,fade=t=in:st={t0}:d=0.45:alpha=1" + (f",fade=t=out:st={t1 - 0.45}:d=0.45:alpha=1" if t1 < dur else '') + f"[bg{i}]"
    f.append(fx); lay(f'bg{i}', 560, 24, f'between(t,{t0},{t1})')
s = still(f'{d}/panel-0.png'); lay(f'{s}:v', 0, 0)
for i, a in enumerate(adds):
    s = still(f'{d}/panel-{i + 1}.png'); f.append(f"[{s}:v]format=rgba,fade=t=in:st={a['t']}:d=0.7:alpha=1[pn{i}]"); lay(f'pn{i}', 0, 0, f"gte(t,{a['t']})")
# The speaker sways a little all the time and gives a small shake when a lesson lands.
pops = [g['t0'] for g in big] + [a['t'] for a in adds]
ang = "0.024*sin(2*PI*t/3.4)+0.011*sin(2*PI*t/1.27)" + ''.join(f"+0.085*sin(21*(t-{T}))*exp(-3.6*(t-{T}))*gte(t,{T})" for T in pops)
s = still(f'{d}/figure.png')
f.append(f"[{s}:v]format=rgba,rotate=a='{ang}':c=none:ow=iw:oh=ih[fig]")
f.append(f"[{last}][fig]overlay=x=-40:y='540-6*abs(sin(2*PI*t/1.9))'[o{k}]"); last = f'o{k}'; k += 1
for i, (a, z, _) in enumerate(subs):
    s = still(f'{d}/sub-{i:02d}.png'); lay(f'{s}:v', 550, 918, f'between(t,{a:.2f},{z:.2f})')
inp += ['-i', cfg['audio']]
f.append(f"[{n}:a]highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=9,apad[a]")
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inp, '-filter_complex', ';'.join(f), '-map', f'[{last}]', '-map', '[a]', '-t', str(dur), '-r', '30',
  '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], check=True)
