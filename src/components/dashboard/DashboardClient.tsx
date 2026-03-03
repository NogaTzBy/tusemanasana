'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PlanSemanal, Usuario } from '@/lib/types'
import MealCard from './MealCard'

interface DashboardClientProps {
  plan: PlanSemanal
  usuario: Usuario
}

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const DIAS_INICIALES = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

/**
 * Retorna el índice del día actual relativo al lunes (0 = lunes … 6 = domingo).
 * Si hoy es domingo getDay()=0, lo convertimos a 6.
 */
function getDiaActualIndex(): number {
  const d = new Date().getDay() // 0=dom, 1=lun, ...6=sáb
  return d === 0 ? 6 : d - 1
}

/**
 * Formatea la fecha de hoy en español, ej: "lunes 2 de marzo"
 */
function formatearFechaHoy(): string {
  return new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export default function DashboardClient({ plan, usuario }: DashboardClientProps) {
  const diaActualIndex = getDiaActualIndex()
  const [diaSeleccionado, setDiaSeleccionado] = useState(diaActualIndex)

  const nombre = usuario.nombre?.split(' ')[0] ?? 'amig@'
  const fechaHoy = formatearFechaHoy()

  const diaComidas = plan.dias[diaSeleccionado] ?? {
    desayuno: null,
    almuerzo: null,
    cena: null,
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-gray-100 dark:border-dark-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="font-serif text-xl text-gray-900 dark:text-gray-100">
              ¡Hola {nombre}!
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 capitalize mt-0.5">
              {fechaHoy}
            </p>
          </div>

          {/* Acciones rápidas */}
          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/lista?planId=${plan.id}`}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-cream-surface dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-border/80 px-3 py-2 rounded-xl transition-colors"
              aria-label="Lista de compras"
            >
              <span className="material-symbols-outlined text-[18px] text-sage">shopping_cart</span>
              <span className="hidden sm:inline">Lista</span>
            </Link>
            <button
              className="flex items-center gap-1.5 text-sm font-medium text-white bg-terracotta hover:bg-terracotta-dark px-3 py-2 rounded-xl transition-colors shadow-sm"
              aria-label="Descargar PDF"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 pb-8">
        {/* ── Selector de día ──────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-6">
          {DIAS_SEMANA.map((dia, index) => {
            const esHoy = index === diaActualIndex
            const esActivo = index === diaSeleccionado
            return (
              <button
                key={dia}
                onClick={() => setDiaSeleccionado(index)}
                aria-pressed={esActivo}
                aria-label={`${dia}${esHoy ? ' (hoy)' : ''}`}
                className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl flex-shrink-0 transition-all duration-150 min-w-[52px] ${
                  esActivo
                    ? 'bg-terracotta text-white shadow-md shadow-terracotta/25'
                    : 'bg-white dark:bg-dark-surface text-gray-500 dark:text-gray-400 hover:bg-cream-surface dark:hover:bg-dark-border border border-gray-100 dark:border-dark-border'
                }`}
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  {DIAS_INICIALES[index]}
                </span>
                <span className={`text-lg font-bold leading-none ${esActivo ? 'text-white' : ''}`}>
                  {getDiaNumero(plan.semana_inicio, index)}
                </span>
                {esHoy && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${esActivo ? 'bg-white/60' : 'bg-terracotta'}`}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* ── Título del día ───────────────────────────────────── */}
        <h2 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-4">
          {DIAS_SEMANA[diaSeleccionado]}
          {diaSeleccionado === diaActualIndex && (
            <span className="ml-2 text-sm font-sans font-medium text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full align-middle">
              Hoy
            </span>
          )}
        </h2>

        {/* ── Cards de comidas ─────────────────────────────────── */}
        <div className="space-y-4">
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
      </main>
    </div>
  )
}

/**
 * Calcula el número de día del mes para el índice dado,
 * partiendo de la fecha de inicio de la semana (lunes).
 */
function getDiaNumero(semanaInicio: string, index: number): number {
  const lunes = new Date(semanaInicio + 'T12:00:00') // evita timezone midnight issues
  lunes.setDate(lunes.getDate() + index)
  return lunes.getDate()
}
