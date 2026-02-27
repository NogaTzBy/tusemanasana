import Questionnaire from "@/components/onboarding/Questionnaire";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OnboardingPage() {
    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <header className="px-6 py-4 flex items-center max-w-6xl mx-auto">
                <Link href="/" className="text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors mr-4">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="font-serif text-xl tracking-tight text-[var(--color-primary-dark)]">
                    Tu Semana Sana
                </div>
            </header>

            <Questionnaire />
        </main>
    );
}
