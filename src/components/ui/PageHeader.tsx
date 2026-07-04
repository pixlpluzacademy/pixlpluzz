import { FloatingPixels } from '@/components/ui/FloatingPixels'
import { NoiseParticles } from '@/components/ui/NoiseParticles'

interface PageHeaderProps {
  breadcrumb: string
  title: string
  subtitle?: string
  /** Adds a subtle flickering dot layer behind the title */
  noise?: boolean
}

export function PageHeader({ breadcrumb, title, subtitle, noise = false }: PageHeaderProps) {
  return (
    <section className="relative bg-navy-950 py-20 px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 pixel-grid-bg opacity-15" aria-hidden />
      {noise && <NoiseParticles />}
      <FloatingPixels pixels={[
        { size: 8,  top: '30%', left: '5%',  delay: '0s',   color: 'green', speed: 'slow' },
        { size: 6,  top: '60%', right: '8%', delay: '0.8s', color: 'blue',  speed: 'normal' },
        { size: 10, top: '20%', right: '15%',delay: '0.4s', color: 'white', speed: 'fast' },
      ]} />
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
          Home / {breadcrumb}
        </p>
        <h1 className="text-5xl sm:text-6xl font-black text-white">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">{subtitle}</p>
        )}
      </div>
      {/* Curved bottom */}
      <div
        className="absolute -bottom-1 inset-x-0 h-12 bg-navy-950"
        style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}
      />
    </section>
  )
}
