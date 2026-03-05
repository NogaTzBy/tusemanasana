import Groq from 'groq-sdk'
import type { DiaComidas, PerfilNutricional, Receta } from './types'

// Fotos de fallback por categoría (cuando Pixabay no encuentra nada)
const FOTO_FALLBACK: Record<string, string> = {
  desayuno: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop',
  almuerzo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
  cena:     'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
}

async function buscarFotoPixabay(nombre: string, categoria: string): Promise<string> {
  const apiKey = process.env.PIXABAY_API_KEY
  if (apiKey) {
    try {
      const params = new URLSearchParams({
        key: apiKey,
        q: nombre,
        image_type: 'photo',
        category: 'food',
        min_width: '640',
        per_page: '3',
        safesearch: 'true',
      })
      const res = await fetch(`https://pixabay.com/api/?${params}`)
      if (res.ok) {
        const data = await res.json()
        if (data.hits?.length > 0) {
          return data.hits[0].webformatURL as string
        }
      }
    } catch {
      // fall through to fallback
    }
  }
  return FOTO_FALLBACK[categoria] ?? FOTO_FALLBACK.cena
}

export async function generarPlanConGemini(
  perfil: PerfilNutricional | null
): Promise<DiaComidas[] | null> {
  const apiKey = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GROQ_API_KEY no configurada en Vercel')
  }

  const groq = new Groq({ apiKey })

  const perfilDesc = perfil
    ? `- Objetivo: ${perfil.objetivo}
- Tipo de alimentación: ${perfil.tipo_alimentacion}
- Tiempo disponible para cocinar: ${perfil.tiempo_disponible}
- Alimentos excluidos: ${perfil.alimentos_excluidos?.join(', ') || 'ninguno'}
- Cantidad de personas: ${perfil.cantidad_personas}
- Frecuencia de nuevas recetas: ${perfil.frecuencia_recetas}`
    : '- Sin perfil específico. Usar recetas saludables y equilibradas en general.'

  const prompt = `Eres un nutricionista experto argentino. Generá un plan de comidas para 7 días (lunes a domingo) personalizado para este perfil:

${perfilDesc}

Reglas:
- Usá ingredientes fáciles de conseguir en Argentina
- Los nombres y descripciones en español rioplatense
- Variedad: no repetir la misma receta en la semana
- Cada receta debe tener entre 3 y 5 ingredientes con cantidades precisas
- Cada receta debe tener exactamente 4 pasos de preparación. Cada paso debe ser una oración completa y descriptiva (mínimo 10 palabras), no una frase corta
- Las calorías deben ser realistas

Respondé ÚNICAMENTE con JSON puro, sin markdown, sin bloques de código, sin texto adicional:
{
  "dias": [
    {
      "desayuno": {
        "nombre": "string",
        "foto_keyword": "1-2 palabras en inglés para buscar foto (ej: 'yogurt granola', 'scrambled eggs', 'oatmeal')",
        "descripcion_corta": "string",
        "ingredientes": [{"nombre": "string", "cantidad": 1, "unidad": "string"}],
        "pasos_preparacion": ["paso 1", "paso 2", "paso 3"],
        "tiempo_preparacion_min": 15,
        "tags": ["saludable"],
        "porciones_base": 2,
        "calorias_aprox": 350
      },
      "almuerzo": { "nombre": "string", "foto_keyword": "chicken rice", "descripcion_corta": "string", "ingredientes": [], "pasos_preparacion": [], "tiempo_preparacion_min": 30, "tags": [], "porciones_base": 2, "calorias_aprox": 500 },
      "cena": { "nombre": "string", "foto_keyword": "beef steak", "descripcion_corta": "string", "ingredientes": [], "pasos_preparacion": [], "tiempo_preparacion_min": 30, "tags": [], "porciones_base": 2, "calorias_aprox": 450 }
    }
  ]
}

El array "dias" debe tener exactamente 7 elementos.`

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 6000,
    response_format: { type: 'json_object' },
  })

  const text = (completion.choices[0]?.message?.content ?? '')
    .trim()
    .replace(/^```json\n?/, '')
    .replace(/^```\n?/, '')
    .replace(/\n?```$/, '')
    .trim()

  let parsed
  try {
    parsed = JSON.parse(text)
  } catch {
    console.error('generarPlanConGemini: JSON inválido:', text.slice(0, 200))
    throw new Error('Respuesta de IA no es JSON válido')
  }

  if (!parsed.dias || !Array.isArray(parsed.dias) || parsed.dias.length !== 7) {
    console.error('generarPlanConGemini: respuesta con formato inválido', parsed)
    throw new Error('Respuesta de IA con formato inválido')
  }

  const categorias = ['desayuno', 'almuerzo', 'cena'] as const

  type RecetaRaw = Omit<Receta, 'id' | 'categoria' | 'foto_url'> & { foto_keyword?: string }
  type RecetaTask = { dayIdx: number; cat: typeof categorias[number]; recetaRaw: RecetaRaw }

  const tareas: RecetaTask[] = []
  for (let i = 0; i < parsed.dias.length; i++) {
    const dia = parsed.dias[i] as Record<string, RecetaRaw>
    for (const cat of categorias) {
      if (dia[cat]) tareas.push({ dayIdx: i, cat, recetaRaw: dia[cat] })
    }
  }

  // Buscar todas las fotos en Pixabay en paralelo usando foto_keyword en inglés
  const fotos = await Promise.all(
    tareas.map(({ recetaRaw, cat }) =>
      buscarFotoPixabay(recetaRaw.foto_keyword || recetaRaw.nombre, cat)
    )
  )

  // Reconstruir días con fotos asignadas
  const diasResult: DiaComidas[] = parsed.dias.map(() => ({ desayuno: null, almuerzo: null, cena: null }))
  tareas.forEach(({ dayIdx, cat, recetaRaw }, idx) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { foto_keyword: _fk, ...recetaSinKeyword } = recetaRaw
    diasResult[dayIdx][cat] = {
      ...(recetaSinKeyword as Omit<Receta, 'id' | 'categoria' | 'foto_url'>),
      id: crypto.randomUUID(),
      categoria: cat,
      foto_url: fotos[idx],
    }
  })

  return diasResult
}
