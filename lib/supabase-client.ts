import { createBrowserClient } from '@supabase/ssr'

export type Message = {
  id: string
  created_at: string
  published_at: string
  title: string
  main_text: string
  hidden_text: string | null
  audio_url: string | null
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
