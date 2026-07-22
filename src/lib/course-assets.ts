export const COURSE_IMAGES: Record<string, string> = {
  'digital-marketing-course': '/images/courses/digital-marketing.jpeg',
  'ai-powered-web-development-course': '/images/courses/web-development.jpeg',
  'data-science-ai-course': '/images/courses/data-science.jpeg',
  'cyber-security-course-with-ai': '/images/courses/cyber-security.jpeg',
}

export const DEFAULT_COURSE_IMAGE = '/images/courses/digital-marketing.jpeg'

/** Courses page hero background (student photo). */
export const COURSES_PAGE_HERO_IMAGE = '/images/students/group-discussion.jpeg'

/** Resolves a course hero/card image — slug map first, then fallback. */
export function getCourseImage(slug: string): string {
  return COURSE_IMAGES[slug] ?? DEFAULT_COURSE_IMAGE
}

export const LEVEL_STYLES: Record<string, string> = {
  Beginner: 'bg-navy-950/90 text-white/75 border-white/15 backdrop-blur-sm',
  Intermediate: 'bg-navy-950/90 text-white/75 border-white/15 backdrop-blur-sm',
  Expert: 'bg-navy-950/90 text-white/75 border-white/15 backdrop-blur-sm',
}

/** AI tools taught / used per course — at least 10 each for the hero carousel. */
const COURSE_AI_TOOLS: Record<string, string[]> = {
  'digital-marketing-course': [
    'ChatGPT',
    'Claude',
    'Gemini',
    'Perplexity',
    'Jasper',
    'Copy.ai',
    'Midjourney',
    'Canva Magic Studio',
    'Surfer SEO AI',
    'Notion AI',
    'Zapier',
    'Make',
  ],
  'ai-powered-web-development-course': [
    'ChatGPT',
    'Claude',
    'Cursor',
    'GitHub Copilot',
    'Gemini',
    'v0',
    'Bolt',
    'Windsurf',
    'Replit AI',
    'Lovable',
    'Continue',
    'Tabnine',
  ],
  'data-science-ai-course': [
    'ChatGPT',
    'Claude',
    'Gemini',
    'Cursor',
    'GitHub Copilot',
    'Google Colab',
    'Hugging Face',
    'LangChain',
    'Perplexity',
    'Jupyter AI',
    'Weights & Biases',
    'Notion AI',
  ],
  'cyber-security-course-with-ai': [
    'ChatGPT',
    'Claude',
    'Gemini',
    'Cursor',
    'GitHub Copilot',
    'Perplexity',
    'Microsoft Security Copilot',
    'VirusTotal',
    'Splunk AI',
    'CrowdStrike Charlotte AI',
    'Hugging Face',
    'Notion AI',
  ],
}

const DEFAULT_AI_TOOLS = [
  'ChatGPT',
  'Claude',
  'Gemini',
  'Cursor',
  'GitHub Copilot',
  'Perplexity',
  'Midjourney',
  'Notion AI',
  'Zapier',
  'Lovable',
]

export function getCourseAiTools(slug: string): string[] {
  return COURSE_AI_TOOLS[slug] ?? DEFAULT_AI_TOOLS
}
