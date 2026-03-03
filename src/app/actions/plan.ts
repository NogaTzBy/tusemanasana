'use server'

import { createClient } from '@/lib/supabase/server'
import { getPlanSemanal, getRecetaAlternativa, updateRecetaPlan } from '@/lib/supabase/queries'
import { generarListaCompras } from '@/lib/pdf/shopping-list'
import { Receta, ListaComprasPorCategoria } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────────────────
// cambiarRecetaAction
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Busca una receta alternativa de la misma categoría y la persiste en el plan.
 *
 * @param planId    - UUID del plan semanal
 * @param diaIndex  - Índice del día (0 = lunes … 6 = domingo)
 * @param categoria - 'desayuno' | 'almuerzo' | 'cena'
 */
export async function cambiarRecetaAction(
  planId: string,
  diaIndex: number,
  categoria: string
): Promise<{ success: boolean; nuevaReceta?: Receta; error?: string }> {
  try {
    const supabase = await createClient()

    // Verificar sesión activa
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { success: false, error: 'No hay sesión activa. Por favor, iniciá sesión.' }
    }

    // Leer el plan para obtener la receta actual en esa posición
    const { data: planData, error: planError } = await supabase
      .from('planes_semanales')
      .select('dias, usuario_id')
      .eq('id', planId)
      .single()

    if (planError || !planData) {
      console.error('cambiarRecetaAction: no se pudo obtener el plan', planError)
      return { success: false, error: 'No se pudo obtener el plan semanal.' }
    }

    // Validar que el plan pertenece al usuario autenticado
    if (planData.usuario_id !== user.id) {
      return { success: false, error: 'No tenés permiso para modificar este plan.' }
    }

    // Obtener la receta actual para excluirla de la búsqueda de alternativas
    const dias = planData.dias as Record<string, { id?: string } | null>[]
    const diaActual = dias[diaIndex]
    const recetaActualId: string | undefined = diaActual?.[categoria]?.['id']

    // Buscar una receta alternativa (excluyendo la actual si existe)
    const nuevaReceta = await getRecetaAlternativa(
      categoria,
      recetaActualId ?? '00000000-0000-0000-0000-000000000000'
    )

    if (!nuevaReceta) {
      return {
        success: false,
        error: `No hay recetas alternativas disponibles para la categoría "${categoria}".`,
      }
    }

    // Persistir el cambio en la base de datos
    const actualizado = await updateRecetaPlan(planId, diaIndex, categoria, nuevaReceta.id)

    if (!actualizado) {
      return { success: false, error: 'Ocurrió un error al guardar el cambio. Intentá de nuevo.' }
    }

    return { success: true, nuevaReceta }
  } catch (err) {
    console.error('cambiarRecetaAction: excepción inesperada', err)
    return { success: false, error: 'Error inesperado. Por favor, intentá de nuevo.' }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// getListaComprasAction
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Obtiene el plan semanal y genera la lista de compras consolidada y
 * categorizada lista para mostrar en el dashboard o exportar como PDF.
 *
 * @param planId - UUID del plan semanal
 */
export async function getListaComprasAction(
  planId: string
): Promise<ListaComprasPorCategoria | null> {
  try {
    const supabase = await createClient()

    // Verificar sesión activa
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('getListaComprasAction: sin sesión activa', authError)
      return null
    }

    // Obtener el plan completo (reutiliza la query existente con la sesión del usuario)
    const plan = await getPlanSemanal(user.id)

    if (!plan || plan.id !== planId) {
      // Si el planId específico no coincide, intentar buscarlo directamente
      const { data: planData, error: planError } = await supabase
        .from('planes_semanales')
        .select('id, usuario_id, semana_inicio, dias, generado_por_ia')
        .eq('id', planId)
        .eq('usuario_id', user.id)
        .single()

      if (planError || !planData) {
        console.error('getListaComprasAction: no se pudo obtener el plan', planError)
        return null
      }

      return generarListaCompras(planData as import('@/lib/types').PlanSemanal)
    }

    return generarListaCompras(plan)
  } catch (err) {
    console.error('getListaComprasAction: excepción inesperada', err)
    return null
  }
}
