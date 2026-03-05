'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

function getAdminClient() {
    return createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )
}

export async function signUpAction(formData: FormData) {
    const email = (formData.get('email') as string)?.trim() || ''
    const password = formData.get('password') as string
    const fullName = (formData.get('fullName') as string)?.trim() || ''
    const plan = (formData.get('plan') as string)?.trim() || 'mensual'
    const profileDataStr = formData.get('profileData') as string
    const supabase = await createClient()

    const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                plan,
            }
        },
    })

    if (error) {
        // Si el webhook ya creó la cuenta, actualizamos la contraseña y hacemos login
        if (error.message.toLowerCase().includes('already registered') || error.code === 'user_already_exists') {
            const admin = getAdminClient()
            const { data: existing } = await admin.auth.admin.listUsers()
            const existingUser = existing?.users?.find(u => u.email === email)
            if (existingUser) {
                await admin.auth.admin.updateUserById(existingUser.id, { password })
                const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
                if (signInError) {
                    return redirect('/registro?message=Error al iniciar sesión. Intentá de nuevo.')
                }
                return redirect('/dashboard')
            }
        }
        const msg = error.message.toLowerCase()
        let mensajeError = 'Hubo un error al crear tu cuenta. Intentá de nuevo.'
        if (msg.includes('40 seconds') || msg.includes('security purposes')) {
            mensajeError = 'Por seguridad, esperá unos segundos antes de intentarlo de nuevo.'
        } else if (msg.includes('invalid email')) {
            mensajeError = 'El email ingresado no es válido.'
        } else if (msg.includes('password')) {
            mensajeError = 'La contraseña debe tener al menos 6 caracteres.'
        }
        return redirect('/registro?message=' + mensajeError)
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
