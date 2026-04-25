import { useState, useEffect, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getSupabaseClient } from '@/lib/supabase'
import { hasSupabaseConfig } from '@/lib/env'
import { budgetOptions, serviceOptions, serviceLabelMap } from '@/data/contact'
import { Send, AlertCircle, CheckCircle, X } from 'lucide-react'

interface ProjectInquiryFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceType?: string
  serviceSlug?: string
  sourcePage?: string
  sourceCta?: string
}

interface FormState {
  full_name: string
  email: string
  whatsapp: string
  company: string
  country_code: string
  region: string
  service_slug: string
  service_type: string
  budget_range: string
  project_description: string
  preferred_contact_method: string
}

const emptyForm: FormState = {
  full_name: '',
  email: '',
  whatsapp: '',
  company: '',
  country_code: '',
  region: 'PH',
  service_slug: '',
  service_type: '',
  budget_range: '',
  project_description: '',
  preferred_contact_method: '',
}

const regionOptions = [
  { value: 'PH', label: 'Philippines' },
  { value: 'CM', label: 'Cameroon' },
  { value: 'OTHER', label: 'Other' },
]

const preferredContactOptions = [
  { value: '', label: 'Select preferred method' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'call', label: 'Phone Call' },
  { value: 'email', label: 'Email' },
  { value: 'booking', label: 'Calendly Booking' },
]

function saveLeadToLocalStorage(data: Record<string, unknown>): { success: boolean; error?: string } {
  try {
    const existing = JSON.parse(localStorage.getItem('mpg_leads') || '[]')
    const leadRecord = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...data,
      submittedAt: new Date().toISOString(),
    }
    existing.push(leadRecord)
    localStorage.setItem('mpg_leads', JSON.stringify(existing))
    return { success: true }
  } catch (err) {
    console.error('[ProjectForm] localStorage save error:', err)
    return { success: false, error: 'Unable to save inquiry. Please contact us directly.' }
  }
}

async function submitProjectInquiry(
  payload: Record<string, unknown>
): Promise<{ success: boolean; error?: string; savedToFallback?: boolean }> {
  if (!hasSupabaseConfig()) {
    console.warn(
      '[ProjectForm] Supabase env vars missing. Falling back to localStorage.\n' +
        'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local to enable cloud storage.'
    )
    const fallback = saveLeadToLocalStorage(payload)
    return { success: fallback.success, error: fallback.error, savedToFallback: true }
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    const fallback = saveLeadToLocalStorage(payload)
    return { success: fallback.success, error: fallback.error, savedToFallback: true }
  }

  try {
    const { error } = await (supabase.from('website_leads') as any).insert(payload)

    if (error) {
      console.error('[ProjectForm] Insert error:', error)
      const fallback = saveLeadToLocalStorage(payload)
      return { success: fallback.success, error: fallback.error, savedToFallback: true }
    }

    return { success: true }
  } catch (err) {
    console.error('[ProjectForm] Unexpected error:', err)
    const fallback = saveLeadToLocalStorage(payload)
    return { success: fallback.success, error: fallback.error, savedToFallback: true }
  }
}

