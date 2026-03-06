import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import CountdownTimer from "@/components/onboarding/CountdownTimer";
import TestimonialWall from "@/components/onboarding/TestimonialWall";
import ImageCarousel from "@/components/onboarding/ImageCarousel";

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

            <section className="max-w-2xl mx-auto pt-2 pb-6 px-4 md:px-6">
                <CountdownTimer />

                <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-sm border border-[var(--color-primary)]/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-primary)]/5 rounded-bl-[80px] -z-0"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--color-accent)]/5 rounded-tr-[80px] -z-0"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-16 md:h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-3 md:mb-6">
                            <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-[var(--color-primary)]" />
                        </div>

                        <h1 className="text-2xl md:text-4xl font-serif text-[var(--color-primary-dark)] mb-2 md:mb-4 leading-tight">
                            ¡Tenemos tu plan perfecto!
                        </h1>

                        <p className="text-sm md:text-lg text-[var(--color-foreground)]/80 mb-4 md:mb-8 max-w-lg leading-snug">
                            Hemos diseñado un menú para <strong>comer sano</strong> en <strong>menos de 30 minutos</strong>, sin <strong>mariscos ni cerdo</strong>, adaptado a <strong>tu familia</strong>.
                        </p>

                        <div className="w-full text-left bg-[var(--color-background)] rounded-xl p-4 md:p-6 mb-5 md:mb-8">
                            <h3 className="font-semibold text-[var(--color-foreground)] mb-2 md:mb-4 flex items-center text-sm md:text-lg">
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mr-2 shrink-0" />
                                Tu acceso de por vida
                            </h3>
                            <ul className="space-y-2 md:space-y-4 text-[var(--color-foreground)]/80 text-xs md:text-base">
                                <li className="flex items-start">
                                    <span className="text-[var(--color-primary)] font-bold mr-2 text-sm md:text-lg">•</span>
                                    <span><strong>Chau a improvisar:</strong> Menús que te ahorran horas en la semana y energía a la noche.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--color-primary)] font-bold mr-2 text-sm md:text-lg">•</span>
                                    <span><strong>Control absoluto:</strong> Cambia la receta con un botón antes de ir al súper.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--color-primary)] font-bold mr-2 text-sm md:text-lg">•</span>
                                    <span><strong>Ahorra dinero:</strong> Listas de compras exactas para no comprar de más.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col items-center mb-4 md:mb-6">
                            <p className="text-gray-400 line-through text-sm md:text-lg">Precio normal: $196.000 ARS</p>
                            <p className="text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] leading-none">Hoy: $19.900 ARS</p>
                        </div>

                        <Link
                            href="/checkout"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-bold text-white bg-[var(--color-accent)] rounded-full shadow-lg hover:bg-[var(--color-accent-dark)] transition-transform hover:scale-105 active:scale-95"
                        >
                            Desbloquear de por vida <ChevronRight className="ml-1 w-5 h-5 md:w-6 md:h-6" />
                        </Link>

                        <p className="text-[10px] md:text-sm font-medium text-[var(--color-foreground)]/60 mt-3 px-2 leading-tight">
                            Pago único sin suscripción. Acceso vitalicio a recetas infinitas.
                        </p>
                    </div>
                </div>
            </section>

            <TestimonialWall />
            <ImageCarousel />

        </main>
    );
}
