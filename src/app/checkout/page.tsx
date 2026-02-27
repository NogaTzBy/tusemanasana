"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";

export default function CheckoutPage() {
    const [plan, setPlan] = useState<"mensual" | "anual">("anual");

    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <header className="px-6 py-4 flex items-center max-w-4xl mx-auto border-b border-gray-200/50 bg-white">
                <Link href="/onboarding/resumen" className="text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors mr-4">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="font-serif text-lg tracking-tight text-[var(--color-primary-dark)] font-medium">
                    Finalizar suscripción
                </div>
            </header>

            <section className="max-w-4xl mx-auto py-8 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Lado izquierdo: Planes */}
                <div>
                    <h1 className="text-2xl font-serif text-[var(--color-primary-dark)] mb-2">
                        Comienza tu prueba gratuita
                    </h1>
                    <p className="text-[var(--color-foreground)]/70 mb-8">
                        Hoy no te cobraremos nada. Disfruta 3 días enteros de todas nuestras ventajas.
                    </p>

                    <div className="space-y-4 mb-8">
                        {/* Plan Anual */}
                        <div
                            onClick={() => setPlan("anual")}
                            className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${plan === "anual"
                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                    : "border-gray-200 bg-white hover:border-[var(--color-primary)]/40"
                                }`}
                        >
                            {plan === "anual" && (
                                <div className="absolute -top-3 right-4 bg-[var(--color-accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Mejor opción
                                </div>
                            )}
                            <div className="flex justify-between items-center mb-1">
                                <h3 className={`font-semibold ${plan === "anual" ? "text-[var(--color-primary-dark)]" : "text-[var(--color-foreground)]"}`}>
                                    Anual
                                </h3>
                                <span className="font-bold text-lg">$79.900 ARS<span className="text-sm font-normal text-[var(--color-foreground)]/60">/año</span></span>
                            </div>
                            <p className="text-sm text-[var(--color-foreground)]/60 flex items-center">
                                <span className="text-green-600 font-medium mr-1">3 días gratis,</span> luego cobro anual.
                            </p>
                        </div>

                        {/* Plan Mensual */}
                        <div
                            onClick={() => setPlan("mensual")}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${plan === "mensual"
                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                    : "border-gray-200 bg-white hover:border-[var(--color-primary)]/40"
                                }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h3 className={`font-semibold ${plan === "mensual" ? "text-[var(--color-primary-dark)]" : "text-[var(--color-foreground)]"}`}>
                                    Mensual
                                </h3>
                                <div className="text-right">
                                    <span className="text-sm line-through text-[var(--color-foreground)]/40 block -mb-1">$19.900 ARS</span>
                                    <span className="font-bold text-lg">$9.900 ARS<span className="text-sm font-normal text-[var(--color-foreground)]/60">/mes</span></span>
                                </div>
                            </div>
                            <p className="text-sm text-[var(--color-foreground)]/60 flex items-center mt-1">
                                <span className="text-green-600 font-medium mr-1">3 días gratis,</span> precio especial desde el 2do mes.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)] p-4 rounded-xl text-sm flex items-start">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mr-3" />
                        <p>
                            <strong>Garantía libre de estrés:</strong> Recibirás un correo recordatorio 2 días antes de que termine tu periodo de prueba. Cancelación a un clic.
                        </p>
                    </div>
                </div>

                {/* Lado derecho: Checkout form (Mock) */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-6 flex items-center">
                        <Lock className="w-4 h-4 mr-2 text-gray-400" /> Detalles de pago seguro
                    </h2>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-foreground)]/80 mb-1">Email</label>
                            <input type="email" required placeholder="maria@ejemplo.com" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-foreground)]/80 mb-1">Nombre en la tarjeta</label>
                            <input type="text" required placeholder="María Pérez" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-foreground)]/80 mb-1">Número de tarjeta</label>
                            <div className="relative">
                                <input type="text" required placeholder="0000 0000 0000 0000" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] font-mono text-sm" />
                                <div className="absolute right-3 top-3 flex space-x-1">
                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-foreground)]/80 mb-1">Vencimiento</label>
                                <input type="text" required placeholder="MM/AA" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-foreground)]/80 mb-1">CVC</label>
                                <input type="text" required placeholder="123" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 mt-6">
                            <div className="flex justify-between items-center mb-4 text-[var(--color-foreground)]">
                                <span className="font-medium">Total hoy</span>
                                <span className="font-bold text-xl">$0.00</span>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 text-white bg-black rounded-xl font-medium shadow hover:bg-gray-800 transition-colors"
                            >
                                Comenzar mis 3 días gratis
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
