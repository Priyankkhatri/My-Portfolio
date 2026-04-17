import { useState, useEffect } from 'react'

/**
 * useIsMobile — standardized viewport detection hook for the portfolio.
 * Syncs with the tailwind 'md' breakpoint (768px).
 *
 * @param {number} breakpoint - optional custom pixel breakpoint (default 768)
 * @returns {boolean} - true if current window.innerWidth < breakpoint
 */
export default function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
    )

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [breakpoint])

    return isMobile
}
