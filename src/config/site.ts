/**
 * Site-wide identity and links. Edit this file to change contact details.
 * Leave a link empty ('') to hide it everywhere it is used.
 */
export const site = {
  name: 'Om Shinde',
  displayName: 'OM SHINDE',
  initials: 'OS',
  /** Profile photo (public/images). Replace the files to change it. */
  photo: '/images/profile.webp',
  photoSmall: '/images/profile-sm.webp',
  headline: 'Software Engineer | Java · C# · C++ | Systems & Software Development',
  intro:
    'I enjoy building reliable software systems and exploring the engineering principles behind them. My interests include software development, system design, software architecture, and problem-solving.',
  location: 'Navi Mumbai, India',
  email: 'omshinde24102004@gmail.com',
  github: 'https://github.com/omshindee' as string,
  linkedin: 'https://www.linkedin.com/in/om-shinde-9bb000209/',
  /** Public URL after deployment; used for canonical/OG tags and the sitemap. */
  url: 'https://omshinde.pages.dev',
} as const

export const navItems = [
  { to: '/', label: 'Overview', short: 'Overview', path: '~/overview' },
  { to: '/about', label: 'About', short: 'About', path: '~/about' },
  { to: '/projects', label: 'Projects', short: 'Projects', path: '~/projects' },
  { to: '/skills', label: 'Technical Skills', short: 'Skills', path: '~/skills' },
  { to: '/education', label: 'Experience / Education', short: 'Experience', path: '~/education' },
  { to: '/contact', label: 'Contact', short: 'Contact', path: '~/contact' },
] as const
