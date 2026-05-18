#!/bin/bash
# Generate responsive WebP images for Jekyll site
# Usage: ./scripts/generate_responsive_images.sh [--force] [--changed]

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
IMG_DIR="$PROJECT_ROOT/assets/img"
WIDTHS=(480 800 1400)
QUALITY=85
FORCE=false
CHANGED_ONLY=false

for arg in "$@"; do
  case "$arg" in
    --force) FORCE=true ;;
    --changed) CHANGED_ONLY=true ;;
  esac
done

# Check for ImageMagick
if ! command -v magick &> /dev/null; then
  echo "Error: ImageMagick (magick) is not installed." >&2
  exit 1
fi

count=0
skipped=0

# Build list of changed image files from git if --changed
declare -a changed_files=()
if [[ "$CHANGED_ONLY" == true ]]; then
  while IFS= read -r line; do
    changed_files+=("$PROJECT_ROOT/$line")
  done < <(cd "$PROJECT_ROOT" && git diff --name-only HEAD -- 'assets/img/*.jpg' 'assets/img/*.jpeg' 'assets/img/*.png' 'assets/img/*.tiff' 'assets/img/*.gif' && git diff --name-only --cached -- 'assets/img/*.jpg' 'assets/img/*.jpeg' 'assets/img/*.png' 'assets/img/*.tiff' 'assets/img/*.gif' && git ls-files --others --exclude-standard -- 'assets/img/*.jpg' 'assets/img/*.jpeg' 'assets/img/*.png' 'assets/img/*.tiff' 'assets/img/*.gif')
  # Deduplicate
  changed_files=($(printf '%s\n' "${changed_files[@]}" | sort -u))
  # Filter out webp files (responsive outputs)
  changed_files=($(printf '%s\n' "${changed_files[@]}" | grep -v -- '-[0-9]\{3,4\}\.'))
fi

for file in "$IMG_DIR"/*.{jpg,jpeg,png,tiff,gif}; do
  [ -f "$file" ] || continue
  # Skip responsive output files (e.g. foo-480.webp source pngs won't match, but just in case)
  [[ "$(basename "$file")" =~ -[0-9]{3,4}\. ]] && continue

  # If --changed, skip files not in the changed list
  if [[ "$CHANGED_ONLY" == true ]]; then
    match=false
    for cf in "${changed_files[@]}"; do
      [[ "$cf" == "$file" ]] && match=true && break
    done
    [[ "$match" == false ]] && continue
  fi

  basename="${file%.*}"

  for width in "${WIDTHS[@]}"; do
    output="${basename}-${width}.webp"
    if [[ "$FORCE" == true ]] || [[ "$CHANGED_ONLY" == true ]] || [[ ! -f "$output" ]]; then
      echo "Generating: $(basename "$output")"
      magick "$file" -resize "${width}x>" -quality "$QUALITY" "$output"
      ((count++))
    else
      ((skipped++))
    fi
  done
done

echo "Done. Generated: $count, Skipped (already exist): $skipped"
