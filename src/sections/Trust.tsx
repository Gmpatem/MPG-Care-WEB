import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Smartphone, Zap, Target, MessageCircle, Workflow } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const trustBuilders = [
  {
    icon: Code2,
    title: 'Built with Modern Tech',
    desc: 'React, Node.js, and cloud infrastructure that scales with your business.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    desc: 'Every system works perfectly on phones because that is where your customers are.',
  },
  {
    icon: Zap,
    title: 'Fast Loading',
    desc: 'Optimized for speed so visitors stay and search engines rank you higher.',
  },
  {
    icon: Target,
    title: 'Business-Focused Design',
    desc: 'Every button, form, and page is designed to drive real business results.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp-Ready Funnels',
    desc: 'Direct WhatsApp integration so leads reach you instantly, not eventually.',
  },
  {
    icon: Workflow,
    title: 'Automation-Ready Systems',
    desc: 'Built to connect with your existing tools and automate repetitive work.',
  },
]

export function Trust() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const cardElements = cards.querySelectorAll('.trust-card')
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
      id="trust"
      className="w-full bg-navy-light py-[120px] md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-orange mb-4 block">
            Why Trust MPG
          </span>
          <h2 className="font-sans font-bold text-[36px] md:text-[48px] text-cream tracking-[-0.03em]">
            Built for Real Business Results
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustBuilders.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="trust-card bg-navy/50 border border-white/[0.08] rounded-xl p-8 hover:border-orange/20 transition-colors duration-300"
              >
                <Icon className="w-7 h-7 text-orange mb-4" strokeWidth={1.5} />
                <h3 className="font-sans font-semibold text-[18px] text-cream mb-2">
                  {item.title}
                </h3>
                <p className="font-sans font-normal text-[15px] text-slate leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
