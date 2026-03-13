import Image from 'next/image'

const PARAGRAPHS = [
    "Durante años viví con la misma culpa de siempre. Llegaba a casa agotada, abría la heladera y me quedaba parada ahí, mirando adentro, sin la menor idea de qué cocinar. Terminaba pidiendo delivery, calentando lo que había sobrado, o armando algo rápido que sabía que no era lo que mi familia necesitaba.",
    "No era que no quisiera comer bien. Es que después de trabajar, llevar a los chicos, pagar cuentas y resolver todo lo demás... ya no me quedaba energía para pensar en eso también.",
    "Intenté de todo. Compré ebooks de recetas saludables que nunca abrí. Fui al nutricionista y el plan era tan estricto que lo abandoné a la semana. Probé contar calorías y me generó más ansiedad que otra cosa. Empecé la keto un lunes y el jueves ya había fallado.",
    "Cada vez que abandonaba, me decía lo mismo: \"el problema soy yo. No tengo fuerza de voluntad.\"",
    "Hasta que un día me di cuenta de algo que cambió todo.",
    "El problema nunca fui yo. El problema era que todos los días tenía que empezar de cero. Buscar qué cocinar, ver si tenía los ingredientes, calcular las porciones, armar la lista del súper... todo eso requiere energía mental. Y yo al final del día ya no tenía más.",
    "Entonces empecé a hacer algo simple: los domingos me sentaba veinte minutos y planificaba toda la semana. La diferencia fue inmediata. Dejé de improvisar. Dejé de pedir delivery. Empecé a bajar de peso sin hacer ninguna dieta — solo comiendo con orden. Y mis hijos empezaron a comer mejor sin que yo tuviera que pelearles.",
    "Pero hacer ese plan a mano siempre terminaba cocinando lo mismo porque no se me ocurrían ideas nuevas. Fue entonces cuando se me ocurrió la idea de Tu Semana Sana.",
    "Quería una herramienta que armara ese plan por mí — personalizado según lo que me gusta, el tiempo que tengo y para cuántas personas cocino. Con recetas ricas, fáciles, con ingredientes normales del súper del barrio. Y que me generara la lista de compras sola.",
    "Me puse a trabajar. Recopilé recetas de todos lados, las probé en mi cocina, y me senté con una nutricionista amiga mía para revisar que cada plato tuviera sentido de verdad. El resultado fueron más de 860 recetas validadas. Y un sistema que en menos de un minuto te arma toda la semana.",
    "Lo usé durante meses. Bajé 6 kilos. Mis análisis mejoraron. Y lo más importante — dejé de sentir culpa cada vez que me sentaba a comer.",
    "Lo creé para mí. Funcionó. Y no pude no compartirlo con todas las mujeres que están viviendo lo mismo que yo vivía.",
    "Si llegaste hasta acá, probablemente te sentiste reflejada en algo de lo que te conté. Y quiero que sepas que el problema no sos vos. Solo necesitabas el sistema correcto.",
]

export default function FounderStory() {
    return (
        <section className="max-w-2xl mx-auto px-4 py-10">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

                {/* Foto grande */}
                <Image
                    src="/imagenes/maria.jpg"
                    alt="María Lorena"
                    width={928}
                    height={1152}
                    sizes="(max-width: 768px) 100vw, 672px"
                    quality={80}
                    className="w-full h-auto"
                />

                <div className="p-6 md:p-8">
                    {/* Nombre y descripción */}
                    <p className="text-[20px] font-black text-black leading-tight">María Lorena</p>
                    <p className="text-sm text-gray-500 mt-1 mb-6">44 años · mamá de 2 · creadora de Tu Semana Sana</p>

                    {/* Título */}
                    <h2 className="text-[20px] md:text-[24px] font-black text-black leading-tight mb-6 tracking-[-0.5px] border-t border-gray-100 pt-6">
                        Por qué creé esto —{' '}
                        <span className="text-[#52b043]">y cómo me cambió la vida</span>
                    </h2>

                    {/* Texto */}
                    <div className="space-y-4">
                        {PARAGRAPHS.map((p, i) => (
                            <p key={i} className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed">
                                {p}
                            </p>
                        ))}
                    </div>

                    {/* Firma */}
                    <p className="mt-8 text-[15px] font-semibold text-gray-800 italic border-t border-gray-100 pt-6">
                        — María Lorena
                    </p>
                </div>
            </div>
        </section>
    )
}
