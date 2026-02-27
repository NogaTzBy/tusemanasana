import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

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

            <section className="max-w-2xl mx-auto py-12 px-6">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[var(--color-primary)]/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-bl-[100px] -z-0"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-accent)]/5 rounded-tr-[100px] -z-0"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-6">
                            <Sparkles className="w-8 h-8 text-[var(--color-primary)]" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-primary-dark)] mb-4">
                            ¡Tenemos el plan perfecto para ti!
                        </h1>

                        <p className="text-lg text-[var(--color-foreground)]/80 mb-8 max-w-lg">
                            Hemos diseñado un menú para <strong>comer sano</strong>, cocinando en <strong>menos de 30 minutos</strong>, sin incluir <strong>mariscos ni cerdo</strong>, y adaptado para <strong>tu familia</strong>.
                        </p>

                        <div className="w-full text-left bg-[var(--color-background)] rounded-2xl p-6 mb-8">
                            <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center">
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mr-2" />
                                ¿Qué incluye tu suscripción?
                            </h3>
                            <ul className="space-y-3 text-[var(--color-foreground)]/80">
                                <li className="flex items-start">
                                    <span className="text-[var(--color-primary)] font-bold mr-2">•</span>
                                    <span>Menús semanales adaptados 100% a tus gustos.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--color-primary)] font-bold mr-2">•</span>
                                    <span>Listas de supermercado exactas, separadas por categorías.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--color-primary)] font-bold mr-2">•</span>
                                    <span>Posibilidad de cambiar cualquier receta con un clic.</span>
                                </li>
                            </ul>
                        </div>

                        <Link
                            href="/checkout"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-[var(--color-accent)] rounded-full shadow-lg hover:bg-[var(--color-accent-dark)] transition-transform hover:scale-105 active:scale-95"
                        >
                            Probá 3 días gratis <ChevronRight className="ml-2 w-5 h-5" />
                        </Link>
                        <p className="text-sm text-[var(--color-foreground)]/50 mt-4">
                            Cancela cuando quieras. Te avisaremos antes de cobrar.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
