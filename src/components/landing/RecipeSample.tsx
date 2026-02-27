import { CheckCircle2 } from "lucide-react";

export default function RecipeSample() {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-[var(--color-primary-dark)] mb-4">
                        Un adelanto de lo que vas a disfrutar
                    </h2>
                    <p className="text-[var(--color-foreground)]/70">
                        Comidas ricas, simples y pensadas para tu ritmo de vida.
                    </p>
                </div>

                <div className="bg-[var(--color-background)] rounded-3xl overflow-hidden shadow-sm border border-[var(--color-primary)]/20 md:flex">
                    {/* Muestra visual sin usar importaciones reales aún */}
                    <div className="md:w-1/2 bg-[var(--color-primary)]/10 min-h-[300px] flex items-center justify-center p-8">
                        <div className="text-[var(--color-primary-dark)] font-serif italic text-2xl text-center">
                            "En tu plataforma verás fotos hermosas y reales de cada plato."
                        </div>
                    </div>

                    <div className="md:w-1/2 p-8 lg:p-12">
                        <div className="inline-block px-3 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent-dark)] font-medium text-sm rounded-full mb-4">
                            Cena lista en 20 min
                        </div>
                        <h3 className="text-2xl font-serif text-[var(--color-primary-dark)] mb-6">
                            Salmón al horno con costra de hierbas y espárragos
                        </h3>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 mr-3 flex-shrink-0" />
                                <span>Ingredientes frescos que consigues en cualquier súper.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 mr-3 flex-shrink-0" />
                                <span>Paso a paso sin tecnicismos de chef.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 mr-3 flex-shrink-0" />
                                <span>Porciones exactas calculadas para ti.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
