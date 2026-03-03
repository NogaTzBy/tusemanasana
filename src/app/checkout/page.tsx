import { createClient } from '@/lib/supabase/server'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'

export default async function CheckoutPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return <CheckoutForm emailPrellenado={user?.email} />
}
