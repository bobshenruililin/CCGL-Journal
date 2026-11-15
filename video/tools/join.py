# Joins finished parts into one video, in order. Parts without sound get silence.
# usage (from the repo root): python3 video/tools/join.py video/out/part-one.mp4 video/out/s0-intro.mp4 video/out/s1-monday.mp4 ...
import json, subprocess, sys
out, parts = sys.argv[1], sys.argv[2:]
inp, f, seg = [], [], ''
for i, p in enumerate(parts):
    info = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_type:format=duration', '-of', 'json', p], capture_output=True, text=True).stdout)
    dur = float(info['format']['duration']); has_a = any(s['codec_type'] == 'audio' for s in info['streams'])
    inp += ['-i', p]
    f.append(f"[{i}:v]fps=30,scale=1920:1080,setsar=1,format=yuv420p,trim=duration={dur},setpts=PTS-STARTPTS[v{i}]")
    f.append(f"[{i}:a]aresample=48000,aformat=channel_layouts=stereo,apad,atrim=duration={dur},asetpts=PTS-STARTPTS[a{i}]" if has_a
             else f"anullsrc=r=48000:cl=stereo,atrim=duration={dur}[a{i}]")
    seg += f'[v{i}][a{i}]'
    print(f'{p}: {dur:.1f}s' + ('' if has_a else ' (silent)'))
f.append(f"{seg}concat=n={len(parts)}:v=1:a=1[v][a]")
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inp, '-filter_complex', ';'.join(f), '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium',
                '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
print('joined ->', out)
