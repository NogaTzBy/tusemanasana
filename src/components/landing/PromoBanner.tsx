"use client";

import { useEffect, useState } from "react";

export function PromoBanner() {
    const [diaActual, setDiaActual] = useState("HOY");
    const [tiempoRestante, setTiempoRestante] = useState(10 * 60); // 10 minutos
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const diasSemana = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
        setDiaActual(diasSemana[new Date().getDay()]);

        const timer = setInterval(() => {
            setTiempoRestante((prev) => (prev > 0 ? prev - 1 : 10 * 60));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    const timeString = `${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`;

    if (!mounted) return null; // Avoid hydration mismatch

    return (
        <>
            <div className="fixed top-0 left-0 w-full bg-black z-50 flex flex-col items-center justify-center py-2.5 gap-1 border-b-[3px] border-[#1ccb55] shadow-[0px_4px_15px_rgba(28,203,85,0.5)] font-sans">
                <div className="text-white text-xs md:text-sm font-bold uppercase tracking-wide m-0 text-center px-2">
                    ⚡ ¡OFERTA 70% SOLO POR HOY <span className="text-[#1ccb55] underline font-black">{diaActual}</span>!
                </div>
                <div className="text-white text-xs md:text-sm font-bold tracking-wide m-0">
                    Finaliza en <span className="text-[#1ccb55] font-black ml-1 drop-shadow-[0_0_5px_#1ccb55] inline-block">{timeString}</span>
                </div>
            </div>
            {/* Spacer para que el header fixed no tape el contenido */}
            <div className="h-[60px]" />
        </>
    );
}
