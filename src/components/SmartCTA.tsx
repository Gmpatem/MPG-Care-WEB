import { Link, useNavigate, useLocation } from 'react-router'
import { siteConfig } from '@/data/site-config'
import { useRegion } from '@/lib/region'
import { useContactModal } from './ContactModalProvider'
import { cn } from '@/lib/utils'

type CTAVariant = 'primary' | 'secondary' | 'outline' | 'text'
type CTAAction = 'book' | 'contact' | 'whatsapp' | 'whatsapp-project' | 'scroll'

interface SmartCTAProps {
  variant?: CTAVariant
  action: CTAAction
  scrollTarget?: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

const variantStyles: Record<CTAVariant, string> = {
  primary:
    'font-sans font-semibold text-[16px] bg-orange text-navy px-8 py-3.5 rounded-lg hover:scale-[1.02] hover:shadow-glow transition-all duration-200 inline-flex items-center justify-center',
  secondary:
    'font-sans font-semibold text-[16px] bg-transparent border border-white/20 text-cream px-8 py-3.5 rounded-lg hover:border-orange hover:text-orange transition-all duration-200 inline-flex items-center justify-center',
  outline:
    'font-sans font-medium text-[14px] bg-transparent border border-white/20 text-cream px-6 py-2.5 rounded-lg hover:border-orange hover:text-orange transition-all duration-200 inline-flex items-center justify-center',
  text: 'font-sans font-normal text-[16px] text-slate hover:text-cream underline-offset-4 hover:underline transition-colors inline-flex items-center justify-center',
}

export function SmartCTA({
  variant = 'primary',
  action,
  scrollTarget,
  className,
  children,
  onClick,
}: SmartCTAProps) {
  const { region } = useRegion()
  const navigate = useNavigate()
  const location = useLocation()
  const { openContactOptions, openLeadForm } = useContactModal()
  const cfg = siteConfig.contact[region]

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick?.()
    if (!scrollTarget) return

    if (location.pathname !== '/') {
      navigate('/' + scrollTarget)
      setTimeout(() => {
        const target = document.querySelector(scrollTarget)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return
    }

    const target = document.querySelector(scrollTarget)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  // Book a Call -> Calendly for all regions
  if (action === 'book') {
    return (
      <a
        href={cfg.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={cn(variantStyles[variant], className)}
      >
        {children}
      </a>
    )
  }

  // Contact / Start a Project -> ContactOptionsModal for all regions
  if (action === 'contact') {
    return (
      <button
        onClick={() => {
          onClick?.()
          openContactOptions({ sourceCta: 'smart-cta-contact' })
        }}
        className={cn(variantStyles[variant], className)}
      >
        {children}
      </button>
    )
  }

  // WhatsApp -> direct link if available, otherwise options modal
  if (action === 'whatsapp') {
    if (cfg.whatsapp) {
      return (
        <a
          href={cfg.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className={cn(variantStyles[variant], className)}
        >
          {children}
        </a>
      )
    }
    return (
      <button
        onClick={() => {
          onClick?.()
          openContactOptions({ sourceCta: 'smart-cta-whatsapp' })
        }}
        className={cn(variantStyles[variant], className)}
      >
        {children}
      </button>
    )
  }

  // WhatsApp Project -> direct link if available, otherwise options modal
  if (action === 'whatsapp-project') {
    if (cfg.whatsapp) {
      const message = encodeURIComponent(
        `Hello MPG Technologies,\nI want to start a project.\n\nBusiness: ___\nNeed: ___\nBudget: ___`
      )
      return (
        <a
          href={`https://wa.me/${cfg.whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className={cn(variantStyles[variant], className)}
        >
          {children}
        </a>
      )
    }
    return (
      <button
        onClick={() => {
          onClick?.()
          openContactOptions({ sourceCta: 'smart-cta-whatsapp-project' })
        }}
        className={cn(variantStyles[variant], className)}
      >
        {children}
      </button>
    )
  }

  if (action === 'scroll' && scrollTarget) {
    return (
      <a
        href={scrollTarget}
        onClick={handleScroll}
        className={cn(variantStyles[variant], className)}
      >
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={cn(variantStyles[variant], className)}>
      {children}
    </button>
  )
}
