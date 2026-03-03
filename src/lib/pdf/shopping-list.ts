import { PlanSemanal, ListaComprasPorCategoria, ItemCompra, DiaComidas, Ingrediente } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────────────────
// Mapa de categorías → palabras clave (en minúscula)
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIAS_INGREDIENTES: Record<string, string[]> = {
  verduras: [
    'lechuga',
    'tomate',
    'zanahoria',
    'palta',
    'espinaca',
    'brócoli',
    'brocoli',
    'calabaza',
    'cebolla',
    'ajo',
    'pimiento',
    'espárragos',
    'esparragos',
    'calabacín',
    'calabacin',
    'berenjena',
    'papa',
    'batata',
    'pepino',
    'rúcula',
    'rucula',
    'choclo',
    'acelga',
    'repollo',
    'zapallo',
    'apio',
    'perejil',
    'cilantro',
    'albahaca',
  ],
  carnes: [
    'pollo',
    'pechuga',
    'muslo',
    'carne',
    'vacuna',
    'salmón',
    'salmon',
    'atún',
    'atun',
    'merluza',
    'huevo',
    'tofu',
    'lentejas',
    'garbanzos',
    'poroto',
    'porotos',
    'cerdo',
    'lomo',
    'milanesa',
    'pescado',
  ],
  lacteos: [
    'leche',
    'yogur',
    'yogurt',
    'queso',
    'crema',
    'manteca',
    'ricota',
    'kéfir',
    'kefir',
    'mozzarella',
    'ricotta',
  ],
  cereales: [
    'avena',
    'arroz',
    'quinoa',
    'pan',
    'granola',
    'harina',
    'fideos',
    'pasta',
    'cuscús',
    'cuscus',
    'trigo',
    'centeno',
    'cebada',
    'maíz',
    'maiz',
    'polenta',
    'tostada',
    'galleta',
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Clasificador de ingredientes
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Determina la categoría de un ingrediente basándose en su nombre.
 * Si ninguna categoría coincide, retorna 'otros'.
 */
function clasificarIngrediente(
  nombreIngrediente: string
): keyof ListaComprasPorCategoria {
  const nombreNorm = nombreIngrediente.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  for (const [categoria, palabrasClave] of Object.entries(CATEGORIAS_INGREDIENTES)) {
    const coincide = palabrasClave.some((palabra) => {
      const palabraNorm = palabra.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      return nombreNorm.includes(palabraNorm)
    })
    if (coincide) {
      return categoria as keyof ListaComprasPorCategoria
    }
  }

  return 'otros'
}

// ─────────────────────────────────────────────────────────────────────────────
// Generador de lista de compras consolidada
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Recorre todos los días del plan semanal, extrae cada ingrediente de cada
 * receta y los consolida (sumando cantidades para la misma unidad) agrupados
 * por categoría.
 *
 * Reglas de consolidación:
 * - Si un ingrediente con el mismo nombre y unidad aparece más de una vez,
 *   se suman sus cantidades.
 * - Si un ingrediente aparece con distintas unidades, se crean entradas
 *   separadas para cada unidad.
 */
export function generarListaCompras(plan: PlanSemanal): ListaComprasPorCategoria {
  // Clave de deduplicación: "nombre|||unidad"
  const acumulador: Map<string, { item: ItemCompra; categoria: keyof ListaComprasPorCategoria }> =
    new Map()

  for (const dia of plan.dias as DiaComidas[]) {
    const comidas = [dia.desayuno, dia.almuerzo, dia.cena]

    for (const receta of comidas) {
      if (!receta) continue

      const ingredientes: Ingrediente[] = Array.isArray(receta.ingredientes)
        ? receta.ingredientes
        : []

      for (const ing of ingredientes) {
        if (!ing || !ing.nombre) continue

        const clave = `${ing.nombre.toLowerCase().trim()}|||${(ing.unidad || '').toLowerCase().trim()}`
        const categoria = clasificarIngrediente(ing.nombre)

        if (acumulador.has(clave)) {
          // Sumar cantidad al existente
          const entrada = acumulador.get(clave)!
          entrada.item.cantidad += ing.cantidad ?? 0
        } else {
          acumulador.set(clave, {
            item: {
              nombre: ing.nombre.trim(),
              cantidad: ing.cantidad ?? 0,
              unidad: (ing.unidad || '').trim(),
            },
            categoria,
          })
        }
      }
    }
  }

  // Distribuir en la estructura de salida
  const lista: ListaComprasPorCategoria = {
    verduras: [],
    carnes: [],
    lacteos: [],
    cereales: [],
    otros: [],
  }

  for (const { item, categoria } of acumulador.values()) {
    lista[categoria].push(item)
  }

  // Ordenar cada categoría alfabéticamente para mejor legibilidad
  for (const cat of Object.keys(lista) as (keyof ListaComprasPorCategoria)[]) {
    lista[cat].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  }

  return lista
}
