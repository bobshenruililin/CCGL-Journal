# Builds the 60-second trailer from the finished film: picture from final-v4.mp4 (graded), speech and effects from the
# film's pre-music mix (video/work/final/joined.mp4, same timeline), and one continuous music bed ducked under the voices.
# usage: python3 video/tools/trailer.py
import subprocess
F, J = 'video/out/final-v4.mp4', 'video/work/final/joined.mp4'
SEGS = [  # (start, end) in the film, and what each shows
  (0.0, 13.0),     # the hook: Kit's silence, three options, "Every choice lands on somebody."
  (28.7, 34.55),   # "Living it is harder. So we built a game where you have to." and the title
  (67.6, 71.8),    # Bob: "So, ask before you assume."
  (110.8, 114.8),  # Kate: "being kind also means letting people carry it with you."
  (159.6, 164.4),  # Hannah: "even a good approach can fail when used at the wrong time."
  (208.5, 213.9),  # Amanda: "the best outcome isn't the leader doing the most..."
  (223.5, 228.0),  # Bob: "that's your only feedback: what your choices were like for them."
  (294.25, 301.25),# "Three games. One question. What is it like to be led by you?"
  (306.25, 314.25) # Play them: three QR codes
]
import os
W = 'video/work/trailer'; os.makedirs(W, exist_ok=True)
# cut each piece on its own (one pass over the whole film runs out of memory), then join and lay one music bed
for i, (a, b) in enumerate(SEGS):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(a), '-to', str(b), '-i', F, '-ss', str(a), '-to', str(b), '-i', J,
                    '-filter_complex', f"[1:a]aformat=sample_rates=48000:channel_layouts=stereo,afade=t=in:d=0.05,afade=t=out:st={b - a - 0.08:.2f}:d=0.08[a]",
                    '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-crf', '17', '-preset', 'fast', '-pix_fmt', 'yuv420p', '-r', '30',
                    '-c:a', 'pcm_s16le', f'{W}/seg{i}.mov'], check=True)
open(f'{W}/list.txt', 'w').write(''.join(f"file 'seg{i}.mov'\n" for i in range(len(SEGS))))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', f'{W}/list.txt', '-c', 'copy', f'{W}/joined.mov'], check=True)
total = sum(b - a for a, b in SEGS)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{W}/joined.mov', '-i', 'video/media/music/Dream-Culture.mp3', '-filter_complex',
                f"[1:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:{total:.2f},equalizer=f=2500:width_type=o:width=1.6:g=-4,afade=t=in:d=1.5,afade=t=out:st={total - 2.5:.2f}:d=2.5,volume=-15dB[mus];"
                "[0:a]asplit=2[sp1][key];[mus][key]sidechaincompress=threshold=0.02:ratio=6:attack=40:release=500[duck];[sp1][duck]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.85[a]",
                '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-crf', '19', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart',
                'video/out/six-flights-trailer-16x9.mp4'], check=True)
# vertical: blurred fill, the 16:9 picture in the middle, title and link above and below
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', 'video/out/six-flights-trailer-16x9.mp4', '-i', '/home/user/reel/trailer/vert.png', '-filter_complex',
                "[0:v]split=2[a][b];[a]scale=-2:1920,crop=1080:1920,boxblur=30:4,eq=brightness=-0.35:saturation=0.8[bg];[b]scale=1080:-2[fg];"
                "[bg][fg]overlay=0:(H-h)/2[m];[m][1:v]overlay=0:0,format=yuv420p[v]",
                '-map', '[v]', '-map', '0:a', '-c:v', 'libx264', '-crf', '20', '-preset', 'slow', '-c:a', 'copy', '-movflags', '+faststart',
                'video/out/six-flights-trailer-9x16.mp4'], check=True)
print(f'trailer: {total:.1f} s')