export function ProjectInquiryFormModal({
  open,
  onOpenChange,
  serviceType,
  serviceSlug,
  sourcePage,
  sourceCta,
}: ProjectInquiryFormModalProps) {
  const [formData, setFormData] = useState<FormState>({ ...emptyForm })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [savedToFallback, setSavedToFallback] = useState(false)

  // Prefill when modal opens
  useEffect(() => {
    if (open) {
      const initial: FormState = { ...emptyForm }
      if (serviceSlug) {
        initial.service_slug = serviceSlug
        initial.service_type = serviceLabelMap[serviceSlug] || serviceType || ''
      } else if (serviceType) {
        initial.service_type = serviceType
      }
      setFormData(initial)
      setStatus('idle')
      setErrorMessage('')
      setSavedToFallback(false)
    }
  }, [open, serviceSlug, serviceType])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelect = (name: keyof FormState, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value }
      if (name === 'service_slug') {
        next.service_type = serviceLabelMap[value] || ''
      }
      return next
    })
  }

  const serviceLabel = useMemo(() => {
    if (!formData.service_slug) return ''
    return serviceLabelMap[formData.service_slug] || formData.service_slug
  }, [formData.service_slug])

  const validate = (): string | null => {
    if (!formData.full_name.trim()) return 'Full name is required.'
    if (!formData.email.trim() || !formData.email.includes('@')) return 'A valid email is required.'
    if (!formData.project_description.trim()) return 'Project description is required.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return

    const validationError = validate()
    if (validationError) {
      setStatus('error')
      setErrorMessage(validationError)
      return
    }

    setStatus('submitting')
    setErrorMessage('')
    setSavedToFallback(false)

    const payload = {
      full_name: formData.full_name.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsapp: formData.whatsapp?.trim() || null,
      company: formData.company?.trim() || null,
      country_code: formData.country_code?.trim().toUpperCase() || null,
      region: formData.region || 'OTHER',
      service_type: formData.service_type || serviceLabel || null,
      service_slug: formData.service_slug || null,
      budget_range: formData.budget_range || null,
      project_description: formData.project_description.trim(),
      preferred_contact_method: formData.preferred_contact_method || null,
      source_page: sourcePage || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      source_cta: sourceCta || 'fill_project_form',
      metadata: {
        submitted_from: 'contact_options_modal',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        page_url: typeof window !== 'undefined' ? window.location.href : null,
      },
    }

    const result = await submitProjectInquiry(payload)

    if (result.success) {
      setStatus('success')
      setSavedToFallback(Boolean(result.savedToFallback))
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'Something went wrong. Please try again or contact us directly.')
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setStatus('idle')
      setErrorMessage('')
      setSavedToFallback(false)
      setFormData({ ...emptyForm })
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="bg-navy-light border-white/[0.08] text-cream max-w-[560px] max-h-[90vh] overflow-y-auto p-0 gap-0"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-navy-light border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
          <DialogHeader className="text-left gap-1">
            <DialogTitle className="font-space font-bold text-[20px] text-cream">
              {status === 'success' ? 'Project Request Received' : 'Project Inquiry'}
            </DialogTitle>
            <DialogDescription className="font-sans text-[14px] text-slate">
              {status === 'success'
                ? 'We will contact you shortly.'
                : 'Tell us about your project and we will reply within 24 hours.'}
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-slate" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-14 h-14 rounded-full bg-teal/20 flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-teal" />
              </div>
              <p className="font-sans text-[16px] text-cream leading-relaxed mb-2">
                Thanks! Your project request has been received. We will contact you shortly.
              </p>
              {savedToFallback && (
                <p className="font-sans text-[13px] text-slate leading-relaxed mb-4">
                  Your inquiry was saved locally. We will process it as soon as possible.
                </p>
              )}
              <Button
                onClick={handleClose}
                className="font-sans font-semibold text-[16px] bg-orange text-navy px-8 py-3 h-auto rounded-lg hover:bg-orange-light transition-all"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {(status === 'error' && errorMessage) && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="font-sans font-normal text-[13px] text-red-200">{errorMessage}</p>
                </div>
              )}

              {/* Full Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pi-full_name" className="text-cream text-[13px]">
                    Full Name *
                  </Label>
                  <Input
                    id="pi-full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20 h-10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pi-email" className="text-cream text-[13px]">
                    Email *
                  </Label>
                  <Input
                    id="pi-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20 h-10"
                  />
                </div>
              </div>

              {/* WhatsApp + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pi-whatsapp" className="text-cream text-[13px]">
                    WhatsApp
                  </Label>
                  <Input
                    id="pi-whatsapp"
                    name="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+63 9XX XXX XXXX"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20 h-10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pi-company" className="text-cream text-[13px]">
                    Company
                  </Label>
                  <Input
                    id="pi-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20 h-10"
                  />
                </div>
              </div>

              {/* Country + Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pi-country_code" className="text-cream text-[13px]">
                    Country / Region
                  </Label>
                  <Input
                    id="pi-country_code"
                    name="country_code"
                    type="text"
                    placeholder="e.g. Philippines, Cameroon"
                    value={formData.country_code}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20 h-10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-cream text-[13px]">Region *</Label>
                  <Select
                    name="region"
                    value={formData.region}
                    onValueChange={(value) => handleSelect('region', value)}
                  >
                    <SelectTrigger className="bg-navy border-white/[0.08] text-cream focus:ring-orange/20 h-10">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy border-white/[0.08]">
                      {regionOptions.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="text-cream focus:bg-white/5 focus:text-cream"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Service */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-cream text-[13px]">Service Needed</Label>
                <Select
                  name="service_slug"
                  value={formData.service_slug}
                  onValueChange={(value) => handleSelect('service_slug', value)}
                >
                  <SelectTrigger className="bg-navy border-white/[0.08] text-cream focus:ring-orange/20 h-10">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy border-white/[0.08]">
                    {serviceOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-cream focus:bg-white/5 focus:text-cream"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Budget + Preferred Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-cream text-[13px]">Budget Range</Label>
                  <Select
                    name="budget_range"
                    value={formData.budget_range}
                    onValueChange={(value) => handleSelect('budget_range', value)}
                  >
                    <SelectTrigger className="bg-navy border-white/[0.08] text-cream focus:ring-orange/20 h-10">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy border-white/[0.08]">
                      {budgetOptions.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="text-cream focus:bg-white/5 focus:text-cream"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-cream text-[13px]">Preferred Contact Method</Label>
                  <Select
                    name="preferred_contact_method"
                    value={formData.preferred_contact_method}
                    onValueChange={(value) => handleSelect('preferred_contact_method', value)}
                  >
                    <SelectTrigger className="bg-navy border-white/[0.08] text-cream focus:ring-orange/20 h-10">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy border-white/[0.08]">
                      {preferredContactOptions.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="text-cream focus:bg-white/5 focus:text-cream"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Project Description */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pi-project_description" className="text-cream text-[13px]">
                  Project Description *
                </Label>
                <Textarea
                  id="pi-project_description"
                  name="project_description"
                  rows={4}
                  placeholder="What system do you need? Describe your goals, current workflow, and any specific requirements."
                  value={formData.project_description}
                  onChange={handleChange}
                  className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20"
                />
              </div>

              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="font-sans font-semibold text-[16px] bg-orange text-navy px-8 py-3 h-auto rounded-lg hover:bg-orange-light hover:scale-[1.02] hover:shadow-glow transition-all duration-200 disabled:opacity-50 mt-1"
              >
                <Send className="w-4 h-4 mr-2" />
                {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
