# Assembles the final film: parts in order, page turns between the game sections, and a music bed that
# dips under every voice (sidechain on the film's own sound) and rises in the gaps.
# usage (from the repo root): python3 video/tools/finalize.py video/final.json
# final.json: {"out": "...mp4", "parts": [{"file": "...", "turn_after": true}, ...],
#              "bed": {"file": "...wav", "start_part": 2, "end_part": 10, "gain_db": -20}}
import json, os, subprocess, sys

cfg = json.load(open(sys.argv[1]))
TURN = '/home/user/reel/turn/turn.sh'
work = 'video/work/final'; os.makedirs(work, exist_ok=True)

def dur(f):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)

# 1. the sequence, with a 0.7 s page turn wherever a part asks for one
seq = []
for i, p in enumerate(cfg['parts']):
    seq.append(p['file'])
    if p.get('turn_after') and i + 1 < len(cfg['parts']):
        t = f'{work}/turn-{i:02d}.mp4'
        if not os.path.exists(t):
            subprocess.run([TURN, p['file'], cfg['parts'][i + 1]['file'], os.path.abspath(t)], check=True)
        seq.append(t)

# 2. join (re-using join.py's normalising), remembering where each part starts
starts, t = [], 0.0
for f in seq:
    starts.append(t); t += dur(f)
joined = f'{work}/joined.mp4'
subprocess.run(['python3', 'video/tools/join.py', joined, *seq], check=True)

# 3. music beds, ducked under the film's own sound. Each bed: {"file", "from": [part, seconds into it], "to": [part, "end" or seconds],
#    "src": seconds into the file to start (or "align_end": true so the track's own ending lands on "to"), "gain_db", "fade_in", "fade_out"}
#    The legacy single "bed" (start_part, end_part) still works.
out = cfg['out']
beds = cfg.get('beds') or ([{"file": cfg['bed']['file'], "from": [cfg['bed']['start_part'], 0], "to": [cfg['bed']['end_part'], "end"],
                             "gain_db": cfg['bed'].get('gain_db', -20)}] if cfg.get('bed') else [])
part_starts = [starts[seq.index(p['file'])] for p in cfg['parts']]
def at(ref):
    i, x = ref
    return part_starts[i] + (dur(cfg['parts'][i]['file']) if x == 'end' else x)
fin = cfg.get('finish', '')   # one picture pass over the whole film (grade, grain, vignette)
if beds:
    ins, chains = ['-i', joined], []
    for j, b in enumerate(beds):
        b0, b1 = at(b['from']), at(b['to']); L = b1 - b0
        ss = max(0, dur(b['file']) - L) if b.get('align_end') else b.get('src', 0)
        ins += ['-ss', f'{ss:.2f}', '-i', b['file']]
        fi, fo = b.get('fade_in', 2.5), b.get('fade_out', 3)
        chains.append(f"[{j + 1}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{L:.2f},asetpts=PTS-STARTPTS,"
                      f"equalizer=f=2500:width_type=o:width=1.6:g=-4,afade=t=in:d={fi},afade=t=out:st={max(0, L - fo):.2f}:d={fo},"
                      f"volume={b.get('gain_db', -20)}dB,adelay={int(b0 * 1000)}|{int(b0 * 1000)},apad[bd{j}]")
    # "music_out": [[t0, t1], ...] film times where the music drops away (fades over ~0.7 s), so a line can land in silence
    mo = ''.join(f"*(1-0.98*clip(min((t-{a})/0.7,({b}-t)/0.9),0,1))" for a, b in cfg.get('music_out', []))
    fc = ';'.join(chains) + ';' + ''.join(f'[bd{j}]' for j in range(len(beds))) + f"amix=inputs={len(beds)}:normalize=0" + (f",volume='1{mo}':eval=frame" if mo else '') + "[bed];" + (
          "[0:a]asplit=2[film][key];"
          "[bed][key]sidechaincompress=threshold=0.02:ratio=6:attack=40:release=600:makeup=1[duck];"
          "[film][duck]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11,alimiter=limit=0.8:level=0[a]")
    vmap = ['-map', '0:v', '-c:v', 'copy'] if not fin else ['-filter_complex', fc + f';[0:v]{fin}[v]', '-map', '[v]', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p']
    args = ['-filter_complex', fc, '-map', '0:v', '-c:v', 'copy'] if not fin else vmap
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *ins, *args, '-map', '[a]', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
    for b in beds: print(f"  bed {os.path.basename(b['file'])}: {at(b['from']):.1f}-{at(b['to']):.1f} s")
else:
    os.replace(joined, out)
print(f'{out}: {dur(out):.1f} s')
for f, s in zip(seq, starts): print(f'  {s:7.2f}  {os.path.basename(f)}')
