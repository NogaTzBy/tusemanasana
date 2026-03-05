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

  let plan = null
  let errorDetalle = ''
  try {
    plan = await crearPlanSemanal(user.id)
  } catch (e) {
    errorDetalle = e instanceof Error ? e.message : String(e)
  }

  if (!plan) {
    return NextResponse.json({ error: 'No se pudo generar el plan', detalle: errorDetalle }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
