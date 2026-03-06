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
      const jsPDFModule = await import('jspdf')
      // jsPDF v4 puede exportar como named o default según el bundler
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const JsPDF: any = jsPDFModule.jsPDF ?? jsPDFModule.default
      const doc = new JsPDF()

      const pageH = doc.internal.pageSize.height
      const pageW = doc.internal.pageSize.width
      const marginX = 15
      const maxW = pageW - marginX * 2
      let y = 20

      const checkNewPage = (needed: number) => {
        if (y + needed > pageH - 15) {
          doc.addPage()
          y = 20
        }
      }

      const writeLine = (
        text: string,
        opts: { size?: number; bold?: boolean; color?: [number, number, number]; indent?: number } = {}
      ) => {
        const { size = 11, bold = false, color = [51, 51, 51], indent = 0 } = opts
        doc.setFontSize(size)
        doc.setFont('helvetica', bold ? 'bold' : 'normal')
        doc.setTextColor(color[0], color[1], color[2])
        const lines = doc.splitTextToSize(String(text ?? ''), maxW - indent)
        const needed = lines.length * size * 0.45 + 3
        checkNewPage(needed)
        doc.text(lines, marginX + indent, y)
        y += needed
      }

      const addSpacer = (h = 4) => { y += h }

      // Título
      writeLine('Tu Semana Sana', { size: 22, bold: true, color: [183, 92, 64] })
      writeLine('Mi Plan Semanal  ·  ' + semanaLabel, { size: 13, color: [106, 124, 100] })
      addSpacer(8)

      const DIA_NOMBRES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

      plan.dias.forEach((dia, idx) => {
        checkNewPage(25)
        writeLine(`${DIA_NOMBRES[idx]} ${getDiaNumero(plan.semana_inicio, idx)}`, { size: 14, bold: true, color: [106, 124, 100] })
        addSpacer(2)

        const comidas = [
          { cat: 'Desayuno', receta: dia.desayuno },
          { cat: 'Almuerzo', receta: dia.almuerzo },
          { cat: 'Cena', receta: dia.cena },
        ]

        comidas.forEach(({ cat, receta }) => {
          if (!receta) return
          checkNewPage(18)
          writeLine(`${cat}: ${receta.nombre}`, { size: 12, bold: true, color: [183, 92, 64] })
          writeLine(`${receta.tiempo_preparacion_min} min  •  ${receta.calorias_aprox} kcal`, { size: 9, color: [150, 150, 150] })
          addSpacer(2)

          writeLine('Ingredientes:', { size: 10, bold: true })
          const ings = (receta.ingredientes ?? []) as { nombre: string; cantidad: number; unidad: string }[]
          ings.forEach(ing => {
            const texto = ing.cantidad > 0 ? `${ing.cantidad} ${ing.unidad} de ${ing.nombre}` : ing.nombre
            writeLine(`• ${texto}`, { size: 10, indent: 4 })
          })
          addSpacer(2)

          writeLine('Preparación:', { size: 10, bold: true })
          const pasos = (receta.pasos_preparacion ?? []) as string[]
          pasos.forEach((paso, i) => {
            writeLine(`${i + 1}. ${paso ?? ''}`, { size: 10, indent: 4 })
          })
          addSpacer(5)
        })

        if (idx < plan.dias.length - 1) {
          checkNewPage(8)
          doc.setDrawColor(220, 220, 220)
          doc.line(marginX, y, pageW - marginX, y)
          y += 6
        }
      })

      // Lista de compras
      doc.addPage()
      y = 20
      writeLine('Lista de Compras de la Semana', { size: 18, bold: true, color: [106, 124, 100] })
      addSpacer(6)

      const lista = procesarListaDeCompras(plan)
      lista.forEach(item => {
        const texto = item.cantidad > 0
          ? `${item.nombre}: ${item.cantidad} ${item.unidad}`
          : `${item.nombre}: ${item.unidad}`
        writeLine(`• ${texto}`, { size: 11, indent: 2 })
      })

      doc.save('tu-plan-semanal.pdf')

    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.')
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
