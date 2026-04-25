import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContactModal } from '@/components/ContactModalProvider'
import { ArrowRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const packages = [
  {
    id: 'starter-website',
    title: 'Starter Website',
    description: 'A clean, professional website to establish your online presence and start collecting leads.',
    features: [
      'Up to 5 pages',
      'Mobile responsive',
      'Contact form integration',
      'Basic SEO setup',
      'Social media links',
    ],
    cta: 'Request Quote',
  },
  {
    id: 'business-website-funnel',
    title: 'Business Website + WhatsApp Funnel',
    description: 'A conversion-focused website with WhatsApp integration so visitors become conversations instantly.',
    features: [
      'Up to 10 pages',
      'WhatsApp click-to-chat',
      'Lead capture forms',
      'Google Business integration',
      'Speed & SEO optimized',
    ],
    cta: 'Request Quote',
    highlighted: true,
  },
  {
    id: 'booking-management-system',
    title: 'Booking / Management System',
    description: 'A custom system to manage bookings, records, inventory, or operations tailored to your workflow.',
    features: [
      'Custom admin dashboard',
      'User roles & permissions',
      'Reporting & analytics',
      'Automated notifications',
      'Training & documentation',
    ],
    cta: 'Request Quote',
  },
  {
    id: 'custom-automation-system',
    title: 'Custom Automation / Full System',
    description: 'End-to-end digital transformation with multiple integrated tools, automations, and dashboards.',
    features: [
      'Full system architecture',
      'Multiple integrations',
      'Workflow automation',
      'Mobile & web access',
      'Ongoing support & scaling',
    ],
    cta: 'Request Quote',
  },
]

export function Packages() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { openContactOptions } = useContactModal()

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const cardElements = cards.querySelectorAll('.package-card')
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
      id="packages"
      className="w-full bg-navy py-[120px] md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-orange mb-4 block">
            Starter Packages
          </span>
          <h2 className="font-sans font-bold text-[36px] md:text-[48px] text-cream tracking-[-0.03em] mb-4">
            Clear Offers, Fair Pricing
          </h2>
          <p className="font-sans font-normal text-[16px] text-slate max-w-[560px] mx-auto">
            Every business is different. These packages give you a starting point. We will customize based on your exact needs.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card relative bg-navy-light border rounded-2xl p-8 flex flex-col ${
                pkg.highlighted
                  ? 'border-orange/30 ring-1 ring-orange/20'
                  : 'border-white/[0.08]'
              } hover:border-orange/20 transition-all duration-300`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-sans font-semibold text-[12px] bg-orange text-navy px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="font-sans font-semibold text-[20px] text-cream mb-2">
                {pkg.title}
              </h3>
              <p className="font-sans font-normal text-[15px] text-slate leading-relaxed mb-6 flex-1">
                {pkg.description}
              </p>

              <ul className="flex flex-col gap-2.5 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="font-sans font-normal text-[14px] text-slate leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  openContactOptions({
                    sourceCta: `packages-${pkg.id}`,
                  })
                }
                className="font-sans font-semibold text-[14px] bg-orange/10 text-orange px-5 py-2.5 rounded-lg hover:bg-orange hover:text-navy transition-all duration-200 inline-flex items-center justify-center gap-2 w-full"
              >
                {pkg.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
