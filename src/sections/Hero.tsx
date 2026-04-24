import { useRef } from 'react'
import { useParticleCanvas } from '../hooks/useParticleCanvas'
import { SmartCTA } from '@/components/SmartCTA'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticleCanvas(canvasRef, { particleCount: 8000, opacity: 1, noDither: false, timeScale: 1 })

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ cursor: 'crosshair' }}
      />

      {/* Radial gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, rgba(4,10,20,0.85) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-[72px] max-w-[800px]">
        <span className="font-sans font-medium text-[12px] uppercase tracking-[0.15em] text-teal mb-6">
          Business Systems & Automation
        </span>
        <h1 className="font-space font-bold text-[40px] md:text-[64px] text-cream leading-[1.1] tracking-[-0.04em]">
          <span className="block">We Build Systems</span>
          <span className="block">That Run Your Business</span>
        </h1>
        <p className="font-sans font-normal text-[16px] md:text-[20px] text-slate max-w-[560px] mt-6 leading-relaxed">
          From booking platforms to internal dashboards, we engineer the tools that replace manual work with intelligent automation.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <SmartCTA action="book" variant="primary">
            Book a Strategy Call
          </SmartCTA>
          <SmartCTA action="scroll" scrollTarget="#projects" variant="secondary">
            View Our Work
          </SmartCTA>
        </div>
      </div>

      {/* Trust bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 glass-nav border-t border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap justify-center md:justify-between gap-6 md:gap-0">
          {[
            { num: '40+', label: 'Systems Built' },
            { num: '15+', label: 'Industries' },
            { num: '99%', label: 'Uptime' },
            { num: '24h', label: 'Support' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-sans font-bold text-[24px] text-orange">{stat.num}</span>
              <span className="font-sans font-normal text-[12px] text-slate uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
