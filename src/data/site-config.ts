import type { SiteConfig } from '@/types/content'
import { env } from '@/lib/env'

export const siteConfig: SiteConfig = {
  company: {
    name: 'MPG Technologies',
    shortName: 'MPG',
    tagline:
      'Business systems and automation partner for companies that want to scale without the manual work.',
    email: env.publicEmail,
    year: 2025,
  },
  contact: {
    PH: {
      primaryCTA: 'book',
      bookingUrl: env.calendlyUrl,
      whatsapp: `https://wa.me/${env.whatsappPH}`,
      whatsappNumber: env.whatsappPH,
      fallback: 'form',
      currency: 'PHP',
    },
    CM: {
      primaryCTA: 'whatsapp',
      // Cameroon WhatsApp number is not yet available.
      // Falls back to email or PH WhatsApp when user tries to contact.
      whatsapp: env.whatsappCM ? `https://wa.me/${env.whatsappCM}` : '',
      whatsappNumber: env.whatsappCM,
      fallback: 'form',
      currency: 'XAF',
    },
  },
  social: {
    linkedin: '',
    github: '',
    twitter: '',
  },
}
