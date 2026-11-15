# Word-level timings for one recording. usage: python video/tools/words.py <audio-16k-mono.wav> <out.words.json>
# Needs: pip install faster-whisper numpy. Convert first: ffmpeg -i in.m4a -ar 16000 -ac 1 out.wav
import sys, wave, json, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('small.en', device='cpu', compute_type='int8')
w = wave.open(sys.argv[1]); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
a = a / max(1e-6, np.abs(a).max()) * 0.9
segs, _ = m.transcribe(a, language='en', word_timestamps=True)
out = [[round(x.start, 2), round(x.end, 2), x.word.strip()] for s in segs for x in s.words]
json.dump(out, open(sys.argv[2], 'w'))
print(' '.join(f'{i}:{w[2]}@{w[0]}' for i, w in enumerate(out)))
