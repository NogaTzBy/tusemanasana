import { RegistroForm } from '@/components/auth/RegistroForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function RegistroPage(props: {
    searchParams: Promise<{ message?: string }>
}) {
    const searchParams = await props.searchParams

    return (
        <main className="min-h-screen bg-[var(--color-background)] flex flex-col justify-center pt-12 pb-4 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="inline-flex items-center text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors mb-6">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver al inicio
                </Link>
                <h2 className="mt-2 md:mt-6 text-center text-3xl md:text-4xl font-serif text-[var(--color-primary-dark)]">
                    Regístrate para obtener ya tu plan semanal
                </h2>
                <p className="mt-2 text-center text-sm md:text-base text-[var(--color-foreground)]/80">
                    Tu pago fue procesado con éxito. Creá tu cuenta para acceder a todo el contenido de por vida.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-[var(--color-background)]">
                    <RegistroForm message={searchParams?.message} />
                </div>
            </div>
        </main>
    )
}
