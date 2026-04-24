import { Link } from 'react-router'
import { siteConfig } from '@/data/site-config'
import { useContactModal } from '@/components/ContactModalProvider'

export function Footer() {
  const { company, social } = siteConfig
  const { openContactOptions } = useContactModal()

  return (
    <footer className="w-full bg-navy border-t border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + tagline */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-1 mb-4"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="font-sans font-bold text-[20px] text-cream tracking-tight">
                {company.shortName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange mt-1" />
            </Link>
            <p className="font-sans font-normal text-[14px] text-slate leading-relaxed">
              {company.tagline}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans font-semibold text-[14px] text-cream uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Systems Development
                </Link>
              </li>
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Mobile & Web Apps
                </Link>
              </li>
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Integrations & Automation
                </Link>
              </li>
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Business Tech Tools
                </Link>
              </li>
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Conversion Setup
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-sans font-semibold text-[14px] text-cream uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/#why-choose" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#process" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/#projects" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Projects
                </Link>
              </li>
              <li>
                <button
                  onClick={() => openContactOptions({ sourceCta: 'footer-contact' })}
                  className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-sans font-semibold text-[14px] text-cream uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="flex flex-col gap-3">
              {social.linkedin ? (
                <li>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200"
                  >
                    LinkedIn
                  </a>
                </li>
              ) : null}
              {social.github ? (
                <li>
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </li>
              ) : null}
              {social.twitter ? (
                <li>
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200"
                  >
                    Twitter
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] text-center">
          <p className="font-sans font-normal text-[13px] text-slate-muted">
            &copy; {company.year} {company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
