import type { Service } from '@/types/content'

export const services: Service[] = [
  {
    id: 'web-development',
    iconName: 'Globe',
    iconBg: 'rgba(255,107,53,0.1)',
    iconColor: '#FF6B35',
    title: 'Web Development',
    subtitle:
      'Professional websites, landing pages, and e-commerce experiences built to make your business look credible and convert visitors into leads.',
    features: [
      'Business websites',
      'Portfolio websites',
      'E-commerce stores',
      'Landing pages',
      'Responsive redesigns',
      'SEO-ready structure',
    ],
  },
  {
    id: 'systems-development',
    iconName: 'Database',
    iconBg: 'rgba(0,212,170,0.1)',
    iconColor: '#00D4AA',
    title: 'Systems Development',
    subtitle:
      'Custom business systems that organize daily operations, reduce manual work, and give teams better control.',
    features: [
      'Booking systems',
      'Church management systems',
      'Hospital/clinic systems',
      'Inventory systems',
      'Admin dashboards',
      'Reporting tools',
    ],
  },
  {
    id: 'mobile-web-apps',
    iconName: 'Smartphone',
    iconBg: 'rgba(99,102,241,0.1)',
    iconColor: '#6366F1',
    title: 'Mobile & Web Apps',
    subtitle:
      'Interactive apps for customers, staff, and business workflows, designed for speed, usability, and real-world operations.',
    features: [
      'Customer portals',
      'Staff portals',
      'Progressive web apps',
      'Mobile-first business apps',
      'Internal operation apps',
    ],
  },
  {
    id: 'integrations-automation',
    iconName: 'Zap',
    iconBg: 'rgba(255,193,7,0.1)',
    iconColor: '#FFC107',
    title: 'Integrations & Automation',
    subtitle:
      'Connect your tools, automate repetitive tasks, and move information between systems without manual copy-paste work.',
    features: [
      'WhatsApp automation',
      'Google Sheets automation',
      'Email workflows',
      'Payment flow setup',
      'Form-to-dashboard pipelines',
      'Notification systems',
    ],
  },
  {
    id: 'business-tech-tools',
    iconName: 'Briefcase',
    iconBg: 'rgba(0,212,170,0.1)',
    iconColor: '#00D4AA',
    title: 'Business Tech Tools',
    subtitle:
      'Simple, practical digital tools for small businesses that need better organization without a complicated software setup.',
    features: [
      'Booking forms',
      'Order forms',
      'Client intake systems',
      'Daily sales trackers',
      'Expense trackers',
      'Lightweight dashboards',
    ],
  },
  {
    id: 'digital-marketing',
    iconName: 'Target',
    iconBg: 'rgba(255,107,53,0.1)',
    iconColor: '#FF6B35',
    title: 'Digital Marketing & Conversion Setup',
    subtitle:
      'Conversion-focused digital setup that helps turn social traffic, website visitors, and inquiries into real business leads.',
    features: [
      'Landing page strategy',
      'Lead capture forms',
      'WhatsApp/Messenger funnels',
      'Facebook page setup',
      'Google Business profile guidance',
      'Conversion-focused copy',
    ],
  },
]
