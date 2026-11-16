export type CategoryId = 'software-engineering' | 'cybersecurity' | 'game-development'

export interface Category {
  id: CategoryId
  label: string
  description: string
}

export type ProjectStatus = 'active' | 'completed' | 'prototype' | 'planned'

export type ThumbnailVariant = 'aegis' | 'social' | 'lander'

export interface ArchitectureNode {
  name: string
  tech: string
  detail?: string
}

export interface ArchitectureLayer {
  label: string
  nodes: ArchitectureNode[]
}

export interface Screenshot {
  /** Path under /public, e.g. '/projects/aegis/dashboard.webp' */
  src: string
  caption: string
}

/** Configuration for a Unity WebGL build stored in /public/games/<id>/ */
export interface GameConfig {
  id: string
  /** Folder that contains the Unity build files, e.g. '/games/kitty-lander/Build' */
  buildUrl: string
  /** File names as produced by Unity's WebGL build (e.g. 'KittyLander.loader.js') */
  loaderFile: string
  dataFile: string
  frameworkFile: string
  codeFile: string
  streamingAssetsUrl?: string
  /**
   * Optional: the build's own page (e.g. '/games/kitty-lander/index.html?embed=1').
   * When set, the game runs in an isolated iframe instead of directly in this page, and
   * reports progress back via postMessage ({ source, type: 'progress' | 'ready' | 'error' }).
   */
  embedUrl?: string
  companyName: string
  productName: string
  productVersion: string
  /** width / height of the game viewport */
  aspectRatio: number
  /** Set to true once the build has been copied into /public/games/<id>/ */
  available: boolean
  controls: { keys: string; action: string }[]
  notes?: string
}

export interface Project {
  slug: string
  title: string
  subtitle?: string
  tagline: string
  categories: CategoryId[]
  status: ProjectStatus
  statusNote?: string
  year?: string
  featured: boolean
  tech: string[]
  thumbnail: ThumbnailVariant
  /** Optional real image; overrides the generated thumbnail. */
  thumbnailImage?: string
  repo?: string
  demo?: string
  overview: string[]
  problem: string
  architecture: {
    summary: string
    layers: ArchitectureLayer[]
  }
  implementation: { title: string; detail: string }[]
  challenges: { challenge: string; solution: string }[]
  highlights?: { label: string; value: string }[]
  screenshots: Screenshot[]
  game?: GameConfig
}
