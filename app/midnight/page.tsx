import { createServerSupabaseClient } from '@/lib/supabase-server'
import TimeGate from '@/components/TimeGate'
import MidnightClient from '@/components/MidnightClient'

export const dynamic = 'force-dynamic'

async function getMessages() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('published_at', { ascending: false })
    if (error) throw error
    return data ?? []
  } catch {
    return []
  }
}

export default async function MidnightPage() {
  const messages = await getMessages()
  const firstDate = messages.length > 0
    ? messages[messages.length - 1].published_at
    : new Date().toISOString()

  return (
    <TimeGate>
      <MidnightClient initialMessages={messages} firstDate={firstDate} />
    </TimeGate>
  )
}
