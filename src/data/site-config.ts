import type { SiteConfig } from '@/types/content'
import { env } from '@/lib/env'

export const siteConfig: SiteConfig = {
  company: {
    name: 'MPG Technologies',
    shortName: 'MPG',
    tagline:
      'We build websites, systems, and automations that help small businesses get more customers and run smoother.',
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
      bookingUrl: env.calendlyUrl,
      whatsapp: env.whatsappCM ? `https://wa.me/${env.whatsappCM}` : `https://wa.me/${env.whatsappPH}`,
      whatsappNumber: env.whatsappCM || env.whatsappPH,
      fallback: 'form',
      currency: 'XAF',
    },
  },
  social: {
    github: 'https://github.com/Gmpatem',
  },
}
