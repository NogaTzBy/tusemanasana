"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, Infinity } from "lucide-react";
import { useState } from "react";

interface CheckoutFormProps {
    emailPrellenado?: string;
}

export function CheckoutForm({ emailPrellenado }: CheckoutFormProps) {
    const [email, setEmail] = useState(emailPrellenado || "");
    const [nombre, setNombre] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (typeof window !== 'undefined') {
            localStorage.setItem('tu_semana_sana_checkout', JSON.stringify({ email, nombre }));

            const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'tu-tienda.myshopify.com';
            const variantId = process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_ID || '45770473275565';

            let shopifyCheckoutUrl = `https://${storeDomain}/cart/${variantId}:1`;
            if (email) {
                shopifyCheckoutUrl += `?checkout[email]=${encodeURIComponent(email)}`;
            }

            window.location.href = shopifyCheckoutUrl;
        }
    }

    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <header className="px-6 py-4 flex items-center max-w-4xl mx-auto border-b border-gray-200/50 bg-white">
                <Link href="/onboarding/resumen" className="text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors mr-4">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="font-serif text-lg tracking-tight text-[var(--color-primary-dark)] font-medium">
                    Acceso de por vida
                </div>
            </header>

            <section className="max-w-4xl mx-auto py-8 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Lado izquierdo: Propuesta de valor */}
                <div>
                    <h1 className="text-2xl font-serif text-[var(--color-primary-dark)] mb-2">
                        Un solo pago, tuya para siempre
                    </h1>
                    <p className="text-[var(--color-foreground)]/70 mb-8">
                        Sin suscripciones. Sin sorpresas. Pagás una vez y accedés a todos los menús y actualizaciones para siempre.
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                            <span className="text-[var(--color-foreground)]/80">Menús semanales personalizados con IA según tus gustos</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                            <span className="text-[var(--color-foreground)]/80">Lista de compras exacta, sin desperdiciar nada</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                            <span className="text-[var(--color-foreground)]/80">Cambiá cualquier receta con un clic</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Infinity className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                            <span className="text-[var(--color-foreground)]/80">Actualizaciones y nuevas recetas incluidas para siempre</span>
                        </div>
                    </div>

                    <div className="bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)] p-4 rounded-xl text-sm flex items-start">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mr-3 mt-0.5" />
                        <p>
                            <strong>Sin renovaciones automáticas.</strong> Pagás $19.900 ARS una sola vez y la aplicación es tuya de por vida.
                        </p>
                    </div>
                </div>

                {/* Lado derecho: Formulario */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative">
                    {isSubmitting && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-3xl">
                            <div className="w-10 h-10 border-4 border-[var(--color-primary)]/30 border-t-[var(--color-primary)] rounded-full animate-spin mb-4"></div>
                            <p className="font-medium text-[var(--color-foreground)] animate-pulse text-center px-4">Conectando con el checkout seguro...</p>
                        </div>
                    )}
                    <h2 className="text-lg font-semibold mb-6 flex items-center">
                        <Lock className="w-4 h-4 mr-2 text-gray-400" /> Checkout seguro
                    </h2>

                    <p className="text-sm text-[var(--color-foreground)]/70 mb-6">
                        Serás redirigida a la pasarela de pago oficial. Aceptamos Mercado Pago y tarjetas.
                    </p>

                    <form className="space-y-4" onSubmit={handleCheckout}>
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-foreground)]/80 mb-1">Nombre completo</label>
                            <input
                                type="text"
                                required
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="María Pérez"
                                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-foreground)]/80 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={emailPrellenado ? undefined : (e) => setEmail(e.target.value)}
                                readOnly={!!emailPrellenado}
                                placeholder="maria@ejemplo.com"
                                className={`w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] ${emailPrellenado ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-100 mt-6">
                            <div className="flex justify-between items-center mb-1 text-[var(--color-foreground)]">
                                <span className="font-medium">Total</span>
                                <span className="font-bold text-2xl">$19.900 ARS</span>
                            </div>
                            <p className="text-xs text-[var(--color-foreground)]/50 mb-4">Pago único · Acceso de por vida</p>

                            <button
                                type="submit"
                                className="w-full py-4 text-white bg-black rounded-xl font-medium shadow hover:bg-gray-800 transition-colors disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                Ir a Pagar <ArrowLeft className="w-4 h-4 inline ml-2 rotate-180" />
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
