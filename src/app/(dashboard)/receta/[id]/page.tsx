import { notFound } from 'next/navigation'
import { getRecetaDetalle } from '@/lib/supabase/queries'
import RecetaDetalle from '@/components/dashboard/RecetaDetalle'
import BottomNav from '@/components/ui/BottomNav'
import type { Metadata } from 'next'

interface RecetaPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: RecetaPageProps): Promise<Metadata> {
  const { id } = await params
  const receta = await getRecetaDetalle(id)
  if (!receta) return { title: 'Receta no encontrada' }
  return {
    title: `${receta.nombre} | Tu Semana Sana`,
    description: receta.descripcion_corta,
  }
}

export default async function RecetaPage({ params }: RecetaPageProps) {
  const { id } = await params
  const receta = await getRecetaDetalle(id)

  if (!receta) {
    notFound()
  }

  return (
    <>
      <RecetaDetalle receta={receta} />
      <BottomNav />
    </>
  )
}
