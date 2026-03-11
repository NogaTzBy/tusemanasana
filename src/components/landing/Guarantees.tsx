import Image from 'next/image';

export function Guarantees() {
    return (
        <div className="flex items-center gap-4 border border-[#eeeeee] rounded-xl p-4 bg-white w-[90%] max-w-[380px] mx-auto my-[15px] font-sans shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <div className="shrink-0 relative w-11 h-11">
                <Image
                    src="https://cdn.shopify.com/s/files/1/0713/3744/3581/files/download_18_ba1d13ed-36eb-45ea-97cc-211019bfa911.png?v=1757267383"
                    alt="Garantía"
                    fill
                    sizes="44px"
                    className="object-contain"
                />
            </div>
            <div className="flex flex-col justify-center">
                <div className="font-bold text-[15px] text-[#3ab44b] m-0 leading-[1.2]">
                    Garantía de Satisfacción
                </div>
                <div className="text-[13px] text-[#444444] mt-0.5 leading-[1.3]">
                    <strong className="font-extrabold text-black">30 días</strong> para probar sin riesgo alguno
                </div>
            </div>
        </div>
    );
}
