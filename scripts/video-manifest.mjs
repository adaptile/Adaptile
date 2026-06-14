// Probe optimized videos in public/ and write src/videoManifest.json mapping
// each logical path to its intrinsic { w, h }. Used to reserve gallery slot
// height (aspect-ratio) so the masonry doesn't jump as videos load.
//
//   node scripts/video-manifest.mjs
//
import { readdir, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { join, relative } from 'node:path'
import { promisify } from 'node:util'

const exec = promisify(execFile)
const OUT = 'public'
const MANIFEST = 'src/videoManifest.json'

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (/\.mp4$/i.test(e.name)) out.push(p)
  }
  return out
}

const manifest = {}
for (const file of await walk(OUT)) {
  const { stdout } = await exec('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height',
    '-of', 'csv=p=0', file,
  ])
  const [w, h] = stdout.trim().split(',').map(Number)
  manifest['/' + relative(OUT, file)] = { w, h }
}

const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]))
await writeFile(MANIFEST, JSON.stringify(sorted, null, 0) + '\n')
console.log(`Wrote ${MANIFEST} (${Object.keys(manifest).length} videos)`) // eslint-disable-line
console.log(sorted)
