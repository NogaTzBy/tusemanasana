import { Target, TrendingDown, Clock, Heart } from "lucide-react";

export function QueVasALograrSection() {
    const logros = [
        {
            icon: <Clock className="w-8 h-8 text-[#efb233]" />,
            title: "Recuperar tu tiempo",
            desc: "Dejá de perder horas pensando qué cocinar y dando vueltas en el súper."
        },
        {
            icon: <TrendingDown className="w-8 h-8 text-[#52b043]" />,
            title: "Bajar tu ansiedad",
            desc: "La tranquilidad mental de saber que tus comidas ya están resueltas."
        },
        {
            icon: <Heart className="w-8 h-8 text-red-400" />,
            title: "Mejorar tu relación con la comida",
            desc: "Comer rico, probar variantes nuevas y nutrirte sin culpas."
        },
        {
            icon: <Target className="w-8 h-8 text-blue-400" />,
            title: "Ahorrar dinero",
            desc: "Adiós a comprar de más, improvisar en el súper o pedir delivery por no saber qué hacer."
        }
    ];

    return (
        <section className="bg-white py-14 px-4 font-sans">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-[28px] md:text-[36px] font-black text-black mb-[40px] tracking-tight">
                    ¿Qué vas a lograr con <span className="text-[#00a650]">Tu Semana Sana</span>?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                    {logros.map((logro, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                            <div className="shrink-0 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                                {logro.icon}
                            </div>
                            <div>
                                <h3 className="text-[18px] font-bold text-gray-900 mb-1 leading-tight">
                                    {logro.title}
                                </h3>
                                <p className="text-[15px] text-gray-600 leading-snug">
                                    {logro.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
