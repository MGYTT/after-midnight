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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.0,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="py-12 border-b border-[#141414] last:border-0"
    >
      {/* Date */}
      <p className="text-[10px] tracking-[0.35em] text-[#2a2520] uppercase mb-6">
        {new Date(message.published_at).toLocaleDateString('pl-PL', {
          day: '2-digit',
          month: 'long',
        })}
      </p>

      {/* Title */}
      <h2 className="font-serif text-3xl font-light italic text-[#e8e0d4] mb-6 leading-tight">
        {message.title}
      </h2>

      {/* Main text — typewriter */}
      <p className="text-[15px] leading-[1.9] text-[#8a847e] font-light">
        <TypewriterText
          text={message.main_text}
          delay={index * 0.2 + 0.3}
          onComplete={() => setTextDone(true)}
        />
      </p>

      {/* Hidden layer */}
      {textDone && message.hidden_text && (
        <HoldReveal>{message.hidden_text}</HoldReveal>
      )}

      {/* Audio */}
      {message.audio_url && (
        <AudioPlayer src={message.audio_url} />
      )}
    </motion.article>
  )
}
