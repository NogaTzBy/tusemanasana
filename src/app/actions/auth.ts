'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUpAction(formData: FormData) {
    const email = (formData.get('email') as string)?.trim() || ''
    const password = formData.get('password') as string
    const fullName = (formData.get('fullName') as string)?.trim() || ''
    const profileDataStr = formData.get('profileData') as string
    const supabase = await createClient()

    const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            }
        },
    })

    if (error) {
        return redirect('/registro?message=Hubo un error al crear tu cuenta. ' + error.message)
    }

    if (profileDataStr && authData?.user?.id) {
        try {
            const profileData = JSON.parse(profileDataStr)
            await supabase.from('perfiles_nutricionales').insert({
                usuario_id: authData.user.id,
                objetivo: profileData.goal,
                tiempo_disponible: profileData.time,
                tipo_alimentacion: profileData.diet,
                alimentos_excluidos: profileData.restrictions || [],
                cantidad_personas: profileData.people,
                frecuencia_recetas: profileData.frequency
            })
        } catch (e) {
            console.error("Error guardando perfil nutricional", e)
        }
    }

    return redirect('/dashboard')
}
