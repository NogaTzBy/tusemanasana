'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { cambiarRecetaAction } from '@/app/actions/plan'
import type { CategoriaComida, Receta } from '@/lib/types'

interface MealCardProps {
  receta: Receta | null
  categoria: CategoriaComida
  diaIndex: number
  planId: string
}

const CATEGORIA_LABELS: Record<CategoriaComida, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  cena: 'Cena',
}

export default function MealCard({ receta, categoria, diaIndex, planId }: MealCardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleCambiarReceta = (e: React.MouseEvent) => {
    e.stopPropagation()
    setError(null)
    startTransition(async () => {
      const result = await cambiarRecetaAction(planId, diaIndex, categoria)
      if (result.success) {
        router.refresh()
      } else {
        setError(result.error ?? 'Error al cambiar la receta')
      }
    })
  }

  const handleNavigate = () => {
    if (receta) {
      router.push(`/receta/${receta.id}`)
    }
  }

  if (!receta) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-card border border-gray-100 ">
        <div className="h-48 bg-cream-surface flex items-center justify-center">
          <span className="material-symbols-outlined text-gray-300 text-[48px]">
            restaurant
          </span>
        </div>
        <div className="p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-300 ">
            {CATEGORIA_LABELS[categoria]}
          </span>
          <p className="text-gray-400 text-sm mt-1">Sin receta asignada</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-card group cursor-pointer"
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
      aria-label={`Ver receta: ${receta.nombre}`}
    >
      {/* Imagen */}
      <div className="relative h-48 w-full overflow-hidden">
        {receta.foto_url ? (
          <Image
            src={receta.foto_url}
            alt={receta.nombre}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-cream-surface flex items-center justify-center">
            <span className="material-symbols-outlined text-gray-300 text-[48px]">
              restaurant
            </span>
          </div>
        )}

        {/* Badge de categoría */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 ">
            {CATEGORIA_LABELS[categoria]}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-xl font-bold font-serif text-[var(--color-foreground)] group-hover:text-[var(--color-primary-dark)] leading-tight transition-colors">
            {receta.nombre}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {receta.calorias_aprox} kcal • {receta.tiempo_preparacion_min} min
          </p>
        </div>

        <button
          onClick={handleCambiarReceta}
          disabled={isPending}
          className="self-start inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-cream-surface px-3 py-1.5 rounded-full hover:bg-[#e6dcd9] transition-colors disabled:opacity-60"
          aria-label="Cambiar receta"
        >
          <span className={`material-symbols-outlined text-[16px] ${isPending ? 'animate-spin' : ''}`}>
            {isPending ? 'progress_activity' : 'swap_horiz'}
          </span>
          Cambiar receta
        </button>

        {error && (
          <p className="text-xs text-red-500 ">{error}</p>
        )}
      </div>
    </div>
  )
}
