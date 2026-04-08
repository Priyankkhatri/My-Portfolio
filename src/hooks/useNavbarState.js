import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { navConfig } from '../data/navConfig'

/**
 * useNavbarState — Drives the Adaptive Navigation System.
 *
 * Returns:
 * - navState: 'hero' | 'active' | 'pill'
 * - reducedMotion: boolean
 * - isMobile: boolean (< 768px — pill never triggers on mobile)
 *
 * Scroll listener is throttled via rAF. State machine uses hysteresis
 * buffers (enter/exit at different thresholds) to prevent flicker.
 * Route changes snap to 'hero' immediately.
 */
export default function useNavbarState() {
    const [navState, setNavState] = useState('hero')
    const [reducedMotion, setReducedMotion] = useState(false)
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    )
    const location = useLocation()
    const rafRef = useRef(null)
    const prevStateRef = useRef('hero')
    const isMobileRef = useRef(isMobile)

    /* ── Reduced motion preference ─────────────────────────── */
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    /* ── Responsive tracking ───────────────────────────────── */
    useEffect(() => {
        const handler = () => {
            const mobile = window.innerWidth < 768
            isMobileRef.current = mobile
            setIsMobile(mobile)
        }
        window.addEventListener('resize', handler, { passive: true })
        return () => window.removeEventListener('resize', handler)
    }, [])

    /* ── Scroll state machine ──────────────────────────────── */
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY
        const {
            heroToActive,
            activeToHero,
            activeToPill,
            pillToActive,
        } = navConfig.thresholds

        const prev = prevStateRef.current
        let next = prev

        if (prev === 'hero') {
            if (scrollY >= heroToActive) next = 'active'
        } else if (prev === 'active') {
            if (scrollY <= activeToHero) next = 'hero'
            else if (scrollY >= activeToPill) next = 'pill'
        } else if (prev === 'pill') {
            if (scrollY <= pillToActive) next = 'active'
        }

        // Never enter pill state on mobile
        if (isMobileRef.current && next === 'pill') {
            next = 'active'
        }

        if (next !== prev) {
            prevStateRef.current = next
            setNavState(next)
        }
    }, [])

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) return
            rafRef.current = requestAnimationFrame(() => {
                handleScroll()
                rafRef.current = null
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        handleScroll() // Initial check
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [handleScroll])

    /* ── Route change — snap to hero ───────────────────────── */
    useEffect(() => {
        prevStateRef.current = 'hero'
        setNavState('hero')
    }, [location.pathname])

    return { navState, reducedMotion, isMobile }
}
