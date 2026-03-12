import Image from 'next/image'
import Link from 'next/link'
import CountdownTimer from './CountdownTimer'
import { TrustBadgeML } from '@/components/landing/TrustBadgeML'

interface ProductHeroProps {
    /** showcase = solo imagen + título (arriba de la página)
     *  purchase  = sección completa con precio y CTA (abajo de la página) */
    mode?: 'showcase' | 'purchase'
}

export default function ProductHero({ mode = 'showcase' }: ProductHeroProps) {
    const isPurchase = mode === 'purchase'

    return (
        <section className="max-w-2xl mx-auto px-4 pt-2 pb-8">
            {isPurchase && <CountdownTimer />}

            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${isPurchase ? 'mt-2' : ''}`}>

                {/* Imagen del producto */}
                <div className="relative w-full aspect-square bg-gray-50">
                    <Image
                        src="/imagenes/foto_producto.jpg"
                        alt="Plan Semanal Personalizado"
                        fill
                        sizes="(max-width: 768px) 100vw, 672px"
                        quality={80}
                        priority={!isPurchase}
                        className="object-cover"
                    />
                </div>

                <div className="p-5 md:p-8">
                    {/* Estrellas + descargas — siempre visibles */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-400 text-lg tracking-tight">★★★★★</span>
                        <span className="text-sm font-semibold text-gray-700">4.9</span>
                        <span className="text-sm text-gray-400">· +12.000 descargas</span>
                    </div>

                    {/* Título — siempre visible */}
                    <h1 className="text-[20px] md:text-[24px] font-black text-black leading-tight tracking-[-0.5px]">
                        Plan Semanal Personalizado + Lista de Compras + 860 Recetas Saludables
                    </h1>

                    {/* Solo en modo purchase: precio, CTA, pago */}
                    {isPurchase && (
                        <>
                            {/* Badge descuento + precio */}
                            <div className="flex items-center gap-3 mt-4 mb-2">
                                <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                                    70% OFF
                                </span>
                                <span className="text-gray-400 line-through text-sm">$69.990 ARS</span>
                            </div>
                            <p className="text-3xl md:text-4xl font-black text-black mb-1">
                                $19.900 <span className="text-lg font-bold text-gray-500">ARS</span>
                            </p>
                            <p className="text-xs text-gray-500 mb-4">Pago único · Sin suscripción</p>

                            {/* Trust signals */}
                            <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <span className="text-green-500">✅</span>
                                <em>Recibes tu <strong>plan semanal</strong> al instante</em>
                            </p>
                            <p className="text-sm font-bold text-orange-600 mb-5 flex items-center gap-2">
                                <span>💣</span> Últimos <strong>3</strong> Cupos en Oferta!
                            </p>

                            {/* Botón CTA */}
                            <Link
                                href="/checkout"
                                className="cta-pulse block w-full text-center bg-[#52b043] hover:bg-[#429535] text-white font-black text-lg py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] mb-4"
                            >
                                COMPRAR AHORA
                            </Link>

                            {/* Mercado Líder Platinum */}
                            <TrustBadgeML />

                            {/* Métodos de pago — ancho completo */}
                            <div className="w-full mt-2">
                                <Image
                                    src="/imagenes/metodos-pago.png"
                                    alt="Métodos de pago"
                                    width={600}
                                    height={60}
                                    sizes="100vw"
                                    quality={80}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse-cta {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(82,176,67,0.5); }
                    50% { box-shadow: 0 0 0 12px rgba(82,176,67,0); }
                }
                .cta-pulse { animation: pulse-cta 2s ease-in-out infinite; }
                `
            }} />
        </section>
    )
}
