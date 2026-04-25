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
        <h2 className="font-space font-bold text-[32px] md:text-[52px] text-cream leading-[1.1] tracking-[-0.04em] mb-6">
          Ready to turn your idea into a working business system?
        </h2>
        <p className="font-sans font-normal text-[16px] md:text-[18px] text-slate leading-relaxed max-w-[520px] mx-auto mb-10">
          Book a free call or send us a message. We will reply within 24 hours with a clear plan and next steps.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <SmartCTA action="contact" variant="primary" className="!px-10 !py-4 !text-[16px] md:!text-[18px]">
            Start Project
          </SmartCTA>
          <SmartCTA action="book" variant="secondary" className="!px-10 !py-4 !text-[16px] md:!text-[18px]">
            Book Free Call
          </SmartCTA>
          <SmartCTA action="whatsapp" variant="outline" className="!px-10 !py-4 !text-[16px] md:!text-[18px]">
            WhatsApp Now
          </SmartCTA>
        </div>
      </div>
    </section>
  )
}
