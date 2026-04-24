import { getSupabaseClient } from '@/lib/supabase'
import { hasSupabaseConfig } from '@/lib/env'
import type { RegionCode } from '@/types/content'

export type ContactChannel = 'whatsapp' | 'email' | 'calendly' | 'form'

export interface ContactClickInput {
  channel: ContactChannel
  sourceCta: string
  region: RegionCode
  serviceId?: string
}

/**
 * Fire-and-forget contact channel click tracking.
 * Inserts a lightweight lead record with form_type='contact'.
 * Does not block the UI or prevent external link navigation.
 */
export async function trackContactClick(input: ContactClickInput): Promise<void> {
  if (!hasSupabaseConfig()) {
    // Silently skip if Supabase is not configured
    return
  }

  const supabase = getSupabaseClient()
  if (!supabase) return

  try {
    await (supabase.from('website_leads') as any).insert({
      full_name: '(Contact Click)',
      email: null,
      form_type: 'contact',
      contact_channel_clicked: input.channel,
      source_cta: input.sourceCta,
      source_page: typeof window !== 'undefined' ? window.location.pathname : '/',
      region: input.region,
      service_id: input.serviceId || null,
      status: 'new',
      metadata: {
        trackedAt: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : null,
        referrer: typeof document !== 'undefined' ? document.referrer : null,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      },
    })
  } catch {
    // Silently fail — tracking should never block UX
  }
}

/**
 * Convenience wrapper that fires tracking without awaiting.
 * Safe to call from click handlers before navigating away.
 */
export function trackContactClickFireAndForget(input: ContactClickInput): void {
  // Use sendBeacon-like pattern: fire without awaiting
  void trackContactClick(input)
}
