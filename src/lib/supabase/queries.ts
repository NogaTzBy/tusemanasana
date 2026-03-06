import { createClient } from '@/lib/supabase/server'
import { PlanSemanal, Usuario, DiaComidas, Receta, PerfilNutricional } from '@/lib/types'
import { generarPlanConGemini } from '@/lib/gemini'

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Retorna el lunes de la semana actual en formato ISO (YYYY-MM-DD).
 */
function getLunesSemanaActual(): string {
  const hoy = new Date()
  const diaSemana = hoy.getDay() // 0 = domingo, 1 = lunes, …, 6 = sábado
  const diffLunes = diaSemana === 0 ? -6 : 1 - diaSemana
  const lunes = new Date(hoy)
  lunes.setDate(hoy.getDate() + diffLunes)
  return lunes.toISOString().split('T')[0]
}

// ─────────────────────────────────────────────────────────────────────────────
// Queries públicas
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Obtiene el perfil completo del usuario autenticado desde la tabla `usuarios`.
 * Retorna null si no hay sesión activa o si ocurre algún error.
 */
export async function getPerfilUsuario(): Promise<Usuario | null> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('getPerfilUsuario: sin sesión activa', authError)
      return null
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select(
        'id, nombre, email, rol, estado_suscripcion, plan, fecha_inicio_trial, fecha_proximo_cobro'
      )
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('getPerfilUsuario: error al consultar usuarios', error)
      return null
    }

    return data as Usuario
  } catch (err) {
    console.error('getPerfilUsuario: excepción inesperada', err)
    return null
  }
}

/**
 * Obtiene el plan semanal más reciente del usuario.
 * Si no existe ninguno, crea uno automáticamente.
 */
export async function getPlanSemanal(userId: string): Promise<PlanSemanal | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('planes_semanales')
      .select('id, usuario_id, semana_inicio, dias, generado_por_ia')
      .eq('usuario_id', userId)
      .order('semana_inicio', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('getPlanSemanal: error al consultar planes_semanales', error)
      return null
    }

    if (data) {
      return data as PlanSemanal
    }

    return null
  } catch (err) {
    console.error('getPlanSemanal: excepción inesperada', err)
    return null
  }
}

/**
 * Busca una receta por ID dentro del plan semanal del usuario autenticado.
 * Las recetas generadas por IA se almacenan como JSON en planes_semanales.dias.
 */
export async function getRecetaDetalle(recetaId: string): Promise<Receta | null> {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: plan } = await supabase
      .from('planes_semanales')
      .select('dias')
      .eq('usuario_id', user.id)
      .order('semana_inicio', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!plan?.dias) return null

    const dias = plan.dias as DiaComidas[]
    for (const dia of dias) {
      for (const cat of ['desayuno', 'almuerzo', 'cena'] as const) {
        const receta = dia[cat]
        if (receta && receta.id === recetaId) {
          return receta
        }
      }
    }

    return null
  } catch (err) {
    console.error('getRecetaDetalle: excepción inesperada', err)
    return null
  }
}

/**
 * Reemplaza una receta dentro de un plan semanal.
 *
 * @param planId        - UUID del plan semanal
 * @param diaIndex      - Índice del día (0 = lunes, … 6 = domingo)
 * @param categoria     - 'desayuno' | 'almuerzo' | 'cena'
 * @param nuevaRecetaId - UUID de la receta de reemplazo
 */
export async function updateRecetaPlan(
  planId: string,
  diaIndex: number,
  categoria: string,
  nuevaRecetaId: string
): Promise<boolean> {
  try {
    const supabase = await createClient()

    // Leer el plan actual
    const { data: planData, error: fetchError } = await supabase
      .from('planes_semanales')
      .select('dias')
      .eq('id', planId)
      .single()

    if (fetchError || !planData) {
      console.error('updateRecetaPlan: no se pudo obtener el plan', fetchError)
      return false
    }

    // Obtener la nueva receta completa
    const nuevaReceta = await getRecetaDetalle(nuevaRecetaId)
    if (!nuevaReceta) {
      console.error('updateRecetaPlan: no se encontró la nueva receta', nuevaRecetaId)
      return false
    }

    // Mutar el array de días en memoria
    const dias: DiaComidas[] = planData.dias as DiaComidas[]
    if (diaIndex < 0 || diaIndex >= dias.length) {
      console.error('updateRecetaPlan: diaIndex fuera de rango', diaIndex)
      return false
    }

    const categoriaValida = categoria as 'desayuno' | 'almuerzo' | 'cena'
    dias[diaIndex] = {
      ...dias[diaIndex],
      [categoriaValida]: nuevaReceta,
    }

    // Persistir el plan actualizado
    const { error: updateError } = await supabase
      .from('planes_semanales')
      .update({ dias })
      .eq('id', planId)

    if (updateError) {
      console.error('updateRecetaPlan: error al actualizar el plan', updateError)
      return false
    }

    return true
  } catch (err) {
    console.error('updateRecetaPlan: excepción inesperada', err)
    return false
  }
}

