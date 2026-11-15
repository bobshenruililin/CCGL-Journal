#!/usr/bin/env bash
# Builds the game footage ("base") under each section's voice. Run from the repo root: bash video/tools/bases.sh [s1|s4|s5]
# Each base is plain 1920x1080 30 fps video with no sound, cut from docs/video/clips/ to match the word timings in that section.
set -euo pipefail
C=docs/video/clips; E="-r 30 -an -c:v libx264 -crf 16 -pix_fmt yuv420p"
still() { # still <image> <seconds> <zoom expr> <x 0..1> <y 0..1> <out>
  ffmpeg -y -loglevel error -loop 1 -i "$1" -t "$2" -r 30 -vf "scale=3840:2160,zoompan=z='$3':x='(iw-iw/zoom)*$4':y='(ih-ih/zoom)*$5':d=1:s=1920x1080:fps=30" -c:v libx264 -crf 16 -pix_fmt yuv420p "$6"; }
join() { local out=$1; shift; local l; l=$(dirname "$out")/list.txt; : > "$l"; for f in "$@"; do echo "file $(basename "$f")" >> "$l"; done; ffmpeg -y -loglevel error -f concat -i "$l" -c copy "$out"; }
s1() { local W=video/work/s1-monday; mkdir -p $W
  ffmpeg -y -loglevel error -i $C/01-cover-and-committee.mp4 -vf "setpts=PTS*1.040" -t 11.9 $E $W/a.mp4
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
s2() { local W=video/work/s2-chairs; mkdir -p $W
  ffmpeg -y -loglevel error -i $C/07-thursday-chairs-together.mp4 -t 11.6 $E $W/a.mp4
  ffmpeg -y -loglevel error -ss 2 -i $C/08-thursday-chairs-alone.mp4 -t 17.8 $E $W/b.mp4
  ffmpeg -y -loglevel error -ss 4.4 -i $C/18-thursday-kit-afterwards.mp4 -t 5.8 $E $W/c.mp4
  ffmpeg -y -loglevel error -sseof -0.3 -i $C/18-thursday-kit-afterwards.mp4 -frames:v 1 $W/kit.png
  still $W/kit.png 7.4 "1+0.28*on/222" 0.62 0.56 $W/d.mp4
  join $W/base.mp4 $W/a.mp4 $W/b.mp4 $W/c.mp4 $W/d.mp4; }
s3() { local W=video/work/s3-friday; mkdir -p $W
  ffmpeg -y -loglevel error -i $C/09-friday-650.mp4 -t 11.6 $E $W/a.mp4
  ffmpeg -y -loglevel error -i $C/05-wednesday-whose-sky.mp4 $E $W/b.mp4
  ffmpeg -y -loglevel error -sseof -0.2 -i $C/05-wednesday-whose-sky.mp4 -frames:v 1 $W/wed.png
  still $W/wed.png 0.52 "1" 0.5 0.5 $W/b2.mp4
  ffmpeg -y -loglevel error -i $C/09-friday-650.mp4 -t 4.5 $E $W/c.mp4
  ffmpeg -y -loglevel error -i $C/10-friday-same-words-priya.mp4 -t 4.3 $E $W/d.mp4
  ffmpeg -y -loglevel error -i $C/15-saturday-goes-round.mp4 -t 8.3 $E $W/e.mp4
  ffmpeg -y -loglevel error -ss 8 -i $C/15-saturday-goes-round.mp4 -frames:v 1 $W/sat.png
  still $W/sat.png 5.5 "1+0.25*on/165" 0.2 0.6 $W/f.mp4
  join $W/base.mp4 $W/a.mp4 $W/b.mp4 $W/b2.mp4 $W/c.mp4 $W/d.mp4 $W/e.mp4 $W/f.mp4; }
s7() { local W=video/work/s7-projects; mkdir -p $W; local M=video/media/clips
  # Stand-in stills until the trimmed Asterwind and Team Quest clips arrive; swap each still() for a clip cut when they do.
  still $M/still-teamquest.png 10.5 "1+0.08*on/315" 0.5 0.3 $W/a.mp4
  still $M/still-teamquest-enrol.png 9.6 "1+0.1*on/288" 0.5 0.4 $W/b.mp4
  ffmpeg -y -loglevel error -ss 3 -i $C/11-night-under-the-tarp.mp4 -t 2.6 $E $W/c.mp4
  still $M/still-asterwind-title.png 4.0 "1+0.06*on/120" 0.4 0.5 $W/d.mp4
  still $M/still-asterwind-corridor.png 8.0 "1+0.12*on/240" 0.55 0.45 $W/e.mp4
  still $M/still-asterwind-corridor-2.png 9.0 "1+0.18*on/270" 0.6 0.35 $W/f.mp4
  still $M/still-asterwind-corridor-4.png 9.6 "1.18-0.12*on/288" 0.6 0.4 $W/g.mp4
  still $M/still-three-builds.png 9.4 "1+0.05*on/282" 0.5 0.5 $W/h.mp4
  still $M/still-three-builds.png 7.0 "1.05" 0.5 0.5 $W/i.mp4
  join $W/base.mp4 $W/a.mp4 $W/b.mp4 $W/c.mp4 $W/d.mp4 $W/e.mp4 $W/f.mp4 $W/g.mp4 $W/h.mp4 $W/i.mp4; }
for s in "${@:-s1 s2 s3 s4 s5 s7}"; do for x in $s; do $x; echo "base built: $x"; done; done
