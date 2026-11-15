#!/usr/bin/env bash
# Builds the game footage ("base") under each section's voice. Run from the repo root: bash video/tools/bases.sh [s1|s4|s5]
# Each base is plain 1920x1080 30 fps video with no sound, cut from docs/video/clips/ to match the word timings in that section.
set -euo pipefail
C=docs/video/clips; E="-r 30 -an -c:v libx264 -crf 16 -pix_fmt yuv420p"
still() { # still <image> <seconds> <zoom expr> <x 0..1> <y 0..1> <out>
  ffmpeg -y -loglevel error -loop 1 -i "$1" -t "$2" -r 30 -vf "scale=3840:2160,zoompan=z='$3':x='(iw-iw/zoom)*$4':y='(ih-ih/zoom)*$5':d=1:s=1920x1080:fps=30" -c:v libx264 -crf 16 -pix_fmt yuv420p "$6"; }
join() { local out=$1; shift; local l; l=$(dirname "$out")/list.txt; : > "$l"; for f in "$@"; do echo "file $(basename "$f")" >> "$l"; done; ffmpeg -y -loglevel error -f concat -i "$l" -c copy "$out"; }
s1() { local W=video/work/s1-monday; mkdir -p $W
  ffmpeg -y -loglevel error -i $C/01-cover-and-committee.mp4 -vf "setpts=PTS*1.1364" -t 13.0 $E $W/a.mp4
  ffmpeg -y -loglevel error -i $C/02-monday-pencil-to-ink.mp4 -t 10.2 $E $W/b.mp4
  ffmpeg -y -loglevel error -i $C/03-monday-knock.mp4 $E $W/c.mp4
  ffmpeg -y -loglevel error -sseof -0.2 -i $C/03-monday-knock.mp4 -frames:v 1 $W/last.png
  still $W/last.png 9.4 "1+0.1*on/282" 0.3 0.45 $W/d.mp4
  join $W/base.mp4 $W/a.mp4 $W/b.mp4 $W/c.mp4 $W/d.mp4; }
s4() { local W=video/work/s4-colour; mkdir -p $W
  ffmpeg -y -loglevel error -i $C/11-night-under-the-tarp.mp4 -t 15.1 $E $W/a.mp4
  ffmpeg -y -loglevel error -sseof -0.2 -i $C/11-night-under-the-tarp.mp4 -frames:v 1 $W/tarp.png
  still $W/tarp.png 13.5 "1+0.14*on/405" 0.5 0.62 $W/b.mp4
  still $W/tarp.png 7.4 "min(1.9,1.25+0.65*on/120)" 0.57 0.86 $W/c.mp4
  ffmpeg -y -loglevel error -ss 5 -i $C/12-night-half-a-queue.mp4 -t 5.4 $E $W/d.mp4
  still $W/tarp.png 8.3 "1.1-0.1*on/249" 0.5 0.6 $W/e.mp4
  join $W/base.mp4 $W/a.mp4 $W/b.mp4 $W/c.mp4 $W/d.mp4 $W/e.mp4; }
s5() { local W=video/work/s5-saturday; mkdir -p $W
  ffmpeg -y -loglevel error -i $C/15-saturday-goes-round.mp4 -t 26 $E $W/a.mp4
  ffmpeg -y -loglevel error -i $C/16-last-page-and-pocket.mp4 -t 19 $E $W/b.mp4
  ffmpeg -y -loglevel error -ss 1.5 -i $C/01-cover-and-committee.mp4 -frames:v 1 $W/cover.png
  still $W/cover.png 7.6 "1+0.08*on/228" 0.5 0.5 $W/c.mp4
  join $W/base.mp4 $W/a.mp4 $W/b.mp4 $W/c.mp4; }
for s in "${@:-s1 s4 s5}"; do for x in $s; do $x; echo "base built: $x"; done; done
