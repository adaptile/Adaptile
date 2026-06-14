// Image optimization pipeline.
// Reads originals from assets-raw/, emits responsive variants into public/,
// and writes src/imageManifest.json describing each logical path. Originals
// never ship.
//
//   node scripts/optimize-images.mjs
//
// Two tiers:
//   PRIMARY (card thumbnails, team photos, logo — the first thing users see):
//     AVIF + WebP at responsive widths + a JPEG fallback for old browsers.
//   GALLERY (everything else — only loaded when a project page is opened):
//     AVIF at responsive widths + ONE small WebP fallback. No per-image JPEG;
//     AVIF+WebP already covers ~99.9% of real browsers and these images are
//     deep in the funnel. Keeps shipped weight sane without hurting the LCP.
//
import sharp from 'sharp'
import { readdir, mkdir, stat, writeFile, rm } from 'node:fs/promises'
import { dirname, join, relative, extname } from 'node:path'
import { cpus } from 'node:os'

const RAW = 'assets-raw'
const OUT = 'public'
const MANIFEST = 'src/imageManifest.json'

const WIDTHS = [400, 800, 1440] // emitted only when <= source width
const WEBP_FALLBACK_MAX = 640 // single WebP width for gallery images
const AVIF = { quality: 45, effort: 4 }
const WEBP = { quality: 68, effort: 4 }
const JPEG = { quality: 72, mozjpeg: true }

// Homepage / hero-critical images — get the full AVIF+WebP+JPEG treatment.
const PRIMARY = new Set([
  '/nfts/watcherguru/coverwatcherguru.jpg',
  '/nfts/Lair/coverlair.jpg',
  '/nfts/American party/appfp.jpg',
  '/nfts/Dev.fun/coverdevfun.jpg',
  '/nfts/global consumer brands/037aea2d-9dff-4239-b670-1a850837f2d3.jpg',
  '/nfts/zeus/zeuspfp.jpg',
  '/nfts/Eagle/covereagle.jpg',
  '/nfts/pikachu/coverpika.jpg',
  '/nfts/ozzy_horse/ozzypfp.jpg',
  '/nfts/marlee/covermarlee.jpg',
  '/nfts/Fried guy/hhpfp.jpg',
  '/nfts/cult/cultpfp.jpg',
  '/biellal-pfp.jpg',
  '/wahabpfp.jpg',
  '/finnspfp.jpg',
  '/joshpfp.jpg',
  '/issypfp.jpg',
  '/hussienpfp.jpg',
  '/sampfp.jpg',
  '/ryan-pfp.jpg',
  '/adaptile-logo.jpg',
  '/founder-pfp.png',
])

// Assets referenced by fixed filename outside React (index.html og/favicon).
const FIXED = {
  'favicon.png': { width: 64, format: 'png' },
  'adaptile-logo.jpg': { width: 600, format: 'jpeg' },
}

const IMG_RE = /\.(jpe?g|png)$/i
const VARIANT_RE = /\.(avif|webp|jpe?g|png)$/i

async function walk(dir, re = IMG_RE) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p, re)))
    else if (re.test(e.name)) out.push(p)
  }
  return out
}

async function pool(items, limit, fn) {
  const q = [...items.entries()]
  const workers = Array.from({ length: limit }, async () => {
    while (q.length) {
      const [, item] = q.shift()
      await fn(item)
    }
  })
  await Promise.all(workers)
}

const manifest = {}
let done = 0

async function processImage(src, total) {
  const rel = relative(RAW, src)
  const key = '/' + rel
  const relNoExt = rel.slice(0, -extname(rel).length)
  const outBase = join(OUT, relNoExt)
  await mkdir(dirname(outBase), { recursive: true })

  const meta = await sharp(src, { failOn: 'none' }).metadata()
  const ow = meta.width || WIDTHS[0]
  const oh = meta.height || ow

  const isPrimary = PRIMARY.has(key)
  // Gallery images are grid items — cap at 800. Only primary thumbnails double
  // as full-bleed project-hero backgrounds and need the 1440 tier.
  const avifW = WIDTHS.filter((w) => w <= ow && (isPrimary || w <= 800))
  if (!avifW.length) avifW.push(Math.min(ow, 800))

  // WebP widths: primary mirrors AVIF; gallery gets one small fallback.
  const webpW = isPrimary ? avifW : [Math.min(WEBP_FALLBACK_MAX, Math.max(...avifW))]

  for (const w of avifW) {
    await sharp(src, { failOn: 'none' }).resize(w).avif(AVIF).toFile(`${outBase}-${w}.avif`)
  }
  for (const w of webpW) {
    await sharp(src, { failOn: 'none' }).resize(w).webp(WEBP).toFile(`${outBase}-${w}.webp`)
  }

  // Fallback <img src>: JPEG for primary, WebP for gallery.
  let fbExt, fb
  if (isPrimary) {
    fbExt = 'jpg'
    fb = [...avifW].reverse().find((w) => w <= 800) ?? avifW[0]
    await sharp(src, { failOn: 'none' }).resize(fb).jpeg(JPEG).toFile(`${outBase}-${fb}.jpg`)
  } else {
    fbExt = 'webp'
    fb = webpW[0]
  }

  if (FIXED[rel]) {
    const cfg = FIXED[rel]
    const s = sharp(src, { failOn: 'none' }).resize(cfg.width)
    await (cfg.format === 'png' ? s.png({ compressionLevel: 9 }) : s.jpeg(JPEG)).toFile(
      join(OUT, rel),
    )
  }

  manifest[key] = { w: ow, h: oh, base: '/' + relNoExt, avif: avifW, webp: webpW, fb, fbExt }
  done++
  if (done % 25 === 0 || done === total) process.stdout.write(`  ${done}/${total}\r`)
}

// Clean previously generated variants (keep videos/svg/text/etc).
for (const f of await walk(OUT, VARIANT_RE)) await rm(f)

const files = await walk(RAW)
console.log(`Optimizing ${files.length} images (concurrency ${cpus().length})…`)
await pool(files, Math.max(2, cpus().length), (f) => processImage(f, files.length))

const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]))
await writeFile(MANIFEST, JSON.stringify(sorted, null, 0) + '\n')

let bytes = 0
for (const f of await walk(OUT, VARIANT_RE)) bytes += (await stat(f)).size
console.log(`\nDone. ${files.length} images → ${MANIFEST}`)
console.log(`public/ image weight now: ${(bytes / 1024 / 1024).toFixed(1)} MB`)
