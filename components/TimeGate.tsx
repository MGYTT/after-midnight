'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { isWithinNightHours, getTimeUntilMidnight } from '@/lib/timeUtils'

export default function TimeGate({ children }: { children: React.ReactNode }) {
  const [isNight, setIsNight] = useState<boolean | null>(null)
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    function check() {
      setIsNight(isWithinNightHours())
      setCountdown(getTimeUntilMidnight())
    }
    check()
    const interval = setInterval(check, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isNight === null) return null

  if (!isNight) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="max-w-xs"
        >
          {/* Ikona księżyca */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl mb-12 select-none"
          >
            ◐
          </motion.div>

          <h2 className="font-serif text-4xl italic font-light text-[#e8e0d4]/20 mb-6">
            Jeszcze nie czas.
          </h2>

          <p className="text-[12px] leading-relaxed text-[#3a3530] mb-12 font-light">
            Ta strona budzi się o 22:00.<br />
            Wróć gdy świat ucichnie.
          </p>

          {/* Odliczanie */}
          <div className="inline-flex flex-col items-center gap-2 px-8 py-5 border border-[#1a1814]">
            <span className="text-[9px] tracking-[0.4em] text-[#2a2520] uppercase">
              za
            </span>
            <span className="font-serif text-3xl text-[#c9a84c]/30 font-light tracking-wider">
              {countdown}
            </span>
          </div>

          <p className="mt-12 text-[9px] tracking-[0.4em] text-[#1a1814] uppercase">
            22:00 — 7:30
          </p>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
