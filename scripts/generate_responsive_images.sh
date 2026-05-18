#!/bin/bash
# Generate responsive WebP images for Jekyll site
# Usage: ./scripts/generate_responsive_images.sh [--force]

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
IMG_DIR="$PROJECT_ROOT/assets/img"
WIDTHS=(480 800 1400)
QUALITY=85
FORCE=false

if [[ "$1" == "--force" ]]; then
  FORCE=true
fi

# Check for ImageMagick
if ! command -v magick &> /dev/null; then
  echo "Error: ImageMagick (magick) is not installed." >&2
  exit 1
fi

count=0
skipped=0

for file in "$IMG_DIR"/*.{jpg,jpeg,png,tiff,gif}; do
  [ -f "$file" ] || continue
  basename="${file%.*}"

  for width in "${WIDTHS[@]}"; do
    output="${basename}-${width}.webp"
    if [[ "$FORCE" == true ]] || [[ ! -f "$output" ]]; then
      echo "Generating: $(basename "$output")"
      magick "$file" -resize "${width}x>" -quality "$QUALITY" "$output"
      ((count++))
    else
      ((skipped++))
    fi
  done
done

echo "Done. Generated: $count, Skipped (already exist): $skipped"
