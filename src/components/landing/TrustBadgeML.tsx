import Image from 'next/image';

export function TrustBadgeML() {
    return (
        <div className="relative overflow-hidden w-[90%] max-w-[400px] mx-auto my-6 bg-[#fcfcfc] border border-[#f0f0f0] rounded-[20px] p-5 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] font-sans">
            {/* Animación de destello metálico (Shimmer) */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes shimmer-ml {
          0% { transform: translateX(-150%) skewX(-25deg); }
          20% { transform: translateX(300%) skewX(-25deg); }
          100% { transform: translateX(300%) skewX(-25deg); }
        }
        .ml-shine-bar::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer-ml 3.5s ease-in-out infinite;
          pointer-events: none;
          z-index: 20;
        }
      `}} />

            <div className="ml-shine-bar absolute inset-0 pointer-events-none rounded-[20px] overflow-hidden" />

            {/* Encabezado */}
            <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="relative w-[42px] h-[42px] shrink-0">
                    <Image fill sizes="42px" className="object-contain" src="https://cdn.shopify.com/s/files/1/0593/0814/6858/files/iconos_dev_new_card_Mesa_de_trabajo_1_copia_2.svg?v=1735484042" alt="MercadoLíder Platinum" />
                </div>
                <div className="text-left flex flex-col justify-center">
                    <h3 className="m-0 text-[18px] md:text-[20px] font-bold text-[#00a650] leading-none mb-1">MercadoLíder Platinum</h3>
                    <p className="m-0 text-[13px] md:text-[14px] text-[#666666] font-medium">¡Uno de los mejores del sitio!</p>
                </div>
            </div>

            {/* Barra de progreso */}
            <div className="flex gap-[5px] mb-6 relative z-10">
                <span className="flex-1 h-[6px] rounded-full bg-[#e5e5e5]" />
                <span className="flex-1 h-[6px] rounded-full bg-[#e5e5e5]" />
                <span className="flex-1 h-[6px] rounded-full bg-[#e5e5e5]" />
                <span className="flex-1 h-[6px] rounded-full bg-[#e5e5e5]" />
                <span className="flex-1 h-[6px] rounded-full bg-[#00a650]" />
            </div>

            {/* Estadísticas inferiores */}
            <div className="flex justify-between items-start gap-2 relative z-10 mt-2 px-1">
                <div className="flex-1 flex flex-col items-center justify-center text-center h-[50px]">
                    <div className="text-[20px] md:text-[22px] font-extrabold text-[#333333] leading-none mb-2">+10mil</div>
                    <div className="text-[12px] md:text-[13px] text-[#666666] font-medium leading-tight">Ventas</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center h-[50px]">
                    <div className="relative w-[28px] h-[28px] mb-[6px] shrink-0">
                        <Image fill sizes="28px" className="object-contain" src="https://cdn.shopify.com/s/files/1/0593/0814/6858/files/iconos_dev_new_card_Mesa_de_trabajo_1_copia.svg?v=1735483382" alt="Buena atención" />
                    </div>
                    <div className="text-[12px] md:text-[13px] text-[#666666] font-medium leading-tight">Buena atención</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center h-[50px]">
                    <div className="relative w-[28px] h-[28px] mb-[6px] shrink-0">
                        <Image fill sizes="28px" className="object-contain" src="https://cdn.shopify.com/s/files/1/0593/0814/6858/files/iconos_dev_new_card_Mesa_de_trabajo_1.svg?v=1735483382" alt="Entrega a tiempo" />
                    </div>
                    <div className="text-[12px] md:text-[13px] text-[#666666] font-medium leading-tight">Entrega a tiempo</div>
                </div>
            </div>
        </div>
    );
}
