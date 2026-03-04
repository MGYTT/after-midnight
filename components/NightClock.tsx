'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function NightClock() {
  const [time, setTime] = useState('')

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
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="flex items-center gap-3 mb-16"
    >
      {/* Pulsująca kropka */}
      <motion.div
        className="w-1 h-1 rounded-full bg-[#c9a84c]"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="font-serif text-sm text-[#3a3530] tracking-widest">
        {time}
      </span>
    </motion.div>
  )
}
