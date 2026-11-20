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

# 3. the bed: from the start of one part to the end of another, ducked under the film's own sound
bed = cfg.get('bed')
out = cfg['out']
if bed:
    part_starts = [starts[seq.index(p['file'])] for p in cfg['parts']]
    b0 = part_starts[bed['start_part']]
    b1 = part_starts[bed['end_part']] + dur(cfg['parts'][bed['end_part']]['file'])
    g = bed.get('gain_db', -20)
    fc = (f"[1:a]atrim=0:{b1 - b0:.2f},afade=t=in:d=2.5,afade=t=out:st={max(0, b1 - b0 - 3):.2f}:d=3,volume={g}dB,"
          f"adelay={int(b0 * 1000)}|{int(b0 * 1000)},apad[bed];"
          "[0:a]asplit=2[film][key];"
          "[bed][key]sidechaincompress=threshold=0.02:ratio=6:attack=40:release=600:makeup=1[duck];"
          "[film][duck]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11,alimiter=limit=0.8:level=0[a]")
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', joined, '-i', bed['file'], '-filter_complex', fc,
                    '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
else:
    os.replace(joined, out)
print(f'{out}: {dur(out):.1f} s')
for f, s in zip(seq, starts): print(f'  {s:7.2f}  {os.path.basename(f)}')
