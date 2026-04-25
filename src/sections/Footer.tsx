import { Link } from 'react-router'
import { siteConfig } from '@/data/site-config'
import { useContactModal } from '@/components/ContactModalProvider'
import { Mail, Phone, Github } from 'lucide-react'

export function Footer() {
  const { company } = siteConfig
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
                  Websites & Landing Pages
                </Link>
              </li>
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  E-commerce Stores
                </Link>
              </li>
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Business Systems
                </Link>
              </li>
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Automation & AI Tools
                </Link>
              </li>
              <li>
                <Link to="/#services" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
                  Digital Marketing Funnels
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
                <Link to="/#value" className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200">
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
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200 inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.PH.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200 inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  +63 999 446 2191
                </a>
              </li>
              {siteConfig.social.github ? (
                <li>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-normal text-[14px] text-slate hover:text-cream transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </li>
              ) : null}
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
