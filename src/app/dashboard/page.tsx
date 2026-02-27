import Link from "next/link";
import WeeklyPlan from "@/components/dashboard/WeeklyPlan";
import { CalendarDays, Download, FileText, Settings, ShoppingCart, User } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[var(--color-background)] pb-20">
            {/* Header del Dashboard */}
            <header className="bg-white border-b border-gray-200/50 sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/dashboard" className="font-serif text-xl tracking-tight text-[var(--color-primary-dark)] font-medium">
                        Tu Semana Sana
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)]">
                            <Settings className="w-5 h-5" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary-dark)] font-medium">
                            M
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif text-[var(--color-primary-dark)] mb-2">
                            ¡Hola María! 👋
                        </h1>
                        <p className="text-[var(--color-foreground)]/70">
                            Aquí está tu progreso hacia una vida más saludable.
                        </p>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center bg-white border border-gray-200 text-[var(--color-foreground)] px-4 py-2.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm text-sm font-medium">
                            <ShoppingCart className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
                            Lista de Compras
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center bg-[var(--color-primary)] text-white px-4 py-2.5 rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm text-sm font-medium">
                            <Download className="w-4 h-4 mr-2" />
                            Descargar PDF
                        </button>
                    </div>
                </div>

                {/* Componente del Plan Semanal */}
                <WeeklyPlan />
            </main>
        </div>
    );
}
