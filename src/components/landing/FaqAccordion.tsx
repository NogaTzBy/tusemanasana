"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion() {
    const faqs = [
        {
            q: "¿Qué recibo al comprar este libro?",
            a: "Recibes un ebook digital en formato PDF que llega directamente a tu correo una vez confirmado el pago. Incluye **más de 1000 recetas saludables**, sin azúcar ni harinas refinadas, pensadas para mejorar tu alimentación de forma simple y sostenida. Además, accedes a **10 regalos digitales** con recetarios temáticos, guías prácticas y contenido extra para acompañarte en el cambio."
        },
        {
            q: "¿Es realmente fácil seguir las recetas?",
            a: "Sí. El contenido está diseñado para que cualquier persona pueda aplicarlo, incluso sin experiencia previa en la cocina. Las recetas están explicadas paso a paso, con ingredientes accesibles y preparaciones claras, para que puedas cocinar sin complicarte y obtener buenos resultados desde el inicio."
        },
        {
            q: "¿Cuánto tiempo tengo para descargar el libro?",
            a: "El ebook se envía de forma automática a tu correo apenas se confirma el pago. Puedes descargarlo y guardarlo en tu celular, tablet o computadora, **sin límite de tiempo**."
        },
        {
            q: "¿Qué pasa si no entiendo alguna parte del contenido?",
            a: "Puedes escribirnos por mail o mensaje y te ayudamos. Queremos que aproveches el libro al máximo y que puedas aplicar las recetas y recomendaciones con confianza."
        },
        {
            q: "¿Necesito experiencia previa para usar este libro?",
            a: "No. Está pensado tanto para personas que recién empiezan como para quienes ya cocinan y quieren comer más saludable. Todo está explicado de manera simple, práctica y fácil de adaptar a tu rutina."
        },
        {
            q: "¿Por qué debería comprar este libro en lugar de buscar recetas gratis en internet?",
            a: "Porque este libro te ahorra tiempo, errores y frustraciones. En lugar de buscar recetas sueltas o poco claras, tienes todo en un solo lugar: **organizado, probado y con recetas que funcionan**. No solo aprendes qué cocinar, sino también cómo sostener una alimentación saludable en el día a día, con ideas reales y fáciles de aplicar."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="max-w-[800px] mx-auto px-[15px] pt-[20px] pb-[40px] font-sans">
            <h2 className="text-center text-[28px] md:text-[36px] font-medium text-black mb-[30px] leading-tight">
                Preguntas frecuentes
            </h2>

            <div className="flex flex-col gap-0 border-t border-gray-200">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div key={index} className="border-b border-gray-200">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between py-[20px] text-left focus:outline-none"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-[#52b043] shrink-0 font-bold mb-0.5">✓</span>
                                    <h3 className="text-[16px] md:text-[18px] font-bold text-black m-0 pr-[20px]">
                                        {faq.q}
                                    </h3>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-[20px]' : 'max-h-0 opacity-0'}`}
                            >
                                <p
                                    className="text-[15px] text-[#444] leading-[1.6] pl-[28px] m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: faq.a.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section >
    );
}
