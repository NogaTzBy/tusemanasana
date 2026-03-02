'use client'

import { useEffect, useState } from 'react'

export function HiddenProfileInput() {
    const [data, setData] = useState('')

    useEffect(() => {
        const stored = localStorage.getItem('tu_semana_sana_respuestas')
        if (stored) {
            setData(stored)
        }
    }, [])

    return <input type="hidden" name="profileData" value={data} />
}
