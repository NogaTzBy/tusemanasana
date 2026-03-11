import Image from 'next/image'

const TESTIMONIALS = [
    {
        name: 'Laura, 42 años',
        text: 'Llegar a las 7 de la tarde y no tener que usar la cabeza para ver qué comen los chicos... no tiene precio. Y me encantó que sea pago único, odio las suscripciones.',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        name: 'Valeria, 45 años',
        text: 'Siempre arranco las dietas y las dejo. Esto no es una dieta, es que alguien te resuelva la vida. Bajé 3 kilos en el primer mes sin darme cuenta.',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
        name: 'Silvia, 50 años',
        text: 'Pensé que por mi edad ya no iba a bajar la panza. Al tener la lista del súper armada, dejé de pedir delivery a la noche. Increíble.',
        image: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    {
        name: 'Mariana, 38 años',
        text: 'Lo mejor es que la comida es normal. Nada de ingredientes raros o carísimos. Mi marido y mis hijos comen lo mismo que yo y ni se quejan.',
        image: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    {
        name: 'Florencia, 47 años',
        text: 'Dudé en pagar, pero la verdad que recuperar 40 minutos por día que antes perdía pensando qué cocinar... lo vale cada peso.',
        image: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    {
        name: 'Romina, 41 años',
        text: 'Compré mil PDFs de nutricionistas que nunca abrí. Esto es distinto porque me da la lista del súper exacta. Voy y compro solo eso.',
        image: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
        name: 'Andrea, 36 años',
        text: 'Soy malísima cocinando. Pero con las instrucciones paso a paso hasta me animo a probar cosas nuevas. Muy fácil todo.',
        image: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    {
        name: 'Carolina, 44 años',
        text: 'Odio contar calorías. Odio la balanza. Acá solo cocino lo que me dice el celu y listo. Me siento mucho más desinflamada.',
        image: 'https://randomuser.me/api/portraits/women/55.jpg',
    },
    {
        name: 'Natalia, 39 años',
        text: 'Tengo poco tiempo y siempre terminaba comiendo galletitas a la noche. Ahora llego y ya sé qué hacer en 15 minutos.',
        image: 'https://randomuser.me/api/portraits/women/29.jpg',
    },
    {
        name: 'Gisela, 48 años',
        text: 'Me daba miedo no usarlo. Pero como lo pagas una sola vez te sacas esa mochila. Lo uso todas las semanas para organizar las compras.',
        image: 'https://randomuser.me/api/portraits/women/39.jpg',
    },
    {
        name: 'Patricia, 51 años',
        text: 'Mi médico me felicitó el mes pasado porque me bajó el colesterol. Todo gracias a organizar las comidas. ¡De verdad te cambia!',
        image: 'https://randomuser.me/api/portraits/women/61.jpg',
    },
    {
        name: 'Paula, 40 años',
        text: 'Si no me gustaba el pescado que me ponía, tocaba la flechita y me daba pollo. Literalmente hago lo que quiero pero sano.',
        image: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
]

export default function TestimonialWall() {
    return (
        <section className="mt-6 md:mt-12 w-full max-w-full overflow-hidden pb-16">
            <div className="text-center mb-8 md:mb-10 px-4">
                <h2 className="text-[26px] md:text-[34px] font-black text-black my-[10px] tracking-[-1.2px] leading-[1.1]">
                    Lo que dicen quienes <span className="text-[#52b043]">ya lo usan</span>
                </h2>
                <p className="text-[var(--color-foreground)]/60 mt-2 text-sm md:text-base max-w-[650px] mx-auto font-medium">
                    Mira lo que dicen las que ya dieron el paso.
                </p>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-250px * 12 - 1.5rem * 12)); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                    width: max-content;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
                `
            }} />

            <div className="relative flex overflow-hidden">
                <div className="animate-scroll flex gap-6 px-3">
                    {/* Render twice for seamless loop */}
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                        <div key={idx} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col w-[250px] md:w-[300px] shrink-0">
                            <div className="flex items-center gap-3 mb-3 shrink-0">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0">
                                    <Image src={t.image} alt={t.name} width={48} height={48} className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-xs md:text-sm text-[var(--color-primary-dark)]">
                                        {t.name}
                                    </p>
                                    <div className="flex text-yellow-400 text-[10px] md:text-xs">
                                        {'★★★★★'}
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs md:text-sm text-[var(--color-foreground)]/80 italic flex-1">
                                &ldquo;{t.text}&rdquo;
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
