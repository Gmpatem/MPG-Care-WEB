import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import { useContactModal } from '@/components/ContactModalProvider'

gsap.registerPlugin(ScrollTrigger)

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { openContactOptions } = useContactModal()

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const cardElements = cards.querySelectorAll('.project-card')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardElements,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
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
      id="projects"
      className="w-full bg-navy-light py-[120px] md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-teal mb-4 block">
            Selected Work
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-sans font-bold text-[36px] md:text-[48px] text-cream tracking-[-0.03em] mb-2">
                Projects We Have Built
              </h2>
              <p className="font-sans font-normal text-[16px] text-slate">
                Real systems for real businesses. Case studies coming soon for live projects.
              </p>
            </div>
            <Link
              to="/work"
              className="font-sans font-medium text-[14px] text-orange hover:underline shrink-0"
            >
              View All Projects &rarr;
            </Link>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={cardsRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card snap-start shrink-0 w-[340px] md:w-[420px] bg-navy rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/20 transition-all duration-300"
            >
              {/* Image area */}
              <div
                className="h-[200px] md:h-[260px] bg-cover bg-center relative overflow-hidden"
                style={{ background: project.gradient }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500"
                />
                {!project.liveUrl && !project.githubUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-navy/60">
                    <span className="font-sans font-medium text-[13px] bg-navy-light/90 text-cream px-4 py-2 rounded-full border border-white/[0.08]">
                      Case Study Coming Soon
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans font-medium text-[12px] bg-orange/10 text-orange rounded px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-sans font-semibold text-[20px] text-cream mb-2">{project.title}</h3>
                <p className="font-sans font-normal text-[15px] text-slate leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-medium text-[14px] text-slate hover:text-cream flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-medium text-[14px] text-slate hover:text-cream flex items-center gap-1.5 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  ) : null}
                  <button
                    onClick={() =>
                      openContactOptions({
                        sourceCta: `projects-similar-${project.id}`,
                      })
                    }
                    className="font-sans font-medium text-[14px] text-orange hover:text-orange-light flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Start Similar Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
