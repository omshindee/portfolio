import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Gamepad2, LoaderCircle, Maximize, Minimize, Play, RotateCcw, TriangleAlert } from 'lucide-react'
import type { GameConfig } from '../../data/types'
import { buttonVariants } from '../ui/ButtonLink'

interface UnityInstance {
  Quit: () => Promise<void>
  SetFullscreen: (on: 0 | 1) => void
}

type CreateUnityInstance = (
  canvas: HTMLCanvasElement,
  config: Record<string, unknown>,
  onProgress?: (progress: number) => void,
) => Promise<UnityInstance>

declare global {
  interface Window {
    createUnityInstance?: CreateUnityInstance
  }
}

type State =
  | { phase: 'idle' }
  | { phase: 'loading'; progress: number }
  | { phase: 'running' }
  | { phase: 'error'; message: string }

const loadedScripts = new Map<string, Promise<void>>()

/** Ensures the loader really is JavaScript (an SPA fallback would return index.html). */
async function verifyLoader(url: string) {
  let res: Response
  try {
    res = await fetch(url, { method: 'HEAD', cache: 'no-cache' })
  } catch {
    throw new Error('Network error while contacting the game server.')
  }
  const type = res.headers.get('content-type') ?? ''
  if (!res.ok || type.includes('text/html')) {
    throw new Error('The web build for this game has not been deployed yet.')
  }
}

function loadScript(src: string) {
  const cached = loadedScripts.get(src)
  if (cached) return cached
  const p = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => {
      loadedScripts.delete(src)
      s.remove()
      reject(new Error('Could not load the Unity loader script.'))
    }
    document.body.appendChild(s)
  })
  loadedScripts.set(src, p)
  return p
}

/**
 * Click-to-play Unity WebGL player. Nothing is downloaded until the visitor
 * presses Play. Build files live in /public/games/<id>/Build (see README).
 */
