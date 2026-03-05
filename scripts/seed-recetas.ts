#!/usr/bin/env npx tsx
/**
 * Seed de recetas en Supabase.
 * Genera ~800 recetas en lotes de 10 usando Groq.
 *
 * Uso: npx tsx scripts/seed-recetas.ts
 *
 * Tiempo estimado: ~27 minutos (12s de pausa entre lotes para respetar el TPM de Groq free)
 * Tokens usados: ~160.000 (puede necesitar 2 días en free tier de 131k/día)
 */

import Groq from 'groq-sdk'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function buscarFoto(keyword: string, categoria: string): Promise<string> {
  const FALLBACK: Record<string, string> = {
    desayuno: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop',
    almuerzo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
    cena: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
  }
  const apiKey = process.env.PIXABAY_API_KEY
  if (apiKey) {
    try {
      const params = new URLSearchParams({ key: apiKey, q: keyword, image_type: 'photo', category: 'food', per_page: '5', safesearch: 'true' })
      const res = await fetch(`https://pixabay.com/api/?${params}`)
      if (res.ok) {
        const data = await res.json() as { hits?: { webformatURL: string }[] }
        if (data.hits?.length) return data.hits[0].webformatURL
      }
    } catch {}
  }
  return FALLBACK[categoria] ?? FALLBACK.cena
}

