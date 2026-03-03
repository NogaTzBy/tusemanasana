import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

function createServiceClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )
}

function verifyShopifyHmac(rawBody: string, hmacHeader: string): boolean {
    const secret = process.env.SHOPIFY_WEBHOOK_SECRET
    if (!secret) return false

    const computedHmac = crypto
        .createHmac('sha256', secret)
        .update(rawBody, 'utf8')
        .digest('base64')

    return crypto.timingSafeEqual(
        Buffer.from(computedHmac),
        Buffer.from(hmacHeader)
    )
}

async function activarUsuario(supabase: ReturnType<typeof createServiceClient>, email: string, payload: Record<string, unknown>) {
    const { data: usuario, error: fetchError } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .single()

    if (fetchError || !usuario) {
        // Usuario no existe aún → lo creamos con la cuenta activa
        const nombreCliente =
            ((payload.customer as Record<string, unknown>)?.first_name as string) || ''

        const { data: newAuthUser, error: createError } = await supabase.auth.admin.createUser({
            email,
            email_confirm: true,
            user_metadata: { full_name: nombreCliente },
        })

        if (createError || !newAuthUser?.user) {
            console.error(`Webhook orders/paid: error creando usuario para ${email}`, createError)
            return
        }

        await supabase
            .from('usuarios')
            .update({ estado_suscripcion: 'activa' })
            .eq('id', newAuthUser.user.id)

        return
    }

    // Usuario ya existe → activar
    const { error: updateError } = await supabase
        .from('usuarios')
        .update({ estado_suscripcion: 'activa' })
        .eq('id', usuario.id)

    if (updateError) {
        console.error(`Webhook orders/paid: error activando usuario ${usuario.id}`, updateError)
    }
}

export async function POST(request: NextRequest) {
    const rawBody = await request.text()

    const hmacHeader = request.headers.get('X-Shopify-Hmac-Sha256') || ''
    const topic = request.headers.get('X-Shopify-Topic') || ''

    if (!hmacHeader || !verifyShopifyHmac(rawBody, hmacHeader)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let payload: Record<string, unknown>
    try {
        payload = JSON.parse(rawBody)
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const supabase = createServiceClient()

    if (topic === 'orders/paid') {
        // Pago único confirmado → activar cuenta de por vida
        const email =
            (payload.email as string) ||
            ((payload.customer as Record<string, unknown>)?.email as string) ||
            null

        if (email) {
            await activarUsuario(supabase, email, payload)
        }
    }

    // Siempre retornar 200 para que Shopify no reintente el webhook
    return NextResponse.json({ received: true }, { status: 200 })
}
