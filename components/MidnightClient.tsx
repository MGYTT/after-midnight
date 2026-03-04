'use client'

import { useMessages } from '@/hooks/useMessages'
import { type Message } from '@/lib/supabase-client'
import MessageCard from './MessageCard'
import ArchiveTab from './ArchiveTab'
import NightClock from './NightClock'
import AmbientBackground from './AmbientBackground'

interface Props {
  initialMessages: Message[]
  firstDate: string
}

export default function MidnightClient({ initialMessages, firstDate }: Props) {
  const messages = useMessages(initialMessages)

  return (
    <main className="relative min-h-screen px-6 py-16 max-w-md mx-auto">
      <AmbientBackground />

      <div className="relative z-10">
        <header className="mb-6">
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
          {messages.length === 0 ? (
            <p className="font-serif text-xl italic text-[#3a3530] text-center mt-20">
              Jeszcze nic nie napisano.
            </p>
          ) : (
            messages.map((msg, i) => (
              <MessageCard key={msg.id} message={msg} index={i} />
            ))
          )}
        </section>

        <ArchiveTab messages={messages} firstMessageDate={firstDate} />

        <footer className="mt-20 pb-8">
          <p className="text-[10px] tracking-[0.3em] text-[#1a1a18] text-center uppercase">
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </main>
  )
}
