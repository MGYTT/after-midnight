'use client'

import { useEffect, useState } from 'react'
import { createClient, type Message } from '@/lib/supabase'

export function useMessages(initial: Message[]) {
  const [messages, setMessages] = useState<Message[]>(initial)

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('messages-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [payload.new as Message, ...prev])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return messages
}
