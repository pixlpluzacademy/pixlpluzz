// Blog thumbnails in blogs.json point to files that don't exist —
// assign each post a distinct photo from /public/images by its position.

const BLOG_IMAGES = [
  '/images/students.jpg',
  '/images/class2.jpg',
  '/images/graduation.jpg',
  '/images/student2.jpg',
  '/images/students2.jpg',
  '/images/graduation2.jpg',
]

/** Stable, distinct image per post index. */
export function getBlogImage(index: number): string {
  return BLOG_IMAGES[index % BLOG_IMAGES.length]
}
