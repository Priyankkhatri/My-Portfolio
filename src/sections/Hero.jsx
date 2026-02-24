import { motion, animate, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import useStore from '../store/useStore'

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 2.4 },
    },
}

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

const stats = [
    { num: '2nd', label: 'Semester Student' },
    { num: '4+', label: 'Learning Projects' },
    { num: '10+', label: 'Technologies' },
]

function AnimatedStat({ value }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const [display, setDisplay] = useState("0")

    useEffect(() => {
        if (!inView) return
        const match = value.match(/^(\d+)(.*)$/)
        if (!match) {
            setDisplay(value)
            return
        }
        const target = parseInt(match[1], 10)
        const suffix = match[2] || ''

        const controls = animate(0, target, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate: (v) => setDisplay(Math.round(v) + suffix)
        })
        return () => controls.stop()
    }, [inView, value])

    return <span ref={ref}>{display}</span>
}

export default function Hero() {
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-24 pb-16"
        >
            {/* Decorative elements */}
            <div className="absolute top-32 right-12 w-px h-40 bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
            <div className="absolute bottom-32 left-12 w-32 h-px bg-gradient-to-r from-white/5 to-transparent hidden lg:block" />
            <div className="floating-orb w-96 h-96 bg-blue-500 -top-20 -right-20" />
            <div className="floating-orb w-64 h-64 bg-violet-800 bottom-20 left-20" />

            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10">
                <motion.div
                    className="max-w-xl w-full"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Eyebrow */}
                    <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-px bg-white/10" />
                        <p className="text-[11px] tracking-[0.4em] uppercase text-white/25">
                            BTech CSE Student &bull; Aspiring Developer
                        </p>
                    </motion.div>

                    {/* Headings */}
                    <motion.div variants={fadeUp} className="mb-4">
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.02]"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Priyank Khatri
                        </h1>
                    </motion.div>

                    <motion.h2
                        variants={fadeUp}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.02] mb-10"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        <span className="text-gradient-silver">Aspiring Software Developer</span><span className="text-white/30">.</span>
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        variants={fadeUp}
                        className="text-base md:text-lg leading-[1.8] text-white/35 max-w-xl mb-6"
                    >
                        Building React apps and REST APIs while pursuing computer science and exploring modern technology stacks.
                    </motion.p>

                    {/* Location badge */}
                    <motion.div variants={fadeUp} className="flex items-center gap-2 mb-12">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="text-xs tracking-wider text-white/20">India &bull; B.Tech CSE</span>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-20">
                        <a
                            href="#projects"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group btn-shine inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#60a5fa]/15 to-[#a78bfa]/15 border border-[#60a5fa]/25 text-white/90 text-sm font-medium tracking-wide rounded-full hover:border-[#60a5fa]/45 active:scale-[0.97] transition-all duration-300 shadow-lg shadow-[#60a5fa]/5"
                        >
                            View Projects
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                        <a
                            href="mailto:priyank@example.com"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/10 text-white/60 text-sm font-medium tracking-wide rounded-full hover:bg-white/5 hover:border-white/20 hover:text-white/80 transition-all duration-300"
                        >
                            <span className="w-1.5 h-1.5 bg-[#60a5fa]/60 rounded-full group-hover:bg-[#60a5fa] transition-colors" />
                            Contact / Hire me
                        </a>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap gap-12 pt-8 border-t border-white/[0.04]"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span
                                    className="text-2xl md:text-3xl font-bold text-white/80 stat-number"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                    <AnimatedStat value={stat.num} />
                                </span>
                                <span className="text-[10px] tracking-[0.25em] uppercase text-white/20">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Profile Image - Right Side */}
                <motion.div
                    className="relative hidden lg:flex flex-col items-center justify-center w-[400px] h-[400px] shrink-0 group/pfp"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    {/* Ethereal Ripple Rings — Auras pulsing outward on hover */}
                    <div id="heroPfpRings" className="absolute inset-0 z-10 pointer-events-none">
                        {/* Base subtle blue glow behind the frame */}
                        <div className="absolute inset-4 rounded-full bg-gradient-radial from-[#60a5fa]/10 to-transparent blur-xl ripple-bg" />

                        {/* Ripple 1 */}
                        <div className="absolute inset-4 rounded-full border border-[#60a5fa]/40 ripple-ring shadow-[0_0_15px_rgba(96,165,250,0.3)]" />

                        {/* Ripple 2 (Staggered by 1s) */}
                        <div className="absolute inset-4 rounded-full border border-[#a78bfa]/30 ripple-ring shadow-[0_0_15px_rgba(167,139,250,0.2)]" style={{ animationDelay: '1s' }} />

                        {/* Ripple 3 (Staggered by 2s) */}
                        <div className="absolute inset-4 rounded-full border border-white/20 ripple-ring shadow-[0_0_15px_rgba(255,255,255,0.1)]" style={{ animationDelay: '2s' }} />
                    </div>

                    {/* Image Container — PfpMorphButton transforms this on scroll */}
                    <div id="heroPfpFrame" className="absolute inset-12 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-md">
                        <img
                            id="heroPfp"
                            src="/profile.jpg"
                            alt="Priyank Khatri profile photo"
                            className="w-full h-full object-cover object-center rounded-full"
                        />
                        <div className="absolute inset-0 bg-black/30 rounded-full transition-opacity duration-500" id="heroPfpOverlay" />
                        {/* Arrow overlay — shown by JS when morphed into button */}
                        <div
                            id="heroPfpArrow"
                            className="absolute inset-0 flex items-center justify-center text-white rounded-full"
                            style={{ opacity: 0, background: 'linear-gradient(135deg, rgba(10,14,23,0.75), rgba(22,32,56,0.8))', pointerEvents: 'none' }}
                        >
                            <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="19" x2="12" y2="5" />
                                <polyline points="5 12 12 5 19 12" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, duration: 1 }}
            >
                <span className="text-[9px] tracking-[0.3em] text-white/15 uppercase">Scroll</span>
                <motion.div
                    className="w-5 h-8 border border-white/10 rounded-full flex items-start justify-center p-1.5"
                >
                    <motion.div
                        className="w-0.5 h-1.5 bg-white/20 rounded-full"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
