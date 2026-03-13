import Link from 'next/link'

export default function CtaBanner() {
    return (
        <section className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-[#52b043] rounded-2xl px-6 py-8 text-center shadow-lg">
                <p className="text-white font-black text-[22px] md:text-[26px] leading-tight mb-1">
                    ¿Lista para organizar tu semana?
                </p>
                <p className="text-white/80 text-[14px] mb-6">
                    Más de 12.000 mujeres ya lo usan · Pago único · Sin suscripción
                </p>
                <Link
                    href="/checkout"
                    className="inline-block bg-white text-[#52b043] font-black text-[17px] px-8 py-4 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                    QUIERO MI PLAN AHORA →
                </Link>
                <p className="text-white/70 text-[12px] mt-4">
                    💣 Últimos cupos con 70% OFF · Solo por hoy
                </p>
            </div>
        </section>
    )
}
