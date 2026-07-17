import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'src', 'data')

function readJSON<T>(filename: string): T[] {
  const filePath = path.join(dataDir, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as T[]
}

function writeJSON<T>(filename: string, data: T[]): void {
  const filePath = path.join(dataDir, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

/* ─── Types ─────────────────────────────────────────────── */
export interface Course {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Expert'
  duration: string
  durationHours: string
  lessons: number
  price: number
  instructor: string
  instructorEmail: string
  thumbnail: string
  videoUrl: string
  featured: boolean
  tags: string[]
  features: string[]
  curriculum: {
    title: string
    description: string
    lessons: { title: string; locked: boolean }[]
  }[]
  faqs: { q: string; a: string }[]
}

export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  thumbnail: string
  views: number
  tags: string[]
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'Online' | 'Offline'
  thumbnail: string
  registrationUrl: string
  seats: number
  price: number
  isFree: boolean
}

export interface PlacementStudent {
  id: string
  name: string
  photo: string
  course: string
  company: string
  role: string
  batch: string
  testimonial: string
}

export interface Career {
  id: string
  title: string
  type: 'Full-time' | 'Part-time' | 'Internship'
  location: string
  description: string
  requirements: string[]
  responsibilities: string[]
  deadline: string
  postedDate: string
}

/* ─── Courses ────────────────────────────────────────────── */
export const getCourses = (): Course[] => readJSON<Course>('courses.json')
export const getCourse  = (slug: string): Course | undefined =>
  getCourses().find(c => c.slug === slug)
export const getCourseById = (id: string): Course | undefined =>
  getCourses().find(c => c.id === id)
export const saveCourses = (data: Course[]) => writeJSON('courses.json', data)

/* ─── Blogs ──────────────────────────────────────────────── */
export const getBlogs  = (): Blog[] => readJSON<Blog>('blogs.json')
export const getBlog   = (slug: string): Blog | undefined =>
  getBlogs().find(b => b.slug === slug)
export const saveBlogs = (data: Blog[]) => writeJSON('blogs.json', data)

/* ─── Events ─────────────────────────────────────────────── */
export const getEvents  = (): Event[] => readJSON<Event>('events.json')
export const saveEvents = (data: Event[]) => writeJSON('events.json', data)

/* ─── Placement ──────────────────────────────────────────── */
export const getPlacement   = (): PlacementStudent[] => readJSON<PlacementStudent>('placement.json')
export const savePlacement  = (data: PlacementStudent[]) => writeJSON('placement.json', data)

/* ─── Careers ────────────────────────────────────────────── */
export const getCareers  = (): Career[] => readJSON<Career>('careers.json')
export const saveCareer  = (data: Career[]) => writeJSON('careers.json', data)
export const saveCareers = saveCareer
