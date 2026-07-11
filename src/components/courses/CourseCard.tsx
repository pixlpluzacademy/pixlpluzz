import Link from 'next/link'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import type { Course } from '@/lib/data'
import { getCourseImage, LEVEL_STYLES } from '@/lib/course-assets'
import { cn } from '@/lib/utils'

export function CourseCard({ course }: { course: Course }) {
  const image = getCourseImage(course.slug)

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        'course-card group flex flex-col overflow-hidden',
        'bg-navy-800/80 border border-white/8',
        'transition-all duration-300 hover:border-green-accent/40 hover:shadow-lg hover:shadow-green-accent/10',
      )}
    >
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <Image
          src={image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
        <span
          className={cn(
            'absolute top-3 left-3 rounded-sm border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm',
            LEVEL_STYLES[course.level] ?? LEVEL_STYLES.Beginner,
          )}
        >
          {course.level}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="mb-2 text-base font-bold leading-snug text-white group-hover:text-green-accent transition-colors line-clamp-2">
          {course.title}
        </h2>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-white/60 line-clamp-3">
          {course.shortDescription}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-white/50">
          <BookOpen size={14} className="shrink-0 text-white/55" />
          <span>{course.lessons} Lessons</span>
        </div>
      </div>
    </Link>
  )
}
