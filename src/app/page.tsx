import Questionnaire from "@/components/onboarding/Questionnaire";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <header className="px-6 py-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="font-serif text-2xl text-[var(--color-primary-dark)] font-medium">
          Tu Semana Sana
        </div>
        <nav className="flex gap-4">
          <a href="/login" className="text-[var(--color-foreground)]/80 hover:text-[var(--color-primary)] font-medium transition-colors">
            Iniciar Sesión
          </a>
        </nav>
      </header>

      <div className="py-2 md:py-8">
        <div className="text-center max-w-2xl mx-auto px-6 mb-2 md:mb-4">
          <h1 className="text-2xl md:text-4xl font-serif text-[var(--color-primary-dark)] mb-2 md:mb-4 leading-tight">
            Armemos tu plan semanal perfecto
          </h1>
          <p className="text-sm md:text-base text-[var(--color-foreground)]/80">
            Responde 6 preguntas rápidas para que nuestra IA diseñe un menú delicioso y 100% adaptado a ti.
          </p>
        </div>
        <Questionnaire />
      </div>

      {/* Footer simple */}
      <footer className="py-6 bg-white text-center text-[var(--color-foreground)]/60 text-sm border-t border-[var(--color-background)] mt-auto">
        <p>&copy; {new Date().getFullYear()} Tu Semana Sana. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
