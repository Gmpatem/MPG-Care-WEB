export type FormType = 'project' | 'service' | 'callback' | 'contact'

export interface LeadInput {
  // Personal
  fullName: string
  email: string
  whatsapp?: string
  phone?: string

  // Business
  company?: string
  businessName?: string
  countryCode?: string
  region: 'PH' | 'CM' | 'OTHER'

  // Form classification
  formType: FormType
  serviceId?: string
  serviceLabel?: string
  serviceType?: string // legacy alias for serviceId

  // Project details
  budgetRange?: string
  timeline?: string
  projectDescription?: string
  businessProblem?: string
  message?: string

  // Callback preferences
  preferredContactMethod?: string
  preferredContactTime?: string

  // Tracking
  sourcePage?: string
  sourceCta?: string
  contactChannelClicked?: string
}

export interface LeadResult {
  success: boolean
  error?: string
  leadId?: string
}
