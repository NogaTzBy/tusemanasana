import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getPlanSemanal } from '@/lib/supabase/queries'
import type { DiaComidas, Receta } from '@/lib/types'
import RecetasClient from './RecetasClient'
import BottomNav from '@/components/ui/BottomNav'

export const metadata = { title: 'Mis Recetas | Tu Semana Sana' }

export default async function RecetasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const plan = await getPlanSemanal(user.id)

  const recetas: Receta[] = []
  if (plan?.dias) {
    const dias = plan.dias as DiaComidas[]
    for (const dia of dias) {
      for (const cat of ['desayuno', 'almuerzo', 'cena'] as const) {
        if (dia[cat]) recetas.push(dia[cat]!)
      }
    }
  }

  return (
    <>
      <RecetasClient recetas={recetas} />
      <BottomNav />
    </>
  )
}
