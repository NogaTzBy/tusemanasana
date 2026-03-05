import { redirect } from 'next/navigation'
import { getPerfilUsuario, getPlanSemanal } from '@/lib/supabase/queries'
import DashboardClient from '@/components/dashboard/DashboardClient'
import GenerandoPlan from '@/components/dashboard/GenerandoPlan'
import BottomNav from '@/components/ui/BottomNav'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const usuario = await getPerfilUsuario()

  if (!usuario) {
    redirect('/login')
  }

  const plan = await getPlanSemanal(usuario.id)

  if (!plan) {
    return <GenerandoPlan />
  }

  return (
    <>
      <DashboardClient plan={plan} usuario={usuario} />
      <BottomNav />
    </>
  )
}
