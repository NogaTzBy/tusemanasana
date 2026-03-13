import Link from 'next/link'
import Image from 'next/image'

interface CtaBannerProps {
    withExtras?: boolean
}

export default function CtaBanner({ withExtras = false }: CtaBannerProps) {
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

                {withExtras && (
                    <div className="mt-6 space-y-3">
                        {/* Métodos de pago */}
                        <Image
                            src="/imagenes/metodos-pago.png"
                            alt="Métodos de pago"
                            width={600}
                            height={60}
                            sizes="100vw"
                            quality={80}
                            className="w-full h-auto object-contain"
                        />

                        {/* Garantía */}
                        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0713/3744/3581/files/download_18_ba1d13ed-36eb-45ea-97cc-211019bfa911.png?v=1757267383"
                                alt="Garantía 30 días"
                                width={52}
                                height={52}
                                className="shrink-0"
                            />
                            <div className="text-left">
                                <p className="text-[#52b043] font-black text-[15px] leading-tight">Garantía de Satisfacción</p>
                                <p className="text-gray-700 text-[13px]"><strong>30 días</strong> para probar sin riesgo alguno</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
