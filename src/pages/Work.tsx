import { Navigation } from '@/sections/Navigation'
import { Footer } from '@/sections/Footer'
import { projects } from '@/data/projects'
import { Link } from 'react-router'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

export function Work() {
  return (
    <div className="bg-navy min-h-[100dvh]">
      <Navigation />

      <section className="w-full pt-[120px] pb-[80px] md:pt-[140px] md:pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate hover:text-cream transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans font-medium text-[14px]">Back to home</span>
          </Link>

          <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-teal mb-4 block">
            Portfolio
          </span>
          <h1 className="font-space font-bold text-[36px] md:text-[48px] text-cream leading-[1.15] tracking-[-0.03em] mb-4">
            Systems We've Engineered
          </h1>
          <p className="font-sans font-normal text-[16px] text-slate leading-relaxed mb-12 max-w-[640px]">
            Real businesses. Real results. Every project below was designed, built, and deployed by the MPG team.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-navy-light border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                <div
                  className="h-[200px] bg-cover bg-center relative overflow-hidden"
                  style={{ background: project.gradient }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
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
                  <h3 className="font-sans font-semibold text-[20px] text-cream mb-2">
                    {project.title}
                  </h3>
                  <p className="font-sans font-normal text-[15px] text-slate leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
