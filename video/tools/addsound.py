# Lays sound effects (and optionally a voiceover) under a finished video that has no sound of its own,
# such as the opening and the closing cards. The picture is copied unchanged.
# usage (from the repo root): python3 video/tools/addsound.py <in.mp4> <cues.json> <out.mp4>
# cues.json: {"voice": "video/media/voice/bob-intro.m4a", "voice_t": 1.0,
#             "sfx": [{"file": "video/media/sfx/pop.mp3", "t": 4.1, "gain": -14, "dur": 0.6}]}
# A missing voice or sound file is skipped. Effects dip under the voice, as in compose.py.
import json, os, subprocess, sys

src, cues_path, out = sys.argv[1:4]
cues = json.load(open(cues_path))
length = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src],
                              capture_output=True, text=True).stdout)
inp, f, fx, n = ['-i', src], [], [], 1
for c in cues.get('sfx', []):
    if not os.path.exists(c['file']):
        print('sfx missing, skipped:', c['file']); continue
    inp += (['-stream_loop', '-1'] if c.get('loop') else []) + ['-i', c['file']]
    cue_len, fade, t = c.get('dur'), c.get('fade', 0.08), c['t']
    ch = f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=start={c.get('ss', 0)}" + (f":duration={cue_len}" if cue_len else '') + ",asetpts=PTS-STARTPTS"
    ch += f",afade=t=in:d={fade}" + (f",afade=t=out:st={max(0, cue_len - fade * 2)}:d={fade * 2}" if cue_len else '')
    ch += f",volume={c.get('gain', -14)}dB,adelay={int(t * 1000)}|{int(t * 1000)},apad[x{len(fx)}]"
    f.append(ch); fx.append(f'x{len(fx)}'); n += 1

voice = cues.get('voice')
if voice and not os.path.exists(voice):
    print('voice missing, skipped:', voice); voice = None
vchain = None
if voice:
    inp += ['-i', voice]; vt = int(cues.get('voice_t', 0) * 1000)
    vchain = f"[{n}:a]highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000,aformat=channel_layouts=stereo,adelay={vt}|{vt},apad"; n += 1

if fx:
    f.append(''.join(f'[{x}]' for x in fx) + f"amix=inputs={len(fx)}:normalize=0:dropout_transition=0[fxall]")
if fx and vchain:
    f.append(vchain + ",asplit=2[vo][key]")
    f.append("[fxall][key]sidechaincompress=threshold=0.03:ratio=4:attack=20:release=350[fxd]")
    f.append("[vo][fxd]amix=inputs=2:normalize=0,alimiter=limit=0.89:level=0[a]")
elif vchain:
    f.append(vchain + "[a]")
elif fx:
    f.append("[fxall]alimiter=limit=0.89:level=0[a]")
else:
    f.append("anullsrc=r=48000:cl=stereo[a]")

subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inp, '-filter_complex', ';'.join(f), '-map', '0:v', '-map', '[a]',
                '-t', str(length), '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', out], check=True)
print(f'{out}: {len(fx)} effect(s)' + (' + voice' if vchain else ''))
