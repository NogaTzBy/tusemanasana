'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GenerandoPlan() {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [errorDetalle, setErrorDetalle] = useState('')

  useEffect(() => {
    fetch('/api/generar-plan', { method: 'POST' })
      .then(async (res) => {
        if (res.ok) {
          router.refresh()
        } else {
          const data = await res.json().catch(() => ({}))
          setErrorDetalle(data?.detalle || data?.error || `HTTP ${res.status}`)
          setError(true)
        }
      })
      .catch((e) => {
        setErrorDetalle(String(e))
        setError(true)
      })
  }, [router])

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl text-gray-900 mb-3">
          No se pudo generar el plan
        </h1>
        <p className="text-gray-500 max-w-sm mb-2">
          Hubo un error al crear tu menú semanal.
        </p>
        {errorDetalle && (
          <p className="text-xs text-gray-400 max-w-sm mb-6 font-mono break-all bg-cream-surface px-3 py-2 rounded-lg">
            {errorDetalle}
          </p>
        )}
        <button
          onClick={() => window.location.reload()}
          className="bg-terracotta text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-terracotta-dark transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
      {/* Spinner animado CSS puro */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-cream-surface " />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-terracotta animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-terracotta/15 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-terracotta animate-pulse" />
          </div>
        </div>
      </div>

      <h1 className="font-serif text-2xl text-gray-900 mb-3">
        Generando tu plan personalizado
      </h1>
      <p className="text-gray-500 max-w-sm leading-relaxed text-sm">
        La IA está creando tu menú semanal basado en tus objetivos. Esto puede tardar hasta 30 segundos...
      </p>

      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-terracotta/60 animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}
