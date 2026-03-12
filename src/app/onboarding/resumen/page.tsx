import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TestimonialWall from "@/components/onboarding/TestimonialWall";
import ImageCarousel from "@/components/onboarding/ImageCarousel";
import ParaVosSection from "@/components/onboarding/ParaVosSection";
import LogrosSection from "@/components/onboarding/LogrosSection";
import ProductHero from "@/components/onboarding/ProductHero";

export default function ResumenPage() {
    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <header className="px-6 py-4 flex items-center max-w-4xl mx-auto">
                <Link href="/onboarding" className="text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors mr-4">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="font-serif text-xl tracking-tight text-[var(--color-primary-dark)]">
                    Tu Semana Sana
                </div>
            </header>

            {/* Hero principal */}
            <ProductHero />

            {/* Secciones de dolor y logros */}
            <ParaVosSection />
            <LogrosSection />

            {/* Hero repetido (compacto, sin countdown) */}
            <ProductHero compact />

            <TestimonialWall />
            <ImageCarousel />
        </main>
    );
}
