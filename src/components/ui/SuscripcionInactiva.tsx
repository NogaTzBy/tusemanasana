import Link from 'next/link'

export default function SuscripcionInactiva() {
  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg flex flex-col items-center justify-center px-6 text-center">
      {/* Ícono de candado */}
      <div className="w-20 h-20 rounded-full bg-terracotta/10 dark:bg-terracotta/20 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-terracotta text-[40px]">
          lock
        </span>
      </div>

      {/* Título */}
      <h1 className="font-serif text-3xl text-gray-900 dark:text-gray-100 mb-3">
        Tu suscripción no está activa
      </h1>

      {/* Subtexto */}
      <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mb-2">
        Para acceder a tu plan semanal personalizado y todas las recetas, necesitás tener una suscripción activa.
      </p>
      <p className="text-gray-400 dark:text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
        Podés comenzar con <span className="font-semibold text-terracotta">3 días gratis</span> sin necesidad de tarjeta de crédito.
      </p>

      {/* CTA principal */}
      <Link
        href="/checkout"
        className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-terracotta/20 transition-all duration-150 active:scale-95"
      >
        <span className="material-symbols-outlined text-[20px]">star</span>
        Activar mi suscripción
      </Link>

      {/* Link secundario */}
      <Link
        href="/login"
        className="mt-6 text-sm text-gray-400 dark:text-gray-500 hover:text-terracotta transition-colors"
      >
        ¿Ya tenés una cuenta? Iniciá sesión
      </Link>
    </div>
  )
}
