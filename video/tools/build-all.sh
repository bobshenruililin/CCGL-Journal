#!/usr/bin/env bash
# Rebuilds every finished part and joins the draft. Run from the repo root: bash video/tools/build-all.sh
# Assumes the bases (video/work/<id>/base.mp4) and overlays already exist; run bases.sh and section.mjs first in a fresh checkout.
set -euo pipefail
[ -n "${SKIP_RECORD:-}" ] || node video/intro/record.mjs video/intro/intro.html 18 video/out/s0-intro-silent.mp4
python3 video/tools/addsound.py video/out/s0-intro-silent.mp4 video/intro/intro-sound.json video/out/s0-intro.mp4
for s in ${SECTIONS:-s1-monday s2-chairs s3-friday s4-colour s5-saturday s7-projects}; do
  node video/tools/section.mjs video/sections/$s > /dev/null
  python3 video/tools/compose.py video/sections/$s video/out/$s.mp4
done
[ -n "${SKIP_RECORD:-}" ] || node video/intro/record.mjs video/intro/try-our-games.html 14 video/out/s9-try-our-games-silent.mp4
python3 video/tools/addsound.py video/out/s9-try-our-games-silent.mp4 video/intro/try-our-games-sound.json video/out/s9-try-our-games.mp4
parts="video/out/s0-intro.mp4 video/out/s1-monday.mp4 video/out/s2-chairs.mp4 video/out/s3-friday.mp4 video/out/s4-colour.mp4 video/out/s5-saturday.mp4"
[ -f video/out/s7-projects.mp4 ] && parts="$parts video/out/s7-projects.mp4"
python3 video/tools/join.py video/out/draft.mp4 $parts video/out/s9-try-our-games.mp4
echo DONE
