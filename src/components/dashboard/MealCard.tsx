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

const CATEGORIA_ICONS: Record<CategoriaComida, string> = {
  desayuno: 'wb_sunny',
  almuerzo: 'lunch_dining',
  cena: 'nightlight',
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

  /* ── Empty / skeleton state ─────────────────────────────── */
  if (!receta) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-card bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border">
        <div className="aspect-[4/3] bg-cream-surface dark:bg-dark-border flex items-center justify-center">
          <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-[48px]">
            {CATEGORIA_ICONS[categoria]}
          </span>
        </div>
        <div className="p-4">
          <span className="inline-block text-xs uppercase tracking-wider font-semibold text-gray-300 dark:text-gray-600 mb-2">
            {CATEGORIA_LABELS[categoria]}
          </span>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Sin receta asignada</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover bg-white dark:bg-dark-surface border border-gray-100/60 dark:border-dark-border transition-shadow duration-200 cursor-pointer group"
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
      aria-label={`Ver receta: ${receta.nombre}`}
    >
      {/* ── Imagen con overlay ──────────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {receta.foto_url ? (
          <Image
            src={receta.foto_url}
            alt={receta.nombre}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-cream-surface dark:bg-dark-border flex items-center justify-center">
            <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-[48px]">
              {CATEGORIA_ICONS[categoria]}
            </span>
          </div>
        )}

        {/* Gradiente inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badge de categoría flotante */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[14px] text-terracotta">
              {CATEGORIA_ICONS[categoria]}
            </span>
            {CATEGORIA_LABELS[categoria]}
          </span>
        </div>

        {/* Botón Cambiar flotante */}
        <div className="absolute top-3 right-3">
          <button
            onClick={handleCambiarReceta}
            disabled={isPending}
            className="flex items-center gap-1 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:text-terracotta hover:bg-white dark:hover:bg-dark-surface text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all duration-150 disabled:opacity-60"
            aria-label="Cambiar receta"
          >
            <span
              className={`material-symbols-outlined text-[14px] ${isPending ? 'animate-spin' : ''}`}
            >
              {isPending ? 'progress_activity' : 'refresh'}
            </span>
            Cambiar
          </button>
        </div>
      </div>

      {/* ── Contenido ─────────────────────────────────────────── */}
      <div className="p-4">
        {/* Nombre */}
        <h3 className="font-serif text-base text-gray-900 dark:text-gray-100 leading-snug mb-3 group-hover:text-terracotta transition-colors duration-150 line-clamp-2">
          {receta.nombre}
        </h3>

        {/* Fila tiempo + calorías */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {receta.tiempo_preparacion_min} min
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-terracotta">local_fire_department</span>
            {receta.calorias_aprox} kcal
          </span>
        </div>

        {/* Error inline */}
        {error && (
          <p className="mt-2 text-xs text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    </div>
  )
}
