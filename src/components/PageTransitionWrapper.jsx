import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(4px)',
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
    },
    exit: {
        opacity: 0,
        y: -10,
        filter: 'blur(2px)',
    },
}

const pageTransition = {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
}

/**
 * Wraps <Outlet /> in AnimatePresence for cinematic page transitions.
 * Uses useOutlet() + a frozen ref pattern so the exiting page keeps its content.
 */
export default function PageTransitionWrapper() {
    const location = useLocation()
    const currentOutlet = useOutlet()

    // Check for reduced motion preference
    const [reducedMotion, setReducedMotion] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    // Check for mobile
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
        <AnimatePresence mode="wait">
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
