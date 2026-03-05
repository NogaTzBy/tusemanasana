'use client'
import { useState, useEffect } from 'react'

export interface RecetaCompletada {
  id: string
  nombre: string
  categoria: string
  foto_url: string
  completada_en: string
}

const STORAGE_KEY = 'recetas_completadas'

export function useCompletadas() {
  const [completadas, setCompletadas] = useState<RecetaCompletada[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setCompletadas(JSON.parse(stored))
    } catch {}
    setLoaded(true)
  }, [])

  const toggle = (receta: Omit<RecetaCompletada, 'completada_en'>) => {
    setCompletadas(prev => {
      const exists = prev.find(r => r.id === receta.id)
      const next = exists
        ? prev.filter(r => r.id !== receta.id)
        : [...prev, { ...receta, completada_en: new Date().toISOString() }]
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const isCompletada = (id: string) => completadas.some(r => r.id === id)

  return { completadas, toggle, isCompletada, loaded }
}
