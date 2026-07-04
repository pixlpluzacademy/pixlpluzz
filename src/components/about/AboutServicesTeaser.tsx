import Link from 'next/link'
import { AboutBlurText } from '@/components/about/AboutBlurText'
import { PixelButton } from '@/components/ui/PixelButton'
import { SERVICE_DETAILS } from '@/lib/services-word-cloud'

const TEASER_SERVICES = SERVICE_DETAILS.slice(0, 4)

export function AboutServicesTeaser() {
  return (
    <section className="px-6 md:px-16 lg:px-20 py-20 md:py-28 border-b border-blue-primary/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="ab-reveal about-kicker mb-3">Our Services</p>
            <AboutBlurText
              as="h2"
              className="about-display text-2xl sm:text-3xl text-white max-w-xl leading-tight"
              text="Practical programs built for digital careers."
            />
          </div>
          <Link href="/services"  className="ab-reveal about-link">
            View All Services  <span aria-hidden>→</span>
          </Link>
        </div>


        <div className="ab-reveal-stagger grid grid-cols-2 lg:grid-cols-4 gap-px bg-blue-primary/20">
          {TEASER_SERVICES.map((item) => (
            <div
              key={item.title}
              className="about-surface flex flex-col gap-3 p-6 md:p-8"
            >
              <img
                src={item.icon.replace('/light-mode/', '/dark-mode/')}
                alt=""
                className="h-9 w-9 object-contain"
              />
              <h3 className="text-sm font-bold text-white md:text-base">{item.title}</h3>
              <p className="about-body text-xs leading-relaxed line-clamp-3">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="ab-reveal mt-8 text-center md:hidden">
          <Link
            href="/services"
            className="text-sm font-semibold uppercase tracking-widest text-green-accent hover:text-blue-primary transition-colors"
          >
            Explore all services →
          </Link>
        </div>
      </div>
    </section>
  )
}
