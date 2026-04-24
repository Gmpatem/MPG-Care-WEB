export interface Service {
  id: string
  iconName: string
  iconBg: string
  iconColor: string
  title: string
  subtitle: string
  features: string[]
}

export interface Project {
  id: string
  title: string
  tags: string[]
  description: string
  image: string
  gradient: string
  liveUrl?: string
  githubUrl?: string
}

export interface Testimonial {
  quote: string
  name: string
  title: string
  avatar: string
}

export interface NavLink {
  label: string
  href: string
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface TrustMetric {
  value: number
  suffix: string
  label: string
  prefix: string
}

export interface ProcessStep {
  num: string
  title: string
  description: string
}

export interface WhyChooseValue {
  title: string
  description: string
}

export interface SystemStep {
  id: string
  title: string
  description: string
}

export type RegionCode = 'PH' | 'CM'

export interface RegionConfig {
  primaryCTA: 'book' | 'whatsapp'
  bookingUrl: string
  whatsapp: string
  whatsappNumber: string
  fallback: 'form' | 'whatsapp'
  currency: string
}

export interface SiteConfig {
  company: {
    name: string
    shortName: string
    tagline: string
    email: string
    year: number
  }
  contact: Record<RegionCode, RegionConfig>
  social: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}
