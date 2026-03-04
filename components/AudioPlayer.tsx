'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface Props {
  src: string
}

export default function AudioPlayer({ src }: Props) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  function toggle() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <div className="mt-8 flex items-center gap-4">
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} />

      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.93 }}
        className="flex items-center gap-3 group"
      >
        {/* Play/Pause icon */}
        <div className="w-8 h-8 border border-[#c9a84c]/30 flex items-center justify-center group-hover:border-[#c9a84c]/60 transition-colors duration-300">
          {playing ? (
            <div className="flex gap-0.5">
              <div className="w-0.5 h-3 bg-[#c9a84c]/60" />
              <div className="w-0.5 h-3 bg-[#c9a84c]/60" />
            </div>
          ) : (
            <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[8px] border-transparent border-l-[#c9a84c]/60 ml-0.5" />
          )}
        </div>
        <span className="text-[10px] tracking-[0.3em] text-[#3a3530] uppercase group-hover:text-[#6b6560] transition-colors duration-300">
          {playing ? 'pauza' : 'odtwórz'}
        </span>
      </motion.button>

      {/* Waveform animation when playing */}
      {playing && (
        <div className="flex items-center gap-0.5 h-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-px bg-[#c9a84c]/40"
              animate={{ height: ['4px', '12px', '4px'] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
