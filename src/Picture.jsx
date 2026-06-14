import manifest from './imageManifest.json'

// Encode each path segment (handles folders/files with spaces) without
// touching the slashes.
const enc = (p) => p.split('/').map(encodeURIComponent).join('/')

const srcset = (base, widths, ext) =>
  widths.map((w) => `${enc(`${base}-${w}`)}.${ext} ${w}w`).join(', ')

/**
 * Responsive <picture> backed by the build-time image manifest.
 * Emits AVIF + WebP sources with a JPEG <img> fallback.
 *
 *  - `priority`  → LCP image: eager + fetchpriority="high" (never lazy).
 *  - otherwise   → loading="lazy" + decoding="async".
 *  - `sizes`     → CSS rendered width hint so phones pick the small variant.
 */
export default function Picture({
  src,
  alt = '',
  className,
  sizes = '100vw',
  priority = false,
  style,
  ...rest
}) {
  const entry = manifest[decodeURI(src)]

  // No manifest entry (shouldn't happen post-build) — degrade to a plain img.
  if (!entry) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' } : null)}
        {...rest}
      />
    )
  }

  const { base, avif, webp, fb, fbExt, w, h } = entry

  return (
    <picture>
      <source type="image/avif" srcSet={srcset(base, avif, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(base, webp, 'webp')} sizes={sizes} />
      <img
        src={`${enc(`${base}-${fb}`)}.${fbExt}`}
        alt={alt}
        width={w}
        height={h}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' } : null)}
        {...rest}
      />
    </picture>
  )
}
