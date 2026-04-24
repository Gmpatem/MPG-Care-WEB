import { createClient } from '@supabase/supabase-js'
import { env, hasSupabaseConfig } from './env'

export type SupabaseClient = ReturnType<typeof createClient>

let client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient | null {
  if (!hasSupabaseConfig()) {
    return null
  }

  if (!client) {
    client = createClient(env.supabaseUrl!, env.supabaseAnonKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }

  return client
}
