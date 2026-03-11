import { CheckCircle2 } from "lucide-react";

export function TransformacionSection() {
    const beneficios = [
        "📱 Abrir la app y tener desayuno, almuerzo y cena resueltos — en 1 minuto",
        "🛒 Ir al super con una lista exacta, sin olvidarte nada",
        "🥗 Comer sano sin tener que pensar ni buscar recetas",
        "⏰ Recuperar tiempo que hoy perdés decidiendo qué cocinar",
        "👨‍👩‍👧 Darle a tu familia comidas ricas y variadas sin estrés",
        "🧠 Liberar tu mente del '¿qué hacemos de comer?'"
    ];

    return (
        <section className="w-full bg-[#f9fafb] py-12 px-4 border-y border-gray-100">
            <div className="max-w-2xl mx-auto text-center font-sans">
                <h2 className="text-[26px] md:text-[32px] font-serif font-bold text-[#111827] mb-8 leading-tight">
                    Imaginá despertar y ya saber qué vas a cocinar toda la semana...
                </h2>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 text-left mb-8">
                    <ul className="space-y-4">
                        {beneficios.map((beneficio, idx) => (
                            <li key={idx} className="flex items-start text-[16px] text-[#4b5563] leading-snug">
                                <span className="mr-3 shrink-0"><CheckCircle2 className="w-5 h-5 text-[#52b043]" /></span>
                                <span>{beneficio}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="inline-block bg-[#eff8b9] text-[#4a5d23] font-medium px-4 py-2 rounded-full text-sm">
                    Esto no es magia. Es una IA que entiende tus gustos y planifica por vos.
                </div>
            </div>
        </section>
    );
}
