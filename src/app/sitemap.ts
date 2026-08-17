import type { MetadataRoute } from 'next'
import { SITEMAP_LASTMOD } from '@/data/sitemap-dates'
import { getBlogs, getCourses } from '@/lib/data'
import { canonicalUrl } from '@/lib/site'

/** Canonical host is apex (non-www): https://pixlpluz.com — matches metadataBase. */
function entry(
  path: string,
  lastModified: string | Date,
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: canonicalUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    entry('/', SITEMAP_LASTMOD.home, 'weekly', 1),
    entry('/courses', SITEMAP_LASTMOD.courses, 'weekly', 0.9),
    entry('/about', SITEMAP_LASTMOD.about, 'monthly', 0.8),
    entry('/scholarship', SITEMAP_LASTMOD.scholarship, 'monthly', 0.7),
    entry('/placement', SITEMAP_LASTMOD.placement, 'monthly', 0.7),
    entry('/blog', SITEMAP_LASTMOD.blog, 'daily', 0.8),
    entry('/contact', SITEMAP_LASTMOD.contact, 'monthly', 0.7),
    entry('/career', SITEMAP_LASTMOD.career, 'monthly', 0.6),
    entry('/event', SITEMAP_LASTMOD.event, 'weekly', 0.6),
  ]

  const courseRoutes: MetadataRoute.Sitemap = getCourses().map((course) =>
    entry(
      `/courses/${course.slug}`,
      SITEMAP_LASTMOD.courseDetail,
      'weekly',
      0.9,
    ),
  )

  const blogRoutes: MetadataRoute.Sitemap = getBlogs().map((blog) =>
    entry(`/blog/${blog.slug}`, blog.date, 'monthly', 0.6),
  )

  // Order: home → courses hub → course money pages → other mains → blog posts
  return [
    staticRoutes[0]!,
    staticRoutes[1]!,
    ...courseRoutes,
    ...staticRoutes.slice(2),
    ...blogRoutes,
  ]
}
