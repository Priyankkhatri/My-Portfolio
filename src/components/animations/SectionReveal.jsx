import { motion } from 'framer-motion'

/**
 * SectionReveal - A wrapper that animates children when they enter the viewport.
 * Uses Framer Motion for smooth, hardware-accelerated transitions.
 */
export default function SectionReveal({ 
    children, 
    delay = 0, 
    direction = 'up',
    distance = 40,
    className = "" 
}) {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {}
    }

    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                ...directions[direction] 
            }}
            whileInView={{ 
                opacity: 1, 
                x: 0, 
                y: 0 
            }}
            viewport={{ 
                once: true, 
                margin: "-100px" 
            }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98] // Cinematic ease-out
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
