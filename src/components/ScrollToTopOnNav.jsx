import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll position to top on every route change.
 * Placed inside <RootLayout> so it fires on navigation.
 */
export default function ScrollToTopOnNav() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
