import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

const ease = [0.22, 1, 0.36, 1]

const cards = [
    {
        gradient: 'linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(167,139,250,0.08) 100%)',
        rotation: -6,
        offsetY: 0,
    },
    {
        gradient: 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(96,165,250,0.06) 100%)',
        rotation: 2,
        offsetY: -12,
    },
    {
        gradient: 'linear-gradient(135deg, rgba(56,189,248,0.10) 0%, rgba(139,92,246,0.08) 100%)',
        rotation: 8,
        offsetY: -24,
    },
]

export default function VisualIdentity() {
    const ref = useRef(null)
    const containerRef = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Parallax transforms — subtle, mapped to ±12px
    const cardX = useTransform(mouseX, [-1, 1], [-12, 12])
    const cardY = useTransform(mouseY, [-1, 1], [-8, 8])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const handleMove = (e) => {
            const rect = el.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
            const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
            mouseX.set(x)
            mouseY.set(y)
        }

        el.addEventListener('mousemove', handleMove)
        return () => el.removeEventListener('mousemove', handleMove)
    }, [mouseX, mouseY])

    return (
        <section ref={ref} className="py-12 sm:py-20 px-6 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto">
                <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left — text */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease }}
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-8 h-px bg-[var(--accent-1)] opacity-40" />
                            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                                Visual Identity
                            </p>
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-tight mb-6"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Layers of<br />
                            <span className="text-gradient-silver">purpose & craft</span>
                        </h2>
                        <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-md">
                            Every project I build has depth — functional architecture beneath a premium interface.
                            These layers represent how I think about systems.
                        </p>
                    </motion.div>

                    {/* Right — 3 layered glass cards */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1, ease, delay: 0.2 }}
                        className="relative h-[340px] sm:h-[400px] flex items-center justify-center"
                        style={{ perspective: 800 }}
                    >
                        {cards.map((card, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-[240px] h-[300px] sm:w-[280px] sm:h-[340px] rounded-2xl border border-white/[0.06] backdrop-blur-md overflow-hidden"
                                style={{
                                    background: card.gradient,
                                    rotate: card.rotation,
                                    x: cardX,
                                    y: cardY,
                                    zIndex: i + 1,
                                    boxShadow: `0 ${8 + i * 6}px ${30 + i * 10}px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`,
                                }}
                                animate={{
                                    y: [card.offsetY, card.offsetY - 8, card.offsetY],
                                }}
                                transition={{
                                    y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
                                }}
                                whileHover={{
                                    scale: 1.04,
                                    rotate: card.rotation * 0.3,
                                    zIndex: 10,
                                    transition: { duration: 0.4, ease },
                                }}
                            >
                                {/* Inner glass highlight */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />

                                {/* Abstract pattern lines */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                    {[...Array(5)].map((_, j) => (
                                        <div
                                            key={j}
                                            className="absolute w-full h-px bg-white"
                                            style={{ top: `${20 + j * 18}%` }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
