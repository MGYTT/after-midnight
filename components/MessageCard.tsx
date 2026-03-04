'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'
import HoldReveal from './HoldReveal'
import AudioPlayer from './AudioPlayer'
import type { Message } from '@/lib/supabase-client'

interface Props {
  message: Message
  index: number
}

export default function MessageCard({ message, index }: Props) {
  const [textDone, setTextDone] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        delay: index * 0.2 + 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative py-14"
    >
      {/* Lewa złota linia — akcent */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 1.4, delay: index * 0.2 + 1.0 }}
        className="absolute left-0 top-14 w-px bg-gradient-to-b from-[#c9a84c]/40 via-[#c9a84c]/10 to-transparent"
      />

      <div className="pl-6">
        {/* Tytuł */}
        <motion.h2
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: index * 0.2 + 0.9 }}
          className="font-serif text-[1.9rem] font-light italic text-[#ddd5c8] leading-tight mb-5"
        >
          {message.title}
        </motion.h2>

        {/* Główny tekst — typewriter */}
        <p className="text-[14px] leading-[2] text-[#6b6460] font-light tracking-wide">
          <TypewriterText
            text={message.main_text}
            delay={index * 0.2 + 1.2}
            onComplete={() => setTextDone(true)}
          />
        </p>

        {/* Ukryta warstwa */}
        {textDone && message.hidden_text && (
          <HoldReveal>{message.hidden_text}</HoldReveal>
        )}

        {/* Audio */}
        {message.audio_url && (
          <AudioPlayer src={message.audio_url} />
        )}
      </div>

      {/* Separator między wiadomościami */}
      <div className="absolute bottom-0 left-6 right-0 h-px bg-gradient-to-r from-[#1a1814] to-transparent" />
    </motion.article>
  )
}
