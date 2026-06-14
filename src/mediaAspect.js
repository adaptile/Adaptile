import images from './imageManifest.json'
import videos from './videoManifest.json'

// Intrinsic width/height ratio for a gallery src (image or video), used to
// reserve the masonry slot before the media loads. Falls back to a square.
export function aspectRatio(src) {
  const key = decodeURI(src)
  const e = images[key] || videos[key]
  return e && e.w && e.h ? e.w / e.h : 1
}
