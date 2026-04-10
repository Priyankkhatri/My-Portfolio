import { startTransition, useEffect, useRef, useState } from 'react'

const MOBILE_BREAKPOINT = 768

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function getScrollProgress() {
    const root = document.documentElement
    const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 1)
    return clamp(window.scrollY / maxScroll, 0, 1)
}

function getInitialState(compactAt) {
    if (typeof window === 'undefined') {
        return {
            isMobile: false,
            navState: 'active',
            progress: 0,
        }
    }

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT

    return {
        isMobile,
        navState: isMobile || window.scrollY >= compactAt ? 'compact' : 'active',
        progress: getScrollProgress(),
    }
}

function getVelocityShift(velocity) {
    if (velocity >= 1.6) return -0.05
    if (velocity <= 0.35) return 0.03
    return 0
}

export default function useNavbarState({
    compactAt = 700,
    expandBelow = 600,
    idleDelay = 1500,
    motion,
}) {
    const initial = getInitialState(compactAt)

    const [isMobile, setIsMobile] = useState(initial.isMobile)
    const [navState, setNavState] = useState(initial.navState)
    const [progress, setProgress] = useState(initial.progress)
    const [isIdle, setIsIdle] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [transitionProfile, setTransitionProfile] = useState({
        duration: motion.compactDuration,
        ease: motion.entryEase,
        childDelay: motion.childDelay,
        stagger: motion.linkEnterStagger,
        progressDelay: motion.progressDelay,
    })

    const navStateRef = useRef(initial.navState)
    const isMobileRef = useRef(initial.isMobile)
    const rafRef = useRef(null)
    const idleTimerRef = useRef(null)
    const isIdleRef = useRef(false)
    const previousScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
    const previousTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : 0)
    const velocityRef = useRef(0)

    const statePhase = navState === 'compact' ? 'compact' : 'active'

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mediaQuery.matches)

        const updateReducedMotion = (event) => setReducedMotion(event.matches)
        mediaQuery.addEventListener('change', updateReducedMotion)

        return () => mediaQuery.removeEventListener('change', updateReducedMotion)
    }, [])

    useEffect(() => {
        const queueIdle = () => {
            if (idleTimerRef.current !== null) clearTimeout(idleTimerRef.current)

            idleTimerRef.current = window.setTimeout(() => {
                isIdleRef.current = true
                setIsIdle(true)
            }, idleDelay)
        }

        const applyState = () => {
            const now = performance.now()
            const currentScrollY = window.scrollY
            const deltaY = Math.abs(currentScrollY - previousScrollYRef.current)
            const deltaT = Math.max(now - previousTimeRef.current, 16)
            const velocity = deltaY / deltaT
            const mobile = window.innerWidth < MOBILE_BREAKPOINT

            velocityRef.current = velocity
            previousScrollYRef.current = currentScrollY
            previousTimeRef.current = now

            startTransition(() => {
                setProgress(getScrollProgress())
            })

            if (mobile !== isMobileRef.current) {
                isMobileRef.current = mobile
                setIsMobile(mobile)
            }

            if (isIdleRef.current) {
                isIdleRef.current = false
                setIsIdle(false)
            }

            queueIdle()

            let nextState = navStateRef.current

            if (mobile) {
                nextState = 'compact'
            } else if (navStateRef.current === 'active' && currentScrollY >= compactAt) {
                nextState = 'compact'
            } else if (navStateRef.current === 'compact' && currentScrollY < expandBelow) {
                nextState = 'active'
            }

            if (nextState !== navStateRef.current) {
                navStateRef.current = nextState

                const shift = getVelocityShift(velocity)
                const duration = nextState === 'compact'
                    ? clamp(motion.compactDuration + shift, 0.42, 0.53)
                    : clamp(motion.activeDuration + shift, 0.3, 0.39)

                setTransitionProfile({
                    duration,
                    ease: nextState === 'compact' ? motion.entryEase : motion.exitEase,
                    childDelay: motion.childDelay,
                    stagger: nextState === 'compact' ? motion.linkEnterStagger : motion.linkExitStagger,
                    progressDelay: motion.progressDelay,
                })

                startTransition(() => setNavState(nextState))
            }
        }

        const requestUpdate = () => {
            if (rafRef.current !== null) return

            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null
                applyState()
            })
        }

        queueIdle()
        applyState()

        window.addEventListener('scroll', requestUpdate, { passive: true })
        window.addEventListener('resize', requestUpdate, { passive: true })

        return () => {
            window.removeEventListener('scroll', requestUpdate)
            window.removeEventListener('resize', requestUpdate)

            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
            if (idleTimerRef.current !== null) clearTimeout(idleTimerRef.current)
        }
    }, [
        compactAt,
        expandBelow,
        idleDelay,
        motion.activeDuration,
        motion.childDelay,
        motion.compactDuration,
        motion.entryEase,
        motion.exitEase,
        motion.linkEnterStagger,
        motion.linkExitStagger,
        motion.progressDelay,
    ])

    return {
        isCompact: isMobile || navState === 'compact',
        isIdle,
        isMobile,
        navState,
        progress,
        reducedMotion,
        statePhase,
        transitionProfile,
        velocity: velocityRef.current,
    }
}
