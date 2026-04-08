import { motion, useScroll, useSpring } from 'framer-motion'
import { navConfig } from '../../data/navConfig'

/**
 * NavbarProgress — Scroll progress indicator.
 * Thin 2px gradient bar at the bottom of the navbar container.
 * Uses useScroll + useSpring for smooth, spring-animated width.
 * Purely decorative — aria-hidden.
 */
export default function NavbarProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, navConfig.timing.progressSpring)

    return (
        <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] origin-left"
            style={{ scaleX }}
            aria-hidden="true"
        />
    )
}
