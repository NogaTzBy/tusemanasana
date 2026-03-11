export function TrustBadgeML() {
    return (
        <div className="relative overflow-hidden w-[90%] max-w-[380px] mx-auto my-4 bg-white border border-[#eaeaea] rounded-xl p-3.5 md:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] font-sans">
            {/* Destello metalizado - Animación simple usando tailwind animate-shine (agregaremos custom css si hace falta) */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes ml-shine {
          0% { transform: translateX(0); opacity: 0; }
          5% { opacity: 1; }
          20% { transform: translateX(260%); opacity: 1; }
          25% { opacity: 0; }
          100% { transform: translateX(260%); opacity: 0; }
        }
        .ml-shine-effect::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -100%;
          width: 60%;
          height: 200%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0) 100%);
          animation: ml-shine 6s ease-in-out infinite;
          pointer-events: none;
        }
      `}} />

            <div className="ml-shine-effect absolute inset-0 pointer-events-none" />

            <div className="flex items-center gap-3 mb-3 relative z-10">
                <img className="w-8 h-8 shrink-0" src="https://cdn.shopify.com/s/files/1/0593/0814/6858/files/iconos_dev_new_card_Mesa_de_trabajo_1_copia_2.svg?v=1735484042" alt="MercadoLíder Platinum" />
                <div>
                    <h3 className="m-0 text-[15px] font-bold text-[#00a650]">MercadoLíder Platinum</h3>
                    <p className="m-0 mt-0.5 text-xs text-[#666666]">¡Uno de los mejores del sitio!</p>
                </div>
            </div>

            <div className="flex gap-1 my-2.5 relative z-10">
                <span className="flex-1 h-[5px] rounded-full bg-[#e5e5e5]" />
                <span className="flex-1 h-[5px] rounded-full bg-[#e5e5e5]" />
                <span className="flex-1 h-[5px] rounded-full bg-[#e5e5e5]" />
                <span className="flex-1 h-[5px] rounded-full bg-[#e5e5e5]" />
                <span className="flex-1 h-[5px] rounded-full bg-[#00a650]" />
            </div>

            <div className="flex justify-between gap-3 relative z-10">
                <div className="flex-1 flex flex-col items-center gap-0.5 text-center">
                    <div className="text-[15px] font-bold text-[#333333]">+10mil</div>
                    <div className="text-[11px] text-[#666666]">Ventas</div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-0.5 text-center">
                    <img className="w-5 h-5 mb-1" src="https://cdn.shopify.com/s/files/1/0593/0814/6858/files/iconos_dev_new_card_Mesa_de_trabajo_1_copia.svg?v=1735483382" alt="Buena atención" />
                    <div className="text-[11px] text-[#666666]">Buena atención</div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-0.5 text-center">
                    <img className="w-5 h-5 mb-1" src="https://cdn.shopify.com/s/files/1/0593/0814/6858/files/iconos_dev_new_card_Mesa_de_trabajo_1.svg?v=1735483382" alt="Entrega a tiempo" />
                    <div className="text-[11px] text-[#666666]">Entrega a tiempo</div>
                </div>
            </div>
        </div>
    );
}