export function GamePlayer({ game }: { game: GameConfig }) {
  const [state, setState] = useState<State>({ phase: 'idle' })
  const [fullscreen, setFullscreen] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const instanceRef = useRef<UnityInstance | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [embedActive, setEmbedActive] = useState(false)
  const canvasId = `unity-${useId().replace(/:/g, '')}`

  useEffect(() => {
    const onChange = () => {
      setFullscreen(document.fullscreenElement === frameRef.current)
      // Clicking the toolbar button takes focus away from an embedded game, and Unity
      // stops drawing while unfocused, so the resized canvas would stay blank. Hand it back.
      iframeRef.current?.contentWindow?.focus()
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      instanceRef.current?.Quit().catch(() => undefined)
      instanceRef.current = null
    }
  }, [])

  // Iframe mode: the embedded build page reports its progress with postMessage.
  useEffect(() => {
    if (!game.embedUrl || !embedActive) return
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== iframeRef.current?.contentWindow) return
      const msg = e.data as { type?: string; progress?: number; message?: string } | null
      if (!msg || typeof msg !== 'object') return
      if (msg.type === 'progress') setState({ phase: 'loading', progress: Number(msg.progress) || 0 })
      else if (msg.type === 'ready') {
        setState({ phase: 'running' })
        iframeRef.current?.contentWindow?.focus()
      } else if (msg.type === 'error') {
        setEmbedActive(false)
        setState({ phase: 'error', message: msg.message || 'The game failed to start.' })
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [game.embedUrl, embedActive])

  const start = useCallback(async () => {
    const base = game.buildUrl.replace(/\/$/, '')
    const loaderUrl = `${base}/${game.loaderFile}`
    if (game.embedUrl) {
      setState({ phase: 'loading', progress: 0 })
      try {
        await verifyLoader(loaderUrl)
        setEmbedActive(true) // mounting the iframe starts the download
      } catch (err) {
        setState({ phase: 'error', message: err instanceof Error ? err.message : String(err) })
      }
      return
    }
    if (!canvasRef.current) return
    setState({ phase: 'loading', progress: 0 })
    try {
      await verifyLoader(loaderUrl)
      await loadScript(loaderUrl)
      if (typeof window.createUnityInstance !== 'function') {
        throw new Error('The Unity loader did not initialise correctly.')
      }
      const instance = await window.createUnityInstance(
        canvasRef.current,
        {
          dataUrl: `${base}/${game.dataFile}`,
          frameworkUrl: `${base}/${game.frameworkFile}`,
          codeUrl: `${base}/${game.codeFile}`,
          streamingAssetsUrl: game.streamingAssetsUrl ?? 'StreamingAssets',
          companyName: game.companyName,
          productName: game.productName,
          productVersion: game.productVersion,
          showBanner: (msg: string, type: string) => {
            if (type === 'error') setState({ phase: 'error', message: msg })
          },
        },
        (progress) => setState({ phase: 'loading', progress }),
      )
      instanceRef.current = instance
      setState({ phase: 'running' })
      canvasRef.current?.focus()
    } catch (err) {
      setState({ phase: 'error', message: err instanceof Error ? err.message : String(err) })
    }
  }, [game])

  const toggleFullscreen = useCallback(async () => {
    const el = frameRef.current
    if (!el) return
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else if (el.requestFullscreen) await el.requestFullscreen()
      else instanceRef.current?.SetFullscreen(1) // iOS Safari fallback
    } catch {
      instanceRef.current?.SetFullscreen(1)
    }
  }, [])

  const pct = state.phase === 'loading' ? Math.round(state.progress * 100) : 0

  return (
    <div className="overflow-hidden rounded-xs border border-line bg-chrome">
      {/* toolbar */}
      <div className="flex min-h-10 items-center justify-between gap-2 border-b border-line bg-surface-2/60 px-3">
        <span className="inline-flex min-w-0 items-center gap-2 font-mono text-[11px] text-fg-muted">
          <Gamepad2 size={14} className="shrink-0 text-accent" />
          <span className="truncate">
            {game.productName} · WebGL{' '}
            <span className="text-fg-dim">
              {state.phase === 'running' ? '· running' : state.phase === 'loading' ? `· loading ${pct}%` : ''}
            </span>
          </span>
        </span>
        <button
          type="button"
          onClick={toggleFullscreen}
          disabled={state.phase !== 'running'}
          className={`${buttonVariants.ghost} min-h-8 px-2`}
          aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {fullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
          <span className="hidden sm:inline">{fullscreen ? 'Exit' : 'Fullscreen'}</span>
        </button>
      </div>

      {/* viewport */}
      <div
        ref={frameRef}
        className="relative w-full bg-black"
        style={fullscreen ? { width: '100vw', height: '100vh' } : { aspectRatio: String(game.aspectRatio) }}
      >
        {game.embedUrl ? (
          embedActive && (
            <iframe
              ref={iframeRef}
              src={game.embedUrl}
              title={`${game.productName} game`}
              allow="fullscreen; gamepad; autoplay"
              allowFullScreen
              className={`absolute inset-0 block h-full w-full border-0 ${state.phase === 'running' ? '' : 'invisible'}`}
            />
          )
        ) : (
          <canvas
            ref={canvasRef}
            id={canvasId}
            tabIndex={-1}
            className={`absolute inset-0 block h-full w-full outline-none ${state.phase === 'running' ? '' : 'invisible'}`}
            aria-label={`${game.productName} game`}
          />
        )}

        {state.phase !== 'running' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_center,#1b2533_0%,#10151c_70%)] p-6 text-center">
            {state.phase === 'idle' && (
              <>
                <button
                  type="button"
                  onClick={start}
                  disabled={!game.available}
                  className={`${buttonVariants.primary} min-h-11 px-5 text-sm`}
                >
                  <Play size={16} /> {game.available ? 'Play in browser' : 'Web build coming soon'}
                </button>
                <p className="max-w-sm text-[12.5px] text-fg-dim">
                  {game.available
                    ? 'The game downloads only after you press Play.'
                    : 'The browser-playable build has not been published yet.'}
                </p>
              </>
            )}

            {state.phase === 'loading' && (
              <div className="w-full max-w-xs" role="status" aria-live="polite">
                <div className="mb-2 flex items-center justify-center gap-2 font-mono text-[12px] text-fg-muted">
                  <LoaderCircle size={14} className="animate-spin" /> Loading {pct}%
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-surface-3">
                  <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )}

            {state.phase === 'error' && (
              <div role="alert" className="flex max-w-sm flex-col items-center gap-3">
                <TriangleAlert size={22} className="text-warn" />
                <p className="text-[13px] text-fg-muted">{state.message}</p>
                <button type="button" onClick={() => setState({ phase: 'idle' })} className={buttonVariants.secondary}>
                  <RotateCcw size={14} /> Try again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* info */}
      <div className="grid gap-3 border-t border-line bg-surface px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <dl className="flex flex-wrap gap-x-5 gap-y-1.5">
          {game.controls.map((c) => (
            <div key={c.action} className="flex items-center gap-2 text-[12.5px]">
              <dt>
                <kbd className="rounded-xs border border-line-strong bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-fg">{c.keys}</kbd>
              </dt>
              <dd className="text-fg-muted">{c.action}</dd>
            </div>
          ))}
        </dl>
        {game.notes && <p className="font-mono text-[11px] text-fg-dim">{game.notes}</p>}
      </div>
    </div>
  )
}
