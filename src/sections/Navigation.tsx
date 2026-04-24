import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'
import { SmartCTA } from '@/components/SmartCTA'
import { siteConfig } from '@/data/site-config'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#why-choose' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileOpen(false)
    if (isHome) {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/' + href)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          isScrolled ? 'glass-nav border-b border-white/[0.08]' : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1"
            onClick={() => {
              setIsMobileOpen(false)
              if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="font-sans font-bold text-[20px] text-cream tracking-tight">
              {siteConfig.company.shortName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange mt-1" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sans font-medium text-[14px] text-slate hover:text-orange transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <SmartCTA action="book" variant="outline" className="!px-6 !py-2.5 !text-[14px]">
              Book a Call
            </SmartCTA>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-cream"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-sans font-medium text-[32px] text-cream hover:text-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
          <SmartCTA
            action="book"
            variant="primary"
            className="!text-[18px] !px-8 !py-3 mt-4"
            onClick={() => setIsMobileOpen(false)}
          >
            Book a Call
          </SmartCTA>
        </div>
      )}
    </>
  )
}
