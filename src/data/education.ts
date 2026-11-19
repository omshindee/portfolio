export interface EducationEntry {
  institution: string
  qualification: string
  field: string
  location: string
  period: string
  result: string
  current?: boolean
}

export const education: EducationEntry[] = [
  {
    institution: 'Bharati Vidyapeeth (Deemed to be University)',
    qualification: 'Bachelor of Technology (B.Tech.)',
    field: 'Computer Science Engineering',
    location: 'Kharghar, Navi Mumbai',
    period: '2024 – 2027',
    result: 'CGPA 8.45',
    current: true,
  },
  {
    institution: 'Saraswati Institute of Technology',
    qualification: 'Diploma',
    field: 'Information Technology',
    location: 'Kharghar, Navi Mumbai',
    period: '2020 – 2023',
    result: '69.34%',
  },
]

export const certifications = [{ title: 'Proficiency in C/C++', year: '2023' }]

export const interests = [
  {
  title: 'Backend Architecture',
  detail: 'Layered application design, REST API development, database integration, and service development using Spring Boot and ASP.NET Core.'
},
{
  title: 'System Design',
  detail: 'High-Level Design (HLD), Low-Level Design (LLD), SOLID principles, design patterns, scalability, distributed systems, and architectural trade-offs.'
},
]

export const learning = [
  'Concurrency and multithreading in C++ and Java',
  'Distributed system design and reliable messaging',
  'Linux systems programming',
  'Containerised deployment with Docker',
]

export const principles = [
  { title: 'Understand before building', detail: 'Learn how the underlying system works so the solution fits the problem, not the other way round.' },
  { title: 'Clear boundaries', detail: 'Separate components by responsibility and connect them through explicit contracts.' },
  { title: 'Safe defaults', detail: 'Systems should fail safely, keep secrets out of code and never surprise their operators.' },
  { title: 'Verify with evidence', detail: 'Tests and reproducible checks over assumptions — report what actually works.' },
]

export interface ExperienceEntry {
  role: string
  organization: string
  period: string
  type: string
  summary: string
  focus: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Python Intern',
    organization: 'CADD Centre Training Services Pvt Ltd.',
    period: 'Jun 2022 – Aug 2022',
    type: 'Internship',
    summary:
      'Completed a hands-on Python internship covering front-end development, file handling, OOP, application architecture, debugging and testing, with a focus on code optimization and application reliability.',
    focus: ['Python', 'OOP', 'File handling', 'Front-end development', 'Application architecture', 'Debugging', 'Testing'],
  },
]
