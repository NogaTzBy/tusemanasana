import Image from 'next/image'

const IMAGES = [
    { src: '/imagenes/foto1.jpeg', alt: 'Comida saludable 1' },
    { src: '/imagenes/foto2.jpeg', alt: 'Comida saludable 2' },
    { src: '/imagenes/foto3.jpeg', alt: 'Comida saludable 3' },
    { src: '/imagenes/foto4.jpeg', alt: 'Comida saludable 4' },
]

export default function ImageCarousel() {
    return (
        <section className="w-full max-w-full overflow-hidden py-6 pb-16">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll-ltr {
                    0% { transform: translateX(calc(-160px * 4 - 1rem * 4)); }
                    100% { transform: translateX(0); }
                }
                .animate-scroll-ltr {
                    animation: scroll-ltr 16s linear infinite;
                    width: max-content;
                }
                .animate-scroll-ltr:hover {
                    animation-play-state: paused;
                }
                `
            }} />

            <div className="relative flex overflow-hidden">
                <div className="animate-scroll-ltr flex gap-4 px-3">
                    {[...IMAGES, ...IMAGES].map((img, idx) => (
                        <div key={idx} className="relative w-[160px] h-[285px] rounded-2xl overflow-hidden shrink-0 shadow-md">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="160px"
                                quality={75}
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
