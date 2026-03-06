'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PlanSemanal, Usuario } from '@/lib/types'
import MealCard from './MealCard'
import { procesarListaDeCompras } from '@/lib/utils/shopping-list'

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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const diaComidas = plan.dias[diaSeleccionado] ?? {
    desayuno: null,
    almuerzo: null,
    cena: null,
  }

  const semanaLabel = getSemanaLabel(plan.semana_inicio)

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default

      const container = document.createElement('div')
      container.style.padding = '20px'
      container.style.fontFamily = 'sans-serif'
      container.style.color = '#333'

      let htmlContent = `
        <h1 style="text-align: center; color: #b75c40; font-size: 28px; margin-bottom: 30px;">
          Tu Semana Sana - Mi Plan Semanal
        </h1>
      `

      plan.dias.forEach((dia, idx) => {
        htmlContent += `<div style="page-break-after: always; margin-bottom: 40px;">`
        htmlContent += `<h2 style="color: #6a7c64; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">Día ${getDiaNumero(plan.semana_inicio, idx)}</h2>`

        const comidas = [
          { nombre: 'Desayuno', receta: dia.desayuno },
          { nombre: 'Almuerzo', receta: dia.almuerzo },
          { nombre: 'Cena', receta: dia.cena }
        ]

        comidas.forEach(comida => {
          if (!comida.receta) return
          const r = comida.receta

          htmlContent += `
            <div style="margin-bottom: 30px;">
              <h3 style="color: #b75c40; font-size: 18px; margin-bottom: 10px;">${comida.nombre}: ${r.nombre}</h3>
              <p style="font-size: 14px; margin-bottom: 10px;"><em>Tiempo: ${r.tiempo_preparacion_min} min | Calorías aprox: ${r.calorias_aprox}</em></p>
              
              <h4 style="font-size: 14px; margin-bottom: 5px;">Ingredientes:</h4>
              <ul style="font-size: 14px; margin-bottom: 15px; padding-left: 20px;">
                ${(r.ingredientes as { nombre: string, cantidad: number, unidad: string }[]).map(ing => `<li>${ing.cantidad > 0 ? ing.cantidad : ''} ${ing.unidad} de ${ing.nombre}</li>`).join('')}
              </ul>
              
              <h4 style="font-size: 14px; margin-bottom: 5px;">Preparación:</h4>
              <ol style="font-size: 14px; padding-left: 20px;">
                ${r.pasos_preparacion.map(paso => `<li style="margin-bottom: 5px;">${paso}</li>`).join('')}
              </ol>
            </div>
          `
        })
        htmlContent += `</div>`
      })

      // Lista de compras
      const lista = procesarListaDeCompras(plan)
      htmlContent += `<div style="page-break-before: always;">`
      htmlContent += `<h2 style="color: #6a7c64; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">Lista de Compras de la Semana</h2>`
      htmlContent += `<ul style="font-size: 14px; padding-left: 20px;">`
      lista.forEach(item => {
        htmlContent += `<li style="margin-bottom: 8px;"><b>${item.nombre}</b>: ${item.cantidad > 0 ? item.cantidad : ''} ${item.unidad}</li>`
      })
      htmlContent += `</ul></div>`

      container.innerHTML = htmlContent

      const opt = {
        margin: 15,
        filename: 'tu-plan-semanal.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      }

      await html2pdf().from(container).set(opt).save()

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.');
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-surface ">
        <div className="w-10" />
        <h1 className="font-serif text-2xl font-bold tracking-tight text-center text-[var(--color-primary-dark)] ">
          Tu Semana Sana
        </h1>
        <div className="w-10" />
      </header>

      {/* ── Main ──────────────────────────────────────────────── */}
      <main id="plan-container" className="flex-1 w-full max-w-md mx-auto px-4 pb-24">
        {/* Título */}
        <h2 className="font-serif text-[28px] font-bold leading-tight text-left pt-6 pb-2 text-[var(--color-primary-dark)] ">
          Mi Plan Semanal
        </h2>

        {/* Navegación de semana */}
        <div className="flex items-center justify-between mb-6">
          <button className="p-2 text-gray-900 hover:bg-cream-surface rounded-full transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="text-base font-bold font-serif text-gray-900 ">
            {semanaLabel}
          </span>
          <button className="p-2 text-gray-900 hover:bg-cream-surface rounded-full transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Grid de días */}
        <div className="grid grid-cols-7 gap-1 mb-8" data-domtoimage-ignore="true">
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
                className={`aspect-square flex flex-col items-center justify-center rounded-full text-sm transition-colors ${esActivo
                  ? 'bg-sage text-white shadow-md font-medium'
                  : esHoy
                    ? 'font-bold text-terracotta hover:bg-cream-surface '
                    : esFinDeSemana
                      ? 'text-gray-400 hover:bg-cream-surface '
                      : 'text-gray-900 hover:bg-cream-surface '
                  }`}
              >
                <span>{getDiaNumero(plan.semana_inicio, index)}</span>
              </button>
            )
          })}
        </div>

        {/* Creador de PDF: Mostrar label del día elegido solo en el PDF */}
        <div className="hidden pdf-only">
          <h3 className="font-serif text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            Día {getDiaNumero(plan.semana_inicio, diaSeleccionado)}
          </h3>
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
        <div className="flex flex-col gap-3 mt-10" data-domtoimage-ignore="true">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="w-full bg-terracotta text-white py-4 px-6 rounded-full font-bold text-sm tracking-wide shadow-lg hover:bg-terracotta-dark transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            <span className={`material-symbols-outlined ${isGeneratingPDF ? 'animate-spin' : ''}`}>
              {isGeneratingPDF ? 'progress_activity' : 'download'}
            </span>
            {isGeneratingPDF ? 'GENERANDO PDF...' : 'DESCARGAR PLAN PDF'}
          </button>
          <Link
            href={`/dashboard/lista?planId=${plan.id}`}
            className="w-full bg-white border-2 border-terracotta text-terracotta py-3.5 px-6 rounded-full font-bold text-sm tracking-wide hover:bg-cream-surface transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">shopping_basket</span>
            VER LISTA DE COMPRAS
          </Link>
        </div>
      </main>
    </div>
  )
}
