'use client'

import { useState, useEffect } from 'react'
import type { ItemLista } from '@/lib/utils/shopping-list'

export default function ShoppingListClient({ ingredientes, planId }: { ingredientes: ItemLista[], planId: string }) {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
    const [loaded, setLoaded] = useState(false)

    // Cargar estado de localStorage
    useEffect(() => {
        const saved = localStorage.getItem(`shopping-list-${planId}`)
        if (saved) {
            try {
                setCheckedItems(JSON.parse(saved))
            } catch (e) {
                console.error('Error parseando shopping list cache:', e)
            }
        }
        setLoaded(true)
    }, [planId])

    // Guardar estado en localStorage
    const toggleCheck = (nombre: string) => {
        const newChecked = { ...checkedItems, [nombre]: !checkedItems[nombre] }
        setCheckedItems(newChecked)
        localStorage.setItem(`shopping-list-${planId}`, JSON.stringify(newChecked))
    }

    if (!loaded) return null

    return (
        <ul className="space-y-4">
            {ingredientes.map((item, idx) => {
                const isChecked = !!checkedItems[item.nombre]
                return (
                    <li
                        key={idx}
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => toggleCheck(item.nombre)}
                    >
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'bg-terracotta border-terracotta' : 'border-gray-300 group-hover:border-terracotta'}`}>
                            {isChecked && (
                                <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                            )}
                        </div>
                        <div className={`flex-1 text-base font-medium transition-colors ${isChecked ? 'text-gray-400 line-through' : 'text-[var(--color-foreground)]'}`}>
                            {item.nombre}
                        </div>
                        <div className={`text-sm font-mono px-2 py-1 rounded transition-colors ${isChecked ? 'text-gray-400 bg-transparent' : 'text-gray-600 bg-gray-50 '}`}>
                            {item.cantidad > 0 ? `${item.cantidad} ${item.unidad}` : item.unidad}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
