import { GoogleGenerativeAI } from '@google/generative-ai'
import type { DiaComidas, PerfilNutricional, Receta } from './types'

const FOTOS: Record<string, string[]> = {
  desayuno: [
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1484723091739-30990068383c?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format&fit=crop',
  ],
  almuerzo: [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop',
  ],
  cena: [
    'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800&auto=format&fit=crop',
  ],
}

export async function generarPlanConGemini(
  perfil: PerfilNutricional | null
): Promise<DiaComidas[] | null> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('generarPlanConGemini: GEMINI_API_KEY no configurada')
    return null
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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
        "calorias_aprox": 350
      },
      "almuerzo": { "nombre": "string", "descripcion_corta": "string", "ingredientes": [], "pasos_preparacion": [], "tiempo_preparacion_min": 30, "tags": [], "porciones_base": 2, "calorias_aprox": 500 },
      "cena": { "nombre": "string", "descripcion_corta": "string", "ingredientes": [], "pasos_preparacion": [], "tiempo_preparacion_min": 30, "tags": [], "porciones_base": 2, "calorias_aprox": 450 }
    }
  ]
}

El array "dias" debe tener exactamente 7 elementos.`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response
      .text()
      .trim()
      .replace(/^```json\n?/, '')
      .replace(/^```\n?/, '')
      .replace(/\n?```$/, '')
      .trim()

    const parsed = JSON.parse(text)

    if (!parsed.dias || !Array.isArray(parsed.dias) || parsed.dias.length !== 7) {
      console.error('generarPlanConGemini: respuesta con formato inválido', parsed)
      return null
    }

    const categorias = ['desayuno', 'almuerzo', 'cena'] as const

    const dias: DiaComidas[] = parsed.dias.map(
      (dia: Record<string, Omit<Receta, 'id' | 'categoria' | 'foto_url'>>, i: number) => {
        const diaComidas: DiaComidas = { desayuno: null, almuerzo: null, cena: null }
        for (const cat of categorias) {
          if (dia[cat]) {
            diaComidas[cat] = {
              ...(dia[cat] as Omit<Receta, 'id' | 'categoria' | 'foto_url'>),
              id: crypto.randomUUID(),
              categoria: cat,
              foto_url: FOTOS[cat][i % FOTOS[cat].length],
            }
          }
        }
        return diaComidas
      }
    )

    return dias
  } catch (err) {
    console.error('generarPlanConGemini: error al generar o parsear', err)
    return null
  }
}
