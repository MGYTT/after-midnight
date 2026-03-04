'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function NightClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    function update() {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('pl-PL', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      )
      setDate(
        now.toLocaleDateString('pl-PL', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, delay: 0.2 }}
      className="flex flex-col items-center gap-2 mb-6"
    >
      {/* Czas */}
      <div className="flex items-center gap-2">
        <motion.div
          className="w-1 h-1 rounded-full bg-[#c9a84c]"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="font-serif text-[2.4rem] font-light text-[#c9a84c]/50 tracking-widest tabular-nums leading-none">
          {time}
        </span>
        <motion.div
          className="w-1 h-1 rounded-full bg-[#c9a84c]"
          animate={{ opacity: [0.8, 0.2, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Data */}
      <p className="text-[10px] tracking-[0.35em] text-[#2a2520] uppercase">
        {date}
      </p>
    </motion.div>
  )
}
