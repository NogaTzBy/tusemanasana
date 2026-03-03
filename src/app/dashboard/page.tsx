import { redirect } from 'next/navigation'
import { getPerfilUsuario, getPlanSemanal } from '@/lib/supabase/queries'
import DashboardClient from '@/components/dashboard/DashboardClient'
import SuscripcionInactiva from '@/components/ui/SuscripcionInactiva'
import BottomNav from '@/components/ui/BottomNav'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  // ── Obtener perfil del usuario autenticado ─────────────────
  const usuario = await getPerfilUsuario()

  if (!usuario) {
    redirect('/login')
  }

  // ── Verificar estado de suscripción ───────────────────────
  const suscripcionValida =
    usuario.estado_suscripcion === 'trial' ||
    usuario.estado_suscripcion === 'activa'

  if (!suscripcionValida) {
    return (
      <>
        <SuscripcionInactiva />
        <BottomNav />
      </>
    )
  }

  // ── Obtener plan semanal (crea uno si no existe) ───────────
  const plan = await getPlanSemanal(usuario.id)

  if (!plan) {
    // Caso extremo: no se pudo obtener ni crear el plan
    return (
      <>
        <div className="min-h-screen bg-cream dark:bg-dark-bg flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-terracotta/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-terracotta text-[40px]">
              warning
            </span>
          </div>
          <h1 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-3">
            No pudimos cargar tu plan
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
            Hubo un error al obtener tu plan semanal. Por favor, recargá la página o contactá soporte.
          </p>
        </div>
        <BottomNav />
      </>
    )
  }

  // ── Renderizar dashboard completo ──────────────────────────
  return (
    <>
      <DashboardClient plan={plan} usuario={usuario} />
      <BottomNav />
    </>
  )
}
