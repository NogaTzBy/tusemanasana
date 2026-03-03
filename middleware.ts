import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Rutas públicas que nunca deben ser protegidas
const PUBLIC_PATHS = ['/', '/login', '/registro', '/checkout', '/onboarding', '/api']

function isPublicPath(pathname: string): boolean {
    return PUBLIC_PATHS.some(
        (path) => pathname === path || pathname.startsWith(path + '/')
    )
}

export async function middleware(request: NextRequest) {
    const { supabaseResponse, user, supabase } = await updateSession(request)
    const { pathname } = request.nextUrl

    // Si la ruta es pública, sólo refrescamos la sesión y continuamos
    if (isPublicPath(pathname)) {
        return supabaseResponse
    }

    // Rutas protegidas: /dashboard y /receta requieren sesión activa
    const isProtectedPath =
        pathname.startsWith('/dashboard') || pathname.startsWith('/receta')

    if (isProtectedPath && !user) {
        // Sin sesión → redirigir a login
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    if (isProtectedPath && user) {
        // Con sesión: verificar estado de suscripción en la tabla usuarios
        const { data: usuarioData } = await supabase
            .from('usuarios')
            .select('estado_suscripcion')
            .eq('id', user.id)
            .single()

        const estadoValido =
            usuarioData?.estado_suscripcion === 'trial' ||
            usuarioData?.estado_suscripcion === 'activa'

        if (!estadoValido) {
            // Estado pendiente, cancelada, vencida o null → redirigir a checkout
            const url = request.nextUrl.clone()
            url.pathname = '/checkout'
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Static image assets
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
