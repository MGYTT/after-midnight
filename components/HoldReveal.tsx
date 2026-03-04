'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
}

export default function HoldReveal({ children }: Props) {
  const [progress, setProgress] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const HOLD_DURATION = 3000

  function startHold() {
  if (revealed) return

  // Haptyczny feedback na iOS/Android
  if ('vibrate' in navigator) navigator.vibrate(10)

  const startTime = Date.now()
  intervalRef.current = setInterval(() => {
    const elapsed = Date.now() - startTime
    const p = Math.min(elapsed / HOLD_DURATION, 1)
    setProgress(p)

    // Wibracja przy 50% i 100%
    if (p > 0.5 && p < 0.51 && 'vibrate' in navigator) {
      navigator.vibrate(15)
    }

    if (p >= 1) {
      clearInterval(intervalRef.current!)
      if ('vibrate' in navigator) navigator.vibrate([20, 10, 30])
      setRevealed(true)
    }
  }, 16)
}

  function stopHold() {
    if (revealed) return
    clearInterval(intervalRef.current!)
    setProgress(0)
  }

  return (
    <div className="mt-8">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div key="button" exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.4 }}>
            {/* Progress ring button */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="relative w-14 h-14 cursor-pointer select-none"
                onMouseDown={startHold}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={startHold}
                onTouchEnd={stopHold}
              >
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle
                    cx="28" cy="28" r="24"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="1"
                  />
                  <motion.circle
                    cx="28" cy="28" r="24"
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="1"
                    strokeDasharray={`${2 * Math.PI * 24}`}
                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#c9a84c] opacity-60" />
                </div>
              </div>
              <p className="text-[10px] tracking-[0.3em] text-[#3a3530] uppercase">
                przytrzymaj
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="pt-2"
          >
            <div className="w-4 h-px bg-[#c9a84c]/40 mb-6" />
            <p className="font-serif text-lg italic leading-relaxed text-[#c9a84c]/80">
              {children}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