const LOTES: { categoria: 'desayuno' | 'almuerzo' | 'cena'; tema: string }[] = [
  // ── DESAYUNOS (20 lotes × 10 = 200) ──────────────────────────────────────
  { categoria: 'desayuno', tema: 'tostadas con palta, queso untable o tomate' },
  { categoria: 'desayuno', tema: 'avena caliente con frutas y semillas' },
  { categoria: 'desayuno', tema: 'huevos revueltos, fritos o pochados' },
  { categoria: 'desayuno', tema: 'yogur natural con granola y frutas' },
  { categoria: 'desayuno', tema: 'pancakes y tortitas dulces caseras' },
  { categoria: 'desayuno', tema: 'licuados y smoothies de frutas' },
  { categoria: 'desayuno', tema: 'medialunas, panes y budines caseros' },
  { categoria: 'desayuno', tema: 'muffins y bizcochos saludables' },
  { categoria: 'desayuno', tema: 'tostadas francesas y torrijas' },
  { categoria: 'desayuno', tema: 'bowls de frutas con semillas y miel' },
  { categoria: 'desayuno', tema: 'omelettes y tortillas de huevo con vegetales' },
  { categoria: 'desayuno', tema: 'galletitas de avena y banana' },
  { categoria: 'desayuno', tema: 'crepes dulces con frutas o dulce de leche' },
  { categoria: 'desayuno', tema: 'sandwiches de queso y fiambre tostados' },
  { categoria: 'desayuno', tema: 'porridge y papillas de cereales integrales' },
  { categoria: 'desayuno', tema: 'batidos proteicos con fruta y avena' },
  { categoria: 'desayuno', tema: 'tazas de frutas mixtas con ricota o crema' },
  { categoria: 'desayuno', tema: 'panes integrales con diferentes toppings' },
  { categoria: 'desayuno', tema: 'waffles dulces y salados' },
  { categoria: 'desayuno', tema: 'granola casera con leche o yogur' },

  // ── ALMUERZOS (30 lotes × 10 = 300) ─────────────────────────────────────
  { categoria: 'almuerzo', tema: 'pastas con salsas de tomate y vegetales' },
  { categoria: 'almuerzo', tema: 'pastas con boloñesa y carnes' },
  { categoria: 'almuerzo', tema: 'pastas rellenas: ravioles, canelones, lasagna' },
  { categoria: 'almuerzo', tema: 'milanesas de carne y pollo con guarnición' },
  { categoria: 'almuerzo', tema: 'ensaladas completas con proteína: pollo, atún, huevo' },
  { categoria: 'almuerzo', tema: 'tartas y quiches de vegetales y queso' },
  { categoria: 'almuerzo', tema: 'empanadas al horno con distintos rellenos' },
  { categoria: 'almuerzo', tema: 'arroz con pollo y vegetales salteados' },
  { categoria: 'almuerzo', tema: 'guisos de lentejas, porotos y garbanzos' },
  { categoria: 'almuerzo', tema: 'hamburguesas caseras de carne y vegetales' },
  { categoria: 'almuerzo', tema: 'sandwiches y wraps rellenos' },
  { categoria: 'almuerzo', tema: 'sopas y cremas de vegetales' },
  { categoria: 'almuerzo', tema: 'pollo al horno con guarniciones variadas' },
  { categoria: 'almuerzo', tema: 'pescado al horno o a la plancha' },
  { categoria: 'almuerzo', tema: 'tortillas de huevo y papa' },
  { categoria: 'almuerzo', tema: 'locro y guisos tradicionales argentinos' },
  { categoria: 'almuerzo', tema: 'polenta con salsas y queso' },
  { categoria: 'almuerzo', tema: 'woks de vegetales con arroz o fideos' },
  { categoria: 'almuerzo', tema: 'ñoquis con distintas salsas' },
  { categoria: 'almuerzo', tema: 'cazuelas y estofados de carne' },
  { categoria: 'almuerzo', tema: 'arroz integral con legumbres' },
  { categoria: 'almuerzo', tema: 'budines y pasteles de verdura al horno' },
  { categoria: 'almuerzo', tema: 'bowls de quinoa con toppings variados' },
  { categoria: 'almuerzo', tema: 'croquetas y bocadillos de vegetales' },
  { categoria: 'almuerzo', tema: 'platos vegetarianos y veganos' },
  { categoria: 'almuerzo', tema: 'fideos orientales salteados' },
  { categoria: 'almuerzo', tema: 'pizzas caseras con toppings variados' },
  { categoria: 'almuerzo', tema: 'rollitos y budines de carne' },
  { categoria: 'almuerzo', tema: 'cazuelas de pollo con vegetales y papas' },
  { categoria: 'almuerzo', tema: 'pechugas de pollo en distintas marinadas' },

  // ── CENAS (30 lotes × 10 = 300) ──────────────────────────────────────────
  { categoria: 'cena', tema: 'sopas y cremas reconfortantes' },
  { categoria: 'cena', tema: 'carne a la plancha con vegetales salteados' },
  { categoria: 'cena', tema: 'pollo a la plancha con ensalada' },
  { categoria: 'cena', tema: 'ensaladas tibias y frías con proteína' },
  { categoria: 'cena', tema: 'omelettes y revueltos de huevo con vegetales' },
  { categoria: 'cena', tema: 'tostadas y bruschetas con toppings variados' },
  { categoria: 'cena', tema: 'pescado y mariscos a la plancha o al horno' },
  { categoria: 'cena', tema: 'wraps y burritos con rellenos varios' },
  { categoria: 'cena', tema: 'brochettes y pinchos al horno' },
  { categoria: 'cena', tema: 'pastas simples de preparación rápida' },
  { categoria: 'cena', tema: 'vegetales rellenos al horno' },
  { categoria: 'cena', tema: 'cazuelas livianas de verduras' },
  { categoria: 'cena', tema: 'salmon y atún en diversas preparaciones' },
  { categoria: 'cena', tema: 'tartas saladas livianas' },
  { categoria: 'cena', tema: 'sandwiches calientes y paninis' },
  { categoria: 'cena', tema: 'platos de legumbres livianos para cenar' },
  { categoria: 'cena', tema: 'pizza casera liviana con vegetales' },
  { categoria: 'cena', tema: 'budines de verdura y queso al horno' },
  { categoria: 'cena', tema: 'fideos con aceite de oliva e ingredientes simples' },
  { categoria: 'cena', tema: 'falafel, hummus y platos mediterráneos' },
  { categoria: 'cena', tema: 'platos de arroz livianos para cenar' },
  { categoria: 'cena', tema: 'crepes salados con rellenos varios' },
  { categoria: 'cena', tema: 'cazuelas de pollo y verduras para cenar' },
  { categoria: 'cena', tema: 'rolls de lechuga o repollo rellenos' },
  { categoria: 'cena', tema: 'polenta liviana con salsa' },
  { categoria: 'cena', tema: 'tablas de quesos y fiambres con pan' },
  { categoria: 'cena', tema: 'ratatouille y guisos de vegetales' },
  { categoria: 'cena', tema: 'salteados de tofu y vegetales' },
  { categoria: 'cena', tema: 'cenas rápidas en menos de 20 minutos' },
  { categoria: 'cena', tema: 'guisos de carne y papa para cenar' },
]

