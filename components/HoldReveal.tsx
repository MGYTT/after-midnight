'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HoldReveal({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const HOLD = 3000

  function startHold() {
    if (revealed) return
    if ('vibrate' in navigator) navigator.vibrate(8)
    const start = Date.now()
    intervalRef.current = setInterval(() => {
      const p = Math.min((Date.now() - start) / HOLD, 1)
      setProgress(p)
      if (p >= 1) {
        clearInterval(intervalRef.current!)
        if ('vibrate' in navigator) navigator.vibrate([15, 10, 25])
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
    <div className="mt-10">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="btn"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-3"
          >
            <p className="text-[9px] tracking-[0.4em] text-[#2a2520] uppercase">
              przytrzymaj aby odsłonić
            </p>

            {/* Progress bar zamiast kółka */}
            <div
              className="relative w-32 h-px bg-[#1a1814] cursor-pointer select-none"
              onMouseDown={startHold}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={startHold}
              onTouchEnd={stopHold}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#c9a84c]"
                style={{ width: `${progress * 100}%`, opacity: 0.5 }}
              />
              {/* Dotykowy obszar */}
              <div className="absolute -inset-y-4 inset-x-0" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-6 h-px bg-[#c9a84c]/30 mb-5" />
            <p className="font-serif text-[1.15rem] italic leading-[1.85] text-[#c9a84c]/60 font-light">
              {children}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
