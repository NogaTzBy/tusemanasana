export const dynamic = 'force-dynamic'

import { getPerfilUsuario, getPlanSemanal } from '@/lib/supabase/queries'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ShoppingListClient from '@/components/dashboard/ShoppingListClient'
import { procesarListaDeCompras } from '@/lib/utils/shopping-list'

export default async function ShoppingListPage() {
    const usuario = await getPerfilUsuario()

    if (!usuario) {
        redirect('/login')
    }

    const plan = await getPlanSemanal(usuario.id)

    if (!plan) {
        redirect('/dashboard')
    }

    const ingredientes = procesarListaDeCompras(plan)

    return (
        <div className="min-h-screen bg-cream-bg flex flex-col pb-24">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-surface shadow-sm">
                <Link href="/dashboard" className="text-[var(--color-primary-dark)] hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-serif text-xl font-bold tracking-tight text-center text-[var(--color-primary-dark)] ">
                    Mi Lista de Compras
                </h1>
                <div className="w-6" /> {/* Spacer */}
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-md mx-auto px-4 pt-6">
                <div className="bg-white rounded-2xl shadow-sm p-5 border border-cream-surface ">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-terracotta">shopping_cart</span>
                        Ingredientes de la semana
                    </h2>

                    {ingredientes.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Tu plan no tiene ingredientes asignados aún.</p>
                    ) : (
                        <ShoppingListClient ingredientes={ingredientes} planId={plan.id} />
                    )}
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100 ">
                    <p className="text-sm text-blue-800 flex gap-2">
                        <span className="material-symbols-outlined text-base">info</span>
                        Las cantidades son aproximadas y están calculadas en base a las porciones de tu plan.
                    </p>
                </div>
            </main>
        </div>
    )
}
