'use client'

import { useMessages } from '@/hooks/useMessages'
import { type Message } from '@/lib/supabase-client'
import MessageCard from '@/components/MessageCard'
import ArchiveTab from '@/components/ArchiveTab'
import NightClock from '@/components/NightClock'
import AmbientBackground from '@/components/AmbientBackground'
import { motion } from 'framer-motion'

interface Props {
  initialMessages: Message[]
  firstDate: string
}

export default function MidnightClient({ initialMessages, firstDate }: Props) {
  const messages = useMessages(initialMessages)

  return (
    <div className="relative min-h-screen bg-[#080808]">
      <AmbientBackground />

      {/* Górny gradient */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080808] to-transparent z-20 pointer-events-none" />
      {/* Dolny gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent z-20 pointer-events-none" />

      <main className="relative z-10 px-6 pt-20 pb-32 max-w-sm mx-auto">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="mb-20 text-center"
        >
          <NightClock />

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a84c]/30 to-transparent mx-auto mb-8"
          />

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.6 }}
            className="font-serif text-[2.8rem] font-light italic text-[#e8e0d4] leading-none tracking-tight"
          >
            After Midnight
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
            className="mt-4 text-[10px] tracking-[0.45em] text-[#2e2a26] uppercase"
          >
            tylko dla nas
          </motion.p>
        </motion.header>

        {/* Separator */}
        <Separator delay={1.0} />

        {/* Wiadomości */}
        <section className="mt-16 space-y-0">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((msg, i) => (
              <MessageCard key={msg.id} message={msg} index={i} />
            ))
          )}
        </section>

        {/* Archiwum */}
        <ArchiveTab messages={messages} firstMessageDate={firstDate} />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          className="mt-24 text-center"
        >
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a84c]/20 to-transparent mx-auto mb-4" />
          <p className="text-[9px] tracking-[0.5em] text-[#1e1c1a] uppercase">
            noc należy do nas
          </p>
        </motion.footer>

      </main>
    </div>
  )
}

function Separator({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex items-center gap-4"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c]/20" />
      <div className="w-1 h-1 rounded-full bg-[#c9a84c]/30" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c]/20" />
    </motion.div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
      className="text-center py-20"
    >
      <p className="font-serif text-2xl italic text-[#2a2520] font-light">
        Cisza też mówi.
      </p>
      <p className="mt-4 text-[10px] tracking-[0.3em] text-[#1e1c1a] uppercase">
        pierwsza wiadomość pojawi się wkrótce
      </p>
    </motion.div>
  )
}
