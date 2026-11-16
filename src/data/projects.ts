import type { Category, CategoryId, Project, ProjectStatus } from './types'

export const categories: Category[] = [
  {
    id: 'software-engineering',
    label: 'Software Engineering',
    description: 'Full-stack and backend systems, APIs and multi-service architectures.',
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    description: 'Endpoint telemetry, threat detection and incident response tooling.',
  },
  {
    id: 'game-development',
    label: 'Game Development',
    description: 'Interactive software built with Unity and C#, playable in the browser.',
  },
]

export const statusLabels: Record<ProjectStatus, string> = {
  active: 'Active development',
  completed: 'Completed',
  prototype: 'Prototype',
  planned: 'Planned',
}

/**
 * Centralised project data. Every page (overview, explorer, detail, education)
 * renders from this list — add a project by adding an object here.
 */
export const projects: Project[] = [
  {
    slug: 'aegis',
    title: 'AEGIS',
    subtitle: 'AEGIS-X · Endpoint & SDN threat detection',
    tagline: 'Centralized endpoint monitoring and incident response platform.',
    categories: ['software-engineering', 'cybersecurity'],
    status: 'completed',
    statusNote: 'Final-year B.Tech project',
    year: '2026',
    featured: true,
    tech: [
      'C++17',
      'Java 17',
      'Spring Boot',
      'PostgreSQL',
      'Python',
      'FastAPI',
      'scikit-learn',
      'React',
      'Ryu / OpenFlow',
      'Mininet',
      'Docker',
    ],
    thumbnail: 'aegis',
    // To use your own image instead: put it in public/projects/ and set e.g. thumbnailImage: '/projects/<file>.webp'
    overview: [
      'AEGIS is a multi-component security platform. A Windows endpoint agent and an SDN network sensor send normalised telemetry to a central Spring Boot server, which validates, stores and correlates events, scores risk and opens incidents.',
      'A separate Python service provides Isolation Forest anomaly scores, and a React dashboard gives administrators a view of endpoints, incidents and attack timelines — built entirely from real data received by the server.',
    ],
    problem:
      'Security signals are scattered: endpoint activity, network flows and anomaly scores usually live in separate tools. Small teams and labs need one place that collects telemetry from different sources, correlates it, and turns it into prioritised incidents — without the collection layer, detection logic and presentation being tangled together.',
    architecture: {
      summary:
        'Five independently built components connected through documented HTTP APIs and a shared event contract. The server is the system of record and never depends on how a sensor collected its data.',
      layers: [
        {
          label: 'Telemetry sources',
          nodes: [
            {
              name: 'Endpoint Agent',
              tech: 'C++17 · WinHTTP',
              detail: 'Runs in the background on Windows, normalises events and ships them in batches.',
            },
            {
              name: 'NetShield-X Sensor',
              tech: 'Python · Ryu / OpenFlow',
              detail: 'Collects flow statistics in a Mininet / Open vSwitch lab; observe-only by default.',
            },
          ],
        },
        {
          label: 'Core services',
          nodes: [
            {
              name: 'Central Server',
              tech: 'Java · Spring Boot',
              detail: 'Ingestion, correlation, rule-based detection, risk scoring, incidents and timelines.',
            },
            {
              name: 'ML Service',
              tech: 'Python · FastAPI · scikit-learn',
              detail: 'Isolation Forest model lifecycle, versioning and anomaly scoring.',
            },
            {
              name: 'Database',
              tech: 'PostgreSQL',
              detail: 'Primary store for events, endpoints and incidents.',
            },
          ],
        },
        {
          label: 'Presentation',
          nodes: [
            {
              name: 'Admin Dashboard',
              tech: 'React',
              detail: 'Displays only data analysed by the server — it never generates events.',
            },
          ],
        },
      ],
    },
    implementation: [
      {
        title: 'Reliable delivery from the agent',
        detail:
          'The agent spools events to disk while the server is unreachable and replays them on reconnection; the server stores each event once. Batches that keep failing validation are quarantined so one bad batch cannot block the queue.',
      },
      {
        title: 'Strict component boundaries',
        detail:
          'Agents and the SDN sensor speak a shared, documented event schema. The server owns authentication, storage, correlation and final risk; the ML service only owns model training, versioning and inference.',
      },
      {
        title: 'Safe-by-default network response',
        detail:
          'NetShield-X runs observe-only. A temporary OpenFlow DROP rule is installed only when an administrator requests enforcement, the sensor is explicitly configured to allow it and the source is inside a private lab range. Every action is audited and expires through a hard timeout.',
      },
      {
        title: 'Secrets and network exposure',
        detail:
          'Secrets live only in environment configuration and the server refuses to start with placeholder values. The agent API key is stored DPAPI-encrypted, the database and ML service bind to loopback, and the admin API is restricted to an allow-listed CIDR range.',
      },
      {
        title: 'Optional incident alerting',
        detail:
          'HIGH and CRITICAL incidents can trigger email alerts once per incident plus once on escalation. Disabled by default and covered by tests using a mocked mail sender.',
      },
    ],
    challenges: [
      {
        challenge: 'Losing telemetry when the server or network is down.',
        solution:
          'Added a local spool with replay, server-side de-duplication and quarantine for poison batches, verified with end-to-end tests that simulate outages and 401 re-registration.',
      },
      {
        challenge: 'Letting a detection system take network action without causing damage.',
        solution:
          'Designed mitigation as an opt-in, multi-gate workflow with dry-run mode, lab-only address ranges, audit records and automatic rule expiry.',
      },
      {
        challenge: 'Keeping five components in different languages consistent.',
        solution:
          'Defined a single event and incident contract and tested each component against it independently (C++, Java, Python and React test suites).',
      },
    ],
    highlights: [
      { label: 'Components', value: '5' },
      { label: 'Languages', value: 'C++ · Java · Python · TS' },
      { label: 'Automated tests', value: '110+' },
    ],
    screenshots: [],
  },
  {
    slug: 'techy',
    title: 'Techy',
    subtitle: 'Developer Social Network',
    tagline: 'A full-stack social platform for developers to share technical content, progress and projects.',
    categories: ['software-engineering'],
    status: 'active',
    featured: true,
    tech: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Spring Data JPA', 'Hibernate', 'PostgreSQL', 'React', 'REST APIs'],
    thumbnail: 'social',
    // To use your own image instead: put it in public/projects/ and set e.g. thumbnailImage: '/projects/<file>.webp'
    overview: [
      'Techy is a social platform designed for developers. Users create profiles, publish posts about what they are building or learning, follow other developers and interact through likes and comments.',
      'An interest-based personalised feed surfaces content that matches what each user cares about, instead of a purely chronological timeline.',
    ],
    problem:
      'General-purpose social networks bury technical content under unrelated posts. Developers need a focused space to share learning progress and projects, and a feed that reflects their technical interests.',
    architecture: {
      summary:
        'A React single-page application talks to a stateless Spring Boot REST API secured with JWT. The backend follows a layered Controller → Service → Repository design on top of PostgreSQL.',
      layers: [
        {
          label: 'Client',
          nodes: [{ name: 'Web Client', tech: 'React', detail: 'Profiles, feed, post composer, follow and interaction UI.' }],
        },
        {
          label: 'API',
          nodes: [
            { name: 'Security', tech: 'Spring Security · JWT', detail: 'Stateless token authentication on every request.' },
            { name: 'Controllers', tech: 'Spring Web · REST', detail: 'Request validation and HTTP mapping.' },
            { name: 'Services', tech: 'Spring Boot', detail: 'Business rules: feed ranking, follows, interactions.' },
          ],
        },
        {
          label: 'Persistence',
          nodes: [
            { name: 'Repositories', tech: 'Spring Data JPA · Hibernate', detail: 'Entity mapping and queries.' },
            { name: 'Database', tech: 'PostgreSQL', detail: 'Users, posts, comments, likes, follow graph.' },
          ],
        },
      ],
    },
    implementation: [
      {
        title: 'JWT-based authentication',
        detail: 'Stateless authentication with Spring Security filters, so the API can scale horizontally without server-side sessions.',
      },
      {
        title: 'Social graph',
        detail: 'Follow / unfollow relationships modelled as entities, with user profiles, posts, likes and comments.',
      },
      {
        title: 'Interest-based feed',
        detail: 'Posts are matched against each user’s declared interests to build a personalised feed.',
      },
      {
        title: 'Layered backend',
        detail: 'Controller–Service–Repository separation keeps HTTP concerns, business logic and persistence independent for maintainability and future scaling.',
      },
    ],
    challenges: [
      {
        challenge: 'Keeping the feed relevant without a heavy recommendation system.',
        solution: 'Used user interests as a lightweight ranking signal that can be computed directly in the service layer.',
      },
      {
        challenge: 'Keeping the codebase maintainable as features grew.',
        solution: 'Enforced the layered architecture so new features add a controller, service and repository without cross-cutting changes.',
      },
    ],
    screenshots: [],
  },
  {
    slug: 'kitty-lander',
    title: 'Kitty Lander',
    subtitle: 'Physics-based 2D landing game',
    tagline: 'A physics-driven landing game built with Unity and C#, designed to run in the browser.',
    categories: ['game-development'],
    status: 'completed',
    statusNote: 'Playable in the browser',
    featured: true,
    tech: ['C#', 'Unity', 'Unity 2D Physics', 'WebGL'],
    thumbnail: 'lander',
    thumbnailImage: '/projects/KittyLanderIcon.webp',
    // To use your own image instead: put it in public/projects/ and set e.g. thumbnailImage: '/projects/<file>.webp'
    overview: [
      'Kitty Lander is a 2D landing game where the player controls a spacecraft and must touch down safely by managing thrust, steering and descent speed.',
      'The project focuses on gameplay systems: physics-driven movement, landing condition checks and a UI that gives the player clear feedback.',
    ],
    problem:
      'Build a small but complete interactive application end-to-end: responsive controls, believable physics and clear state handling for success and failure — the same engineering concerns as any event-driven software.',
    architecture: {
      summary: 'Input is read each frame, converted into forces on the lander, and the resulting state is evaluated against landing rules that drive the UI.',
      layers: [
        { label: 'Input', nodes: [{ name: 'Input Handling', tech: 'C# · Unity Input', detail: 'Thrust and steering commands.' }] },
        {
          label: 'Simulation',
          nodes: [
            { name: 'Lander Controller', tech: 'Unity 2D Physics', detail: 'Applies thrust and steering forces; gravity and collisions are physics-driven.' },
            { name: 'Landing Rules', tech: 'C#', detail: 'Checks the lander’s state on touchdown to decide a safe landing or a crash.' },
          ],
        },
        { label: 'Presentation', nodes: [{ name: 'Game UI', tech: 'Unity UI', detail: 'Gameplay feedback and state screens.' }] },
      ],
    },
    implementation: [
      { title: 'Physics-driven movement', detail: 'Spacecraft navigation uses Unity’s 2D physics so thrust, gravity and momentum interact naturally.' },
      { title: 'Landing conditions', detail: 'Core gameplay systems evaluate the lander’s state on contact to determine a controlled landing or a crash.' },
      { title: 'Gameplay UI', detail: 'Designed and integrated the UI that gives the player feedback during play.' },
    ],
    challenges: [
      {
        challenge: 'Making controls feel responsive while staying physics-based.',
        solution: 'Tuned forces and handled input separately from physics updates so movement stays consistent across frame rates.',
      },
    ],
    screenshots: [],
    game: {
      id: 'kitty-lander',
      // Build files are copied in by `npm run sync:kitty-lander` (Brotli-compressed, ~14.4 MB).
      buildUrl: '/games/kitty-lander/Build',
      loaderFile: 'Web.loader.js',
      dataFile: 'Web.data.br',
      frameworkFile: 'Web.framework.js.br',
      codeFile: 'Web.wasm.br',
      embedUrl: '/games/kitty-lander/index.html?embed=1',
      companyName: 'Om Shinde',
      productName: 'Kitty Lander',
      productVersion: '1.0',
      aspectRatio: 16 / 9,
      available: true,
      controls: [
        { keys: 'W / ↑ / Space', action: 'Thrust' },
        { keys: 'A D / ← →', action: 'Steer' },
        { keys: 'R', action: 'Restart' },
        { keys: 'P / Esc', action: 'Pause' },
        { keys: 'F', action: 'Fullscreen' },
      ],
      notes: 'Best played on a desktop browser with a keyboard. 11 levels · ~14 MB download.',
    },
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function projectsInCategory(id: CategoryId) {
  return projects.filter((p) => p.categories.includes(id))
}

export function categoryLabel(id: CategoryId) {
  return categories.find((c) => c.id === id)?.label ?? id
}
