import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import { Navigation } from '@/sections/Navigation'
import { Footer } from '@/sections/Footer'
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
import { budgetOptions, serviceOptions, timelineOptions } from '@/data/contact'
import { siteConfig } from '@/data/site-config'
import { useRegion } from '@/lib/region'
import { submitLead } from '@/features/leads/submit-lead'
import { ArrowLeft, Send, AlertCircle } from 'lucide-react'
import { Link } from 'react-router'

export function Contact() {
  const { region } = useRegion()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [formData, setFormData] = useState(() => ({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    service: searchParams.get('service') || '',
    budget: '',
    timeline: '',
    message: '',
  }))

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    setErrorMessage('')

    const result = await submitLead({
      fullName: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp || undefined,
      businessName: formData.company || undefined,
      region,
      countryCode: region,
      formType: 'project',
      serviceId: formData.service || undefined,
      budgetRange: formData.budget || undefined,
      timeline: formData.timeline || undefined,
      projectDescription: formData.message,
      sourcePage: '/contact',
      sourceCta: searchParams.get('cta') || undefined,
    })

    if (result.success) {
      setStatus('success')
      navigate('/thank-you')
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-navy min-h-[100dvh]">
      <Navigation />

      <section className="w-full pt-[120px] pb-[80px] md:pt-[140px] md:pb-[100px]">
        <div className="max-w-[640px] mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate hover:text-cream transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans font-medium text-[14px]">Back to home</span>
          </Link>

          <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-orange mb-4 block">
            Start a Project
          </span>
          <h1 className="font-space font-bold text-[36px] md:text-[48px] text-cream leading-[1.15] tracking-[-0.03em] mb-4">
            Let&apos;s Build Your System
          </h1>
          <p className="font-sans font-normal text-[16px] text-slate leading-relaxed mb-10">
            Tell us about your business and the system you need. We&apos;ll reply within 24 hours.
          </p>

          {status === 'error' && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="font-sans font-normal text-[14px] text-red-200">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-cream">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-navy-light border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-cream">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-navy-light border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="whatsapp" className="text-cream">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  placeholder={region === 'PH' ? '+63 9XX XXX XXXX' : '+237 6XX XXX XXX'}
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="bg-navy-light border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="company" className="text-cream">Company</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-navy-light border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="service" className="text-cream">Service Type</Label>
                <Select
                  name="service"
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, service: value }))
                  }
                >
                  <SelectTrigger className="bg-navy-light border-white/[0.08] text-cream focus:ring-orange/20">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-light border-white/[0.08]">
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
              <div className="flex flex-col gap-2">
                <Label htmlFor="budget" className="text-cream">Budget Range</Label>
                <Select
                  name="budget"
                  value={formData.budget}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, budget: value }))
                  }
                >
                  <SelectTrigger className="bg-navy-light border-white/[0.08] text-cream focus:ring-orange/20">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-light border-white/[0.08]">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="timeline" className="text-cream">Timeline</Label>
                <Select
                  name="timeline"
                  value={formData.timeline}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, timeline: value }))
                  }
                >
                  <SelectTrigger className="bg-navy-light border-white/[0.08] text-cream focus:ring-orange/20">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-light border-white/[0.08]">
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

            <div className="flex flex-col gap-2">
              <Label htmlFor="message" className="text-cream">Project Description *</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Describe the system you need, your current workflow, and your goals..."
                value={formData.message}
                onChange={handleChange}
                className="bg-navy-light border-white/[0.08] text-cream placeholder:text-slate-muted focus-visible:border-orange focus-visible:ring-orange/20"
              />
            </div>

            <Button
              type="submit"
              disabled={status === 'submitting'}
              className="font-sans font-semibold text-[16px] bg-orange text-navy px-8 py-3.5 h-auto rounded-lg hover:bg-orange-light hover:scale-[1.02] hover:shadow-glow transition-all duration-200 disabled:opacity-50"
            >
              <Send className="w-4 h-4 mr-2" />
              {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
            </Button>

            <p className="font-sans font-normal text-[13px] text-slate text-center">
              Or email us directly at{' '}
              <a
                href={`mailto:${siteConfig.company.email}`}
                className="text-orange hover:underline"
              >
                {siteConfig.company.email}
              </a>
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
