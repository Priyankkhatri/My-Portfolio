import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Reusable scroll-reveal wrapper for section content.
 * Animates children into view with fade-up + optional delay.
 */
export default function ScrollRevealWrapper({
    children,
    className = '',
    delay = 0,
    y = 40,
    once = true,
    margin = '-60px',
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
