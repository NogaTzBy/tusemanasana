import Link from "next/link";
import { ArrowRight, Clock, Heart, Users } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative px-6 py-20 lg:py-32 overflow-hidden bg-[var(--color-background)]">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl lg:text-6xl font-serif text-[var(--color-primary-dark)] leading-tight mb-6">
                    Come sano toda la semana, sin pensar qué cocinar
                </h1>
                <p className="text-lg lg:text-xl text-[var(--color-foreground)]/80 mb-10 max-w-2xl mx-auto">
                    Dinos qué te gusta y cuánto tiempo tienes. Nosotros armaremos un menú delicioso, práctico y a tu medida, junto con la lista de súper exacta para que no desperdicies nada.
                </p>

                <Link
                    href="/onboarding"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-[var(--color-accent)] rounded-full shadow-lg hover:bg-[var(--color-accent-dark)] transition-transform hover:scale-105 active:scale-95"
                >
                    Armar mi plan gratis <ArrowRight className="ml-2 w-5 h-5" />
                </Link>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-[var(--color-primary-dark)]">
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-[var(--color-primary)]/10 rounded-full">
                            <Clock className="w-8 h-8" />
                        </div>
                        <span className="font-medium">Menos de 20 min</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-[var(--color-primary)]/10 rounded-full">
                            <Heart className="w-8 h-8" />
                        </div>
                        <span className="font-medium">Nutricionalmente balanceado</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-[var(--color-primary)]/10 rounded-full">
                            <Users className="w-8 h-8" />
                        </div>
                        <span className="font-medium">Adaptado a tu familia</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
