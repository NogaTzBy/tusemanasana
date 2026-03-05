import Groq from 'groq-sdk'
import type { DiaComidas, PerfilNutricional, Receta } from './types'

// Fotos curadas por tipo de comida (más precisas que por categoría/día)
const FOTOS_POR_TIPO: Record<string, string> = {
  // Desayunos
  yogurt:       'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop',
  avena:        'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&auto=format&fit=crop',
  tostadas:     'https://images.unsplash.com/photo-1484723091739-30990068383c?w=800&auto=format&fit=crop',
  huevos:       'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop',
  frutas:       'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&auto=format&fit=crop',
  licuado:      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop',
  pancakes:     'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop',
  medialunas:   'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop',
  granola:      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop',
  // Almuerzos
  ensalada:     'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
  pasta:        'https://images.unsplash.com/photo-1473093226555-f9d80a16b6b0?w=800&auto=format&fit=crop',
  arroz:        'https://images.unsplash.com/photo-1536304993881-ff86e89af2f3?w=800&auto=format&fit=crop',
  pollo:        'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop',
  milanesa:     'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
  sandwich:     'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop',
  tarta:        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop',
  legumbres:    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop',
  // Cenas
  carne:        'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop',
  salmon:       'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop',
  sopa:         'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop',
  vegetariano:  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop',
  pizza:        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
  guiso:        'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop',
  pescado:      'https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?w=800&auto=format&fit=crop',
  asado:        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
}

const FOTO_FALLBACK: Record<string, string> = {
  desayuno: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop',
  almuerzo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
  cena:     'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
}

const FOTO_TIPOS = Object.keys(FOTOS_POR_TIPO).join(' | ')

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
- Cada receta debe tener al menos 3 pasos de preparación
- Las calorías deben ser realistas

Para el campo "foto_tipo" elegí la opción más representativa del plato de esta lista:
${FOTO_TIPOS}

Respondé ÚNICAMENTE con JSON puro, sin markdown, sin bloques de código, sin texto adicional:
{
  "dias": [
    {
      "desayuno": {
        "nombre": "string",
        "descripcion_corta": "string",
        "ingredientes": [{"nombre": "string", "cantidad": 1, "unidad": "string"}],
        "pasos_preparacion": ["paso 1", "paso 2", "paso 3"],
        "tiempo_preparacion_min": 15,
        "tags": ["saludable"],
        "porciones_base": 2,
        "calorias_aprox": 350,
        "foto_tipo": "yogurt"
      },
      "almuerzo": { "nombre": "string", "descripcion_corta": "string", "ingredientes": [], "pasos_preparacion": [], "tiempo_preparacion_min": 30, "tags": [], "porciones_base": 2, "calorias_aprox": 500, "foto_tipo": "ensalada" },
      "cena": { "nombre": "string", "descripcion_corta": "string", "ingredientes": [], "pasos_preparacion": [], "tiempo_preparacion_min": 30, "tags": [], "porciones_base": 2, "calorias_aprox": 450, "foto_tipo": "carne" }
    }
  ]
}

El array "dias" debe tener exactamente 7 elementos.`

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 6000,
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

  const dias: DiaComidas[] = parsed.dias.map(
    (dia: Record<string, Omit<Receta, 'id' | 'categoria' | 'foto_url'> & { foto_tipo?: string }>) => {
      const diaComidas: DiaComidas = { desayuno: null, almuerzo: null, cena: null }
      for (const cat of categorias) {
        if (dia[cat]) {
          const recetaRaw = dia[cat] as Omit<Receta, 'id' | 'categoria' | 'foto_url'> & { foto_tipo?: string }
          const fotoTipo = recetaRaw.foto_tipo
          const fotoUrl = (fotoTipo && FOTOS_POR_TIPO[fotoTipo]) ?? FOTO_FALLBACK[cat]
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { foto_tipo: _, ...recetaSinTipo } = recetaRaw
          diaComidas[cat] = {
            ...(recetaSinTipo as Omit<Receta, 'id' | 'categoria' | 'foto_url'>),
            id: crypto.randomUUID(),
            categoria: cat,
            foto_url: fotoUrl,
          }
        }
      }
      return diaComidas
    }
  )

  return dias
}
