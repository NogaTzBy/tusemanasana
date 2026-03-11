import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getPerfilUsuario } from '@/lib/supabase/queries'
import BottomNav from '@/components/ui/BottomNav'
import PerfilClient from './PerfilClient'

export const metadata = { title: 'Mi Perfil | Tu Semana Sana' }
export const dynamic = 'force-dynamic'

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const usuario = await getPerfilUsuario()

  const { data: perfil } = await supabase
    .from('perfiles_nutricionales')
    .select('objetivo, tiempo_disponible, tipo_alimentacion, alimentos_excluidos, cantidad_personas, frecuencia_recetas')
    .eq('usuario_id', user.id)
    .maybeSingle()

  return (
    <>
      <PerfilClient usuario={usuario} perfil={perfil} />
      <BottomNav />
    </>
  )
}
