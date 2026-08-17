import type { Blog, Career, Course, Event } from '@/lib/data'
import type { HomeFaqItem } from '@/data/home-faqs'
import { DEFAULT_OG_IMAGE, SITE_URL, canonicalUrl } from '@/lib/site'
import { SOCIAL_LINKS } from '@/lib/social'
import { COMPANY_ADDRESS, COMPANY_LEGAL_NAME } from '@/lib/company'

export type JsonLdObject = Record<string, unknown>

const LOGO_URL = `${SITE_URL}/media/icon-192.png`
const ORG_IMAGE = `${SITE_URL}/media/images/students/practical-learning.png`
const DEFAULT_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE}`

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: COMPANY_ADDRESS.streetAddress,
  addressLocality: COMPANY_ADDRESS.addressLocality,
  addressRegion: COMPANY_ADDRESS.addressRegion,
  postalCode: COMPANY_ADDRESS.postalCode,
  addressCountry: COMPANY_ADDRESS.addressCountry,
} as const

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${path}`
}

function pageUrl(path: string): string {
  return canonicalUrl(path)
}

function faqAnswerText(item: HomeFaqItem | { q: string; a: string }): string {
  if ('bullets' in item && item.bullets?.length) {
    const lead = item.a ? `${item.a} ` : ''
    return `${lead}${item.bullets.join('; ')}`.trim()
  }
  return item.a ?? ''
}

/** Academy / CollegeOrUniversity — sitewide identity. */
export function collegeOrUniversitySchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    '@id': ORG_ID,
    name: 'Pixl Pluz Academy',
    alternateName: ['PixlPluz', 'Pixl Pluz', 'PixlPluz Academy', COMPANY_LEGAL_NAME],
    legalName: COMPANY_LEGAL_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: ORG_IMAGE,
    description:
      "Kerala's AI-integrated digital marketing and tech academy in Kochi. Practical courses, mentorship, and a merit-based scholarship program.",
    telephone: '+91-98955-01234',
    email: 'office@pixlpluz.com',
    address: POSTAL_ADDRESS,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  }
}

/** Local ProfessionalService entity (campus / enquiry contact). */
export function professionalServiceSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': LOCAL_BUSINESS_ID,
    name: 'Pixl Pluz',
    alternateName: 'Pixl Pluz Academy',
    image: ORG_IMAGE,
    url: SITE_URL,
    telephone: '+91-98955-01234',
    email: 'office@pixlpluz.com',
    address: POSTAL_ADDRESS,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Kerala',
    },
    parentOrganization: { '@id': ORG_ID },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  }
}

/** Sitewide WebSite node (no SearchAction — site has no public search). */
export function websiteSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Pixl Pluz Academy',
    alternateName: 'PixlPluz',
    url: SITE_URL,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  }
}

/** Global graphs injected once in the root layout. */
export function globalSchemas(): JsonLdObject[] {
  return [
    collegeOrUniversitySchema(),
    professionalServiceSchema(),
    websiteSchema(),
  ]
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  }
}

type WebPageInput = {
  path: string
  name: string
  description: string
  image?: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
  /** Homepage / long-form sections Google can map as parts of the page. */
  sections?: { name: string; id: string }[]
}

export function webPageSchema({
  path,
  name,
  description,
  image = DEFAULT_IMAGE,
  type = 'WebPage',
  sections,
}: WebPageInput): JsonLdObject {
  const url = pageUrl(path)
  const schema: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(image),
    },
  }

  if (sections?.length) {
    schema.hasPart = sections.map((section) => ({
      '@type': 'WebPageElement',
      '@id': `${url}#${section.id}`,
      name: section.name,
      url: `${url}#${section.id}`,
      isPartOf: { '@id': `${url}#webpage` },
    }))
  }

  return schema
}

export function faqPageSchema(
  faqs: Array<HomeFaqItem | { q: string; a: string }>,
): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerText(faq),
      },
    })),
  }
}

export function courseSchema(course: Course): JsonLdObject {
  const url = pageUrl(`/courses/${course.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${url}#course`,
    name: course.title,
    description: course.description || course.shortDescription,
    url,
    image: absoluteUrl(course.thumbnail),
    provider: { '@id': ORG_ID },
    educationalLevel: course.level,
    timeRequired: course.duration,
    teaches: course.tags,
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      priceCurrency: 'INR',
      price: course.price,
      url,
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['onsite', 'online'],
      location: {
        '@type': 'Place',
        name: 'Pixl Pluz Academy',
        address: POSTAL_ADDRESS,
      },
    },
  }
}

export function courseListSchema(courses: Course[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pixl Pluz Academy Courses',
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.title,
      url: pageUrl(`/courses/${course.slug}`),
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.shortDescription,
        url: pageUrl(`/courses/${course.slug}`),
        provider: { '@id': ORG_ID },
      },
    })),
  }
}

export function blogPostingSchema(blog: Blog): JsonLdObject {
  const url = pageUrl(`/blog/${blog.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: blog.title,
    description: blog.excerpt,
    image: absoluteUrl(blog.thumbnail),
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      '@type': 'Organization',
      name: blog.author || 'Pixl Pluz Team',
      url: SITE_URL,
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    keywords: blog.tags,
    articleSection: blog.category,
    url,
    inLanguage: 'en-IN',
  }
}

export function blogListSchema(blogs: Blog[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pixl Pluz Academy Blog',
    itemListElement: blogs.map((blog, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: blog.title,
      url: pageUrl(`/blog/${blog.slug}`),
    })),
  }
}

export function jobPostingSchema(career: Career): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: career.title,
    description: [
      career.description,
      'Responsibilities:',
      ...career.responsibilities.map((r) => `• ${r}`),
      'Requirements:',
      ...career.requirements.map((r) => `• ${r}`),
    ].join('\n'),
    datePosted: career.postedDate,
    validThrough: career.deadline || undefined,
    employmentType:
      career.type === 'Full-time'
        ? 'FULL_TIME'
        : career.type === 'Part-time'
          ? 'PART_TIME'
          : 'INTERN',
    hiringOrganization: { '@id': ORG_ID },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: career.location || 'Kochi',
        addressRegion: 'Kerala',
        addressCountry: 'IN',
      },
    },
    directApply: true,
    url: pageUrl('/career'),
  }
}

export function eventSchema(event: Event): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    image: absoluteUrl(event.thumbnail),
    startDate: event.date,
    eventAttendanceMode:
      event.type === 'Online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location:
      event.type === 'Online'
        ? {
            '@type': 'VirtualLocation',
            url: event.registrationUrl || pageUrl('/event'),
          }
        : {
            '@type': 'Place',
            name: event.location || 'Pixl Pluz Academy',
            address: POSTAL_ADDRESS,
          },
    organizer: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      price: event.isFree ? 0 : event.price,
      priceCurrency: 'INR',
      url: event.registrationUrl || pageUrl('/event'),
      availability: 'https://schema.org/InStock',
    },
  }
}

/** Homepage section anchors (must match live `id` attributes where present). */
export const HOME_SECTIONS = [
  { name: 'Hero', id: 'hero' },
  { name: 'About Pixl Pluz', id: 'about' },
  { name: 'Our Courses', id: 'courses' },
  { name: 'Pixl Pluz Advantage', id: 'advantage' },
  { name: 'Mentors', id: 'mentors' },
  { name: 'AI Tools', id: 'ai-tools' },
  { name: 'Scholarship', id: 'scholarship' },
  { name: 'Contact', id: 'contact' },
  { name: 'Blog', id: 'blog' },
  { name: 'FAQ', id: 'faq' },
] as const
