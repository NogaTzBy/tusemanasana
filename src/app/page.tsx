import Questionnaire from "@/components/onboarding/Questionnaire";

export default function Home() {
  return (
    <main className="bg-[var(--color-background)]">
      <header className="px-6 py-4 flex justify-center items-center border-b border-black/5 max-w-6xl mx-auto w-full">
        <div className="font-sans font-bold tracking-tighter text-xl text-[var(--color-primary-dark)]">
          Tu Semana Sana
        </div>
      </header>

      <div className="pt-6">
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

    </main>
  );
}
