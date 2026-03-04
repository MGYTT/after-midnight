import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export type Message = {
  id: string
  created_at: string
  published_at: string
  title: string
  main_text: string
  hidden_text: string | null
  audio_url: string | null
}

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
