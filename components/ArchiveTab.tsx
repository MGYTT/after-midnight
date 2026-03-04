'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { isOlderThan14Days } from '@/lib/timeUtils'
import type { Message } from '@/lib/supabase'

interface Props {
  messages: Message[]
  firstMessageDate: string
}

export default function ArchiveTab({ messages, firstMessageDate }: Props) {
  const [open, setOpen] = useState(false)

  if (!isOlderThan14Days(firstMessageDate)) return null

  const archived = messages.filter((m) =>
    isOlderThan14Days(m.published_at)
  )

  if (archived.length === 0) return null

  return (
    <div className="mt-16 pt-12 border-t border-[#141414]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 group"
      >
        <span className="text-[10px] tracking-[0.4em] text-[#3a3530] uppercase group-hover:text-[#6b6560] transition-colors duration-300">
          archiwum
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          className="text-[#2a2520] text-xs"
        >
          ↓
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8 space-y-8">
              {archived.map((msg) => (
                <div key={msg.id} className="opacity-50 hover:opacity-70 transition-opacity duration-500">
                  <p className="text-[10px] tracking-[0.35em] text-[#2a2520] uppercase mb-2">
                    {new Date(msg.published_at).toLocaleDateString('pl-PL', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <h3 className="font-serif text-xl italic text-[#e8e0d4]/50 font-light">
                    {msg.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#3a3530] leading-relaxed">
                    {msg.main_text.slice(0, 80)}…
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
