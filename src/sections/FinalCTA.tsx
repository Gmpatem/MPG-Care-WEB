import { useRef } from 'react'
import { useParticleCanvas } from '../hooks/useParticleCanvas'
import { SmartCTA } from '@/components/SmartCTA'

export function FinalCTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticleCanvas(canvasRef, {
    particleCount: 4000,
    opacity: 0.6,
    noDither: true,
    timeScale: 0.5,
  })

  return (
    <section
      id="cta"
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Secondary particle canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(4,10,20,0.95) 0%, rgba(4,10,20,0.7) 50%, rgba(4,10,20,0.95) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[700px]">
        <h2 className="font-space font-bold text-[36px] md:text-[56px] text-cream leading-[1.1] tracking-[-0.04em] mb-6">
          Ready to Turn Your Business Into a System?
        </h2>
        <p className="font-sans font-normal text-[16px] md:text-[18px] text-slate leading-relaxed max-w-[520px] mx-auto mb-10">
          Book a free 30-minute strategy call. We'll map your current workflow and identify the first system to build.
        </p>
        <div className="flex flex-col items-center gap-4">
          <SmartCTA action="book" variant="primary" className="!px-10 !py-4 !text-[16px] md:!text-[18px]">
            Book Your Free Call
          </SmartCTA>
          <SmartCTA action="contact" variant="text">
            Start a Project
          </SmartCTA>
        </div>
      </div>
    </section>
  )
}
