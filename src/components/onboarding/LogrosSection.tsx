import Image from 'next/image'

const ITEMS = [
    { bold: 'Saber qué cocinar', rest: ' cada día sin pensar ni estresarte.' },
    { bold: 'Recuperar tiempo', rest: ' que hoy perdés buscando recetas o improvisando.' },
    { bold: 'Comer más sano', rest: ' sin dietas extremas ni restricciones.' },
    { bold: 'Tener tu lista de compras', rest: ' exacta, sin olvidarte nada.' },
    { bold: 'Darle variedad a tu familia', rest: ' con comidas ricas y fáciles.' },
    { bold: 'Liberar tu mente', rest: ' del "¿qué hacemos de comer?" de una vez.' },
]

function GreenCheck() {
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="shrink-0 mt-0.5">
            <circle cx="13" cy="13" r="12" fill="#52b043" />
            <path d="M8 13.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function LogrosSection() {
    return (
        <section className="max-w-2xl mx-auto px-5 py-10">
            <h2 className="text-[26px] md:text-[32px] font-black text-black mb-8 tracking-[-0.8px] leading-[1.15]">
                ¿Qué vas a{' '}
                <span className="bg-[#52b043] text-white px-3 py-0.5 rounded-lg inline-block">
                    lograr?
                </span>
            </h2>

            <div className="flex gap-4 mb-8">
                <ul className="space-y-5 flex-1">
                    {ITEMS.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <GreenCheck />
                            <p className="text-[15px] md:text-[17px] text-gray-800 leading-snug">
                                <strong>{item.bold}</strong>{item.rest}
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="relative w-[130px] md:w-[160px] h-[220px] md:h-[260px] rounded-2xl overflow-hidden shrink-0 shadow-md self-start">
                    <Image
                        src="/imagenes/foto2.jpeg"
                        alt="Comida saludable"
                        fill
                        sizes="160px"
                        quality={75}
                        className="object-cover"
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <div className="relative w-[130px] md:w-[160px] h-[220px] md:h-[260px] rounded-2xl overflow-hidden shrink-0 shadow-md self-start">
                    <Image
                        src="/imagenes/foto4.jpeg"
                        alt="Receta saludable"
                        fill
                        sizes="160px"
                        quality={75}
                        className="object-cover"
                    />
                </div>

                <ul className="space-y-5 flex-1">
                    {ITEMS.slice(3).map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <GreenCheck />
                            <p className="text-[15px] md:text-[17px] text-gray-800 leading-snug">
                                <strong>{item.bold}</strong>{item.rest}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
