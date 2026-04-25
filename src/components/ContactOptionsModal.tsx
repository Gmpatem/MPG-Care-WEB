import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useContactModal } from './ContactModalProvider'
import { useRegion } from '@/lib/region'
import { siteConfig } from '@/data/site-config'
import { trackContactClickFireAndForget } from '@/features/leads/track-contact-click'
import { Calendar, MessageCircle, Mail, Send, X } from 'lucide-react'

export function ContactOptionsModal() {
  const { isOptionsOpen, optionsModalOpts, closeContactOptions, openLeadForm } = useContactModal()
  const { region } = useRegion()
  const cfg = siteConfig.contact[region]

  const hasWhatsApp = Boolean(cfg.whatsapp)
  const sourceCta = optionsModalOpts.sourceCta || 'contact-options-modal'

  const handleOpenForm = () => {
    closeContactOptions()
    setTimeout(() => {
      openLeadForm({
        formType: 'project',
        ...optionsModalOpts,
      })
    }, 200)
  }

  const handleTrackAndClose = (channel: 'whatsapp' | 'email' | 'calendly') => {
    trackContactClickFireAndForget({
      channel,
      sourceCta,
      region,
      serviceId: optionsModalOpts.service,
    })
    setTimeout(() => closeContactOptions(), 100)
  }

  const contactMethods = [
    {
      id: 'calendly',
      icon: Calendar,
      label: 'Book a Call',
      description: 'Schedule a free strategy call',
      href: cfg.bookingUrl,
      external: true,
      visible: true,
      onClick: () => handleTrackAndClose('calendly'),
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'Chat on WhatsApp',
      description: 'Fastest way to reach us',
      href: hasWhatsApp
        ? `${cfg.whatsapp}?text=${encodeURIComponent(
            'Hello MPG Technologies, I would like to discuss a project.\n\nService needed:\nBusiness name:\nBudget:\nTimeline:'
          )}`
        : '',
      external: true,
      visible: hasWhatsApp,
      onClick: () => handleTrackAndClose('whatsapp'),
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Send Email',
      description: 'Send project details by email',
      href: `mailto:${siteConfig.company.email}?subject=${encodeURIComponent(
        'Project Inquiry - MPG Technologies'
      )}&body=${encodeURIComponent(
        'Hello MPG Technologies,\n\nI would like to discuss a project.\n\nService needed:\nBusiness name:\nBudget:\nTimeline:\nProject details:\n'
      )}`,
      external: true,
      visible: true,
      onClick: () => handleTrackAndClose('email'),
    },
    {
      id: 'form',
      icon: Send,
      label: 'Fill Project Form',
      description: 'Fill a short project inquiry form',
      href: '',
      external: false,
      visible: true,
      onClick: () => {
        trackContactClickFireAndForget({
          channel: 'form',
          sourceCta,
          region,
          serviceId: optionsModalOpts.service,
        })
        handleOpenForm()
      },
    },
  ]

  const buttonBase =
    'flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/[0.06]'

  return (
    <Dialog open={isOptionsOpen} onOpenChange={(open) => !open && closeContactOptions()}>
      <DialogContent
        className="bg-navy-light border-white/[0.08] text-cream max-w-[420px] p-0 gap-0"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="bg-navy-light border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
          <DialogHeader className="text-left gap-1">
            <DialogTitle className="font-space font-bold text-[18px] text-cream">
              Choose how you want to contact us
            </DialogTitle>
            <DialogDescription className="font-sans text-[13px] text-slate">
              Pick the option that works best for you.
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={closeContactOptions}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-slate" />
          </button>
        </div>

        {/* Options */}
        <div className="px-4 py-4 flex flex-col gap-2">
          {contactMethods
            .filter((m) => m.visible)
            .map((method) => {
              const Icon = method.icon
              const content = (
                <>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(255,107,53,0.1)' }}
                  >
                    <Icon className="w-5 h-5 text-orange" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-semibold text-[15px] text-cream">
                      {method.label}
                    </span>
                    <span className="font-sans font-normal text-[13px] text-slate">
                      {method.description}
                    </span>
                  </div>
                </>
              )

              if (method.onClick && !method.href) {
                return (
                  <button key={method.id} onClick={method.onClick} className={buttonBase}>
                    {content}
                  </button>
                )
              }

              return (
                <a
                  key={method.id}
                  href={method.href}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  onClick={method.onClick}
                  className={buttonBase}
                >
                  {content}
                </a>
              )
            })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
