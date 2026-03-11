const ITEMS = [
    { bold: 'Todos los días a las 12', rest: ' te preguntás "¿qué cocino hoy?" y no sabés qué hacer.' },
    { bold: 'Terminás improvisando', rest: ' o pidiendo delivery porque no tenés nada planificado.' },
    { bold: 'Querés comer sano', rest: ' pero no tenés tiempo ni energía para buscar recetas.' },
    { bold: 'Te aburrís de cocinar', rest: ' siempre lo mismo y querés variedad sin complicarte.' },
    { bold: 'Vas al súper sin lista', rest: ' y siempre te olvidás algo o comprás de más.' },
    { bold: 'Sentís culpa', rest: ' por no darle comida más saludable a tu familia.' },
]

function RedBadge() {
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="shrink-0 mt-0.5">
            <rect x="1" y="1" width="24" height="24" rx="7" fill="#e05252" />
            <path d="M8 13.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function ParaVosSection() {
    return (
        <section className="max-w-2xl mx-auto px-5 py-10">
            <h2 className="text-[26px] md:text-[32px] font-black text-black mb-8 tracking-[-0.8px] leading-[1.15]">
                Esta app es para vos si...
            </h2>

            <ul className="space-y-5">
                {ITEMS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <RedBadge />
                        <p className="text-[15px] md:text-[17px] text-gray-800 leading-snug">
                            <strong>{item.bold}</strong>{item.rest}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
