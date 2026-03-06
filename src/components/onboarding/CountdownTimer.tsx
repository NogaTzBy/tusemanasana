'use client'

import { useState, useEffect } from 'react'

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutos en segundos

    useEffect(() => {
        // Evitamos problemas de hidratación en el primer render
        const savedTime = localStorage.getItem('tss_countdown')
        if (savedTime) {
            const parsed = parseInt(savedTime, 10)
            if (parsed > 0) {
                setTimeLeft(parsed)
            }
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const result = prev > 0 ? prev - 1 : 0
                localStorage.setItem('tss_countdown', result.toString())
                return result
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-4 mb-6 text-center animate-pulse">
            <p className="text-sm text-red-800 dark:text-red-400 font-medium mb-1">
                Tu plan personalizado y el descuento especial desaparecen en:
            </p>
            <div className="text-3xl font-bold font-serif text-red-600 dark:text-red-500 tabular-nums">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
        </div>
    )
}
