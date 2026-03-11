import Image from 'next/image';

export function PaymentIcons() {
    return (
        <div className="w-full text-center mt-2 md:mt-1 p-0 flex justify-center">
            <Image
                src="/imagenes/metodos-de-pago.png"
                alt="Métodos de pago"
                width={500}
                height={100}
                className="w-[85%] max-w-[360px] h-auto object-contain"
            />
        </div>
    );
}
