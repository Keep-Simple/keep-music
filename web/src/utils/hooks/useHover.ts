import { useState } from 'react'

export const useHover = () => {
    const [hovered, set] = useState(false)
    return {
        hovered,
        bind: {
            onMouseEnter: () => set(true),
            onMouseLeave: () => set(false),
        },
    }
}
