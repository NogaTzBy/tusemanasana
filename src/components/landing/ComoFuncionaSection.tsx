import { Clock } from "lucide-react";

export function ComoFuncionaSection() {
    const pasos = [
        {
            titulo: "Respondés un cuestionario rápido",
            desc: "Tus gustos, restricciones, tiempo disponible",
            emoji: "📝"
        },
        {
            titulo: "La IA genera tu plan semanal",
            desc: "Desayuno, almuerzo y cena personalizados",
            emoji: "✨"
        },
        {
            titulo: "Recibís tu lista de compras",
            desc: "Todo lo que necesitás, nada que sobre",
            emoji: "🛒"
        },
        {
            titulo: "Cocinás sin pensar",
            desc: "Seguís las recetas paso a paso",
            emoji: "🍳"
        }
    ];

    return (
        <section className="w-full bg-white py-12 px-4 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] relative z-10">
            <div className="max-w-xl mx-auto font-sans">
                <h2 className="text-center text-[28px] md:text-[34px] font-black text-[#111827] mb-10 tracking-tight">
                    Cómo funciona
                </h2>

                <div className="relative border-l-2 border-[#e5e7eb] ml-4 md:ml-8 space-y-8 pb-4">
                    {pasos.map((paso, idx) => (
                        <div key={idx} className="relative pl-8">
                            {/* Círculo del paso */}
                            <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#52b043] flex items-center justify-center text-white font-bold shadow-md border-4 border-white">
                                {idx + 1}
                            </div>
                            <h3 className="text-[18px] font-bold text-[#1f2937] mb-1 flex items-center gap-2">
                                {paso.titulo} <span>{paso.emoji}</span>
                            </h3>
                            <p className="text-[15px] text-[#6b7280]">
                                {paso.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-gray-50 rounded-xl px-5 py-3 border border-gray-100 flex items-center justify-center gap-3 w-max mx-auto shadow-sm">
                    <Clock className="w-5 h-5 text-[#52b043]" />
                    <span className="font-semibold text-[#374151]">Tiempo total: <span className="text-[#52b043]">1 minuto</span></span>
                </div>
            </div>
        </section>
    );
}
