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
        <section className="mt-16 w-full max-w-4xl mx-auto px-4 pb-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-[var(--color-primary-dark)] dark:text-gray-100">
                    Ya son más de 12.000 mujeres comiendo rico y sano
                </h2>
                <p className="text-[var(--color-foreground)]/60 mt-2">
                    Mira lo que dicen las que ya dieron el paso.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, idx) => (
                    <div key={idx} className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                                <Image src={t.image} alt={t.name} width={48} height={48} className="object-cover" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-[var(--color-primary-dark)] dark:text-gray-200">
                                    {t.name}
                                </p>
                                <div className="flex text-yellow-400 text-xs">
                                    {'★★★★★'}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic flex-1">
                            &ldquo;{t.text}&rdquo;
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
