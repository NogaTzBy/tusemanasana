"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";



type Question = {
    id: string;
    title: string;
    type: "single" | "multiple";
    options: { label: string; value: string }[];
};

const questions: Question[] = [
    {
        id: "objetivo",
        title: "¿Cuál es tu meta principal hoy?",
        type: "single",
        options: [
            { label: "Bajar de peso sin dietas", value: "bajar_peso" },
            { label: "Comer sano y tener energía", value: "comer_sano" },
            { label: "Cocinar rápido para mi familia", value: "cocinar_rapido" },
            { label: "Mantener mi peso", value: "mantener" },
        ],
    },
    {
        id: "tiempo",
        title: "Sinceramente, ¿cuánto tiempo tienes para cocinar por día?",
        type: "single",
        options: [
            { label: "Menos de 20 min (Vivo apurada)", value: "menos_20" },
            { label: "20–40 min (Puedo dedicar un rato)", value: "20_40" },
            { label: "Más de 40 min (Me gusta cocinar)", value: "mas_40" },
        ],
    },
    {
        id: "alimentacion",
        title: "¿Sigues algún tipo de alimentación especial?",
        type: "single",
        options: [
            { label: "Ninguna, como de todo", value: "ninguna" },
            { label: "Sin gluten", value: "sin_gluten" },
            { label: "Vegetariana", value: "vegetariana" },
            { label: "Sin lácteos", value: "sin_lacteos" },
        ],
    },
    {
        id: "exclusiones",
        title: "¿Hay alimentos que no te gustan o evitarías?",
        type: "multiple",
        options: [
            { label: "Mariscos", value: "mariscos" },
            { label: "Cerdo", value: "cerdo" },
            { label: "Picante", value: "picante" },
            { label: "Huevo", value: "huevo" },
            { label: "Frutos secos", value: "frutos_secos" },
            { label: "Otro (Especificar)", value: "otro" },
        ],
    },
    {
        id: "personas",
        title: "¿Para cuántas personas cocinas normalmente?",
        type: "single",
        options: [
            { label: "Solo para mí", value: "1" },
            { label: "Para 2 personas", value: "2" },
            { label: "Para toda la familia", value: "familia" },
        ],
    },
    {
        id: "frecuencia",
        title: "¿Cómo prefieres recibir las recetas?",
        type: "single",
        options: [
            { label: "Plan semanal completo", value: "semanal" },
            { label: "Día por día", value: "diario" },
            { label: "Ambas opciones me sirven", value: "ambos" },
        ],
    }
];



export default function Questionnaire() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [otherExclusion, setOtherExclusion] = useState("");


    const question = questions[currentStep];

    const handleSelect = (value: string) => {
        if (question.type === "single") {
            setAnswers({ ...answers, [question.id]: value });
            setTimeout(handleNext, 300); // Auto-advance
        } else {
            const currentArr = (answers[question.id] as string[]) || [];
            const newArr = currentArr.includes(value)
                ? currentArr.filter(item => item !== value)
                : [...currentArr, value];
            setAnswers({ ...answers, [question.id]: newArr });
        }
    };

    const isSelected = (value: string) => {
        if (question.type === "single") {
            return answers[question.id] === value;
        }
        const currentArr = (answers[question.id] as string[]) || [];
        return currentArr.includes(value);
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            finishOnboarding();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const finishOnboarding = () => {
        setIsProcessing(true);
        if (typeof window !== 'undefined') {
            const finalAnswers = { ...answers };
            if (otherExclusion.trim() !== "") {
                const exc = (finalAnswers["exclusiones"] as string[]) || [];
                if (exc.includes("otro")) {
                    finalAnswers["exclusiones"] = [...exc.filter(e => e !== "otro"), `Otro: ${otherExclusion}`];
                }
            }
            localStorage.setItem('tu_semana_sana_respuestas', JSON.stringify(finalAnswers));
        }
        setTimeout(() => {
            window.location.href = "/onboarding/resumen";
        }, 1500);
    };

    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-2xl font-serif text-[var(--color-primary-dark)]">Creando tu plan ideal...</h2>
                <p className="text-[var(--color-foreground)]/60 mt-2 text-center max-w-sm">
                    Nuestra IA está analizando tus respuestas para armar la semana perfecta para ti.
                </p>
            </div>
        );
    }

    const isCurrentAnswered = question.type === "single"
        ? !!answers[question.id]
        : true; // Multiple is optional

    return (
        <div className="max-w-xl mx-auto px-6 pb-6">
            {/* Progreso */}
            <div className="mb-4 md:mb-8">
                <div className="flex justify-between text-sm text-[var(--color-foreground)]/60 mb-2">
                    <span>Paso {currentStep + 1} de {questions.length}</span>
                    <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-[var(--color-surface)] h-2 rounded-full overflow-hidden">
                    <div
                        className="bg-[var(--color-primary)] h-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Título de la pregunta */}
            <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-primary-dark)] mb-4 md:mb-8 leading-tight">
                {question.title}
            </h2>

            {/* Opciones */}
            <div className="space-y-2 md:space-y-4 mb-6 md:mb-10">
                {question.options.map((option) => {
                    const selected = isSelected(option.value);
                    return (
                        <div key={option.value}>
                            <button
                                onClick={() => handleSelect(option.value)}
                                className={`w-full text-left p-3 md:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between
                    ${selected
                                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                        : "border-[var(--color-surface)] bg-white hover:border-[var(--color-primary)]/30"
                                    }`}
                            >
                                <span className={`text-base md:text-lg ${selected ? "text-[var(--color-primary-dark)] font-medium" : "text-[var(--color-foreground)]"}`}>
                                    {option.label}
                                </span>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-3
                    ${selected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-gray-200"}`}>
                                    {selected && <Check className="w-4 h-4 text-white" />}
                                </div>
                            </button>

                            {/* Input extra si elige "Otro" */}
                            {option.value === "otro" && selected && (
                                <div className="pt-2 px-1 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <input
                                        type="text"
                                        placeholder="Ej: Berenjena, lentejas..."
                                        value={otherExclusion}
                                        onChange={(e) => setOtherExclusion(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-[var(--color-primary)]/40 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all text-[var(--color-foreground)] bg-white"
                                        onClick={(e) => e.stopPropagation()}
                                        autoFocus
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Navegación */}
            <div className="flex items-center justify-between">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`px-4 py-2 flex items-center ${currentStep === 0 ? "opacity-0" : "text-[var(--color-foreground)]/60 hover:text-[var(--color-foreground)]"}`}
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Atrás
                </button>

                <button
                    onClick={handleNext}
                    disabled={!isCurrentAnswered && question.type === "single"}
                    className={`px-6 py-2 md:px-8 md:py-3 rounded-full flex items-center font-medium transition-all
            ${(!isCurrentAnswered && question.type === "single")
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] shadow-md hover:scale-105 active:scale-95"
                        }`}
                >
                    {currentStep === questions.length - 1 ? "Ver mi Plan" : "Siguiente"} <ArrowRight className="w-5 h-5 ml-2" />
                </button>
            </div>

            <p className="mt-8 md:mt-12 text-center text-[var(--color-foreground)]/80 text-sm md:text-base font-medium italic animate-in fade-in duration-500">
                «Recuperá tu tiempo y dejá de estresarte pensando qué cocinar cada noche.»
            </p>
        </div>
    );
}
