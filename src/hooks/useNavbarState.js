import {
    startTransition,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import { navConfig } from '../data/navConfig'

const ACTIVE_STATE = 'active'
const COMPACT_STATE = 'compact'
const DEFAULT_DIRECTION = 'down'

function getCompactExitThreshold(direction) {
    return direction === 'up'
        ? navConfig.thresholds.exitCompactWhileUp
        : navConfig.thresholds.exitCompact
}

export default function useNavbarState() {
    const location = useLocation()
    const lockMs = navConfig.timing.transitionLock
    const idleDelay = navConfig.timing.idleDelay

    const [navState, setNavState] = useState(ACTIVE_STATE)
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined'
            ? window.innerWidth < navConfig.mobile.breakpoint
            : false
    )
    const [scrollDirection, setScrollDirection] = useState(DEFAULT_DIRECTION)
    const [isIdle, setIsIdle] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [snapInstantly, setSnapInstantly] = useState(true)

    const navStateRef = useRef(ACTIVE_STATE)
    const isMobileRef = useRef(isMobile)
    const directionRef = useRef(DEFAULT_DIRECTION)
    const idleRef = useRef(false)
    const previousScrollYRef = useRef(0)
    const lockUntilRef = useRef(0)
    const rafRef = useRef(null)
    const idleTimeoutRef = useRef(null)
    const snapResetRef = useRef(null)

    const clearIdleTimer = () => {
        if (idleTimeoutRef.current) {
            clearTimeout(idleTimeoutRef.current)
            idleTimeoutRef.current = null
        }
    }

    const scheduleIdle = () => {
        clearIdleTimer()
        idleTimeoutRef.current = setTimeout(() => {
            idleRef.current = true
            setIsIdle(true)
        }, idleDelay)
    }

    const updateDirection = (scrollY) => {
        const previousScrollY = previousScrollYRef.current

        if (scrollY === previousScrollY) {
            return directionRef.current
        }

        const nextDirection = scrollY > previousScrollY ? 'down' : 'up'

        previousScrollYRef.current = scrollY

        if (nextDirection !== directionRef.current) {
            directionRef.current = nextDirection
            setScrollDirection(nextDirection)
        }

        return nextDirection
    }

    const evaluateScrollState = (scrollY) => {
        const direction = updateDirection(scrollY)

        if (idleRef.current) {
            idleRef.current = false
            setIsIdle(false)
        }

        scheduleIdle()

        if (isMobileRef.current) {
            if (navStateRef.current !== ACTIVE_STATE) {
                navStateRef.current = ACTIVE_STATE
                lockUntilRef.current = 0
                startTransition(() => setNavState(ACTIVE_STATE))
            }
            return
        }

        if (performance.now() < lockUntilRef.current) {
            return
        }

        const currentState = navStateRef.current
        const nextState =
            currentState === ACTIVE_STATE
                ? scrollY >= navConfig.thresholds.enterCompact
                    ? COMPACT_STATE
                    : ACTIVE_STATE
                : scrollY < getCompactExitThreshold(direction)
                  ? ACTIVE_STATE
                  : COMPACT_STATE

        if (nextState !== currentState) {
            navStateRef.current = nextState
            lockUntilRef.current = performance.now() + lockMs
            startTransition(() => setNavState(nextState))
        }
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        const handleChange = (event) => setReducedMotion(event.matches)

        setReducedMotion(mediaQuery.matches)
        mediaQuery.addEventListener('change', handleChange)

        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < navConfig.mobile.breakpoint

            isMobileRef.current = mobile
            setIsMobile((currentValue) =>
                currentValue === mobile ? currentValue : mobile
            )

            if (mobile && navStateRef.current !== ACTIVE_STATE) {
                navStateRef.current = ACTIVE_STATE
                lockUntilRef.current = 0
                setNavState(ACTIVE_STATE)
            }

            evaluateScrollState(window.scrollY)
        }

        window.addEventListener('resize', handleResize, { passive: true })

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current !== null) {
                return
            }

            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null
                evaluateScrollState(window.scrollY)
            })
        }

        previousScrollYRef.current = window.scrollY
        evaluateScrollState(window.scrollY)

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)

            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
        }
    }, [])

    useLayoutEffect(() => {
        clearIdleTimer()

        if (snapResetRef.current !== null) {
            cancelAnimationFrame(snapResetRef.current)
            snapResetRef.current = null
        }

        navStateRef.current = ACTIVE_STATE
        directionRef.current = DEFAULT_DIRECTION
        idleRef.current = false
        previousScrollYRef.current = 0
        lockUntilRef.current = 0

        setScrollDirection(DEFAULT_DIRECTION)
        setIsIdle(false)
        setNavState(ACTIVE_STATE)
        setSnapInstantly(true)

        scheduleIdle()

        let secondFrame = null

        snapResetRef.current = requestAnimationFrame(() => {
            secondFrame = requestAnimationFrame(() => {
                setSnapInstantly(false)
                snapResetRef.current = null
            })
        })

        return () => {
            if (snapResetRef.current !== null) {
                cancelAnimationFrame(snapResetRef.current)
                snapResetRef.current = null
            }

            if (secondFrame !== null) {
                cancelAnimationFrame(secondFrame)
            }
        }
    }, [location.pathname])

    useEffect(() => {
        return () => {
            clearIdleTimer()

            if (snapResetRef.current !== null) {
                cancelAnimationFrame(snapResetRef.current)
            }
        }
    }, [])

    return {
        navState,
        isMobile,
        scrollDirection,
        isIdle,
        reducedMotion,
        snapInstantly,
    }
}
