export const contactFormConfig = {
  // Supabase is used for lead capture via src/features/leads/submit-lead.ts
  // This config is kept for reference only.
  endpoint: '',
  method: 'POST',
}

export const budgetOptions = [
  { value: '', label: 'Select budget range' },
  { value: 'under-5k', label: 'Under ₱250,000 / 3,000,000 FCFA' },
  { value: '5k-15k', label: '₱250,000 – ₱750,000 / 3M – 9M FCFA' },
  { value: '15k-50k', label: '₱750,000 – ₱2.5M / 9M – 30M FCFA' },
  { value: '50k-plus', label: '₱2.5M+ / 30M+ FCFA' },
]

export const timelineOptions = [
  { value: '', label: 'Select timeline' },
  { value: 'asap', label: 'ASAP — Start immediately' },
  { value: '1-2-weeks', label: '1–2 weeks' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '2-3-months', label: '2–3 months' },
  { value: 'flexible', label: 'Flexible — planning stage' },
]

export const preferredContactMethodOptions = [
  { value: '', label: 'Select preferred method' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone Call' },
]

export const preferredTimeOptions = [
  { value: '', label: 'Select preferred time' },
  { value: 'morning', label: 'Morning (8am – 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm – 5pm)' },
  { value: 'evening', label: 'Evening (5pm – 9pm)' },
  { value: 'anytime', label: 'Anytime' },
]

export const serviceOptions = [
  { value: '', label: 'Select a service' },
  { value: 'websites-landing-pages', label: 'Websites & Landing Pages' },
  { value: 'ecommerce-stores', label: 'E-commerce Stores' },
  { value: 'business-systems', label: 'Business Systems' },
  { value: 'mobile-apps', label: 'Mobile Apps' },
  { value: 'automation-ai-tools', label: 'Automation & AI Tools' },
  { value: 'digital-marketing-funnels', label: 'Digital Marketing Funnels' },
  { value: 'tech-integration-consulting', label: 'Tech Integration & Consulting' },
  { value: 'other', label: 'Other / Not Sure' },
]

export const serviceLabelMap: Record<string, string> = {
  'websites-landing-pages': 'Websites & Landing Pages',
  'ecommerce-stores': 'E-commerce Stores',
  'business-systems': 'Business Systems',
  'mobile-apps': 'Mobile Apps',
  'automation-ai-tools': 'Automation & AI Tools',
  'digital-marketing-funnels': 'Digital Marketing Funnels',
  'tech-integration-consulting': 'Tech Integration & Consulting',
  'other': 'Other / Not Sure',
}
