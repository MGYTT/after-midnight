'use client'

import { useMessages } from '@/hooks/useMessages'
import MessageCard from './MessageCard'
import ArchiveTab from './ArchiveTab'
import { motion } from 'framer-motion'
import type { Message } from '@/lib/supabase'
import NightClock from './NightClock'

export default function MidnightClient({ initialMessages }: { initialMessages: Message[] }) {
  const messages = useMessages(initialMessages)
  const firstDate = messages.length > 0
    ? messages[messages.length - 1].published_at
    : new Date().toISOString()

  return (
    <main className="min-h-screen px-6 py-16 max-w-md mx-auto">
      <header className="mb-20">
        <p className="text-[10px] tracking-[0.4em] text-[#2a2520] uppercase mb-4">
          tylko dla nas
        </p>
        <h1 className="font-serif text-5xl font-light italic text-[#e8e0d4]">
          After Midnight
        </h1>
        <div className="mt-5 w-8 h-px bg-[#c9a84c] opacity-40" />
      </header>
<NightClock />
      <section>
        {messages.map((msg, i) => (
          <MessageCard key={msg.id} message={msg} index={i} />
        ))}
      </section>

      <ArchiveTab messages={messages} firstMessageDate={firstDate} />

      <footer className="mt-20 pb-8">
        <p className="text-[10px] tracking-[0.3em] text-[#1a1a18] text-center uppercase">
          {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}
