import { Check, X } from "lucide-react";

export function ParaQuienEsSection() {
    return (
        <section className="bg-white py-12 px-4 font-sans border-y border-gray-100">
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Columna NO ES para ti */}
                <div className="flex-1 bg-red-50/50 rounded-2xl p-6 border border-red-100">
                    <h3 className="text-[20px] font-bold text-red-600 mb-6 text-center">
                        Esto NO es para ti si...
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Buscás dietas extremas o mágicas.",
                            "Querés contar calorías todo el día.",
                            "Tenés horas de sobra para cocinar.",
                            "Te gusta improvisar tus comidas a último momento."
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start text-[15px] text-gray-700 leading-snug">
                                <span className="mr-3 shrink-0 mt-0.5"><X className="w-5 h-5 text-red-500" /></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Columna SÍ ES para ti */}
                <div className="flex-1 bg-green-50/50 rounded-2xl p-6 border border-green-100 shadow-[0_4px_20px_rgba(0,166,80,0.05)] relative">
                    <div className="absolute -top-3 inset-x-0 mx-auto w-max px-3 py-1 bg-[#00a650] text-white text-[11px] font-bold uppercase tracking-wide rounded-full">
                        Tu mejor opción
                    </div>
                    <h3 className="text-[20px] font-bold text-[#00a650] mb-6 text-center mt-2">
                        Esta guía SÍ es para ti si...
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Querés comer sano sin que sea aburrido.",
                            "Necesitás organizar tus compras para ahorrar.",
                            "Buscás recetas rápidas para el día a día.",
                            "Querés que tu familia coma mejor sin doble trabajo."
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start text-[15px] text-gray-700 leading-snug font-medium">
                                <span className="mr-3 shrink-0 mt-0.5"><Check className="w-5 h-5 text-[#00a650]" /></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
