/**
 * Safe environment variable reader.
 * Returns undefined for missing values instead of crashing.
 */
export function getEnv(key: string): string | undefined {
  if (typeof import.meta.env !== 'undefined') {
    return import.meta.env[key] as string | undefined
  }
  return undefined
}

export const env = {
  supabaseUrl: getEnv('VITE_SUPABASE_URL'),
  supabaseAnonKey: getEnv('VITE_SUPABASE_ANON_KEY'),
  calendlyUrl: getEnv('VITE_CALENDLY_URL') || 'https://calendly.com/gwanmesiamalcomp',
  publicEmail: getEnv('VITE_PUBLIC_EMAIL') || 'gwanmesiamalcomp@gmail.com',
  whatsappPH: getEnv('VITE_WHATSAPP_PH') || '639994462191',
  whatsappCM: getEnv('VITE_WHATSAPP_CM') || '',
} as const

export function hasSupabaseConfig(): boolean {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey)
}
