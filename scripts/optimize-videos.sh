#!/usr/bin/env bash
# Re-encode source videos from assets-raw/ into public/: a smaller H.264 MP4,
# a VP9 WebM, and a poster JPG (shown before the video streams). Audio dropped
# (all videos play muted). Caps the long edge at 1080.
set -euo pipefail

RAW="assets-raw"
OUT="public"

while IFS= read -r -d '' src; do
  rel="${src#assets-raw/}"
  base="${rel%.*}"
  mkdir -p "$OUT/$(dirname "$rel")"
  echo "→ $rel"

  scale="scale='min(1080,iw)':-2:flags=lanczos"

  # H.264 MP4 (broad compatibility)
  ffmpeg -nostdin -y -loglevel error -i "$src" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset slow \
    -vf "$scale" -an -movflags +faststart \
    "$OUT/$base.mp4"

  # VP9 WebM (smaller where supported)
  ffmpeg -nostdin -y -loglevel error -i "$src" \
    -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 \
    -vf "$scale" -an \
    "$OUT/$base.webm"

  # Poster (first ~third of a second, capped at 720)
  ffmpeg -nostdin -y -loglevel error -ss 0.3 -i "$src" -frames:v 1 \
    -vf "scale='min(720,iw)':-2" -q:v 4 \
    "$OUT/$base-poster.jpg"
done < <(find "$RAW" -type f -iname '*.mp4' -print0)

echo "--- results ---"
find "$OUT" -type f \( -iname '*.mp4' -o -iname '*.webm' -o -iname '*-poster.jpg' \) \
  -exec du -h {} + | sort -k2
