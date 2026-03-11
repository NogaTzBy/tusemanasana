import Image from 'next/image';

export function PaymentIcons() {
    return (
        <div className="w-full text-center mt-[-10px] md:mt-[-12px] p-0 bg-transparent flex justify-center">
            <div className="relative w-[88%] md:w-[90%] max-w-[320px] h-[30px] md:h-[40px] inline-block">
                <Image
                    src="/imagenes/metodos-de-pago.png"
                    alt="Métodos de pago"
                    fill
                    sizes="(max-width: 768px) 88vw, 320px"
                    className="object-contain"
                />
            </div>
        </div>
    );
}
