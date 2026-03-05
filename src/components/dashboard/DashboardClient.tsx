'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PlanSemanal, Usuario } from '@/lib/types'
import MealCard from './MealCard'

interface DashboardClientProps {
  plan: PlanSemanal
  usuario: Usuario
}

const DIAS_HEADERS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

function getDiaActualIndex(): number {
  const d = new Date().getDay()
  return d === 0 ? 6 : d - 1
}

function getDiaNumero(semanaInicio: string, index: number): number {
  const lunes = new Date(semanaInicio + 'T12:00:00')
  lunes.setDate(lunes.getDate() + index)
  return lunes.getDate()
}

function getSemanaLabel(semanaInicio: string): string {
  const fecha = new Date(semanaInicio + 'T12:00:00')
  const dia = fecha.getDate()
  const semana = Math.ceil(dia / 7)
  const mes = fecha.toLocaleDateString('es-AR', { month: 'long' })
  return `Semana ${semana}, ${mes.charAt(0).toUpperCase() + mes.slice(1)}`
}

export default function DashboardClient({ plan }: DashboardClientProps) {
  const diaActualIndex = getDiaActualIndex()
  const [diaSeleccionado, setDiaSeleccionado] = useState(diaActualIndex)

  const diaComidas = plan.dias[diaSeleccionado] ?? {
    desayuno: null,
    almuerzo: null,
    cena: null,
  }

  const semanaLabel = getSemanaLabel(plan.semana_inicio)

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg flex flex-col">
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-sm border-b border-cream-surface dark:border-dark-border">
        <div className="w-10" />
        <h1 className="font-serif text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-gray-100">
          Tu Semana Sana
        </h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream-surface dark:hover:bg-dark-surface transition-colors">
          <span className="material-symbols-outlined text-gray-900 dark:text-gray-100">menu</span>
        </button>
      </header>

      {/* ── Main ──────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pb-24">
        {/* Título */}
        <h2 className="font-serif text-[28px] font-bold leading-tight text-left pt-6 pb-2 text-gray-900 dark:text-gray-100">
          Mi Plan Semanal
        </h2>

        {/* Navegación de semana */}
        <div className="flex items-center justify-between mb-6">
          <button className="p-2 text-gray-900 dark:text-gray-100 hover:bg-cream-surface dark:hover:bg-dark-surface rounded-full transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="text-base font-bold font-serif text-gray-900 dark:text-gray-200">
            {semanaLabel}
          </span>
          <button className="p-2 text-gray-900 dark:text-gray-100 hover:bg-cream-surface dark:hover:bg-dark-surface rounded-full transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Grid de días */}
        <div className="grid grid-cols-7 gap-1 mb-8">
          {DIAS_HEADERS.map((letra) => (
            <div key={letra} className="text-center text-xs font-bold text-gray-400 mb-2">
              {letra}
            </div>
          ))}
          {DIAS_HEADERS.map((_, index) => {
            const esHoy = index === diaActualIndex
            const esActivo = index === diaSeleccionado
            const esFinDeSemana = index >= 5
            return (
              <button
                key={index}
                onClick={() => setDiaSeleccionado(index)}
                className={`aspect-square flex flex-col items-center justify-center rounded-full text-sm transition-colors ${
                  esActivo
                    ? 'bg-sage text-white shadow-md font-medium'
                    : esHoy
                      ? 'font-bold text-terracotta hover:bg-cream-surface dark:hover:bg-dark-surface'
                      : esFinDeSemana
                        ? 'text-gray-400 hover:bg-cream-surface dark:hover:bg-dark-surface'
                        : 'text-gray-900 dark:text-gray-100 hover:bg-cream-surface dark:hover:bg-dark-surface'
                }`}
              >
                <span>{getDiaNumero(plan.semana_inicio, index)}</span>
              </button>
            )
          })}
        </div>

        {/* Cards de comidas */}
        <div className="flex flex-col gap-6">
          <MealCard
            receta={diaComidas.desayuno}
            categoria="desayuno"
            diaIndex={diaSeleccionado}
            planId={plan.id}
          />
          <MealCard
            receta={diaComidas.almuerzo}
            categoria="almuerzo"
            diaIndex={diaSeleccionado}
            planId={plan.id}
          />
          <MealCard
            receta={diaComidas.cena}
            categoria="cena"
            diaIndex={diaSeleccionado}
            planId={plan.id}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-3 mt-10">
          <button className="w-full bg-terracotta text-white py-4 px-6 rounded-full font-bold text-sm tracking-wide shadow-lg hover:bg-terracotta-dark transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">download</span>
            DESCARGAR PLAN PDF
          </button>
          <Link
            href={`/dashboard/lista?planId=${plan.id}`}
            className="w-full bg-white dark:bg-dark-surface border-2 border-terracotta text-terracotta py-3.5 px-6 rounded-full font-bold text-sm tracking-wide hover:bg-cream-surface dark:hover:bg-dark-border transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">shopping_basket</span>
            VER LISTA DE COMPRAS
          </Link>
        </div>
      </main>
    </div>
  )
}
