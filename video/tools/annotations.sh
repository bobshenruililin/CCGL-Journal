#!/usr/bin/env bash
# Renders the red-pencil marks that point at the evidence in the footage (video/tools/annotate.html), into video/work/annot/.
# Each is laid over its section's footage by compose.py through the section's "inserts", timed to the speaker's words.
set -euo pipefail
A=$PWD/video/tools/annotate.html; O=$PWD/video/work/annot; mkdir -p $O; cd /home/user/reel/gfx
r() { W=1920 H=1080 PAGE="$A?$2" node render2.mjs $O/$1.mov $3 > /dev/null; echo "annotation: $1"; }
r s1-kit    "shape=underline&box=1188,290,1390,290&dur=2.0&draw=0.35&seed=3" 2.0     # Bob: "ignored every message for five days"
r s2-kit    "shape=underline&box=1100,600,1370,600&dur=2.6&draw=0.4&seed=5&n=1" 2.6  # Kate: "you could have asked"
r s3-cut    "shape=ellipse&box=1000,680,1690,768&dur=2.6&seed=7" 2.6                 # Hannah: "cut off a teammate"
r s4-kit    "shape=ellipse&box=972,585,1142,890&dur=2.5&seed=11" 2.5                 # Amanda: "like Kit"
r s5-note   "shape=arrow&box=1260,470,915,565&dur=1.9&draw=0.5&seed=2" 1.9           # Bob: "that's your only feedback"
r s7-meters "shape=ellipse&box=492,28,1428,162&dur=3.8&seed=13" 3.8                  # Bob: "rapport and energy"