/**
 * Obtiene una receta aleatoria de la misma categoría, excluyendo la actual.
 * Útil para el flujo de "swap" desde el dashboard.
 */
export async function getRecetaAlternativa(
  categoriaActual: string,
  recetaExcluirId: string
): Promise<Receta | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('recetas')
      .select(
        'id, nombre, descripcion_corta, ingredientes, pasos_preparacion, tiempo_preparacion_min, categoria, tags, foto_url, porciones_base, calorias_aprox'
      )
      .eq('categoria', categoriaActual)
      .neq('id', recetaExcluirId)

    if (error) {
      console.error('getRecetaAlternativa: error al consultar recetas', error)
      return null
    }

    if (!data || data.length === 0) {
      console.error('getRecetaAlternativa: no hay recetas alternativas para', categoriaActual)
      return null
    }

    // Elegir una al azar
    const recetaAleatoria = data[Math.floor(Math.random() * data.length)]
    return recetaAleatoria as Receta
  } catch (err) {
    console.error('getRecetaAlternativa: excepción inesperada', err)
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Plan desde repositorio (tabla recetas)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Arma un plan semanal de 7 días usando recetas existentes en la tabla `recetas`.
 * Retorna null si no hay suficientes recetas (mínimo 7 por categoría).
 */
async function getPlanDesdeRepositorio(
  perfil: PerfilNutricional | null
): Promise<DiaComidas[] | null> {
  const supabase = await createClient()
  const categorias = ['desayuno', 'almuerzo', 'cena'] as const
  const seleccionadas: Record<string, Receta[]> = {}

  for (const cat of categorias) {
    let query = supabase
      .from('recetas')
      .select('id, nombre, descripcion_corta, ingredientes, pasos_preparacion, tiempo_preparacion_min, categoria, tags, foto_url, porciones_base, calorias_aprox')
      .eq('categoria', cat)

    // Filtrar vegetarianas estrictamente en base de datos si el perfil lo indica
    const esVegetariano = perfil?.tipo_alimentacion?.toLowerCase().includes('vegetarian')
    if (esVegetariano) {
      query = query.contains('tags', ['vegetariano'])
    }

    let { data, error } = await query

    // Fallback de base de datos si no hay suficientes (ej: si los tags no están bien cargados)
    if (esVegetariano && (!data || data.length < 7)) {
      console.log(`Fallback DB para categoría ${cat}: no hay suficientes vegetarianas. Obteniendo sin filtro estricto.`)
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('recetas')
        .select('id, nombre, descripcion_corta, ingredientes, pasos_preparacion, tiempo_preparacion_min, categoria, tags, foto_url, porciones_base, calorias_aprox')
        .eq('categoria', cat)

      data = fallbackData
      error = fallbackError
    }

    if (error || !data || data.length < 7) {
      console.error(`getPlanDesdeRepositorio: Faltan recetas en la BD para la categoría ${cat}. Encontradas: ${data?.length || 0}`)
      return null
    }

    let recetasCandidatas = data as Receta[]

    // --- Aplicar filtros inteligentes en memoria con fallback ---

    // 1. Exclusiones de alimentos (alergias/gustos)
    if (perfil?.alimentos_excluidos && perfil.alimentos_excluidos.length > 0) {
      // Ignorar "ninguna" o arrays vacíos accidentalmente llenos
      const excluidos = perfil.alimentos_excluidos
        .filter(e => e.toLowerCase() !== 'ninguna')
        .map(e => e.toLowerCase())

      if (excluidos.length > 0) {
        const sinExcluidos = recetasCandidatas.filter(r => {
          const ingredientes = (r.ingredientes as { nombre: string }[]) || []
          const textToSearch = (r.nombre + ' ' + ingredientes.map(i => i.nombre).join(' ')).toLowerCase()
          return !excluidos.some(ex => textToSearch.includes(ex))
        })
        // Solo aplicar filtro si nos sobran suficientes recetas para la semana
        if (sinExcluidos.length >= 7) {
          recetasCandidatas = sinExcluidos
        }
      }
    }

    // 2. Tiempo disponible o quest "Cocinar Rápido"
    const quiereRapido = perfil?.objetivo === 'cocinar_rapido' || perfil?.tiempo_disponible === 'menos_20'
    if (quiereRapido) {
      const rapidas = recetasCandidatas.filter(r => r.tiempo_preparacion_min <= 25)
      if (rapidas.length >= 7) {
        recetasCandidatas = rapidas
      }
    }

    // 3. Objetivo: Bajar de peso (priorizar bajas calorías)
    if (perfil?.objetivo === 'bajar_peso') {
      const caloriasMaximas = cat === 'desayuno' ? 350 : 450;
      const light = recetasCandidatas.filter(r => r.calorias_aprox && r.calorias_aprox <= caloriasMaximas)

      if (light.length >= 7) {
        recetasCandidatas = light
      } else {
        // Fallback: Si no hay suficientes estrictamente bajas en calorías, 
        // ordenamos por calorías y nos quedamos con la mitad más "light" que alcance a 7.
        recetasCandidatas.sort((a, b) => (a.calorias_aprox || 9999) - (b.calorias_aprox || 9999))
        recetasCandidatas = recetasCandidatas.slice(0, Math.max(7, Math.floor(recetasCandidatas.length / 2)))
        // Volvemos a desordenar para la selección final
        recetasCandidatas.sort(() => Math.random() - 0.5)
      }
    }

    // Mezclar aleatoriamente las candidatas finales y tomar 7
    const mezcladas = [...recetasCandidatas].sort(() => Math.random() - 0.5).slice(0, 7)
    seleccionadas[cat] = mezcladas
  }

  return Array.from({ length: 7 }, (_, i) => ({
    desayuno: seleccionadas.desayuno[i],
    almuerzo: seleccionadas.almuerzo[i],
    cena: seleccionadas.cena[i],
  }))
}

// ─────────────────────────────────────────────────────────────────────────────
// Creación automática de plan semanal
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Genera y persiste un plan semanal de 7 días para el usuario.
 * Usa el repositorio de recetas si hay suficientes, si no genera con IA.
 */
export async function crearPlanSemanal(userId: string): Promise<PlanSemanal | null> {
  try {
    const supabase = await createClient()

    // Obtener perfil nutricional del usuario para personalizar el plan
    const { data: perfil } = await supabase
      .from('perfiles_nutricionales')
      .select('objetivo, tiempo_disponible, tipo_alimentacion, alimentos_excluidos, cantidad_personas, frecuencia_recetas')
      .eq('usuario_id', userId)
      .maybeSingle()

    const perfilTyped = perfil as PerfilNutricional | null

    // Intentar armar el plan desde el repositorio de recetas (0 tokens de IA)
    let dias = await getPlanDesdeRepositorio(perfilTyped)
    let generadoPorIA = false

    if (!dias) {
      // Fallback: generar con IA si el repositorio está vacío
      console.log('crearPlanSemanal: repositorio insuficiente, generando con IA...')
      dias = await generarPlanConGemini(perfilTyped)
      generadoPorIA = true
    }

    if (!dias) {
      console.error('crearPlanSemanal: no se pudo generar el plan')
      return null
    }

    const semanaInicio = getLunesSemanaActual()

    const { data: nuevoPlan, error: insertError } = await supabase
      .from('planes_semanales')
      .insert({
        usuario_id: userId,
        semana_inicio: semanaInicio,
        dias,
        generado_por_ia: generadoPorIA,
      })
      .select('id, usuario_id, semana_inicio, dias, generado_por_ia')
      .single()

    if (insertError || !nuevoPlan) {
      console.error('crearPlanSemanal: error al insertar plan', insertError)
      return null
    }

    return nuevoPlan as PlanSemanal
  } catch (err) {
    console.error('crearPlanSemanal: excepción inesperada', err)
    throw err
  }
}
