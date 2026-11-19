import type { Project } from '../../data/types'

const C = {
  bg: '#141b25',
  grid: '#1f2a38',
  line: '#3b4a5f',
  accent: '#66a6d9',
  accent2: '#93c4ec',
  dim: '#6b7a8f',
  ok: '#7fb069',
}

function Grid() {
  return (
    <>
      <defs>
        <pattern id="thumb-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke={C.grid} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill={C.bg} />
      <rect width="320" height="180" fill="url(#thumb-grid)" />
    </>
  )
}

function Box({ x, y, w, h, label, strong }: { x: number; y: number; w: number; h: number; label: string; strong?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={strong ? '#1d3247' : '#18212d'} stroke={strong ? C.accent : C.line} rx="1.5" />
      <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill={strong ? C.accent2 : C.dim}>
        {label}
      </text>
    </g>
  )
}

function Aegis() {
  return (
    <>
      {/* links */}
      <g stroke={C.accent} strokeWidth="1" fill="none" opacity="0.7">
        <path d="M86 46 H118 V82 H134" />
        <path d="M86 90 H134" />
        <path d="M86 134 H118 V98 H134" />
        <path d="M234 90 H250" strokeDasharray="3 3" />
        <path d="M184 108 V132" />
        <path d="M184 72 V48" />
      </g>
      <Box x={22} y={36} w={64} h={20} label="agent-01" />
      <Box x={22} y={80} w={64} h={20} label="agent-02" />
      <Box x={22} y={124} w={64} h={20} label="netshield" />
      <Box x={134} y={72} w={100} h={36} label="aegis-server" strong />
      <Box x={250} y={80} w={52} h={20} label="ml" />
      <Box x={150} y={132} w={68} h={20} label="postgres" />
      <Box x={150} y={28} w={68} h={20} label="dashboard" />
      <circle cx="294" cy="22" r="3" fill={C.ok} />
      <text x="286" y="25" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill={C.dim}>monitoring</text>
    </>
  )
}

function Social() {
  const nodes: [number, number, number][] = [
    [70, 60, 7], [112, 40, 5], [120, 92, 9], [62, 120, 5], [160, 128, 6], [168, 62, 5], [96, 150, 4],
  ]
  const edges = [[0, 1], [0, 2], [2, 3], [2, 4], [2, 5], [1, 5], [3, 6], [4, 6]]
  return (
    <>
      <g stroke={C.line} strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      {nodes.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i === 2 ? '#1d3247' : '#18212d'} stroke={i === 2 ? C.accent : C.dim} />
      ))}
      {/* feed column */}
      <g>
        <rect x="204" y="22" width="96" height="136" fill="#18212d" stroke={C.line} rx="1.5" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(212 ${32 + i * 42})`}>
            <circle cx="5" cy="5" r="5" fill={i === 0 ? C.accent : C.line} />
            <rect x="14" y="1" width="44" height="4" fill={C.dim} opacity="0.7" />
            <rect x="0" y="15" width="80" height="3" fill={C.line} />
            <rect x="0" y="22" width="62" height="3" fill={C.line} />
          </g>
        ))}
      </g>
      <text x="22" y="26" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill={C.dim}>GET /api/feed</text>
    </>
  )
}

function Lander() {
  return (
    <>
      <path
        d="M0 150 L28 138 L52 146 L78 128 L104 134 L120 152 L170 152 L186 132 L214 140 L238 118 L266 130 L292 112 L320 124 V180 H0 Z"
        fill="#18212d"
        stroke={C.line}
      />
      <rect x="126" y="150" width="38" height="3" fill={C.ok} />
      <path d="M40 34 Q120 30 145 128" fill="none" stroke={C.accent} strokeDasharray="3 4" opacity="0.8" />
      <g transform="translate(145 126)">
        <path d="M-7 4 L0 -10 L7 4 Z" fill="#1d3247" stroke={C.accent2} />
        <path d="M-4 4 L-7 9 M4 4 L7 9" stroke={C.accent2} />
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill={C.dim}>
        <text x="22" y="22">vx  0.42</text>
        <text x="82" y="22">vy -1.10</text>
        <text x="142" y="22">alt 12.4</text>
      </g>
    </>
  )
}

function Quiz() {
  return (
    <>
      <path
        d="M0 150 L28 138 L52 146 L78 128 L104 134 L120 152 L170 152 L186 132 L214 140 L238 118 L266 130 L292 112 L320 124 V180 H0 Z"
        fill="#18212d"
        stroke={C.line}
      />
      <rect x="126" y="150" width="38" height="3" fill={C.ok} />
      <path d="M40 34 Q120 30 145 128" fill="none" stroke={C.accent} strokeDasharray="3 4" opacity="0.8" />
      <g transform="translate(145 126)">
        <path d="M-7 4 L0 -10 L7 4 Z" fill="#1d3247" stroke={C.accent2} />
        <path d="M-4 4 L-7 9 M4 4 L7 9" stroke={C.accent2} />
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill={C.dim}>
        <text x="22" y="22">vx  0.42</text>
        <text x="82" y="22">vy -1.10</text>
        <text x="142" y="22">alt 12.4</text>
      </g>
    </>
  )
}

export function ProjectThumbnail({ project, className = '' }: { project: Project; className?: string }) {
  if (project.thumbnailImage) {
    return (
      <img
        src={project.thumbnailImage}
        alt=""
        loading="lazy"
        decoding="async"
        className={`aspect-video w-full object-cover ${className}`}
      />
    )
  }
  return (
    <svg viewBox="0 0 320 180" className={`block aspect-video w-full ${className}`} role="img" aria-label={`${project.title} schematic`}>
      <Grid />
      {project.thumbnail === 'aegis' && <Aegis />}
      {project.thumbnail === 'social' && <Social />}
      {project.thumbnail === 'lander' && <Lander />}
      {project.thumbnail === 'quiz' && <Quiz />}
    </svg>
  )
}
