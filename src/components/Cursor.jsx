import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import useStore from '../store/useStore'

export default function Cursor() {
    const cursorVariant = useStore((s) => s.cursorVariant)
    const isHover = cursorVariant === 'hover'

    // Hide custom cursor entirely on touch-only devices
    const [isTouchOnly, setIsTouchOnly] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia('(pointer: coarse)')
        setIsTouchOnly(mq.matches && !window.matchMedia('(pointer: fine)').matches)
        const handler = () => setIsTouchOnly(mq.matches && !window.matchMedia('(pointer: fine)').matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring for outer ring
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 })
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 })

    useEffect(() => {
        const handler = (e) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }
        window.addEventListener('mousemove', handler)
        return () => window.removeEventListener('mousemove', handler)
    }, [mouseX, mouseY])

    if (isTouchOnly) return null

    return (
        <>
            {/* Inner dot — instant */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    willChange: 'transform',
                }}
                animate={{
                    width: isHover ? 6 : 8,
                    height: isHover ? 6 : 8,
                    backgroundColor: isHover ? 'rgba(96, 165, 250, 0.6)' : 'rgba(232, 237, 245, 0.9)',
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Outer ring — spring lag */}
            <motion.div
                className="fixed top-0 left-0 rounded-full border pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    willChange: 'transform',
                }}
                animate={{
                    width: isHover ? 64 : 44,
                    height: isHover ? 64 : 44,
                    borderColor: isHover ? 'rgba(96, 165, 250, 0.25)' : 'rgba(232, 237, 245, 0.2)',
                    opacity: isHover ? 0.6 : 0.8,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
            />

            {/* Glow trail — very subtle */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    willChange: 'transform',
                    width: 100,
                    height: 100,
                    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.04) 0%, transparent 70%)',
                }}
            />
        </>
    )
}
