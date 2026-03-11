import Image from 'next/image';

export function Testimonials() {
    const testimonials = [
        {
            name: "Carla M.",
            role: "mamá de 2",
            text: "“Antes perdía 20 minutos todos los días pensando qué cocinar. Ahora abro la app y ya está todo. Es un alivio mental enorme.”",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
        },
        {
            name: "Luciana R.",
            role: "mamá de 3",
            text: "“Lo mejor es que las recetas son fáciles y con ingredientes que tengo en casa. Mis hijos comen más variado y yo no me estreso.”",
            img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
        },
        {
            name: "Sofía G.",
            role: "mamá de 1",
            text: "“Pensé que era otra app más, pero esta realmente se adapta a mis gustos. Ya no improviso, como mejor y hasta bajé de peso.”",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
        }
    ];

    return (
        <section className="bg-[#f6f6f6] px-[10px] md:px-[15px] pt-[30px] pb-[40px] md:pb-[60px] font-sans max-w-[1200px] mx-auto">
            <div className="text-center mb-[40px] mt-0 flex flex-col items-center">
                <h2 className="text-[26px] md:text-[34px] font-black text-black my-[10px] tracking-[-1.2px] leading-[1.1]">
                    Lo que dicen quienes <span className="text-[#52b043]">ya lo usan</span>
                </h2>
                <p className="text-[14px] md:text-[16px] text-[#555] max-w-[650px] mx-auto mb-[25px] leading-[1.5] font-medium">
                    Familias reales que recuperaron su tiempo y mejoraron su alimentación.
                </p>

                <div className="inline-flex items-center gap-[10px] bg-white px-[20px] py-[8px] rounded-[50px] border border-[#e0e0e0] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                    <span className="text-[#efb233] text-[18px] tracking-[1px]">★★★★★</span>
                    <span className="font-bold text-[14px] text-[#1a1a1a]">+10.000 Familias ▾</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[25px]">
                {testimonials.map((t, idx) => (
                    <div key={idx} className="bg-white border border-[#eeeeee] rounded-[16px] p-[20px] shadow-[0_6px_15px_rgba(0,0,0,0.04)] flex flex-col transition-transform duration-300">
                        <div className="flex flex-col gap-[5px] mb-[12px]">
                            <p className="font-extrabold text-[14px] text-[#111] m-0 leading-[1.2]">{t.name}</p>
                            <div className="text-[#efb233] text-[12px] tracking-[1px]">★★★★★</div>
                        </div>
                        <p className="text-[12px] leading-[1.5] text-[#444] m-0 mb-[15px] min-h-[110px] md:min-h-[90px] italic">
                            {t.text}
                        </p>
                        <div className="relative w-full mb-[15px] mt-auto aspect-square flex-shrink-0">
                            <Image src={t.img} fill sizes="(max-width: 768px) 50vw, 25vw" className="rounded-[12px] object-cover bg-[#f9f9f9] border border-[#eee]" alt={t.name} />
                        </div>
                        <div className="text-[11px] text-[#27ae60] font-bold flex items-center justify-center gap-[6px] pt-[12px] border-t border-[#f5f5f5]">
                            ✓ Verificada
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
