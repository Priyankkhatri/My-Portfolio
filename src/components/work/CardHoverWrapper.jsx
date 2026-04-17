import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

/**
 * CardHoverWrapper — handles lift, glow, and 3D tilt interactions.
 * Desktop: lift + glow + 3D tilt on mouse move
 * Focus: lift + glow only (no tilt) — for keyboard accessibility
 * Mobile: no tilt/glow, just subtle press feedback
 * Respects prefers-reduced-motion
 */
export default function CardHoverWrapper({ children, className = '', glowColor = 'rgba(96,165,250,0.3)' }) {
    const ref = useRef(null)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [isDesktop, setIsDesktop] = useState(true)
    const [reducedMotion, setReducedMotion] = useState(false)

    // Combined active state: hovered OR focused
    const isActive = isHovered || isFocused

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
        checkDesktop()
        window.addEventListener('resize', checkDesktop)

        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)

        return () => {
            window.removeEventListener('resize', checkDesktop)
            mq.removeEventListener('change', handler)
        }
    }, [])

    const handleMouse = useCallback((e) => {
        if (!ref.current || !isDesktop || reducedMotion) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        // Max tilt: ±6deg (reduced from ±8 per performance rules when Three.js is active)
        const maxTilt = 6
        const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -maxTilt
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt
        setTilt({ x: rotateX, y: rotateY })
    }, [isDesktop, reducedMotion])

    const handleLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 })
        setIsHovered(false)
    }, [])

    const handleEnter = useCallback(() => {
        setIsHovered(true)
    }, [])

    // Focus handlers — lift + glow only, no tilt
    const handleFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleBlur = useCallback(() => {
        setIsFocused(false)
    }, [])

    if (reducedMotion) {
        return (
            <div ref={ref} className={className} onFocus={handleFocus} onBlur={handleBlur}>
                {children}
            </div>
        )
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            animate={{
                y: isActive ? -12 : 0,
                scale: isActive && isDesktop ? 1.02 : 1,
                // Tilt only on mouse hover, not on focus
                rotateX: isHovered ? tilt.x : 0,
                rotateY: isHovered ? tilt.y : 0,
                boxShadow: isActive
                    ? `0 24px 48px -12px rgba(0,0,0,0.4), 0 0 40px -5px ${glowColor}`
                    : '0 4px 12px -4px rgba(0,0,0,0.15)',
            }}
            transition={{
                y: { type: 'spring', stiffness: 300, damping: 20 },
                rotateX: { duration: 0.15, ease: 'easeOut' },
                rotateY: { duration: 0.15, ease: 'easeOut' },
                boxShadow: { duration: 0.35, ease: 'easeOut' },
            }}
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
