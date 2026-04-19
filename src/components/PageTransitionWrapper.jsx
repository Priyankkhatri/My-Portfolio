import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

/**
 * Wraps <Outlet /> in AnimatePresence for cinematic page transitions.
 * Since we have the Cyber Shutter route transition as well, we keep this fast.
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

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: reducedMotion ? 0 : 0.2, 
                    ease: 'easeInOut',
                }}
                className="min-h-screen relative"
            >
                {currentOutlet}
            </motion.div>
        </AnimatePresence>
    )
}
