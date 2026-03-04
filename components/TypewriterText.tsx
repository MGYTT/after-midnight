'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

export default function TypewriterText({ text, delay = 0, className = '', onComplete }: Props) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
          onComplete?.()
        }
      }, 38)
      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [text, delay, onComplete])

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-px h-[1em] bg-[#c9a84c] ml-0.5 align-middle"
        />
      )}
    </span>
  )
}
