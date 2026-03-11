import Image from 'next/image';

export function Bonuses() {
    const bonos = [
        { id: 1, title: '🎁 Emprende con recetas saludables desde casa', oldPrice: '$20.124,16', img: 'https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Bono_1.png?v=1771611600' },
        { id: 2, title: '🎁 Recetas Keto simples y fáciles', oldPrice: '$20.124,16', img: 'https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Bono_2.png?v=1771611600' },
        { id: 3, title: '🎁 Barritas saludables para el día a día', oldPrice: '$16.099,33', img: 'https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Bono_3.png?v=1771611600' },
        { id: 4, title: '🎁 Recetas veganas fáciles y sabrosas', oldPrice: '$20.124,16', img: 'https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Bono_4.png?v=1771611600' },
        { id: 5, title: '🎁 Comidas sin azucar', oldPrice: '$13.416,11', img: 'https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Bono_5.png?v=1771611600' },
        { id: 6, title: '🎁 30 snacks saludables para la ansiedad', oldPrice: '$20.124,16', img: 'https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Bono_6.png?v=1771611600' },
        { id: 7, title: '🎁 Delicias saludables sin culpa', oldPrice: '$13.416,11', img: 'https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Bono_7.png?v=1771611600' },
        { id: 8, title: '🎁 70 recetas fáciles para freidora de aire', oldPrice: '$16.099,33', img: 'https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Bono_8.png?v=1771611601' },
        { id: 9, title: '🎁 Comer sin culpa', oldPrice: '$20.124,16', img: 'https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Bono_9.png?v=1771611600' },
        { id: 10, title: '🎁 Jugos naturales para sentirte liviana', oldPrice: '$16.099,33', img: 'https://cdn.shopify.com/s/files/1/0676/6975/3942/files/Bono_10.png?v=1771611600' },
    ];

    return (
        <div className="bg-[#f5f5f5] px-[15px] pt-[30px] pb-[40px] font-sans max-w-[500px] mx-auto box-border text-center">
            <div className="mb-[25px] leading-[1.05]">
                <h2 className="m-0 normal-case block font-sans">
                    <span className="text-[20px] md:text-[24px] font-medium text-black block tracking-[-0.2px] mb-1">🎁 Además, por comprar</span>
                    <span className="text-[28px] md:text-[34px] font-bold text-black block tracking-[-0.5px]">HOY te regalamos</span>
                    <span className="text-[28px] md:text-[34px] font-bold text-black inline-block border-b-[3px] border-black pb-[1px] mb-[15px] tracking-[-0.5px]">10 BONUS Exclusivos</span>
                </h2>
                <hr className="w-[60px] h-[1px] bg-[#cccccc] mx-auto mb-[15px] border-none" />
                <p className="text-[15px] text-[#666666] leading-[1.4] m-0 mx-auto font-medium max-w-[90%]">
                    Esto no es solo un libro, es una <strong className="font-bold text-[#333]">Experiencia Completa</strong>. Por eso te incluimos <strong className="font-bold text-[#333]">10 Regalos Únicos 🎁</strong>
                </p>
            </div>

            <div className="grid grid-cols-2 gap-[15px] mb-[30px]">
                {bonos.map(bonus => (
                    <div key={bonus.id} className="bg-white rounded-[15px] p-[12px] flex flex-col items-center text-center shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                        <div className="relative w-full aspect-square mb-[10px]">
                            <Image src={bonus.img} alt={bonus.title} fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover rounded-[10px]" />
                        </div>
                        <h4 className="text-[12px] font-semibold text-[#1a1a1a] m-0 mb-[6px] leading-[1.2] min-h-[30px] flex items-center justify-center">
                            {bonus.title}
                        </h4>
                        <span className="text-[#d0021b] line-through font-medium text-[11px] mb-[2px] block">{bonus.oldPrice}</span>
                        <span className="text-[#3ab44b] font-bold text-[13px] uppercase">HOY GRATIS</span>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[20px] py-[40px] px-[20px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <h2 className="text-[26px] font-bold tracking-[-0.3px] text-[#1a1a1a] m-0 mb-[20px] leading-[1.1] uppercase">
                    ¡Y MÁS REGALOS<br />SORPRESAS!
                </h2>
                <p className="text-[16px] text-[#666] font-medium mb-[5px]">Valor total 10 bonos:</p>
                <span className="text-[30px] font-semibold text-[#d0021b] line-through mb-[15px] block">$175.751,01</span>
                <p className="text-[18px] text-[#666] font-medium mb-[5px]">Solo por HOY:</p>
                <p className="text-[48px] md:text-[55px] font-bold text-[#3ab44b] m-0 leading-none tracking-[-1.5px]">GRATIS</p>
            </div>
        </div>
    );
}
