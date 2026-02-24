import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

export default function Loader() {
    const [progress, setProgress] = useState(0)
    const setIsLoaded = useStore((s) => s.setIsLoaded)
    const [phase, setPhase] = useState(0)
    const [show, setShow] = useState(true)

    useEffect(() => {
        let currentProgress = 0
        const interval = setInterval(() => {
            currentProgress += Math.random() * 15
            if (currentProgress >= 100) {
                currentProgress = 100
                clearInterval(interval)
            }
            setProgress(currentProgress)
        }, 120)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 600)
        const t2 = setTimeout(() => setPhase(2), 1200)
        const t3 = setTimeout(() => setPhase(3), 1800)
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }, [])

    useEffect(() => {
        if (progress >= 100 && phase >= 3) {
            const t = setTimeout(() => setPhase(4), 600)
            return () => clearTimeout(t)
        }
    }, [progress, phase])

    useEffect(() => {
        if (phase === 4) {
            const t = setTimeout(() => {
                setShow(false)
                setIsLoaded(true)
            }, 1200)
            return () => clearTimeout(t)
        }
    }, [phase, setIsLoaded])

    if (!show) return null

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-[100] flex">
                    {/* Left curtain */}
                    <motion.div
                        className="w-1/2 h-full bg-[#0a0e17] relative overflow-hidden"
                        animate={phase === 4 ? { x: '-100%' } : { x: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {/* Decorative diagonal line */}
                        <motion.div
                            className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.3, duration: 1.5 }}
                        />
                    </motion.div>

                    {/* Right curtain */}
                    <motion.div
                        className="w-1/2 h-full bg-[#0a0e17] relative overflow-hidden"
                        animate={phase === 4 ? { x: '100%' } : { x: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <motion.div
                            className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.3, duration: 1.5 }}
                        />
                    </motion.div>

                    {/* Center content */}
                    <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                        animate={phase === 4 ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Top ornament */}
                        <motion.div
                            className="w-px h-16 mb-8"
                            style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1))' }}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={phase >= 1 ? { scaleY: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.8 }}
                        />

                        {/* Eyebrow */}
                        <motion.p
                            className="text-[10px] tracking-[0.5em] uppercase text-white/15 mb-6"
                            initial={{ opacity: 0 }}
                            animate={phase >= 1 ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Portfolio
                        </motion.p>

                        {/* Name — letter by letter */}
                        <div className="flex overflow-hidden">
                            {'PRIYANK'.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    className="text-4xl md:text-6xl lg:text-7xl font-light text-white/90 inline-block"
                                    style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '0.2em' }}
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: i * 0.06,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            className="text-[10px] tracking-[0.4em] uppercase text-white/20 mt-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            Full-Stack Developer
                        </motion.p>

                        {/* Horizontal line */}
                        <motion.div
                            className="h-px mt-8"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                            initial={{ width: 0 }}
                            animate={phase >= 2 ? { width: 160 } : { width: 0 }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                        />

                        {/* Progress section */}
                        <motion.div
                            className="mt-10 flex flex-col items-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <span className="text-[9px] tracking-[0.35em] text-white/20 uppercase">
                                Loading Experience
                            </span>

                            {/* Progress bar */}
                            <div className="w-56 h-px bg-white/5 overflow-hidden rounded-full">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, rgba(96, 165, 250, 0.2), rgba(167, 139, 250, 0.4))',
                                    }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>

                            {/* Percentage */}
                            <motion.span
                                className="text-2xl font-light tracking-[0.15em] text-white/40 stat-number"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                {String(Math.round(progress)).padStart(3, '0')}
                            </motion.span>
                        </motion.div>

                        {/* Bottom ornament */}
                        <motion.div
                            className="absolute bottom-16 flex flex-col items-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={phase >= 2 ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <div className="w-4 h-4 border border-white/10 rounded-full flex items-center justify-center">
                                <div className="w-1 h-1 bg-[#60a5fa]/80 rounded-full animate-pulse-glow" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
