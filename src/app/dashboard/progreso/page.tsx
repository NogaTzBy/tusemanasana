import BottomNav from '@/components/ui/BottomNav'
import ProgresoClient from './ProgresoClient'

export const metadata = { title: 'Mi Progreso | Tu Semana Sana' }

export default function ProgresoPage() {
  return (
    <>
      <ProgresoClient />
      <BottomNav />
    </>
  )
}
