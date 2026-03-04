'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { motion } from 'framer-motion'

export default function AdminPage() {
  const [adminPass, setAdminPass] = useState('')
  const [authed, setAuthed] = useState(false)
  const [form, setForm] = useState({
    title: '',
    main_text: '',
    hidden_text: '',
    audio_url: '',
  })
  const [saved, setSaved] = useState(false)

  // Prosta ochrona po stronie klienta (tylko UX, nie security)
  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS ?? 'admin'

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-xs">
          <h1 className="font-serif text-3xl italic text-[#e8e0d4] mb-8">Admin</h1>
          <input
            type="password"
            placeholder="hasło admina"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && adminPass === ADMIN_PASS) setAuthed(true)
            }}
            className="w-full bg-transparent border-b border-[#2a2520] pb-3 text-[#e8e0d4] text-sm tracking-widest placeholder:text-[#3a3530] focus:outline-none focus:border-[#c9a84c] transition-colors duration-500"
          />
        </div>
      </main>
    )
  }

  async function handleSave() {
    const supabase = createClient()
    const { error } = await supabase.from('messages').insert([
      {
        title: form.title,
        main_text: form.main_text,
        hidden_text: form.hidden_text || null,
        audio_url: form.audio_url || null,
      },
    ])
    if (!error) {
      setSaved(true)
      setForm({ title: '', main_text: '', hidden_text: '', audio_url: '' })
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const inputClass = `
    w-full bg-transparent border-b border-[#1e1e1e] pb-3 pt-1
    text-[#e8e0d4] text-sm tracking-wide
    placeholder:text-[#2a2520]
    focus:outline-none focus:border-[#c9a84c]/50
    transition-colors duration-500
  `

  return (
    <main className="min-h-screen px-6 py-16 max-w-md mx-auto">
      <h1 className="font-serif text-4xl italic text-[#e8e0d4] mb-2">Nowa wiadomość</h1>
      <div className="w-6 h-px bg-[#c9a84c]/40 mb-12" />

      <div className="space-y-10">
        <div>
          <label className="text-[10px] tracking-[0.3em] text-[#3a3530] uppercase block mb-3">tytuł</label>
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Pierwsza noc"
          />
        </div>

        <div>
          <label className="text-[10px] tracking-[0.3em] text-[#3a3530] uppercase block mb-3">
            główna treść
          </label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={5}
            value={form.main_text}
            onChange={(e) => setForm({ ...form, main_text: e.target.value })}
            placeholder="Tekst pisany efektem maszyny..."
          />
        </div>

        <div>
          <label className="text-[10px] tracking-[0.3em] text-[#3a3530] uppercase block mb-3">
            ukryta warstwa <span className="text-[#2a2520]">(opcjonalne)</span>
          </label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={4}
            value={form.hidden_text}
            onChange={(e) => setForm({ ...form, hidden_text: e.target.value })}
            placeholder="Treść odsłaniana po przytrzymaniu..."
          />
        </div>

        <div>
          <label className="text-[10px] tracking-[0.3em] text-[#3a3530] uppercase block mb-3">
            URL audio <span className="text-[#2a2520]">(opcjonalne)</span>
          </label>
          <input
            className={inputClass}
            value={form.audio_url}
            onChange={(e) => setForm({ ...form, audio_url: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <motion.button
          onClick={handleSave}
          disabled={!form.title || !form.main_text}
          whileTap={{ scale: 0.97 }}
          className="
            w-full py-4 text-[11px] tracking-[0.35em] uppercase
            text-[#c9a84c] border border-[#c9a84c]/20
            hover:border-[#c9a84c]/50 hover:bg-[#c9a84c]/[0.03]
            transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed
          "
        >
          {saved ? 'zapisano' : 'opublikuj'}
        </motion.button>
      </div>
    </main>
  )
}
