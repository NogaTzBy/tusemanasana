'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Usuario, PerfilNutricional } from '@/lib/types'

interface Props {
  usuario: Usuario | null
  perfil: PerfilNutricional | null
}

const FIELD_LABELS: Record<string, string> = {
  objetivo: 'Objetivo',
  tipo_alimentacion: 'Tipo de alimentación',
  tiempo_disponible: 'Tiempo para cocinar',
  cantidad_personas: 'Personas',
  frecuencia_recetas: 'Nuevas recetas',
}

export default function PerfilClient({ usuario, perfil }: Props) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-cream ">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-cream-surface px-6 py-4">
        <h1 className="font-serif text-2xl font-bold text-center text-gray-900 ">
          Mi Perfil
        </h1>
      </header>

      <main className="max-w-lg mx-auto px-4 pb-28 pt-6">
        {/* Avatar + datos */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-sage text-[40px]" style={{fontVariationSettings:"'FILL' 1"}}>person</span>
          </div>
          {usuario?.nombre && (
            <h2 className="font-serif text-xl font-bold text-gray-900 ">{usuario.nombre}</h2>
          )}
          {usuario?.email && (
            <p className="text-gray-400 text-sm">{usuario.email}</p>
          )}
        </div>

        {/* Preferencias nutricionales */}
        {perfil && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50 mb-4">
            <div className="px-4 py-3 border-b border-cream-surface ">
              <h3 className="font-serif font-bold text-gray-800 ">Mis preferencias</h3>
            </div>
            <div className="divide-y divide-cream-surface ">
              {(Object.keys(FIELD_LABELS) as (keyof typeof FIELD_LABELS)[]).map((key) => {
                const val = perfil[key as keyof PerfilNutricional]
                if (!val) return null
                const display = Array.isArray(val) ? (val.length ? val.join(', ') : 'Ninguno') : String(val)
                return (
                  <div key={key} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-gray-500 ">{FIELD_LABELS[key]}</span>
                    <span className="text-sm font-medium text-gray-800 capitalize max-w-[55%] text-right">{display}</span>
                  </div>
                )
              })}
              {perfil.alimentos_excluidos?.length > 0 && (
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500 ">Excluidos</span>
                  <span className="text-sm font-medium text-gray-800 text-right max-w-[55%]">{perfil.alimentos_excluidos.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="w-full py-4 rounded-xl border-2 border-terracotta text-terracotta font-bold text-sm hover:bg-terracotta/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Cerrar sesión
        </button>
      </main>
    </div>
  )
}
