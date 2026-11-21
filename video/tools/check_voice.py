# Flags silence where someone should be speaking. usage: python3 video/tools/check_voice.py <film.mp4> <start>-<end>:<label> ...
# Prints the level of every second in each range and any run of 2+ seconds below -45 dB. A bad cut shows up as a long run.
import subprocess, sys, numpy as np
film = sys.argv[1]
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', film, '-ac', '1', '-ar', '8000', '-f', 'f32le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, np.float32); sr = 8000
bad = 0
for spec in sys.argv[2:]:
    rng, label = spec.split(':', 1); a, b = map(float, rng.split('-'))
    lv = [20 * np.log10(np.sqrt(np.mean(x[int(t * sr):int((t + 1) * sr)] ** 2)) + 1e-9) for t in np.arange(a, b - 1, 1.0)]
    runs, cur = [], 0
    for v in lv:
        cur = cur + 1 if v < -45 else 0
        if cur == 2: runs.append(1)
    print(f'{label:24s} {a:6.1f}-{b:6.1f}  median {np.median(lv):5.1f} dB  quietest {min(lv):5.1f} dB  {"SILENT GAPS: " + str(len(runs)) if runs else "ok"}')
    bad += len(runs)
sys.exit(1 if bad else 0)
