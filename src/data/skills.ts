export interface SkillGroup {
  id: string
  label: string
  items: string[]
  note?: string
}

/** No ratings or percentages — just what is used, grouped by area. */
export const skillGroups: SkillGroup[] = [
  { id: 'languages', label: 'Languages', items: ['C++', 'Java', 'JavaScript', 'Python', 'C#'] },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'JDBC', 'REST APIs', 'Node.js'],
  },
  { id: 'frontend', label: 'Frontend', items: ['React', 'HTML', 'CSS', 'JavaScript'] },
  { id: 'systems', label: 'Systems', items: ['Linux', 'Operating Systems', 'TCP/IP', 'POSIX Threads', 'Multithreading'] },
  { id: 'databases', label: 'Databases', items: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB'] },
  {
    id: 'tools',
    label: 'Tools',
    items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Maven', 'Postman', 'Wireshark', 'Unity'],
  },
  {
    id: 'core',
    label: 'Core Computer Science',
    items: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'DBMS',
      'Computer Networks',
      'Operating Systems',
      'Computer Architecture',
    ],
  },
]

/** Compact summary used on the overview page. */
export const skillSummary = skillGroups.filter((g) =>
  ['languages', 'backend', 'systems', 'databases'].includes(g.id),
)
