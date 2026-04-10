import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll position to top on every route change.
 * Placed inside <RootLayout> so it fires on navigation.
 */
export default function ScrollToRouteTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)

        // Force all scroll listeners to re-evaluate at scrollY=0.
        // scrollTo alone does NOT fire the scroll event, leaving
        // dependent UI (profile picture morph, back-to-top, etc.) stale.
        window.dispatchEvent(new Event('scroll'))

        // Belt-and-suspenders: delayed dispatch catches listeners that
        // rely on rAF or are registered after layout settles.
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event('scroll'))
        }, 50)

        return () => clearTimeout(timer)
    }, [pathname])

    return null
}
