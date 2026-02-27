"use client";

import { useState } from "react";
import { Download, RefreshCw, ShoppingCart, CalendarDays } from "lucide-react";

type Meal = {
    id: string;
    name: string;
    time: string;
    type: "Desayuno" | "Almuerzo" | "Cena";
    image: string;
};

type DayPlan = {
    date: string;
    dayName: string;
    meals: Meal[];
};

const MOCK_PLAN: DayPlan[] = [
    {
        date: "Lun 12",
        dayName: "Lunes",
        meals: [
            { id: "1", name: "Avena nocturna con chía y frutos rojos", time: "5 min", type: "Desayuno", image: "bg-orange-100" },
            { id: "2", name: "Ensalada tibia de quinoa y pollo grillado", time: "15 min", type: "Almuerzo", image: "bg-green-100" },
            { id: "3", name: "Salmón al horno con espárragos", time: "20 min", type: "Cena", image: "bg-blue-100" }
        ]
    },
    {
        date: "Mar 13",
        dayName: "Martes",
        meals: [
            { id: "4", name: "Tostadas integrales con palta y huevo", time: "10 min", type: "Desayuno", image: "bg-yellow-100" },
            { id: "5", name: "Wok de vegetales y tofu con salsa de soja", time: "20 min", type: "Almuerzo", image: "bg-red-100" },
            { id: "6", name: "Sopa crema de calabaza asada", time: "30 min", type: "Cena", image: "bg-orange-100" }
        ]
    },
    // Más días mockeados simplificados para MVP...
];

export default function WeeklyPlan() {
    const [activeDay, setActiveDay] = useState(0);
    const [isSwapping, setIsSwapping] = useState<string | null>(null);

    const handleSwap = (mealId: string) => {
        setIsSwapping(mealId);
        // Simular que la IA busca un reemplazo en 1 segundo
        setTimeout(() => {
            setIsSwapping(null);
        }, 1000);
    };

    const day = MOCK_PLAN[activeDay] || MOCK_PLAN[0]; // Fallback por si hay pocos días

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-[var(--color-primary)]/10 overflow-hidden">
            {/* Selector de Días */}
            <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-100">
                {MOCK_PLAN.map((d, index) => (
                    <button
                        key={d.date}
                        onClick={() => setActiveDay(index)}
                        className={`flex-shrink-0 px-6 py-4 text-center transition-colors
              ${activeDay === index
                                ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary-dark)] bg-[var(--color-primary)]/5"
                                : "text-[var(--color-foreground)]/60 hover:bg-gray-50"
                            }`}
                    >
                        <div className="text-xs uppercase font-medium tracking-wider mb-1">{d.dayName}</div>
                        <div className={`text-lg ${activeDay === index ? "font-bold" : "font-medium"}`}>{d.date}</div>
                    </button>
                ))}
            </div>

            {/* Contenido del Día */}
            <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif text-[var(--color-primary-dark)]">
                        Menú del {day.dayName}
                    </h2>
                </div>

                <div className="space-y-6">
                    {day.meals.map((meal) => (
                        <div key={meal.id} className="group flex flex-col sm:flex-row gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 relative">
                            {/* Imagen simulada con color */}
                            <div className={`w-full sm:w-32 h-32 rounded-xl object-cover flex-shrink-0 ${meal.image} flex items-center justify-center`}>
                                <span className="text-xs text-gray-500 font-medium">Foto Receta</span>
                            </div>

                            <div className="flex-1 py-1">
                                <div className="text-sm font-medium text-[var(--color-accent)] mb-1">
                                    {meal.type}
                                </div>
                                <h3 className="text-xl font-serif text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-primary-dark)] transition-colors">
                                    {meal.name}
                                </h3>
                                <div className="text-sm text-[var(--color-foreground)]/60 flex items-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-primary)] mr-2"></span>
                                    Tiempo activo: {meal.time}
                                </div>
                            </div>

                            {/* Botón de cambio discreto */}
                            <div className="sm:absolute sm:top-4 sm:right-4 flex items-center justify-end">
                                <button
                                    onClick={() => handleSwap(meal.id)}
                                    v-title="Cambiar receta"
                                    className="p-2 text-gray-400 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-full transition-all"
                                    disabled={isSwapping === meal.id}
                                >
                                    <RefreshCw className={`w-5 h-5 ${isSwapping === meal.id ? "animate-spin text-[var(--color-primary)]" : ""}`} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
