import { getSupabaseClient } from '@/lib/supabase'
import { hasSupabaseConfig } from '@/lib/env'
import type { LeadInput, LeadResult } from './types'

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  if (!hasSupabaseConfig()) {
    console.warn(
      '[Leads] Supabase env vars missing. Lead not saved.\n' +
        'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
    )
    return {
      success: false,
      error: 'Lead capture is not configured. Please contact support.',
    }
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return {
      success: false,
      error: 'Unable to initialize lead capture.',
    }
  }

  // Validate required fields based on form type
  if (!input.fullName?.trim()) {
    return { success: false, error: 'Full name is required.' }
  }

  if (input.formType !== 'callback' && !input.email?.trim()) {
    return { success: false, error: 'Email is required.' }
  }

  if (input.formType === 'callback' && !input.whatsapp?.trim() && !input.phone?.trim()) {
    return { success: false, error: 'Phone or WhatsApp number is required for callback requests.' }
  }

  if (input.formType === 'project' && !input.projectDescription?.trim()) {
    return { success: false, error: 'Project description is required.' }
  }

  if (input.formType === 'service' && !input.businessProblem?.trim()) {
    return { success: false, error: 'Please describe your main business problem.' }
  }

  const metadata: Record<string, unknown> = {
    submittedAt: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : null,
    referrer: typeof document !== 'undefined' ? document.referrer : null,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    language: typeof navigator !== 'undefined' ? navigator.language : null,
  }

  const { data, error } = await (supabase
    .from('website_leads') as any)
    .insert({
      full_name: input.fullName.trim(),
      email: input.email?.trim().toLowerCase() || null,
      whatsapp: input.whatsapp?.trim() || null,
      phone: input.phone?.trim() || null,
      country_code: input.countryCode?.trim().toUpperCase() || null,
      region: input.region || 'OTHER',
      business_name: input.businessName?.trim() || input.company?.trim() || null,
      form_type: input.formType,
      service_id: input.serviceId || input.serviceType || null,
      service_label: input.serviceLabel || null,
      budget_range: input.budgetRange || null,
      timeline: input.timeline || null,
      preferred_contact_method: input.preferredContactMethod || null,
      preferred_contact_time: input.preferredContactTime || null,
      project_description: input.projectDescription?.trim() || null,
      business_problem: input.businessProblem?.trim() || null,
      message: input.message?.trim() || null,
      source_page: input.sourcePage || null,
      source_cta: input.sourceCta || null,
      contact_channel_clicked: input.contactChannelClicked || null,
      status: 'new',
      metadata,
    })
    .select('id')
    .single() as any

  if (error) {
    console.error('[Leads] Insert error:', error)
    return {
      success: false,
      error: 'Failed to submit your inquiry. Please try again or contact us directly.',
    }
  }

  return {
    success: true,
    leadId: data?.id,
  }
}
