import { MessageCircle } from 'lucide-react'
import { siteConfig } from '@/data/site-config'
import { useRegion } from '@/lib/region'
import { useContactModal } from './ContactModalProvider'

export function FloatingContact() {
  const { region } = useRegion()
  const { openContactOptions } = useContactModal()
  const cfg = siteConfig.contact[region]

  if (cfg.whatsapp) {
    return (
      <a
        href={cfg.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-teal text-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    )
  }

  return (
    <button
      onClick={() => openContactOptions({ sourceCta: 'floating-button' })}
      aria-label="Contact options"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-teal text-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )
}
