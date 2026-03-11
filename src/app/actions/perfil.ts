'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function saveProfileData(finalAnswers: any) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "No user" }
    }

    try {
        await supabase.from('perfiles_nutricionales').upsert({
            usuario_id: user.id,
            objetivo: finalAnswers.objetivo || '',
            tiempo_disponible: finalAnswers.tiempo || '',
            tipo_alimentacion: finalAnswers.alimentacion || '',
            alimentos_excluidos: finalAnswers.exclusiones || [],
            cantidad_personas: finalAnswers.personas || '',
            frecuencia_recetas: finalAnswers.frecuencia || ''
        }, { onConflict: 'usuario_id' })
    } catch (e) {
        console.error("Error guardando perfil nutricional", e)
        return { error: "Error saving profile" }
    }

    redirect('/dashboard')
}
