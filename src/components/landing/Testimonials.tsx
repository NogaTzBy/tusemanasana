export default function Testimonials() {
    const testimonials = [
        {
            name: "Lucía M.",
            role: "Madre y profesional",
            quote: "Compraba ebooks de recetas que nunca abría. Desde que uso Tu Semana Sana, dejo de pensar qué hacer de cenar a las 7 de la tarde.",
        },
        {
            name: "Sofía T.",
            role: "Busca mantener su peso",
            quote: "Me encanta que la lista del súper sea exacta. Ya no tiro comida a la basura los viernes, compro justo lo que necesito.",
        },
        {
            name: "Valeria R.",
            role: "Cocina para 2 personas",
            quote: "Es como tener una nutricionista amigable que me dice qué comer, pero sin castigarme. Las recetas son buenísimas.",
        }
    ];

    return (
        <section className="py-20 px-6 bg-[var(--color-primary)]/5">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-serif text-center text-[var(--color-primary-dark)] mb-12">
                    Ellas ya no se estresan por la comida
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonio, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--color-background)] relative">
                            <div className="text-[var(--color-accent)] text-4xl font-serif absolute top-4 left-6 italic opacity-50">"</div>
                            <p className="text-[var(--color-foreground)] relative z-10 pt-4 mb-6 italic">
                                {testimonio.quote}
                            </p>
                            <div>
                                <p className="font-bold text-[var(--color-primary-dark)]">{testimonio.name}</p>
                                <p className="text-sm text-[var(--color-foreground)]/60">{testimonio.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
