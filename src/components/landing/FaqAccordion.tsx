"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion() {
    const faqs = [
        {
            q: "¿Cómo funciona la personalización?",
            a: "La IA te hace preguntas sobre tus gustos, restricciones alimentarias, tiempo de cocina y preferencias de tu familia. Con eso genera planes **100% adaptados a vos**."
        },
        {
            q: "¿Puedo cambiar recetas si alguna no me gusta?",
            a: "Sí. Podés regenerar cualquier comida con un click y la app te sugiere alternativas."
        },
        {
            q: "¿Funciona si tengo restricciones alimentarias?",
            a: "Sí. Podés indicar si sos vegetariana, vegana, sin gluten, sin lactosa, keto, etc."
        },
        {
            q: "¿Es difícil de usar?",
            a: "No. Es tan simple como responder unas preguntas y recibir tu plan. Todo en menos de 1 minuto."
        },
        {
            q: "¿Incluye lista de compras?",
            a: "Sí. La app genera automáticamente la lista con todo lo que necesitás para la semana."
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
