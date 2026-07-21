// Blog thumbnails — photos from /public/images/students/

const BLOG_IMAGES = [
  '/images/students/group-discussion.jpeg',
  '/images/students/live-project-training.png',
  '/images/students/clearing-doubts.jpeg',
  '/images/students/practical-learning.png',
  '/images/students/career-placement-support.png',
  '/images/students/interview-preparation.png',
  '/images/students/ai-tools-automation.png',
  '/images/students/verified-portfolio.png',
  '/images/students/industry-expert-mentors.png',
  '/images/students/industry-certification.png',
  '/images/students/scholarship-based-courses.png',
  '/images/students/offer-letter.png',
]

/** Stable, distinct image per post index. */
export function getBlogImage(index: number): string {
  return BLOG_IMAGES[index % BLOG_IMAGES.length]!
}