async function generarLote(categoria: 'desayuno' | 'almuerzo' | 'cena', tema: string) {
  const prompt = `Sos un nutricionista argentino experto. Generá exactamente 10 recetas de ${categoria} del tipo: "${tema}".

Reglas:
- Nombres y descripciones en español rioplatense
- Ingredientes fáciles de conseguir en Argentina
- Cada receta: 4 ingredientes con cantidades precisas y 4 pasos descriptivos
- foto_keyword: 1-3 palabras en inglés para buscar en Pixabay (ej: "oatmeal banana")
- Sin repetir recetas entre sí

Respondé SOLO con este JSON:
{"recetas":[{"nombre":"","foto_keyword":"","descripcion_corta":"","ingredientes":[{"nombre":"","cantidad":1,"unidad":""}],"pasos_preparacion":["","","",""],"tiempo_preparacion_min":20,"tags":["saludable"],"porciones_base":2,"calorias_aprox":350}]}`

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
    max_tokens: 3000,
    response_format: { type: 'json_object' },
  })

  const text = completion.choices[0]?.message?.content ?? ''
  const parsed = JSON.parse(text) as { recetas: Record<string, unknown>[] }
  return parsed.recetas || []
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  console.log(`\n🍽️  Seed de recetas — ${LOTES.length} lotes × 10 = ${LOTES.length * 10} recetas\n`)

  const { count: yaExisten } = await supabase
    .from('recetas')
    .select('*', { count: 'exact', head: true })
  console.log(`📊 Recetas ya en DB: ${yaExisten ?? 0}\n`)

  let insertadas = 0
  let errores = 0

  for (let i = 0; i < LOTES.length; i++) {
    const { categoria, tema } = LOTES[i]
    process.stdout.write(`[${String(i + 1).padStart(2)}/${LOTES.length}] ${categoria.toUpperCase()} "${tema}" … `)

    try {
      const recetas = await generarLote(categoria, tema)

      // Fotos en paralelo
      const recetasConFotos = await Promise.all(
        recetas.map(async (r) => {
          const rec = r as { foto_keyword?: string; nombre?: string } & Record<string, unknown>
          const keyword = (rec.foto_keyword as string) || (rec.nombre as string) || tema
          const foto = await buscarFoto(keyword, categoria)
          const { foto_keyword: _fk, ...sin } = rec
          return { ...sin, categoria, foto_url: foto }
        })
      )

      const { error } = await supabase.from('recetas').insert(recetasConFotos)
      if (error) {
        console.log(`❌ ${error.message}`)
        errores++
      } else {
        insertadas += recetasConFotos.length
        console.log(`✅ ${recetasConFotos.length} recetas (total: ${insertadas})`)
      }
    } catch (err) {
      console.log(`❌ ${err instanceof Error ? err.message : err}`)
      errores++
    }

    if (i < LOTES.length - 1) {
      process.stdout.write('   ⏳ 12s...\n')
      await sleep(12000)
    }
  }

  console.log(`\n✅ Listo: ${insertadas} insertadas, ${errores} errores`)
  console.log(`📊 Total en DB: ${(yaExisten ?? 0) + insertadas}`)
}

main().catch(console.error)
