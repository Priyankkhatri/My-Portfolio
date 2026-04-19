import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * RouteTransition — "Cyber Shutter"
 * A high-speed, tech-focused route transition using staggered blocks
 * and neon scan-lines to mask the page swap.
 */

const GRID_SIZE = 4 // 4x4 grid
const STAGGER = 0.03
const PHASE_IN = 0.25
const HOLD = 0.05
const PHASE_OUT = 0.25
const TOTAL = PHASE_IN + HOLD + PHASE_OUT

export default function RouteTransition() {
    const { pathname } = useLocation()
    const [show, setShow] = useState(false)
    const prevPath = useRef(pathname)
    const isFirst = useRef(true)
    const keyRef = useRef(0)

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return
        }

        if (pathname !== prevPath.current) {
            prevPath.current = pathname
            keyRef.current += 1
            setShow(true)

            // Auto-hide after animation completes
            const timer = setTimeout(() => setShow(false), (TOTAL + (GRID_SIZE * GRID_SIZE) * STAGGER) * 1000 + 100)
            return () => clearTimeout(timer)
        }
    }, [pathname])

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key={`v2-transition-${keyRef.current}`}
                    className="fixed inset-0 pointer-events-none overflow-hidden flex flex-wrap"
                    style={{ zIndex: 9999 }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* ── Background Overlay ── */}
                    <motion.div 
                        className="absolute inset-0 bg-[#050a14]/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: TOTAL, times: [0, 0.2, 0.8, 1] }}
                    />

                    {/* ── Staggered Blocks ── */}
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                        const row = Math.floor(i / GRID_SIZE)
                        const col = i % GRID_SIZE
                        // Stagger based on distance from top-left or random
                        const delay = (row + col) * STAGGER

                        return (
                            <motion.div
                                key={i}
                                className="relative bg-[#0a1628] border border-white/5"
                                style={{
                                    width: `${100 / GRID_SIZE}%`,
                                    height: `${100 / GRID_SIZE}%`,
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ 
                                    scale: [0, 1, 1, 0],
                                    opacity: [0, 1, 1, 0],
                                    borderRadius: ["40%", "0%", "0%", "40%"]
                                }}
                                transition={{
                                    duration: TOTAL,
                                    delay,
                                    times: [0, PHASE_IN/TOTAL, (PHASE_IN+HOLD)/TOTAL, 1],
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                            >
                                {/* Subtle inner glow for blocks */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        )
                    })}

                    {/* ── Central Tech HUD ── */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                                scale: [0.8, 1.1, 1],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{ 
                                duration: TOTAL * 0.8,
                                delay: PHASE_IN * 0.5,
                                times: [0, 0.3, 0.7, 1]
                            }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-16 h-16 border-2 border-[#22d3ee] rounded-full border-t-transparent animate-spin mb-4" />
                            <span className="text-[#22d3ee] font-mono text-xs tracking-[0.3em] uppercase">
                                Resyncing...
                            </span>
                        </motion.div>
                    </div>

                    {/* ── Neon Sweep Line ── */}
                    <motion.div
                        className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-[#22d3ee] to-transparent shadow-[0_0_20px_#22d3ee]"
                        initial={{ left: "-10%" }}
                        animate={{ left: ["-10%", "110%"] }}
                        transition={{ 
                            duration: TOTAL * 0.6,
                            delay: STAGGER * 2,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
