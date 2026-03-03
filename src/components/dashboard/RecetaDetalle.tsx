'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Receta } from '@/lib/types'

interface RecetaDetalleProps {
  receta: Receta
}

export default function RecetaDetalle({ receta }: RecetaDetalleProps) {
  const router = useRouter()
  const [ingredientesChecked, setIngredientesChecked] = useState<boolean[]>(
    Array(receta.ingredientes.length).fill(false)
  )

  const toggleIngrediente = (index: number) => {
    setIngredientesChecked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg pb-8">
      {/* ── Hero Image ────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {receta.foto_url ? (
          <Image
            src={receta.foto_url}
            alt={receta.nombre}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-cream-surface dark:bg-dark-border flex items-center justify-center">
            <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-[64px]">
              restaurant
            </span>
          </div>
        )}

        {/* Gradiente inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Botón volver */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Volver"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </button>

        {/* Título sobre el gradiente */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <h1 className="font-serif text-2xl text-white leading-snug drop-shadow-sm">
            {receta.nombre}
          </h1>
          {receta.descripcion_corta && (
            <p className="text-white/80 text-sm mt-1 line-clamp-2 drop-shadow-sm">
              {receta.descripcion_corta}
            </p>
          )}
        </div>
      </div>

      {/* ── Contenido ─────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 pt-5">
        {/* ── Info Bubbles ─────────────────────────────────────── */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6">
          <InfoBubble
            icon="schedule"
            value={`${receta.tiempo_preparacion_min} min`}
            label="Tiempo"
          />
          <InfoBubble
            icon="group"
            value={`${receta.porciones_base}`}
            label={receta.porciones_base === 1 ? 'porción' : 'porciones'}
          />
          <InfoBubble
            icon="local_fire_department"
            value={`${receta.calorias_aprox}`}
            label="kcal"
            iconClassName="text-terracotta"
          />
        </div>

        {/* ── Tags ─────────────────────────────────────────────── */}
        {receta.tags && receta.tags.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
            {receta.tags.map((tag) => (
              <span
                key={tag}
                className="flex-shrink-0 text-xs font-semibold text-sage-dark dark:text-sage-light bg-sage/10 dark:bg-sage/20 px-3 py-1.5 rounded-full capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Ingredientes ─────────────────────────────────────── */}
        <section className="mb-8">
          <h2 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-4">
            Ingredientes
          </h2>

          <div className="space-y-3">
            {receta.ingredientes.map((ing, index) => {
              const checked = ingredientesChecked[index]
              return (
                <button
                  key={index}
                  onClick={() => toggleIngrediente(index)}
                  className="w-full flex items-center gap-3 text-left group"
                  aria-pressed={checked}
                  aria-label={`${checked ? 'Desmarcar' : 'Marcar'}: ${ing.nombre}`}
                >
                  {/* Checkbox custom */}
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                      checked
                        ? 'bg-terracotta border-terracotta'
                        : 'border-gray-300 dark:border-dark-border group-hover:border-terracotta'
                    }`}
                  >
                    {checked && (
                      <span className="material-symbols-outlined text-white text-[14px]">
                        check
                      </span>
                    )}
                  </span>

                  {/* Texto del ingrediente */}
                  <span
                    className={`text-sm leading-relaxed transition-all duration-150 ${
                      checked
                        ? 'line-through text-gray-300 dark:text-gray-600'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="font-semibold">
                      {ing.cantidad} {ing.unidad}
                    </span>{' '}
                    de {ing.nombre}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* ── Preparación ─────────────────────────────────────── */}
        <section>
          <h2 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-4">
            Preparación
          </h2>

          <div className="relative">
            {/* Línea de tiempo vertical */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-terracotta/20 dark:bg-terracotta/10" />

            <ol className="space-y-6 pl-12">
              {receta.pasos_preparacion.map((paso, index) => (
                <li key={index} className="relative">
                  {/* Nodo numerado */}
                  <span className="absolute -left-[2.75rem] w-8 h-8 rounded-full bg-terracotta text-white text-sm font-bold flex items-center justify-center shadow-sm shadow-terracotta/30 flex-shrink-0">
                    {index + 1}
                  </span>

                  {/* Texto del paso */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-1">
                    {paso}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  )
}

/* ── Info Bubble ────────────────────────────────────────────── */
interface InfoBubbleProps {
  icon: string
  value: string
  label: string
  iconClassName?: string
}

function InfoBubble({ icon, value, label, iconClassName = 'text-gray-500 dark:text-gray-400' }: InfoBubbleProps) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2 bg-cream-surface dark:bg-dark-surface border border-gray-100 dark:border-dark-border px-4 py-2 rounded-2xl">
      <span className={`material-symbols-outlined text-[20px] ${iconClassName}`}>
        {icon}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{value}</span>
        <span className="text-[11px] text-gray-400 dark:text-gray-500">{label}</span>
      </div>
    </div>
  )
}
