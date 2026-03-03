import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

// Cliente Supabase con service role para bypassear RLS
function createServiceClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    )
}

function verifyShopifyHmac(rawBody: string, hmacHeader: string): boolean {
    const secret = process.env.SHOPIFY_WEBHOOK_SECRET
    if (!secret) return false

    const computedHmac = crypto
        .createHmac('sha256', secret)
        .update(rawBody, 'utf8')
        .digest('base64')

    // Comparación segura para evitar timing attacks
    return crypto.timingSafeEqual(
        Buffer.from(computedHmac),
        Buffer.from(hmacHeader)
    )
}

function calcularProximoCobro(plan: string | null): Date {
    const ahora = new Date()
    if (plan === 'anual') {
        ahora.setDate(ahora.getDate() + 365)
    } else {
        // mensual o desconocido → 30 días
        ahora.setDate(ahora.getDate() + 30)
    }
    return ahora
}

function calcularFinTrial(): Date {
    const ahora = new Date()
    ahora.setDate(ahora.getDate() + 3)
    return ahora
}

export async function POST(request: NextRequest) {
    // Leer el raw body ANTES de parsear como JSON (Shopify firma el body crudo)
    const rawBody = await request.text()

    const hmacHeader = request.headers.get('X-Shopify-Hmac-Sha256') || ''
    const topic = request.headers.get('X-Shopify-Topic') || ''

    // Validar firma HMAC
    if (!hmacHeader || !verifyShopifyHmac(rawBody, hmacHeader)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parsear el body ya validado
    let payload: Record<string, unknown>
    try {
        payload = JSON.parse(rawBody)
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const supabase = createServiceClient()

    if (topic === 'subscriptions/activate') {
        // Inicio del trial: usuario pagó con tarjeta pero aún no se le cobró
        const email =
            (payload.email as string) ||
            ((payload.customer as Record<string, unknown>)?.email as string) ||
            null

        if (!email) {
            return NextResponse.json({ received: true }, { status: 200 })
        }

        const { data: usuario, error: fetchError } = await supabase
            .from('usuarios')
            .select('id, plan')
            .eq('email', email)
            .single()

        if (fetchError || !usuario) {
            console.error(`Webhook ${topic}: usuario no encontrado para email ${email}`, fetchError)
            return NextResponse.json({ received: true }, { status: 200 })
        }

        const finTrial = calcularFinTrial()

        const { error: updateError } = await supabase
            .from('usuarios')
            .update({
                estado_suscripcion: 'trial',
                fecha_inicio_trial: new Date().toISOString(),
                fecha_proximo_cobro: finTrial.toISOString(),
            })
            .eq('id', usuario.id)

        if (updateError) {
            console.error(`Webhook ${topic}: error actualizando usuario ${usuario.id}`, updateError)
        }
    } else if (topic === 'orders/paid') {
        // Primer cobro real: el trial terminó y se efectuó el pago
        const email =
            (payload.email as string) ||
            ((payload.customer as Record<string, unknown>)?.email as string) ||
            null

        if (!email) {
            return NextResponse.json({ received: true }, { status: 200 })
        }

        const { data: usuario, error: fetchError } = await supabase
            .from('usuarios')
            .select('id, plan')
            .eq('email', email)
            .single()

        if (fetchError || !usuario) {
            console.error(`Webhook ${topic}: usuario no encontrado para email ${email}`, fetchError)
            return NextResponse.json({ received: true }, { status: 200 })
        }

        const proximoCobro = calcularProximoCobro(usuario.plan as string | null)

        const { error: updateError } = await supabase
            .from('usuarios')
            .update({
                estado_suscripcion: 'activa',
                fecha_proximo_cobro: proximoCobro.toISOString(),
            })
            .eq('id', usuario.id)

        if (updateError) {
            console.error(`Webhook ${topic}: error actualizando usuario ${usuario.id}`, updateError)
        }
    } else if (topic === 'subscriptions/cancel') {
        const email =
            (payload.email as string) ||
            ((payload.customer as Record<string, unknown>)?.email as string) ||
            null

        if (email) {
            const { error: updateError } = await supabase
                .from('usuarios')
                .update({ estado_suscripcion: 'cancelada' })
                .eq('email', email)

            if (updateError) {
                console.error(`Webhook ${topic}: error actualizando estado para ${email}`, updateError)
            }
        }
    } else if (topic === 'subscriptions/expire') {
        const email =
            (payload.email as string) ||
            ((payload.customer as Record<string, unknown>)?.email as string) ||
            null

        if (email) {
            const { error: updateError } = await supabase
                .from('usuarios')
                .update({ estado_suscripcion: 'vencida' })
                .eq('email', email)

            if (updateError) {
                console.error(`Webhook ${topic}: error actualizando estado para ${email}`, updateError)
            }
        }
    }
    // Cualquier otro topic es ignorado silenciosamente

    // Siempre retornar 200 para que Shopify no reintente el webhook
    return NextResponse.json({ received: true }, { status: 200 })
}
