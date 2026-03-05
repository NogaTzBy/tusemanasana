'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Receta } from '@/lib/types'

interface RecetaDetalleProps {
  receta: Receta
}

const CATEGORIA_LABELS: Record<string, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  cena: 'Cena',
}

export default function RecetaDetalle({ receta }: RecetaDetalleProps) {
  const router = useRouter()
  const [ingredientesChecked, setIngredientesChecked] = useState<boolean[]>(
    Array(receta.ingredientes.length).fill(false)
  )
  const [completado, setCompletado] = useState(false)

  const toggleIngrediente = (index: number) => {
    setIngredientesChecked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg pb-32">
      {/* Header fijo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-sm border-b border-cream-surface dark:border-dark-border px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-cream-surface dark:bg-dark-surface text-sage hover:bg-sage/10 transition-colors"
          aria-label="Volver"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-serif font-bold text-gray-800 dark:text-gray-100">
          Receta del Día
        </h1>
        <button className="flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-terracotta transition-colors">
          <span className="material-symbols-outlined">bookmark</span>
        </button>
      </div>

      <main className="pt-20 px-4 max-w-lg mx-auto w-full">
        {/* Hero Image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          {receta.foto_url ? (
            <Image
              src={receta.foto_url}
              alt={receta.nombre}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-cream-surface dark:bg-dark-border flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-300 text-[64px]">restaurant</span>
            </div>
          )}
          <div className="absolute bottom-4 left-4 z-20">
            <span className="inline-block px-3 py-1 bg-terracotta text-white text-xs font-bold uppercase tracking-wider rounded-full">
              {CATEGORIA_LABELS[receta.categoria] ?? receta.categoria}
            </span>
          </div>
        </div>

        {/* Título */}
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {receta.nombre}
          </h2>
          {receta.descripcion_corta && (
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              {receta.descripcion_corta}
            </p>
          )}
          <div className="flex justify-between gap-2 overflow-x-auto no-scrollbar pb-2">
            <InfoBubble icon="schedule" value={`${receta.tiempo_preparacion_min} min`} label="Tiempo" />
            <InfoBubble icon="restaurant" value={`${receta.porciones_base} porciones`} label="Cantidad" />
            {receta.tags?.[0] && <InfoBubble icon="eco" value={receta.tags[0]} label="Dieta" />}
            <InfoBubble icon="local_fire_department" value={`${receta.calorias_aprox} kcal`} label="Calorías" />
          </div>
        </div>

        {/* Ingredientes */}
        <div className="mb-8">
          <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-4">Ingredientes</h3>
          <div className="space-y-3">
            {receta.ingredientes.map((ing, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-dark-border hover:bg-cream-surface dark:hover:bg-dark-surface transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={ingredientesChecked[index]}
                  onChange={() => toggleIngrediente(index)}
                  className="w-5 h-5 border-gray-300 rounded accent-sage"
                />
                <span className={`flex-1 text-sm ${ingredientesChecked[index] ? 'line-through text-gray-300 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}`}>
                  <span className="font-semibold">{ing.cantidad} {ing.unidad}</span> de {ing.nombre}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mb-12">
          <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6">Instrucciones</h3>
          <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200 dark:before:bg-dark-border">
            {receta.pasos_preparacion.map((paso, index) => (
              <div key={index} className="relative">
                <div className={`absolute -left-8 top-0 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ring-4 ring-cream dark:ring-dark-bg ${index === 0 ? 'bg-sage text-white' : 'bg-cream-surface dark:bg-dark-surface border-2 border-sage text-sage'}`}>
                  {index + 1}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-0.5">{paso}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="sticky bottom-24 w-full">
          <button
            onClick={() => setCompletado((c) => !c)}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${completado ? 'bg-sage text-white' : 'bg-terracotta text-white hover:bg-terracotta-dark'}`}
          >
            <span className="material-symbols-outlined">{completado ? 'check_circle' : 'radio_button_unchecked'}</span>
            {completado ? '¡Receta completada!' : 'Marcar como Completado'}
          </button>
        </div>
      </main>
    </div>
  )
}

function InfoBubble({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-cream-surface dark:bg-dark-surface rounded-xl p-3 min-w-[72px] flex-1">
      <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center mb-2">
        <span className="material-symbols-outlined text-sage text-[18px]">{icon}</span>
      </div>
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">{value}</span>
      <span className="text-[10px] text-gray-400">{label}</span>
    </div>
  )
}
