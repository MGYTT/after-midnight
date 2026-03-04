'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { isWithinNightHours, getTimeUntilMidnight } from '@/lib/timeUtils'

interface Props {
  children: React.ReactNode
}

export default function TimeGate({ children }: Props) {
  const [isNight, setIsNight] = useState<boolean | null>(null)
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    function check() {
      setIsNight(isWithinNightHours())
      setCountdown(getTimeUntilMidnight())
    }
    check()
    const interval = setInterval(check, 60000)
    return () => clearInterval(interval)
  }, [])

  if (isNight === null) return null // SSR guard

  if (!isNight) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Blurred content hint */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #0f0a0800 0%, #080808 70%)',
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none blur-2xl opacity-10"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              #c9a84c08 2px,
              #c9a84c08 4px
            )`,
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative z-10 max-w-xs"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#2a2520] uppercase mb-8">
            jeszcze nie czas
          </p>

          <h2 className="font-serif text-4xl italic text-[#e8e0d4]/30 mb-8 font-light">
            After Midnight
          </h2>

          <p className="text-sm text-[#3a3530] leading-relaxed mb-10">
            Ta strona otwiera się o 22:00.<br />
            Wróć gdy zapadnie noc.
          </p>

          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] tracking-[0.3em] text-[#2a2520] uppercase">
              do otwarcia
            </p>
            <p className="font-serif text-2xl text-[#c9a84c]/40 font-light">
              {countdown}
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
