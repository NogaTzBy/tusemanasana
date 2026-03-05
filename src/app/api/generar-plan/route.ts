import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { crearPlanSemanal } from '@/lib/supabase/queries'

export const maxDuration = 60

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const plan = await crearPlanSemanal(user.id)

  if (!plan) {
    return NextResponse.json({ error: 'No se pudo generar el plan' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
