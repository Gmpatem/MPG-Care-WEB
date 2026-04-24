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
import { useContactModal } from './ContactModalProvider'
import { useRegion } from '@/lib/region'
import { submitLead } from '@/features/leads/submit-lead'
import {
  budgetOptions,
  timelineOptions,
  serviceOptions,
  serviceLabelMap,
  preferredContactMethodOptions,
  preferredTimeOptions,
} from '@/data/contact'
import { Send, AlertCircle, CheckCircle, X, Phone } from 'lucide-react'
import type { FormType } from '@/features/leads/types'

interface FormState {
  fullName: string
  email: string
  whatsapp: string
  phone: string
  company: string
  countryCode: string
  service: string
  budget: string
  timeline: string
  projectDescription: string
  businessProblem: string
  message: string
  preferredContactMethod: string
  preferredContactTime: string
}

const emptyForm: FormState = {
  fullName: '',
  email: '',
  whatsapp: '',
  phone: '',
  company: '',
  countryCode: '',
  service: '',
  budget: '',
  timeline: '',
  projectDescription: '',
  businessProblem: '',
  message: '',
  preferredContactMethod: '',
  preferredContactTime: '',
}

const formTitles: Record<FormType, { title: string; subtitle: string; successTitle: string; successBody: string; submitLabel: string }> = {
  project: {
    title: 'Start a Project',
    subtitle: 'Tell us what you need. We reply within 24 hours.',
    successTitle: 'Message Sent',
    successBody: 'Thanks — your project inquiry has been received.',
    submitLabel: 'Send Inquiry',
  },
  service: {
    title: 'Discuss This Service',
    subtitle: 'Tell us about your needs. We reply within 24 hours.',
    successTitle: 'Message Sent',
    successBody: 'Thanks — your service inquiry has been received.',
    submitLabel: 'Send Inquiry',
  },
  callback: {
    title: 'Request a Callback',
    subtitle: 'Leave your details and we\'ll call you back.',
    successTitle: 'Request Received',
    successBody: 'Thanks — we\'ll call you back as soon as possible.',
    submitLabel: 'Request Callback',
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'Send us a message and we\'ll reply within 24 hours.',
    successTitle: 'Message Sent',
    successBody: 'Thanks — your message has been received.',
    submitLabel: 'Send Message',
  },
}

