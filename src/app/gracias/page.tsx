"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GraciasPage() {
  const router = useRouter();
  const [segundos, setSegundos] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSegundos((s) => {
        if (s <= 1) {
          clearInterval(interval);
          router.push("/registro");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full space-y-8">
        {/* Icono */}
        <div className="text-6xl">🎉</div>

        {/* Título */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">
            ¡Tu pago fue exitoso!
          </h1>
          <p className="text-gray-400 text-lg">
            Ya tenés acceso de por vida a Tu Semana Sana.
          </p>
        </div>

        {/* Lo que incluye */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-3">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Tu acceso incluye
          </p>
          {[
            "Plan semanal personalizado con IA",
            "Recetas adaptadas a tus objetivos",
            "Lista de compras automática",
            "Acceso de por vida · Sin suscripción",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="text-green-400 text-lg">✓</span>
              <span className="text-white text-sm">{item}</span>
            </div>
          ))}
        </div>

        {/* Botón */}
        <button
          onClick={() => router.push("/registro")}
          className="w-full bg-green-500 hover:bg-green-400 text-white font-semibold py-4 px-6 rounded-2xl transition-colors text-lg"
        >
          Crear mi cuenta →
        </button>

        {/* Countdown */}
        <p className="text-gray-500 text-sm">
          Redirigiendo automáticamente en{" "}
          <span className="text-white font-semibold">{segundos}</span>{" "}
          {segundos === 1 ? "segundo" : "segundos"}...
        </p>
      </div>
    </main>
  );
}
