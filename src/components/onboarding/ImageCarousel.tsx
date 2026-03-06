import Image from 'next/image'

const IMAGES = [
    { src: '/imagenes/foto1.jpeg', alt: 'Comida saludable 1' },
    { src: '/imagenes/foto2.jpeg', alt: 'Comida saludable 2' },
    { src: '/imagenes/foto3.jpeg', alt: 'Comida saludable 3' },
    { src: '/imagenes/foto4.jpeg', alt: 'Comida saludable 4' },
]

export default function ImageCarousel() {
    return (
        <section className="w-full max-w-full overflow-hidden py-6">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll-ltr {
                    0% { transform: translateX(calc(-280px * 4 - 1.5rem * 4)); }
                    100% { transform: translateX(0); }
                }
                .animate-scroll-ltr {
                    animation: scroll-ltr 18s linear infinite;
                    width: max-content;
                }
                .animate-scroll-ltr:hover {
                    animation-play-state: paused;
                }
                `
            }} />

            <div className="relative flex overflow-hidden">
                <div className="animate-scroll-ltr flex gap-6 px-3">
                    {[...IMAGES, ...IMAGES].map((img, idx) => (
                        <div key={idx} className="relative w-[280px] h-[200px] rounded-2xl overflow-hidden shrink-0 shadow-sm">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
