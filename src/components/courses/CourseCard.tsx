import Link from 'next/link'
import Image from 'next/image'
import type { Course } from '@/lib/data'
import { getCourseImage } from '@/lib/course-assets'
import { cn } from '@/lib/utils'

export function CourseCard({ course }: { course: Course }) {
  const image = getCourseImage(course.slug)

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        'course-card group flex flex-col overflow-hidden',
        'bg-[#141414] border border-white/8',
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
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="mb-2 text-lg font-black leading-snug text-white transition-colors line-clamp-3 group-hover:text-green-accent sm:text-xl">
          {course.title}
        </h2>
        <p className="mb-5 flex-1 text-justify text-sm leading-relaxed text-white/60 line-clamp-3">
          {course.shortDescription}
        </p>
        <p className="text-xs text-white/50">{course.lessons} Lessons</p>
      </div>
    </Link>
  )
}