export function LeadFormModal() {
  const { isOpen, options, closeLeadForm } = useContactModal()
  const { region } = useRegion()

  const formType: FormType = options.formType || 'project'
  const labels = formTitles[formType]

  const [formData, setFormData] = useState<FormState>({ ...emptyForm })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Prefill when modal opens
  useEffect(() => {
    if (isOpen) {
      const initial: FormState = { ...emptyForm }
      if (options.service) {
        initial.service = options.service
      }
      initial.countryCode = region
      setFormData(initial)
      setStatus('idle')
      setErrorMessage('')
    }
  }, [isOpen, options.service, region])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelect = (name: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const serviceLabel = useMemo(() => {
    if (!formData.service) return ''
    return serviceLabelMap[formData.service] || formData.service
  }, [formData.service])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    setErrorMessage('')

    const result = await submitLead({
      fullName: formData.fullName,
      email: formData.email,
      whatsapp: formData.whatsapp || undefined,
      phone: formData.phone || undefined,
      businessName: formData.company || undefined,
      countryCode: formData.countryCode || region,
      region,
      formType,
      serviceId: formData.service || undefined,
      serviceLabel: serviceLabel || undefined,
      budgetRange: formData.budget || undefined,
      timeline: formData.timeline || undefined,
      projectDescription: formData.projectDescription || undefined,
      businessProblem: formData.businessProblem || undefined,
      message: formData.message || undefined,
      preferredContactMethod: formData.preferredContactMethod || undefined,
      preferredContactTime: formData.preferredContactTime || undefined,
      sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/',
      sourceCta: options.sourceCta || `modal-${formType}`,
    })

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'Something went wrong. Please try again.')
    }
  }

  const handleClose = () => {
    closeLeadForm()
    setTimeout(() => {
      setStatus('idle')
      setErrorMessage('')
      setFormData({ ...emptyForm })
    }, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="bg-navy-light border-white/[0.08] text-cream max-w-[560px] max-h-[90vh] overflow-y-auto p-0 gap-0"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-navy-light border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
          <DialogHeader className="text-left gap-1">
            <DialogTitle className="font-space font-bold text-[20px] text-cream">
              {status === 'success' ? labels.successTitle : labels.title}
            </DialogTitle>
            <DialogDescription className="font-sans text-[14px] text-slate">
              {status === 'success' ? labels.successBody : labels.subtitle}
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
                {labels.successBody}
              </p>
              <p className="font-sans text-[14px] text-slate leading-relaxed mb-6">
                {region === 'PH'
                  ? "We'll contact you by email or WhatsApp."
                  : "We'll review your details. For fastest response, message us on WhatsApp."}
              </p>
              <Button
                onClick={handleClose}
                className="font-sans font-semibold text-[16px] bg-orange text-navy px-8 py-3 h-auto rounded-lg hover:bg-orange-light transition-all"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="font-sans font-normal text-[13px] text-red-200">{errorMessage}</p>
                </div>
              )}

              {/* Full Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-fullName" className="text-cream text-[13px]">
                    Full Name *
                  </Label>
                  <Input
                    id="lead-fullName"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20 h-10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-email" className="text-cream text-[13px]">
                    Email {formType !== 'callback' && '*'}
                  </Label>
                  <Input
                    id="lead-email"
                    name="email"
                    type="email"
                    required={formType !== 'callback'}
                    autoComplete="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20 h-10"
                  />
                </div>
              </div>

              {/* WhatsApp / Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-whatsapp" className="text-cream text-[13px]">
                    {formType === 'callback' ? 'WhatsApp / Phone *' : 'WhatsApp'}
                  </Label>
                  <Input
                    id="lead-whatsapp"
                    name="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    required={formType === 'callback'}
                    placeholder={region === 'PH' ? '+63 9XX XXX XXXX' : '+237 6XX XXX XXX'}
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20 h-10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-company" className="text-cream text-[13px]">
                    Business / Company
                  </Label>
                  <Input
                    id="lead-company"
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

              {/* Country / Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-countryCode" className="text-cream text-[13px]">
                    Country / Region
                  </Label>
                  <Input
                    id="lead-countryCode"
                    name="countryCode"
                    type="text"
                    placeholder="e.g. Philippines, Cameroon"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20 h-10"
                  />
                </div>

                {/* Service Select — shown for project, service, callback */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-cream text-[13px]">
                    {formType === 'service' ? 'Selected Service' : 'Service Interest'}
                  </Label>
                  <Select
                    name="service"
                    value={formData.service}
                    onValueChange={(value) => handleSelect('service', value)}
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
              </div>

              {/* Budget + Timeline — shown for project and service */}
              {(formType === 'project' || formType === 'service') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-cream text-[13px]">Budget Range</Label>
                    <Select
                      name="budget"
                      value={formData.budget}
                      onValueChange={(value) => handleSelect('budget', value)}
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
                    <Label className="text-cream text-[13px]">Timeline</Label>
                    <Select
                      name="timeline"
                      value={formData.timeline}
                      onValueChange={(value) => handleSelect('timeline', value)}
                    >
                      <SelectTrigger className="bg-navy border-white/[0.08] text-cream focus:ring-orange/20 h-10">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent className="bg-navy border-white/[0.08]">
                        {timelineOptions.map((opt) => (
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
              )}

              {/* Preferred method + time — shown for callback */}
              {formType === 'callback' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-cream text-[13px]">Preferred Contact Method</Label>
                    <Select
                      name="preferredContactMethod"
                      value={formData.preferredContactMethod}
                      onValueChange={(value) => handleSelect('preferredContactMethod', value)}
                    >
                      <SelectTrigger className="bg-navy border-white/[0.08] text-cream focus:ring-orange/20 h-10">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent className="bg-navy border-white/[0.08]">
                        {preferredContactMethodOptions.map((opt) => (
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
                    <Label className="text-cream text-[13px]">Preferred Time</Label>
                    <Select
                      name="preferredContactTime"
                      value={formData.preferredContactTime}
                      onValueChange={(value) => handleSelect('preferredContactTime', value)}
                    >
                      <SelectTrigger className="bg-navy border-white/[0.08] text-cream focus:ring-orange/20 h-10">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-navy border-white/[0.08]">
                        {preferredTimeOptions.map((opt) => (
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
              )}

              {/* Project Description — project form */}
              {formType === 'project' && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-projectDescription" className="text-cream text-[13px]">
                    Project Description *
                  </Label>
                  <Textarea
                    id="lead-projectDescription"
                    name="projectDescription"
                    required
                    rows={4}
                    placeholder="What system do you need? Describe your goals, current workflow, and any specific requirements."
                    value={formData.projectDescription}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20"
                  />
                </div>
              )}

              {/* Business Problem — service form */}
              {formType === 'service' && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-businessProblem" className="text-cream text-[13px]">
                    Main Business Problem *
                  </Label>
                  <Textarea
                    id="lead-businessProblem"
                    name="businessProblem"
                    required
                    rows={4}
                    placeholder="What challenge are you trying to solve? Be specific about your current pain points."
                    value={formData.businessProblem}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20"
                  />
                </div>
              )}

              {/* Short Message — callback form */}
              {formType === 'callback' && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-message" className="text-cream text-[13px]">
                    Short Message
                  </Label>
                  <Textarea
                    id="lead-message"
                    name="message"
                    rows={3}
                    placeholder="Anything else we should know before calling?"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20"
                  />
                </div>
              )}

              {/* General Message — contact form */}
              {formType === 'contact' && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-message" className="text-cream text-[13px]">
                    Message *
                  </Label>
                  <Textarea
                    id="lead-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-navy border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="font-sans font-semibold text-[16px] bg-orange text-navy px-8 py-3 h-auto rounded-lg hover:bg-orange-light hover:scale-[1.02] hover:shadow-glow transition-all duration-200 disabled:opacity-50 mt-1"
              >
                {formType === 'callback' ? (
                  <Phone className="w-4 h-4 mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {status === 'submitting' ? 'Sending...' : labels.submitLabel}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
