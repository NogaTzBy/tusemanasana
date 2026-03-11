import Link from "next/link";

interface CheckoutButtonProps {
    text?: string;
}

export function CheckoutButton({ text = "¡Quiero la guía + los bonos!" }: CheckoutButtonProps) {
    return (
        <div className="flex justify-center items-center w-full my-[15px] font-sans">
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes latido-lento {
          0% { transform: scale(1); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
          50% { transform: scale(1.05); box-shadow: 0 8px 20px rgba(82, 176, 67, 0.4); }
          100% { transform: scale(1); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        }
        .btn-checkout-animado {
          animation: latido-lento 2.5s ease-in-out infinite;
        }
        .btn-checkout-animado:hover {
          filter: brightness(1.1);
          animation-play-state: paused;
        }
      `}} />
            <Link
                href="/checkout"
                className="btn-checkout-animado inline-flex justify-center items-center w-[90%] max-w-[320px] bg-[#52b043] text-white text-[18px] font-extrabold no-underline uppercase py-[14px] px-[10px] rounded-[50px] transition-all duration-300 border-none cursor-pointer text-center leading-[1.2] shadow-[0_4px_15px_rgba(82,176,67,0.3)] hover:text-white"
            >
                {text}
            </Link>
        </div>
    );
}
