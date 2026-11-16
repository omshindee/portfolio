import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createReadStream, statSync } from 'node:fs'
import { join, normalize, resolve } from 'node:path'
import { defineConfig, type Connect, type Plugin } from 'vite'

/**
 * Unity Web builds ship pre-compressed `.br` files. Cloudflare Pages serves them with
 * `Content-Encoding: br` via public/_headers; this plugin does the same for
 * `npm run dev` and `npm run preview`, so the games also work locally.
 */
function unityBrotli(): Plugin {
  let publicDir = ''
  let outDir = ''
  const typeFor = (name: string) =>
    name.endsWith('.wasm') ? 'application/wasm'
    : name.endsWith('.js') ? 'application/javascript'
    : name.endsWith('.json') ? 'application/json'
    : 'application/octet-stream'

  const handler = (dir: () => string): Connect.NextHandleFunction => (req, res, next) => {
    const url = (req.url ?? '').split('?')[0]
    if (!url.startsWith('/games/') || !url.endsWith('.br') || !dir()) return next()
    const base = normalize(dir())
    const file = normalize(join(base, decodeURIComponent(url)))
    if (!file.startsWith(base)) return next()
    let size: number
    try {
      size = statSync(file).size
    } catch {
      return next()
    }
    res.setHeader('Content-Encoding', 'br')
    res.setHeader('Content-Type', typeFor(url.slice(0, -3)))
    res.setHeader('Content-Length', size)
    res.setHeader('Cache-Control', 'no-cache')
    if (req.method === 'HEAD') return res.end()
    createReadStream(file).pipe(res)
  }

  return {
    name: 'unity-brotli',
    configResolved(config) {
      publicDir = config.publicDir
      outDir = resolve(config.root, config.build.outDir)
    },
    configureServer(server) {
      server.middlewares.use(handler(() => publicDir))
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler(() => outDir))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), unityBrotli()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
