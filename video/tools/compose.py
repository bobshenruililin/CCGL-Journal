# Composites one section. usage (from the repo root): python3 video/tools/compose.py video/sections/<id> video/out/<id>.mp4
# Run video/tools/section.mjs for the same section first. Add --audio to rebuild only the sound mix (fast).
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
# ---- Sound: mixed on its own into video/work/<id>/mix.wav, then attached to the picture. ----
# `python3 video/tools/compose.py <section> <out> --audio` builds only the mix, which takes seconds; use it while placing effects.
import os
ain = ['-i', cfg['audio']]; af = []; an = 1
vchain = "[0:a]highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000,aformat=sample_rates=48000:channel_layouts=stereo,apad"
# Sound effects: config "sfx" is a list of cues. A cue whose file is missing is skipped, so a section always builds.
#   {"file": "video/media/sfx/page-turn.mp3", "t": 2.6, "gain": -14, "ss": 0, "dur": 1.5, "fade": 0.15, "loop": false}
# t = when it starts in the section (s); gain in dB; ss = where to start inside the file; dur = how long to play;
# loop = repeat to fill dur (for rain or room tone). Effects duck by about 8 dB while someone is speaking.
fx = []
for c in cfg.get('sfx', []):
    if not os.path.exists(c['file']):
        print('sfx missing, skipped:', c['file']); continue
    ain += (['-stream_loop', '-1'] if c.get('loop') else []) + ['-i', c['file']]; i = an; an += 1
    cue_len = c.get('dur'); fade = c.get('fade', 0.12); t = c['t']
    chain = f"[{i}:a]aresample=48000,aformat=sample_rates=48000:channel_layouts=stereo,atrim=start={c.get('ss', 0)}" + (f":duration={cue_len}" if cue_len else '') + ",asetpts=PTS-STARTPTS"
    chain += f",afade=t=in:d={fade}" + (f",afade=t=out:st={max(0, cue_len - fade * 2)}:d={fade * 2}" if cue_len else '')
    chain += f",volume={c.get('gain', -14)}dB,adelay={int(t * 1000)}|{int(t * 1000)}[x{len(fx)}]"
    af.append(chain); fx.append(f'x{len(fx)}')
if fx:
    af.append(vchain + ",asplit=2[vo][key]")
    af.append(''.join(f'[{x}]' for x in fx) + f"amix=inputs={len(fx)}:normalize=0:dropout_transition=0,apad[fxall]")
    af.append("[fxall][key]sidechaincompress=threshold=0.03:ratio=4:attack=20:release=350[fxd]")
    af.append("[vo][fxd]amix=inputs=2:normalize=0,alimiter=limit=0.89:level=0[a]")
else:
    af.append(vchain + "[a]")
mix = f'{d}/mix.wav'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *ain, '-filter_complex', ';'.join(af), '-map', '[a]', '-t', str(dur), '-ar', '48000', '-ac', '2', mix], check=True)
print(f'mix: {len(fx)} sound effect(s) -> {mix}')
if '--audio' in sys.argv: sys.exit(0)
inp += ['-i', mix]
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inp, '-filter_complex', ';'.join(f), '-map', f'[{last}]', '-map', f'{n}:a', '-t', str(dur), '-r', '30',
  '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
