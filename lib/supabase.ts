// lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Brak zmiennych środowiskowych Supabase. Sprawdź NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    )
  }

  return createBrowserClient(url, key)
}

export type Message = {
  id: string
  created_at: string
  published_at: string
  title: string
  main_text: string
  hidden_text: string | null
  audio_url: string | null
}
