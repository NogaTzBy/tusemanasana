'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCompletadas } from '@/lib/useCompletadas'

const CATEGORIA_LABELS: Record<string, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  cena: 'Cena',
}

export default function ProgresoClient() {
  const { completadas, toggle, loaded } = useCompletadas()

  if (!loaded) return null

  const totalSemana = 21 // 7 días × 3 comidas
  const porcentaje = Math.round((completadas.length / totalSemana) * 100)

  return (
    <div className="min-h-screen bg-cream ">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-cream-surface px-6 py-4">
        <h1 className="font-serif text-2xl font-bold text-center text-gray-900 ">
          Mi Progreso
        </h1>
      </header>

      <main className="max-w-lg mx-auto px-4 pb-28 pt-6">
        {/* Stats card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Esta semana</p>
              <p className="font-serif text-3xl font-bold text-gray-900 ">
                {completadas.length}<span className="text-gray-300 text-xl">/{totalSemana}</span>
              </p>
              <p className="text-gray-400 text-xs mt-1">recetas completadas</p>
            </div>
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F5F2EC" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#87A96B" strokeWidth="3"
                  strokeDasharray={`${porcentaje} ${100 - porcentaje}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700 ">
                {porcentaje}%
              </span>
            </div>
          </div>
          <div className="w-full bg-cream-surface rounded-full h-2">
            <div
              className="bg-sage h-2 rounded-full transition-all duration-500"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
        </div>

        {/* Lista de completadas */}
        {completadas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-gray-300 text-[64px] mb-4">bar_chart</span>
            <p className="text-gray-500 font-medium mb-1">Todavía no completaste ninguna receta</p>
            <p className="text-gray-400 text-sm mb-6">Abrí una receta y marcala como completada</p>
            <Link href="/dashboard/recetas" className="px-6 py-2 bg-terracotta text-white rounded-full text-sm font-medium">
              Ver recetas
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="font-serif text-lg font-bold text-gray-800 mb-3">
              Recetas completadas
            </h2>
            <div className="space-y-3">
              {[...completadas].reverse().map((receta) => (
                <div
                  key={receta.id}
                  className="flex gap-3 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-50 "
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    {receta.foto_url ? (
                      <Image
                        src={receta.foto_url}
                        alt={receta.nombre}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-cream-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-gray-300">restaurant</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-sage/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[28px]" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                    </div>
                  </div>
                  <div className="flex-1 py-3 pr-2 min-w-0">
                    <p className="font-serif font-semibold text-gray-800 text-sm leading-tight">{receta.nombre}</p>
                    <p className="text-gray-400 text-xs mt-1">{CATEGORIA_LABELS[receta.categoria]}</p>
                    <p className="text-gray-300 text-xs">{new Date(receta.completada_en).toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })}</p>
                  </div>
                  <button
                    onClick={() => toggle({ id: receta.id, nombre: receta.nombre, categoria: receta.categoria, foto_url: receta.foto_url })}
                    className="self-center pr-3 text-gray-300 hover:text-terracotta transition-colors"
                    aria-label="Desmarcar"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
