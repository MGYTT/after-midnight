import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = createClient()

  const body = await request.json()
  const { title, main_text, hidden_text, audio_url } = body

  if (!title || !main_text) {
    return NextResponse.json(
      { error: 'title i main_text są wymagane' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('messages')
    .insert([{ title, main_text, hidden_text: hidden_text ?? null, audio_url: audio_url ?? null }])
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  const supabase = createClient()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'id jest wymagane' },
      { status: 400 }
    )
  }

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
