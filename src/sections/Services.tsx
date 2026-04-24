import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/services'
import { getServiceIcon } from '@/components/ServiceIcon'
import { useContactModal } from '@/components/ContactModalProvider'
import { MessageSquare } from 'lucide-react'
import { serviceLabelMap } from '@/data/contact'

gsap.registerPlugin(ScrollTrigger)

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { openLeadForm } = useContactModal()

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const cardElements = cards.querySelectorAll('.service-card')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-full bg-navy py-[120px] md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-orange mb-4 block">
            What We Build
          </span>
          <h2 className="font-sans font-bold text-[36px] md:text-[48px] text-cream tracking-[-0.03em]">
            Solutions That Generate Revenue
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = getServiceIcon(service.iconName)
            return (
              <div
                key={service.id}
                className="service-card group bg-navy-light border border-white/[0.08] rounded-2xl p-8 hover:border-orange/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                style={{ opacity: 1 }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: service.iconBg }}
                >
                  <Icon className="w-5 h-5" style={{ color: service.iconColor }} strokeWidth={1.5} />
                </div>

                <h3 className="font-sans font-semibold text-[20px] text-cream mb-2">
                  {service.title}
                </h3>
                <p className="font-sans font-normal text-[15px] text-slate leading-relaxed mb-5">
                  {service.subtitle}
                </p>

                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-teal mt-2 shrink-0" />
                      <span className="font-sans font-normal text-[14px] text-slate leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    openLeadForm({
                      formType: 'service',
                      service: service.id,
                      sourceCta: `services-discuss-${service.id}`,
                    })
                  }
                  className="font-sans font-semibold text-[14px] bg-orange/10 text-orange px-5 py-2.5 rounded-lg hover:bg-orange hover:text-navy transition-all duration-200 inline-flex items-center justify-center gap-2 w-full"
                >
                  <MessageSquare className="w-4 h-4" />
                  Discuss {serviceLabelMap[service.id] || service.title}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
