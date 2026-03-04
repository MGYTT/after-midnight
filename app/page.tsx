'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import AmbientBackground from '@/components/AmbientBackground'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/midnight')
    } else {
      setError(true)
      setLoading(false)
      setPassword('')
    }
  }

  return (
    <PageTransition>
      <AmbientBackground />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">

        {/* Grain texture */}
        <div
          className="fixed inset-0 opacity-[0.035] pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 w-full max-w-xs"
        >

          {/* Logo block */}
          <motion.div
            className="mb-16 text-center"
            animate={{ y: focused ? -8 : 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 2, delay: 0.3 }}
              className="text-[10px] text-[#6b6560] uppercase mb-4"
            >
              prywatna przestrzeń
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-5xl font-light text-[#e8e0d4] italic leading-tight"
            >
              After Midnight
            </motion.h1>

            {/* Animated gold line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 32, opacity: 0.6 }}
              transition={{ duration: 1.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-5 h-px bg-[#c9a84c] mx-auto"
            />
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.0 }}
          >
            {/* Password input */}
            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="hasło"
                autoComplete="current-password"
                className="
                  w-full bg-transparent border-0 border-b border-[#2a2520]
                  pb-3 pt-1 text-[#e8e0d4] text-sm tracking-[0.25em]
                  placeholder:text-[#2a2520] placeholder:tracking-widest
                  focus:outline-none focus:border-[#c9a84c]/60
                  transition-colors duration-700
                "
              />
              {/* Animated underline on focus */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-[#c9a84c]"
                animate={{ width: focused ? '100%' : '0%', opacity: focused ? 0.4 : 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>

            {/* Error message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.4 }}
                  className="text-[11px] text-[#6b1e2e] tracking-[0.3em] text-center"
                >
                  nieprawidłowe hasło
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading || !password}
              whileTap={{ scale: 0.96 }}
              whileHover={{ borderColor: 'rgba(201,168,76,0.5)' }}
              className="
                relative w-full py-4 text-[11px] tracking-[0.4em] uppercase
                text-[#c9a84c] border border-[#c9a84c]/20
                hover:bg-[#c9a84c]/[0.03]
                transition-all duration-700
                disabled:opacity-25 disabled:cursor-not-allowed
                overflow-hidden
              "
            >
              {/* Shimmer on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a84c]/5 to-transparent -translate-x-full"
                whileHover={{ x: ['−100%', '200%'] }}
                transition={{ duration: 1.2, ease: 'linear' }}
              />

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1 h-1 rounded-full bg-[#c9a84c]/60"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </motion.span>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    wejdź
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          {/* Bottom time label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.6 }}
            className="mt-16 text-center text-[10px] text-[#1e1e1c] tracking-[0.4em] uppercase"
          >
            22:00 — 7:30
          </motion.p>

        </motion.div>
      </main>
    </PageTransition>
  )
}
