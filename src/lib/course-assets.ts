export const COURSE_IMAGES: Record<string, string> = {
  'digital-marketing-course': '/images/students2.jpg',
  'ai-powered-web-development-course': '/images/class2.jpg',
  'data-science-ai-course': '/images/student2.jpg',
  'cyber-security-course-with-ai': '/images/graduation2.jpg',
}

export const DEFAULT_COURSE_IMAGE = '/images/class2.jpg'

/** Resolves a course hero/card image — slug map first, then fallback. */
export function getCourseImage(slug: string): string {
  return COURSE_IMAGES[slug] ?? DEFAULT_COURSE_IMAGE
}

export const LEVEL_STYLES: Record<string, string> = {
  Beginner: 'bg-navy-950/90 text-white/75 border-white/15 backdrop-blur-sm',
  Intermediate: 'bg-navy-950/90 text-white/75 border-white/15 backdrop-blur-sm',
  Expert: 'bg-navy-950/90 text-white/75 border-white/15 backdrop-blur-sm',
}
