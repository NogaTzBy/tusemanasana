import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANTE: NO LLEGAR Y HACER supabase.auth.getUser() en todas partes a menos que estemos protegiendo una ruta
    // Refresca la sesión activa (si existe)
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Rutas protegidas que requieren estar logueado
    if (
        user &&
        (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/registro'))
    ) {
        // Si ya está logueado y trata de ir a Login/Registro, pa'l dashboard.
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    if (
        !user &&
        (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/checkout'))
    ) {
        // Redirigir a login si intenta ir a rutas protegidas sin sesión
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
