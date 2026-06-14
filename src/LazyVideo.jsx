import { useRef, useEffect, useState } from 'react'

/**
 * Autoplay-on-screen video that does NOT download until it scrolls into view.
 *
 * autoPlay + preload forces the browser to fetch the whole file even with
 * preload="none". Instead we render only a poster up front and attach the
 * <source> elements (and call play()) when the element intersects the
 * viewport, then pause + detach the source when it leaves to free the network
 * and decoder.
 */
export default function LazyVideo({
  src,
  webm,
  poster,
  className,
  style,
  rootMargin = '200px',
  ...rest
}) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!active) {
      el.pause()
      el.removeAttribute('src')
      el.load() // abort any in-flight download, drop decoded frames
      return
    }
    const onReady = () => {
      el.play().catch(() => {}) // ignore autoplay rejections
    }
    el.addEventListener('loadeddata', onReady)
    el.load()
    return () => el.removeEventListener('loadeddata', onReady)
  }, [active])

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      {...rest}
    >
      {active && webm && <source src={webm} type="video/webm" />}
      {active && <source src={src} type="video/mp4" />}
    </video>
  )
}
