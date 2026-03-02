'use client'

import { useState, useEffect } from 'react'
import { HiddenProfileInput } from '@/components/onboarding/HiddenProfileInput'
import { signUpAction } from '@/app/actions/auth'

export function RegistroForm({ message }: { message?: string }) {
    const [email, setEmail] = useState('')
    const [nombre, setNombre] = useState('')

    useEffect(() => {
        const stored = localStorage.getItem('tu_semana_sana_checkout')
        if (stored) {
            try {
                const data = JSON.parse(stored)
                if (data.email) setEmail(data.email)
                if (data.nombre) setNombre(data.nombre)
            } catch (e) {
                console.error("Error parseando checkout data", e)
            }
        }
    }, [])

    return (
        <form className="space-y-6" action={signUpAction}>
            <HiddenProfileInput />

            {message && (
                <div className="p-4 rounded-xl bg-orange-50 text-orange-700 text-sm border border-orange-100 mb-6">
                    {message}
                </div>
            )}

            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[var(--color-foreground)]">
                    Nombre
                </label>
                <div className="mt-1">
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        readOnly={!!nombre}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className={`appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm transition-colors ${nombre ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
                        placeholder="María García"
                    />
                </div>
            </div>

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
                        readOnly={!!email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm transition-colors ${email ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
                        placeholder="ejemplo@correo.com"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-[var(--color-foreground)]">
                    Crea una contraseña segura
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={6}
                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm transition-colors"
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-colors"
                >
                    Finalizar y ver mi plan
                </button>
            </div>
        </form>
    )
}
