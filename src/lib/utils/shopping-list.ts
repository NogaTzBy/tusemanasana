import type { Ingrediente, PlanSemanal } from '@/lib/types'

export interface ItemLista {
    nombre: string
    cantidad: number
    unidad: string
}

export function procesarListaDeCompras(plan: PlanSemanal): ItemLista[] {
    const conteo: Record<string, { cantidad: number, unidad: string }> = {}

    plan.dias.forEach(dia => {
        const recetas = [dia.desayuno, dia.almuerzo, dia.cena]
        recetas.forEach(receta => {
            if (!receta || !receta.ingredientes) return

            const ingredientes = receta.ingredientes as Ingrediente[]
            ingredientes.forEach(ing => {
                const nombreNorm = ing.nombre.toLowerCase().trim()
                if (conteo[nombreNorm]) {
                    if (conteo[nombreNorm].unidad === ing.unidad) {
                        conteo[nombreNorm].cantidad += ing.cantidad
                    } else {
                        conteo[`${nombreNorm} (${ing.unidad})`] = { cantidad: ing.cantidad, unidad: ing.unidad }
                    }
                } else {
                    conteo[nombreNorm] = { cantidad: ing.cantidad, unidad: ing.unidad }
                }
            })
        })
    })

    // Formatear alfabéticamente
    const listaDevuelta = Object.entries(conteo).map(([nombre, datos]) => ({
        nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
        cantidad: parseFloat(datos.cantidad.toFixed(2)),
        unidad: datos.unidad
    }))

    return listaDevuelta.sort((a, b) => a.nombre.localeCompare(b.nombre))
}
