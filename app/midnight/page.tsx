// app/midnight/page.tsx
import { createClient } from '@/lib/supabase'
import TimeGate from '@/components/TimeGate'
import MidnightClient from '@/components/MidnightClient'

async function getMessages() {
  const supabase = createClient()
  const { data } = await supabase
    .from('messages')
    .select('*')
    .order('published_at', { ascending: false })
  return data ?? []
}

// ← 'export default' jest wymagane przez Next.js App Router
export default async function MidnightPage() {
  const messages = await getMessages()

  const firstDate =
    messages.length > 0
      ? messages[messages.length - 1].published_at
      : new Date().toISOString()

  return (
    <TimeGate>
      <MidnightClient initialMessages={messages} />
    </TimeGate>
  )
}
