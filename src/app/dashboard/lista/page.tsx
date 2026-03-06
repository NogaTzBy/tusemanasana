import { getPerfilUsuario, getPlanSemanal } from '@/lib/supabase/queries'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Ingrediente, PlanSemanal } from '@/lib/types'

// Agrupa los ingredientes por nombre y suma sus cantidades
function procesarListaDeCompras(plan: PlanSemanal) {
    const conteo: Record<string, { cantidad: number, unidad: string }> = {}

    plan.dias.forEach(dia => {
        const recetas = [dia.desayuno, dia.almuerzo, dia.cena]
        recetas.forEach(receta => {
            if (!receta || !receta.ingredientes) return

            const ingredientes = receta.ingredientes as Ingrediente[]
            ingredientes.forEach(ing => {
                const nombreNorm = ing.nombre.toLowerCase().trim()
                if (conteo[nombreNorm]) {
                    // Si las unidades coinciden, sumamos
                    if (conteo[nombreNorm].unidad === ing.unidad) {
                        conteo[nombreNorm].cantidad += ing.cantidad
                    } else {
                        // Si son unidades distintas, lo agregamos como item separado (ej: "Sal al gusto" vs "Sal 1 cda")
                        conteo[`${nombreNorm} (${ing.unidad})`] = { cantidad: ing.cantidad, unidad: ing.unidad }
                    }
                } else {
                    conteo[nombreNorm] = { cantidad: ing.cantidad, unidad: ing.unidad }
                }
            })
        })
    })

    // Convertir el diccionario a un array ordenado alfabéticamente
    const listaVacia = Object.entries(conteo).map(([nombre, datos]) => ({
        nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
        cantidad: datos.cantidad,
        unidad: datos.unidad
    }))

    return listaVacia.sort((a, b) => a.nombre.localeCompare(b.nombre))
}

export default async function ShoppingListPage() {
    const usuario = await getPerfilUsuario()

    if (!usuario) {
        redirect('/login')
    }

    const plan = await getPlanSemanal(usuario.id)

    if (!plan) {
        redirect('/dashboard')
    }

    const ingredientes = procesarListaDeCompras(plan)

    return (
        <div className="min-h-screen bg-cream-bg flex flex-col pb-24">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-surface shadow-sm">
                <Link href="/dashboard" className="text-[var(--color-primary-dark)] hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-serif text-xl font-bold tracking-tight text-center text-[var(--color-primary-dark)] ">
                    Mi Lista de Compras
                </h1>
                <div className="w-6" /> {/* Spacer */}
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-md mx-auto px-4 pt-6">
                <div className="bg-white rounded-2xl shadow-sm p-5 border border-cream-surface ">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-terracotta">shopping_cart</span>
                        Ingredientes de la semana
                    </h2>

                    {ingredientes.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Tu plan no tiene ingredientes asignados aún.</p>
                    ) : (
                        <ul className="space-y-4">
                            {ingredientes.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:border-terracotta transition-colors"></div>
                                    <div className="flex-1 text-[var(--color-foreground)] text-base font-medium">
                                        {item.nombre}
                                    </div>
                                    <div className="text-sm text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                                        {item.cantidad > 0 ? `${item.cantidad} ${item.unidad}` : item.unidad}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100 ">
                    <p className="text-sm text-blue-800 flex gap-2">
                        <span className="material-symbols-outlined text-base">info</span>
                        Las cantidades son aproximadas y están calculadas en base a las porciones de tu plan.
                    </p>
                </div>
            </main>
        </div>
    )
}
