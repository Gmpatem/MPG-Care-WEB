import { getSupabaseClient } from '@/lib/supabase'
import { hasSupabaseConfig } from '@/lib/env'
import type { LeadInput, LeadResult } from './types'

function saveLeadToLocalStorage(input: LeadInput): LeadResult {
  try {
    const existing = JSON.parse(localStorage.getItem('mpg_leads') || '[]')
    const leadRecord = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...input,
      submittedAt: new Date().toISOString(),
      sourceUrl: typeof window !== 'undefined' ? window.location.href : null,
    }
    existing.push(leadRecord)
    localStorage.setItem('mpg_leads', JSON.stringify(existing))
    console.info('[Leads] Saved to localStorage. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable cloud storage.')
    return { success: true, leadId: leadRecord.id }
  } catch (err) {
    console.error('[Leads] localStorage save error:', err)
    return { success: false, error: 'Unable to save inquiry. Please contact us directly.' }
  }
}

export async function submitLead(input: LeadInput): Promise<LeadResult> {
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

  // If Supabase is not configured, fall back to localStorage
  if (!hasSupabaseConfig()) {
    console.warn(
      '[Leads] Supabase env vars missing. Falling back to localStorage.\n' +
        'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local to enable cloud storage.'
    )
    return saveLeadToLocalStorage(input)
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return saveLeadToLocalStorage(input)
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
    return saveLeadToLocalStorage(input)
  }

  return {
    success: true,
    leadId: data?.id,
  }
}
