import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import CountdownTimer from "@/components/onboarding/CountdownTimer";
import TestimonialWall from "@/components/onboarding/TestimonialWall";

export default function ResumenPage() {
    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <header className="px-6 py-4 flex items-center max-w-4xl mx-auto">
                <Link href="/onboarding" className="text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors mr-4">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="font-serif text-xl tracking-tight text-[var(--color-primary-dark)]">
                    Tu Semana Sana
                </div>
            </header>

            <section className="max-w-2xl mx-auto pt-6 pb-12 px-6">
                <CountdownTimer />

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[var(--color-primary)]/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-bl-[100px] -z-0"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-accent)]/5 rounded-tr-[100px] -z-0"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-6">
                            <Sparkles className="w-8 h-8 text-[var(--color-primary)]" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-primary-dark)] mb-4 leading-tight">
                            ¡Tenemos el plan perfecto para ti!
                        </h1>

                        <p className="text-lg text-[var(--color-foreground)]/80 mb-8 max-w-lg">
                            Hemos diseñado un menú para <strong>comer sano</strong>, cocinando en <strong>menos de 30 minutos</strong>, sin incluir <strong>mariscos ni cerdo</strong>, y adaptado para <strong>tu familia</strong>.
                        </p>

                        <div className="w-full text-left bg-[var(--color-background)] rounded-2xl p-6 mb-8">
                            <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center text-lg">
                                <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] mr-2" />
                                ¿Qué incluye tu acceso de por vida?
                            </h3>
                            <ul className="space-y-4 text-[var(--color-foreground)]/80">
                                <li className="flex items-start">
                                    <span className="text-[var(--color-primary)] font-bold mr-3 text-lg">•</span>
                                    <span><strong>Chau a improvisar a última hora:</strong> Menús completos que te ahorran horas en la semana y energía mental a la noche.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--color-primary)] font-bold mr-3 text-lg">•</span>
                                    <span><strong>Tú tienes el control absoluto:</strong> ¿A los chicos no les gusta? Cambia la receta con un botón antes de ir al súper.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--color-primary)] font-bold mr-3 text-lg">•</span>
                                    <span><strong>Ahorra en el supermercado:</strong> Listas de compras exactas para que no compres de más ni te falte nada.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col items-center mb-6">
                            <p className="text-gray-400 line-through text-lg">Precio normal: $196.000 ARS</p>
                            <p className="text-3xl font-bold text-[var(--color-primary-dark)] mt-1">Hoy pago único: $19.900 ARS</p>
                        </div>

                        <Link
                            href="/checkout"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[var(--color-accent)] rounded-full shadow-lg hover:bg-[var(--color-accent-dark)] transition-transform hover:scale-105 active:scale-95"
                        >
                            Desbloquear mi plan de por vida <ChevronRight className="ml-2 w-6 h-6" />
                        </Link>

                        <p className="text-sm font-medium text-[var(--color-foreground)]/60 mt-4 px-4">
                            Pago único. Sin suscripciones ocultas. Acceso de por vida a la IA y recetas infinitas.
                        </p>
                    </div>
                </div>
            </section>

            <TestimonialWall />

        </main>
    );
}
