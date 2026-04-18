import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

export default function CinematicHero() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-20px' })

    return (
        <section
            ref={ref}
            className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        >
            {/* Ambient orbs */}
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#60a5fa] opacity-[0.025] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#a78bfa] opacity-[0.02] blur-[100px] pointer-events-none" />

            {/* Eyebrow label */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 0.5, y: 0 } : {}}
                transition={{ duration: 1, ease, delay: 0.2 }}
                className="text-[12px] tracking-[0.5em] uppercase text-[var(--text-muted)] mb-10"
                style={{ fontFamily: "var(--font-mono)" }}
            >
                A LITTLE ABOUT ME
            </motion.p>

            {/* Main headline */}
            <motion.h1
                initial={{ opacity: 0, y: 24, filter: 'blur(16px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 1.2, ease, delay: 0.5 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1] text-[var(--text-primary)] max-w-5xl"
                style={{ fontFamily: "var(--font-display)" }}
            >
                I build{' '}
                <span className="relative inline-block">
                    <span className="text-gradient-accent">systems</span>
                    {/* Shimmer pass */}
                    <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                        initial={{ x: '-100%' }}
                        animate={inView ? { x: '200%' } : {}}
                        transition={{ duration: 1.5, ease: 'easeInOut', delay: 1.8 }}
                        style={{ mixBlendMode: 'overlay' }}
                    />
                </span>
                .<br />
                <span className="text-[var(--text-secondary)]">Not just apps.</span>
            </motion.h1>

            {/* Name line */}
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 0.6, y: 0 } : {}}
                transition={{ duration: 0.9, ease, delay: 1.2 }}
                className="text-base sm:text-lg tracking-[0.15em] uppercase text-[var(--text-secondary)] mt-12 font-medium"
            >
                Priyank
                <span className="inline-block w-1 h-1 rounded-full bg-[var(--accent-1)] mx-3 align-middle opacity-60" />
                Full-Stack Developer
            </motion.p>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.4 } : {}}
                transition={{ delay: 2.2, duration: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[8px] tracking-[0.35em] uppercase text-[var(--text-muted)]">Scroll</span>
                <motion.div
                    className="w-px h-8 bg-gradient-to-b from-[var(--accent-1)]/40 to-transparent"
                    animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: 'top' }}
                />
            </motion.div>
        </section>
    )
}
