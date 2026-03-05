'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Receta } from '@/lib/types'
import { useCompletadas } from '@/lib/useCompletadas'

const CATEGORIA_LABELS: Record<string, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  cena: 'Cena',
}

const CATEGORIA_COLOR: Record<string, string> = {
  desayuno: 'bg-amber-100 text-amber-700',
  almuerzo: 'bg-sage/20 text-sage-dark',
  cena: 'bg-terracotta/10 text-terracotta-dark',
}

interface Props {
  recetas: Receta[]
}

export default function RecetasClient({ recetas }: Props) {
  const { isCompletada } = useCompletadas()

  const porCategoria = {
    desayuno: recetas.filter(r => r.categoria === 'desayuno'),
    almuerzo: recetas.filter(r => r.categoria === 'almuerzo'),
    cena: recetas.filter(r => r.categoria === 'cena'),
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg">
      <header className="sticky top-0 z-50 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-sm border-b border-cream-surface dark:border-dark-border px-6 py-4">
        <h1 className="font-serif text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Mis Recetas
        </h1>
      </header>

      <main className="max-w-lg mx-auto px-4 pb-28 pt-4">
        {recetas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-gray-300 text-[64px] mb-4">menu_book</span>
            <p className="text-gray-400 text-sm">Generá tu plan semanal para ver tus recetas</p>
            <Link href="/dashboard" className="mt-4 px-6 py-2 bg-terracotta text-white rounded-full text-sm font-medium">
              Ir al plan
            </Link>
          </div>
        ) : (
          (Object.entries(porCategoria) as [keyof typeof porCategoria, Receta[]][]).map(([cat, lista]) => (
            lista.length > 0 && (
              <section key={cat} className="mb-8">
                <h2 className="font-serif text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 capitalize">
                  {CATEGORIA_LABELS[cat]}
                  <span className="ml-2 text-sm font-sans font-normal text-gray-400">{lista.length} recetas</span>
                </h2>
                <div className="space-y-3">
                  {lista.map((receta) => (
                    <Link
                      key={receta.id}
                      href={`/receta/${receta.id}`}
                      className="flex gap-3 bg-white dark:bg-dark-surface rounded-xl overflow-hidden shadow-sm border border-gray-50 dark:border-dark-border active:scale-[0.99] transition-transform"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0">
                        {receta.foto_url ? (
                          <Image
                            src={receta.foto_url}
                            alt={receta.nombre}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-cream-surface flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-300">restaurant</span>
                          </div>
                        )}
                        {isCompletada(receta.id) && (
                          <div className="absolute inset-0 bg-sage/60 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[32px]" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 py-3 pr-3 min-w-0">
                        <span className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mb-1 ${CATEGORIA_COLOR[cat]}`}>
                          {CATEGORIA_LABELS[cat]}
                        </span>
                        <p className="font-serif font-semibold text-gray-800 dark:text-gray-100 text-sm leading-tight line-clamp-2">{receta.nombre}</p>
                        <p className="text-gray-400 text-xs mt-1">{receta.tiempo_preparacion_min} min · {receta.calorias_aprox} kcal</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          ))
        )}
      </main>
    </div>
  )
}
