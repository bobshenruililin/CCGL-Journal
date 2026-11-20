# Key clicks for the player typing "Next term I ask before I carry." on the game's last page (1.0-3.4 s of the bookend).
import numpy as np, wave
SR = 48000; out = np.zeros((int(SR * 5.0), 2)); rng = np.random.default_rng(3); t = 1.0
while t < 3.4:
    n = int(0.018 * SR); c = rng.normal(0, 1, n) * np.exp(-np.linspace(0, 9, n)); c = np.convolve(c, np.ones(6) / 6, 'same')
    i = int(t * SR); out[i:i + n] += np.stack([c, c * 0.9], 1) * 10 ** (-30 / 20) * rng.uniform(.6, 1)
    t += rng.uniform(0.05, 0.12) if rng.random() > .15 else 0.2
w = wave.open('bookend.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(out, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
