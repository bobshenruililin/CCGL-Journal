# Sound design for the opening (33.34 s, 48 kHz stereo): typing under "Writing the answer is easy", rain over the desk,
# a phone buzz when Kit's messages light up, and the notebook cover. The flash cuts reuse the cold open's sound.
import numpy as np, subprocess, wave
# v4 order: desk 0-7, flash cuts 7-10, roof 10-13, course page 13-30, title 30-34.65
SR = 48000; T = 34.65; out = np.zeros((int(SR * T), 2))
rng = np.random.default_rng(7)
def load(f, ss=0, d=None):
    a = subprocess.run(['ffmpeg', '-loglevel', 'error', '-ss', str(ss), *(['-t', str(d)] if d else []), '-i', f, '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(a, np.float32).reshape(-1, 2).astype(np.float64)
def put(x, t, g=1.0):
    i = int(t * SR); n = min(len(x), len(out) - i); out[i:i + n] += x[:n] * g
db = lambda d: 10 ** (d / 20)
# typing: soft key clicks, 13.95-15.2, uneven rhythm like a confident typist
t = 13.0 + 13.95
while t < 13.0 + 15.2:
    n = int(0.018 * SR); e = np.exp(-np.linspace(0, 9, n)); c = rng.normal(0, 1, n) * e
    c = np.convolve(c, np.ones(6) / 6, 'same'); put(np.stack([c, c * 0.9], 1), t, db(-30) * rng.uniform(.6, 1))
    t += rng.uniform(0.045, 0.11) if rng.random() > .12 else 0.16
# rain on the window from the desk shot to the flash cuts
rain = load('/home/user/CCGL-Journal/video/media/sfx/rain.mp3')
seg = np.tile(rain, (int(np.ceil(8 * SR / len(rain))) + 1, 1))[:int(7.6 * SR)]
env = np.minimum(1, np.minimum(np.linspace(0, 7.6, len(seg)) / 0.05, (7.6 - np.linspace(0, 7.6, len(seg))) / 0.4))[:, None]
put(seg * env, 0.0, db(-20))   # v4: the rain is there from the first frame, under the dilemma
# phone buzz, twice (the desk shot lights the phone at about 0.75 s)
for k in range(2):
    n = int(0.42 * SR); tt = np.arange(n) / SR
    b = np.sign(np.sin(2 * np.pi * 172 * tt)) * 0.5 + np.sin(2 * np.pi * 344 * tt) * 0.3
    b = np.convolve(b, np.ones(40) / 40, 'same') * np.minimum(1, np.minimum(tt / 0.02, (0.42 - tt) / 0.04))
    put(np.stack([b, b], 1), 0.72 + k * 0.62, db(-27))
# the cover swings open (3.5-4.9 s into the desk shot)
put(load('/home/user/CCGL-Journal/video/media/sfx/paper-slide.mp3', 0, 1.4), 3.45, db(-12))
n = int(0.25 * SR); th = np.sin(2 * np.pi * 70 * np.arange(n) / SR) * np.exp(-np.linspace(0, 12, n)); put(np.stack([th, th], 1), 4.85, db(-14))
# flash cuts and the roof: the cold open's own sound, 5.5-11.5 s
put(load('/home/user/reel/audio/coldopen.wav', 5.5, 6.0), 7.0, db(-2))
w = wave.open('/home/user/reel/moodle/sfx4.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((np.clip(out, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
print('peak', np.abs(out).max())
