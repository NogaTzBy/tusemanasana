import Image from 'next/image';

export function Testimonials() {
    const testimonials = [
        {
            name: "Carolina D.",
            text: "“Gracias a este libro digital bajé 12 kilos sin dietas extremas. Dejé el azúcar y el gluten sin sufrir, aprendí a comer mejor y hoy me siento cómoda con mi cuerpo otra vez. Fue un verdadero antes y después.”",
            img: "https://cdn.shopify.com/s/files/1/0676/6975/3942/files/35_dceb3612-57e1-4f9e-b166-e9f58f3613f6.jpg?v=1771612774"
        },
        {
            name: "María L.",
            text: "“Pensé que iba a ser otro recetario más, pero me sorprendió. Todo está explicado de forma clara y realmente funciona. Dejé de inflamarme y volví a disfrutar comidas que antes evitaba.”",
            img: "https://cdn.shopify.com/s/files/1/0676/6975/3942/files/30_128c86fd-4e1a-474b-ab0e-88ea86dd9ff2.jpg?v=1771612775"
        },
        {
            name: "Silvia R.",
            text: "“Siempre creí que comer saludable era complicado y aburrido. Con este libro cocino rico, sin estrés y con resultados reales. Mi digestión mejoró muchísimo.”",
            img: "https://cdn.shopify.com/s/files/1/0676/6975/3942/files/32_ab847d21-1467-4967-9be5-649cfb77612b.jpg?v=1771612775"
        },
        {
            name: "Laura M.",
            text: "“No soy experta en la cocina y aun así me sale todo bien. Las recetas son fáciles de seguir, los ingredientes son simples y el sabor es increíble.”",
            img: "https://cdn.shopify.com/s/files/1/0676/6975/3942/files/33_0ab0a13f-a8c8-429d-9bad-f9005e0135eb.jpg?v=1771612775"
        },
        {
            name: "Patricia G.",
            text: "“Lo que más me gustó es que no es una dieta. Puedo comer pan, budines y pizzas sin culpa y sin sentirme pesada después.”",
            img: "https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Banana_bread__check_the_link_in_bio_868d69dd-6a4f-42af-b91b-9efac980455d.jpg?v=1771612791"
        },
        {
            name: "Claudia F.",
            text: "“Había probado muchas cosas antes y siempre abandonaba. Este libro me ayudó a sostener el cambio porque no paso hambre y disfruto lo que como.”",
            img: "https://cdn.shopify.com/s/files/1/0676/6975/3942/files/31_2280eb47-1d50-4f31-9876-89eda3af717c.jpg?v=1771612775"
        },
        {
            name: "Ana V.",
            text: "“Pensé que ya no podía mejorar mucho mi alimentación, pero estaba equivocada. Me siento más liviana, con más energía y sin malestar después de comer.”",
            img: "https://cdn.shopify.com/s/files/1/0676/6975/3942/files/caesar_salad_37dc2ea0-1c72-4bb8-9ccd-f603645ea511.jpg?v=1771612790"
        },
        {
            name: "Verónica S.",
            text: "“Es ideal si tienes poco tiempo. Cocino una vez y resuelvo varias comidas. Es práctico, realista y fácil de aplicar.”",
            img: "https://cdn.shopify.com/s/files/1/0676/6975/3942/files/34_34411454-e993-4096-a0a3-fb0a55e42260.jpg?v=1771612775"
        }
    ];

    return (
        <section className="bg-[#f6f6f6] px-[10px] md:px-[15px] pt-[5px] pb-[40px] md:pb-[60px] font-sans max-w-[1200px] mx-auto">
            <div className="text-center mb-[40px] mt-0 flex flex-col items-center">
                <h2 className="text-[26px] md:text-[34px] font-black text-black my-[10px] tracking-[-1.2px] leading-[1.1]">
                    Lo que dicen quienes ya lo <span className="text-[#52b043]">probaron</span>
                </h2>
                <p className="text-[14px] md:text-[16px] text-[#555] max-w-[650px] mx-auto mb-[25px] leading-[1.5] font-medium">
                    Miles de mujeres ya están comiendo mejor y sintiéndose más livianas con estas recetas.
                </p>

                <div className="inline-flex items-center gap-[10px] bg-white px-[20px] py-[8px] rounded-[50px] border border-[#e0e0e0] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                    <span className="text-[#efb233] text-[18px] tracking-[1px]">★★★★★</span>
                    <span className="font-bold text-[14px] text-[#1a1a1a]">84 Reseñas ▾</span>
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
