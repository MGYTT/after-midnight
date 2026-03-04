import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('published_at', { ascending: false })
    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { title, main_text, hidden_text, audio_url } = await req.json()
    if (!title || !main_text) {
      return NextResponse.json({ error: 'Brak wymaganych pól' }, { status: 400 })
    }
    const { data, error } = await supabase
      .from('messages')
      .insert([{ title, main_text, hidden_text: hidden_text ?? null, audio_url: audio_url ?? null }])
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const id = new URL(req.url).searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Brak id' }, { status: 400 })
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}
