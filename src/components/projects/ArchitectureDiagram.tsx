import { Fragment } from 'react'
import { ArrowDown } from 'lucide-react'
import type { ArchitectureLayer } from '../../data/types'

/** Layered architecture rendered as HTML so it reflows on small screens. */
export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <div className="flex flex-col">
      {layers.map((layer, i) => (
        <Fragment key={layer.label}>
          <div className="rounded-xs border border-line bg-base/60">
            <div className="border-b border-line px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
              {String(i + 1).padStart(2, '0')} · {layer.label}
            </div>
            <div className={`grid gap-2 p-2.5 sm:grid-cols-2 ${layer.nodes.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
              {layer.nodes.map((node) => (
                <div key={node.name} className="rounded-xs border border-line-strong/70 bg-surface-2 px-3 py-2.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="text-[13.5px] font-medium text-fg">{node.name}</span>
                    <span className="font-mono text-[10.5px] text-accent">{node.tech}</span>
                  </div>
                  {node.detail && <p className="mt-1 text-[12.5px] leading-relaxed text-fg-muted">{node.detail}</p>}
                </div>
              ))}
            </div>
          </div>
          {i < layers.length - 1 && (
            <div className="flex justify-center py-1 text-fg-dim" aria-hidden="true">
              <ArrowDown size={16} />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}
