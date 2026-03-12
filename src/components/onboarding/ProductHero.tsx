import Image from 'next/image'
import Link from 'next/link'
import CountdownTimer from './CountdownTimer'

interface ProductHeroProps {
    compact?: boolean
}

export default function ProductHero({ compact = false }: ProductHeroProps) {
    return (
        <section className="max-w-2xl mx-auto px-4 pt-2 pb-8">
            {!compact && <CountdownTimer />}

            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${compact ? 'mt-0' : 'mt-2'}`}>

                {/* Imagen del producto */}
                <div className="relative w-full aspect-square max-h-[340px] bg-gray-50">
                    <Image
                        src="/imagenes/foto_producto.jpg"
                        alt="Plan Semanal Personalizado"
                        fill
                        sizes="(max-width: 768px) 100vw, 672px"
                        quality={80}
                        priority={!compact}
                        className="object-cover"
                    />
                </div>

                <div className="p-5 md:p-8">
                    {/* Estrellas + descargas */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-400 text-lg tracking-tight">★★★★★</span>
                        <span className="text-sm font-semibold text-gray-700">4.9</span>
                        <span className="text-sm text-gray-400">· +12.000 descargas</span>
                    </div>

                    {/* Título */}
                    <h1 className="text-[20px] md:text-[24px] font-black text-black leading-tight tracking-[-0.5px] mb-4">
                        Plan Semanal Personalizado + Lista de Compras + 860 Recetas Saludables
                    </h1>

                    {/* Badge descuento + precio */}
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                            70% OFF
                        </span>
                        <span className="text-gray-400 line-through text-sm">$196.000 ARS</span>
                    </div>
                    <p className="text-3xl md:text-4xl font-black text-black mb-1">
                        $19.900 <span className="text-lg font-bold text-gray-500">ARS</span>
                    </p>
                    <p className="text-xs text-gray-500 mb-5">Pago único · Sin suscripción</p>

                    {/* Trust signal */}
                    <p className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                        <span className="text-green-500 text-base">✓</span>
                        Recibes todo al <strong>instante</strong> por correo electrónico
                    </p>

                    {/* Botón CTA */}
                    <Link
                        href="/checkout"
                        className="block w-full text-center bg-[#52b043] hover:bg-[#429535] text-white font-black text-lg py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] mb-4"
                        style={{ animation: 'pulse-cta 2s ease-in-out infinite' }}
                    >
                        COMPRAR AHORA
                    </Link>

                    {/* Métodos de pago */}
                    <div className="relative w-full h-8">
                        <Image
                            src="/imagenes/metodos-pago.png"
                            alt="Métodos de pago"
                            fill
                            sizes="300px"
                            quality={80}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse-cta {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(82,176,67,0.5); }
                    50% { box-shadow: 0 0 0 10px rgba(82,176,67,0); }
                }
                `
            }} />
        </section>
    )
}
