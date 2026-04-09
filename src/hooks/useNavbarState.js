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
 * ── Scroll-glitch fixes ──────────────────────────────────────
 * 1. Hysteresis: enter/exit thresholds have wide gaps to prevent
 *    rapid toggling near boundary zones.
 * 2. Transition lock: after every state change the scroll handler
 *    is frozen for LOCK_MS to let the CSS/Framer animation settle.
 * 3. rAF throttle: scroll events are coalesced via requestAnimationFrame
 *    so at most one state evaluation runs per frame (~16ms).
 * 4. Stable state machine: current state is kept in a ref; React state
 *    only updates when the ref truly changes. No continuous re-renders.
 * 5. Route changes snap to 'hero' immediately and reset the lock.
 */

export default function useNavbarState() {
    const LOCK_MS = navConfig.timing.transitionLock
    const [navState, setNavState] = useState('hero')
    const [reducedMotion, setReducedMotion] = useState(false)
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    )
    const location = useLocation()

    const rafRef = useRef(null)
    const prevStateRef = useRef('hero')
    const isMobileRef = useRef(isMobile)
    const lockUntilRef = useRef(0) // timestamp until which state changes are blocked

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
        // ── Transition lock: skip evaluation while animation settles ──
        if (performance.now() < lockUntilRef.current) return

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
            lockUntilRef.current = performance.now() + LOCK_MS
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
        lockUntilRef.current = 0 // clear lock so hero applies instantly
        setNavState('hero')
    }, [location.pathname])

    return { navState, reducedMotion, isMobile }
}
