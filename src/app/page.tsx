import Image from "next/image";
import { PromoBanner } from "@/components/landing/PromoBanner";
import TestimonialWall from "@/components/onboarding/TestimonialWall";
import ImageCarousel from "@/components/onboarding/ImageCarousel";
import ParaVosSection from "@/components/onboarding/ParaVosSection";
import LogrosSection from "@/components/onboarding/LogrosSection";
import ProductHero from "@/components/onboarding/ProductHero";
import { FaqAccordion } from "@/components/landing/FaqAccordion";

export default function Home() {
  return (
    <main className="bg-[var(--color-background)] min-h-screen font-sans">
      {/* Countdown de oferta */}
      <PromoBanner />

      {/* Header / imagen principal — ocupa 100% del ancho */}
      <div className="w-full relative flex justify-center">
        <Image
          src="/imagenes/header3.png"
          alt="Tu Semana Sana - Plan semanal personalizado"
          width={720}
          height={1280}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Sección 1: Esta app es para vos si... */}
      <ParaVosSection />

      {/* Sección 2: ¿Qué vas a lograr? */}
      <LogrosSection />

      {/* Producto con precio + CTA */}
      <ProductHero mode="purchase" />

      {/* Testimonios */}
      <TestimonialWall />

      {/* Carrusel de fotos */}
      <ImageCarousel />

      {/* FAQ */}
      <section className="bg-white py-10">
        <FaqAccordion />
      </section>
    </main>
  );
}
