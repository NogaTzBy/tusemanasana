import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function LoginPage(props: {
    searchParams: Promise<{ message?: string }>
}) {
    const searchParams = await props.searchParams
    const signIn = async (formData: FormData) => {
        'use server'

        const email = (formData.get('email') as string)?.trim() || ''
        const password = formData.get('password') as string
        const supabase = await createClient()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return redirect('/login?message=No pudimos verificar tus datos. Revisa tu email y contraseña.')
        }

        return redirect('/dashboard')
    }

    return (
        <main className="min-h-screen bg-[var(--color-background)] flex flex-col justify-center py-12 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="inline-flex items-center text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors mb-6">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver al inicio
                </Link>
                <h2 className="mt-6 text-center text-4xl font-serif text-[var(--color-primary-dark)]">
                    Iniciar sesión
                </h2>
                <p className="mt-2 text-center text-sm text-[var(--color-foreground)]/80">
                    ¿No tienes una cuenta?{' '}
                    <Link href="/registro" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
                        Regístrate aquí
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-[var(--color-background)]">
                    <form className="space-y-6" action={signIn}>
                        {searchParams?.message && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100 mb-6">
                                {searchParams.message}
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)]">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm transition-colors"
                                    placeholder="ejemplo@correo.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[var(--color-foreground)]">
                                Contraseña
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-colors"
                            >
                                Entrar a mi cuenta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
