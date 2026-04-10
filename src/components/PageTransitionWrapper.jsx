import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

/* Page transition variants - OPACITY ONLY.
   CRITICAL: Do NOT use `y`, `filter`, `scale`, or any transform-based
   property here. Framer Motion retains inline `transform: translateY(0px)`
   and `filter: blur(0px)` even AFTER animation completes. Per CSS spec,
   any non-none transform/filter creates a new containing-block and can
   interfere with fixed-position UI layers. */
const pageVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
}

const pageTransition = {
    duration: 0.26,
    ease: [0.22, 1, 0.36, 1],
}

/**
 * Wraps <Outlet /> in AnimatePresence for cinematic page transitions.
 * Uses useOutlet() so route content can transition as the pathname changes.
 */
export default function PageTransitionWrapper() {
    const location = useLocation()
    const currentOutlet = useOutlet()

    const [reducedMotion, setReducedMotion] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const mobileVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    const variants = reducedMotion
        ? { initial: {}, animate: {}, exit: {} }
        : isMobile
          ? mobileVariants
          : pageVariants

    const transition = reducedMotion
        ? { duration: 0 }
        : isMobile
          ? { duration: 0.3, ease: 'easeOut' }
          : pageTransition

    return (
        <AnimatePresence mode="sync" initial={false}>
            <motion.div
                key={location.pathname}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="min-h-screen"
            >
                {currentOutlet}
            </motion.div>
        </AnimatePresence>
    )
}
