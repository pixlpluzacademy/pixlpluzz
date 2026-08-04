import type { MetadataRoute } from 'next'
import { getBlogs, getCourses } from '@/lib/data'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/courses`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/scholarship`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/placement`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/career`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/event`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  const courseRoutes: MetadataRoute.Sitemap = getCourses().map((course) => ({
    url: `${SITE_URL}/courses/${course.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = getBlogs().map((blog) => ({
    url: `${SITE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...courseRoutes, ...blogRoutes]
}
