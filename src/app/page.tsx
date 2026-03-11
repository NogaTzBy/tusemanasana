import { PromoBanner } from "@/components/landing/PromoBanner";
import { TrustBadgeML } from "@/components/landing/TrustBadgeML";
import { PaymentIcons } from "@/components/landing/PaymentIcons";
import { Guarantees } from "@/components/landing/Guarantees";
import { Bonuses } from "@/components/landing/Bonuses";
import { CheckoutButton } from "@/components/landing/CheckoutButton";
import { Testimonials } from "@/components/landing/Testimonials";
import { FaqAccordion } from "@/components/landing/FaqAccordion";

export default function Home() {
  return (
    <main className="bg-white min-h-screen pb-[60px] font-sans">
      <PromoBanner />

      {/* Sección principal (Hero) */}
      <section className="w-full text-center px-4 pt-4 pb-8 max-w-lg mx-auto">
        {/* Placeholder de imagen de Hero (basado en HTML proporcionado) */}
        <div className="w-full aspect-[2/3] max-w-[400px] mx-auto bg-gray-100 rounded-2xl mb-6 relative overflow-hidden">
          {/* Acá va la imagen Portada-1-_1_1.webp */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 p-4 border-2 border-dashed border-gray-300 rounded-2xl">
            [Imagen Hero: Portada Principal]
          </div>
        </div>

        <TrustBadgeML />
        <CheckoutButton />
        <PaymentIcons />
        <Guarantees />

        {/* Placeholder de segunda imagen */}
        <div className="w-full aspect-[2/3] max-w-[400px] mx-auto bg-gray-100 rounded-2xl my-8 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 p-4 border-2 border-dashed border-gray-300 rounded-2xl">
            [Imagen: Plantillas Ebook]
          </div>
        </div>

        <CheckoutButton />
      </section>

      {/* Bonos */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto py-8">
          <Bonuses />
          <CheckoutButton />
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-8">
        <Testimonials />
        <CheckoutButton text="SI, QUIERO EMPEZAR HOY MISMO" />
      </section>

      {/* FAQ */}
      <section className="bg-white py-12">
        <FaqAccordion />
      </section>

      {/* Cierre */}
      <section className="bg-gray-50 py-12 text-center px-4 border-t border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[var(--color-primary-dark)]">
          Tu plan semanal está listo para cambiarte la vida
        </h2>
        <CheckoutButton text="QUIERO MI PLAN DE COMIDAS AHORA" />
        <PaymentIcons />
      </section>
    </main>
  );
}
