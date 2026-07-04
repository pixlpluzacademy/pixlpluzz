export type WordTone = 'hero' | 'blue' | 'green' | 'dim'

export interface CloudWord {
  text: string
  x: number
  y: number
  sizeRem: number
  tone: WordTone
  rotation: number
}

/** Positions traced from the FOCUS word-cloud reference, mapped to Pixl Pluz services. */
export const SERVICE_CLOUD_WORDS: CloudWord[] = [
  { text: 'LEARN', x: 0, y: -5, sizeRem: 0, tone: 'hero', rotation: 0 },

  { text: 'MENTOR', x: -360, y: -76, sizeRem: 0.95, tone: 'dim', rotation: 0 },
  { text: 'MEDIA', x: -346, y: -39, sizeRem: 1.0, tone: 'blue', rotation: 0 },
  { text: 'CODING', x: -369, y: 2, sizeRem: 1.5, tone: 'green', rotation: 0 },
  { text: 'DESIGN', x: -357, y: 42, sizeRem: 1.0, tone: 'dim', rotation: 0 },
  { text: 'BUILD', x: -279, y: -5, sizeRem: 1.1, tone: 'blue', rotation: -90 },

  { text: 'SEO', x: -116, y: -171, sizeRem: 1.1, tone: 'dim', rotation: 0 },
  { text: 'WEB DEV', x: -129, y: -135, sizeRem: 1.5, tone: 'green', rotation: 0 },
  { text: 'MARKETING', x: -160, y: -88, sizeRem: 2.1, tone: 'blue', rotation: 0 },

  { text: 'AI TOOLS', x: -31, y: -109, sizeRem: 0.9, tone: 'dim', rotation: -90 },
  { text: 'DATA', x: 0, y: -155, sizeRem: 1.1, tone: 'green', rotation: -90 },
  { text: 'CYBER', x: 31, y: -186, sizeRem: 0.8, tone: 'dim', rotation: -90 },

  { text: 'PLACEMENT', x: 158, y: -171, sizeRem: 1.9, tone: 'blue', rotation: 0 },
  { text: 'PROJECTS', x: 150, y: -129, sizeRem: 1.5, tone: 'green', rotation: 0 },
  { text: 'SCHOLAR', x: 150, y: -85, sizeRem: 1.3, tone: 'blue', rotation: 0 },
  { text: 'MENTORS', x: 220, y: -98, sizeRem: 0.75, tone: 'dim', rotation: -90 },
  { text: 'CAREER', x: 271, y: -135, sizeRem: 1.0, tone: 'dim', rotation: 0 },
  { text: 'GROWTH', x: 305, y: -98, sizeRem: 1.2, tone: 'green', rotation: 0 },

  { text: 'PORTFOLIO', x: 310, y: -12, sizeRem: 1.0, tone: 'blue', rotation: -90 },
  { text: 'LIVE LAB', x: 372, y: -16, sizeRem: 1.3, tone: 'green', rotation: 0 },
  { text: 'INTERNS', x: 391, y: 23, sizeRem: 1.3, tone: 'blue', rotation: 0 },
  { text: 'JOBS', x: 349, y: 57, sizeRem: 1.2, tone: 'dim', rotation: 0 },

  { text: 'GLOBAL', x: -214, y: 116, sizeRem: 1.7, tone: 'green', rotation: 0 },
  { text: 'DAILY', x: -198, y: 160, sizeRem: 1.4, tone: 'blue', rotation: 0 },
  { text: 'SKILLS', x: -99, y: 155, sizeRem: 1.5, tone: 'green', rotation: -90 },
  { text: 'RESEARCH', x: -60, y: 135, sizeRem: 0.8, tone: 'dim', rotation: -90 },

  { text: 'COMMIT', x: 96, y: 113, sizeRem: 1.9, tone: 'blue', rotation: 0 },
  { text: 'INSPIRE', x: 65, y: 163, sizeRem: 1.5, tone: 'green', rotation: 0 },
  { text: 'UPDATES', x: 217, y: 160, sizeRem: 1.0, tone: 'dim', rotation: 0 },
  { text: 'TOPICS', x: 57, y: 206, sizeRem: 1.4, tone: 'blue', rotation: 0 },
]

export const SERVICE_DETAILS = [
  {
    icon: '/icons/light-mode/14-Digital Marketing.svg',
    title: 'Digital Marketing',
    desc: 'SEO, social media, paid ads and analytics — learn to grow brands with real campaigns.',
  },
  {
    icon: '/icons/light-mode/15-Software& web dev..svg',
    title: 'Web Development',
    desc: 'AI-powered full-stack development with modern frameworks and deployable projects.',
  },
  {
    icon: '/icons/light-mode/analytics.svg',
    title: 'Data Science & AI',
    desc: 'Machine learning, Python, and data pipelines taught with industry datasets.',
  },
  {
    icon: '/icons/light-mode/17-Cyber Security.svg',
    title: 'Cyber Security',
    desc: 'Ethical hacking, network defence, and AI-driven threat detection skills.',
  },
  {
    icon: '/icons/light-mode/16-Media production.svg',
    title: 'Media Production',
    desc: 'Video editing, motion graphics, and content creation for digital platforms.',
  },
  {
    icon: '/icons/light-mode/career.svg',
    title: 'Placement Support',
    desc: 'Portfolio reviews, mock interviews, and direct connections to hiring partners.',
  },
]
