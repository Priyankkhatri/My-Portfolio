import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import useStore from '../store/useStore'

export default function Loader() {
    const location = useLocation()
    const [progress, setProgress] = useState(0)
    const setIsLoading = useStore((s) => s.setIsLoading)
    const setIsLoaded = useStore((s) => s.setIsLoaded)
    const loaderPhase = useStore((s) => s.loaderPhase)
    const setLoaderPhase = useStore((s) => s.setLoaderPhase)
    
    const [show, setShow] = useState(() => location.pathname === '/')
    const shouldSkipLoader = location.pathname !== '/'

    useEffect(() => {
        if (shouldSkipLoader) {
            setShow(false)
            setProgress(100)
            setIsLoading(false)
            setIsLoaded(true)
            setLoaderPhase(5)
            return
        }

        setShow(true)
        setIsLoading(true)
        setIsLoaded(false)
        setLoaderPhase(0)
        setProgress(0)

        // Preload hero image during loader
        const img = new Image()
        img.src = 'https://res.cloudinary.com/dqvpsorso/image/upload/v1775455094/compressed-pfp_ibccwh.png'

        let currentProgress = 0
        const interval = setInterval(() => {
            currentProgress += Math.random() * 25
            if (currentProgress >= 100) {
                currentProgress = 100
                clearInterval(interval)
            }
            setProgress(currentProgress)
        }, 80)
        return () => clearInterval(interval)
    }, [setIsLoaded, setIsLoading, setLoaderPhase, shouldSkipLoader])

    useEffect(() => {
        if (shouldSkipLoader) return

        const t1 = setTimeout(() => setLoaderPhase(1), 600)
        const t2 = setTimeout(() => setLoaderPhase(2), 1200)
        const t3 = setTimeout(() => setLoaderPhase(3), 1800)
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }, [setLoaderPhase, shouldSkipLoader])

    useEffect(() => {
        if (shouldSkipLoader) return

        if (progress >= 100 && loaderPhase >= 3) {
            const t = setTimeout(() => setLoaderPhase(4), 200)
            return () => clearTimeout(t)
        }
    }, [progress, loaderPhase, setLoaderPhase, shouldSkipLoader])

    useEffect(() => {
        if (shouldSkipLoader) return

        if (loaderPhase === 4) {
            const t = setTimeout(() => {
                setShow(false)
                setIsLoading(false)
                setIsLoaded(true)
                setLoaderPhase(5) // Final phase: Hero settled
            }, 800) // Cinematic duration for loading animation
            return () => clearTimeout(t)
        }
    }, [loaderPhase, setIsLoaded, setIsLoading, setLoaderPhase, shouldSkipLoader])

    if (!show) return null

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100] flex"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Central Cinematic Beam (Activates at Phase 4) */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex justify-center">
                        <motion.div
                            className="w-[2px] h-full bg-[#60a5fa] shadow-[0_0_20px_4px_rgba(96,165,250,0.8)]"
                            style={{ willChange: 'transform, opacity' }}
                            animate={
                                loaderPhase === 4
                                    ? { 
                                        scaleY: [0, 1, 1, 1], 
                                        opacity: [0, 1, 1, 0], 
                                        scaleX: [1, 2, 80, 0] 
                                      }
                                    : { scaleY: 0, opacity: 0 }
                            }
                            transition={{ 
                                duration: 1.2, 
                                ease: "easeInOut",
                                times: [0, 0.3, 0.7, 1] 
                            }}
                        />
                    </div>

                    {/* Left curtain */}
                    <motion.div
                        className="w-1/2 h-full bg-[#0a0f1b] relative overflow-hidden"
                        style={{ willChange: 'transform' }}
                        animate={loaderPhase >= 4 ? { x: '-100%' } : { x: 0 }}
                        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                    >
                        {/* Decorative diagonal line */}
                        <motion.div
                            className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#60a5fa]/30 to-transparent shadow-[0_0_15px_rgba(96,165,250,0.2)]"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.3, duration: 1.5 }}
                        />
                    </motion.div>

                    {/* Right curtain */}
                    <motion.div
                        className="w-1/2 h-full bg-[#0a0f1b] relative overflow-hidden"
                        style={{ willChange: 'transform' }}
                        animate={loaderPhase >= 4 ? { x: '100%' } : { x: 0 }}
                        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                    >
                        <motion.div
                            className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#60a5fa]/30 to-transparent shadow-[0_0_15px_rgba(96,165,250,0.2)]"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.3, duration: 1.5 }}
                        />
                    </motion.div>

                    {/* Center content */}
                    <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                        animate={loaderPhase >= 4 ? { opacity: 0, scale: 1.1, filter: "blur(8px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: "easeIn" }}
                    >
                        {/* Top ornament */}
                        <motion.div
                            className="w-px h-16 mb-8"
                            style={{ background: 'linear-gradient(to bottom, transparent, var(--border-color))' }}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={loaderPhase >= 1 ? { scaleY: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.8 }}
                        />

                        {/* Eyebrow */}
                        <motion.p
                            className="text-[10px] tracking-[0.5em] uppercase text-[var(--text-muted)] mb-6"
                            initial={{ opacity: 0 }}
                            animate={loaderPhase >= 1 ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Portfolio
                        </motion.p>

                        {/* Name — letter by letter */}
                        <div className="flex overflow-hidden relative z-10">
                            {'PRIYANK'.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    className="text-4xl md:text-6xl lg:text-7xl font-light text-[var(--text-primary)]/90 inline-block"
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
                            className="text-[10px] tracking-[0.4em] uppercase text-[#60a5fa]/80 mt-4 glow-text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={loaderPhase >= 2 ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            An aspiring software developer
                        </motion.p>

                        {/* Horizontal line */}
                        <motion.div
                            className="h-px mt-8"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }}
                            initial={{ width: 0 }}
                            animate={loaderPhase >= 2 ? { width: 160 } : { width: 0 }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                        />

                        {/* Progress section */}
                        <motion.div
                            className="mt-10 flex flex-col items-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={loaderPhase >= 3 ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <span className="text-[9px] tracking-[0.35em] text-[var(--text-muted)] uppercase">
                                System Boot
                            </span>

                            {/* Progress bar */}
                            <div className="w-56 h-px bg-[var(--bg-highlight)] overflow-hidden rounded-full">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, rgba(96, 165, 250, 0.5), rgba(167, 139, 250, 0.8))',
                                    }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>

                            {/* Percentage */}
                            <motion.span
                                className="text-2xl font-light tracking-[0.15em] text-[#a78bfa] stat-number glow-text"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                {String(Math.round(progress)).padStart(3, '0')}
                            </motion.span>
                        </motion.div>

                        {/* Bottom ornament */}
                        <motion.div
                            className="absolute bottom-16 flex flex-col items-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={loaderPhase >= 2 ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <div className="w-4 h-4 border border-[var(--border-color)] rounded-full flex items-center justify-center">
                                <div className="w-1 h-1 bg-[#60a5fa]/80 rounded-full animate-pulse-glow" />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
