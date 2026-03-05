'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GenerandoPlan() {
  const router = useRouter()
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/generar-plan', { method: 'POST' })
      .then((res) => {
        if (res.ok) {
          router.refresh()
        } else {
          setError(true)
        }
      })
      .catch(() => setError(true))
  }, [router])

  if (error) {
    return (
      <div className="min-h-screen bg-cream dark:bg-dark-bg flex flex-col items-center justify-center px-6 text-center">
        <span className="material-symbols-outlined text-terracotta text-[48px] mb-4">error</span>
        <h1 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-3">
          No se pudo generar el plan
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
          Hubo un error al conectar con la IA. Recargá la página para intentar de nuevo.
        </p>
        <button
          onClick={() => router.refresh()}
          className="bg-terracotta text-white px-6 py-3 rounded-xl font-medium"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-terracotta/10 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-terracotta text-[40px] animate-pulse">
          restaurant
        </span>
      </div>
      <h1 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-3">
        Generando tu plan personalizado
      </h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
        La IA está creando tu menú semanal basado en tus objetivos. Esto tarda unos segundos...
      </p>
      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-terracotta animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}
