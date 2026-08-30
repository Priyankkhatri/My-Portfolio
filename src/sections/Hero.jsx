import { motion, animate, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import useStore from '../store/useStore'

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.8 },
    },
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
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

    useEffect(() => {
        if (!inView || !ref.current) return
        const match = value.match(/^(\d+)(.*)$/)
        if (!match) {
            ref.current.textContent = value
            return
        }
        const target = parseInt(match[1], 10)
        const suffix = match[2] || ''

        const controls = animate(0, target, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate: (v) => {
                if (ref.current) {
                    ref.current.textContent = Math.round(v) + suffix
                }
            }
        })
        return () => controls.stop()
    }, [inView, value])

    return <span ref={ref}>0</span>
}

export default function Hero() {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const loaderPhase = useStore((s) => s.loaderPhase)
    const [showResume, setShowResume] = useState(false)

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (showResume) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [showResume])

    // Detect if we are in browser to safely use createPortal
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const onClick = (e) => {
        // Only scroll if the element has morphed enough to be a button OR if it's the fallback button
        if (window.location.pathname !== '/') {
            window.location.href = '/'
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-20 sm:pt-24 pb-12 sm:pb-16"
        >
            {/* Decorative elements */}
            <div className="absolute top-32 right-12 w-px h-40 bg-gradient-to-b from-transparent via-[var(--bg-highlight)] to-transparent hidden lg:block pointer-events-none" />
            <div className="absolute bottom-32 left-12 w-32 h-px bg-gradient-to-r from-[var(--bg-highlight)] to-transparent hidden lg:block pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-24 relative z-10">

                {/* Mobile Profile Picture — shown only lg */}
                <motion.div
                    className="flex lg:hidden items-center justify-center mt-2 sm:mt-4"
                    initial={loaderPhase >= 4 ? false : { opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={loaderPhase >= 4 ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.div
                        className="relative w-32 h-32 sm:w-44 sm:h-44"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#60a5fa]/20 to-[#a78bfa]/10 blur-xl" />
                        <div className="absolute inset-0 rounded-full border-2 border-[#60a5fa]/30 shadow-[0_0_20px_rgba(96,165,250,0.15)]">
                            <img
                                src="https://res.cloudinary.com/dqvpsorso/image/upload/v1775455094/compressed-pfp_ibccwh.png"
                                alt="Priyank Khatri profile photo"
                                className="w-full h-full object-cover object-[60%_20%] rounded-full"
                                width="176"
                                height="176"
                                loading="lazy"
                            />

                            <div className="absolute inset-0 bg-black/10 rounded-full" />
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="max-w-xl w-full"
                    variants={container}
                    initial={loaderPhase >= 4 ? "visible" : "hidden"}
                    animate={loaderPhase >= 4 ? "visible" : "hidden"}
                >
                    {/* Eyebrow */}
                    <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-px bg-[var(--bg-highlight-hover)]" />
                        <p className="text-[11px] tracking-[0.2em] sm:tracking-[0.4em] uppercase text-[var(--text-secondary)]">
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
                        <span className="text-gradient-silver">MERN / Full-Stack</span><span className="text-[var(--text-secondary)]">.</span>
                    </motion.h2>
                    {/* Subtext */}
                    <motion.p
                        variants={fadeUp}
                        className="text-base md:text-lg leading-[1.8] text-[var(--text-secondary)] max-w-xl mb-6"
                    >
                        Building React apps and REST APIs while pursuing computer science and exploring modern technology stacks.
                    </motion.p>

                    {/* Location badge */}
                    <motion.div variants={fadeUp} className="flex items-center gap-2 mb-12">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-secondary)]">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="text-xs tracking-wider text-[var(--text-secondary)]">India &bull; B.Tech CSE</span>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-20">
                        <Link
                            to="/work"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group btn-shine inline-flex justify-center items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#60a5fa]/15 to-[#a78bfa]/15 border border-[#60a5fa]/25 text-[var(--text-primary)] text-sm font-medium tracking-wide rounded-full hover:border-[#60a5fa]/45 active:scale-[0.97] transition-all duration-300 shadow-lg shadow-[#60a5fa]/5 w-full sm:w-auto"
                        >
                            View Projects
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                        <button
                            onClick={() => setShowResume(true)}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group inline-flex justify-center items-center gap-3 px-8 py-4 border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-medium tracking-wide rounded-full hover:bg-[var(--bg-highlight)] hover:border-[var(--border-color)] hover:text-[var(--text-primary)] transition-all duration-300 w-full sm:w-auto"
                        >
                            <span className="w-1.5 h-1.5 bg-[#60a5fa]/60 rounded-full group-hover:bg-[#60a5fa] transition-colors" />
                            View Resume
                        </button>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap gap-4 sm:gap-12 pt-8 border-t border-[var(--border-color)]"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span
                                    className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] stat-number"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                    <AnimatedStat value={stat.num} />
                                </span>
                                <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-secondary)]">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Profile Image - Right Side (Desktop only) */}
                <motion.div
                    className="relative hidden lg:flex flex-col items-center justify-center w-[400px] h-[400px] shrink-0 group/pfp"
                    initial={loaderPhase >= 4 ? false : { opacity: 0, scale: 0.5, filter: "blur(20px)", x: 100 }}
                    animate={loaderPhase >= 4 ? { opacity: 1, scale: 1, filter: "blur(0px)", x: 0 } : { opacity: 0, scale: 0.5, filter: "blur(20px)", x: 100 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ willChange: 'transform, opacity, filter' }}
                >
                    <div id="heroPfpRings" className="absolute inset-0 z-10 pointer-events-none">
                        {/* Base subtle blue glow behind the frame */}
                        <div className="absolute inset-4 rounded-full bg-gradient-radial from-[#60a5fa]/10 to-transparent blur-xl ripple-bg" />

                        {/* Ripple 1 */}
                        <div className="absolute inset-4 rounded-full border border-[#60a5fa]/40 ripple-ring shadow-[0_0_15px_rgba(96,165,250,0.3)]" />

                        {/* Ripple 2 (Staggered by 1s) */}
                        <div className="absolute inset-4 rounded-full border border-[#a78bfa]/30 ripple-ring shadow-[0_0_15px_rgba(167,139,250,0.2)]" style={{ animationDelay: '1s' }} />

                        {/* Ripple 3 (Staggered by 2s) */}
                        <div className="absolute inset-4 rounded-full border border-[var(--border-color)] ripple-ring shadow-[0_0_15px_var(--border-color)]" style={{ animationDelay: '2s' }} />
                    </div>

                    {/* Image Container — PfpMorphButton transforms this on scroll */}
                    <button
                        type="button"
                        id="heroPfpFrame"
                        onClick={onClick}
                        className="absolute inset-12 rounded-full bg-gradient-to-br from-[var(--bg-highlight-hover)] to-transparent border-2 border-[#60a5fa]/40 shadow-[0_0_20px_rgba(96,165,250,0.15)] backdrop-blur-md overflow-hidden"
                    >
                        <img
                            id="heroPfp"
                            src="https://res.cloudinary.com/dqvpsorso/image/upload/v1775455094/compressed-pfp_ibccwh.png"
                            alt="Priyank Khatri profile photo"
                            className="w-full h-full object-cover object-[60%_20%] rounded-full"
                            width="400"
                            height="400"
                            fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-full transition-opacity duration-500" id="heroPfpOverlay" />
                        {/* Arrow overlay — shown by JS when morphed into button */}
                        <div
                            id="heroPfpArrow"
                            className="absolute inset-0 flex items-center justify-center text-[var(--text-primary)] rounded-full"
                            style={{ opacity: 0, background: 'linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))', pointerEvents: 'none' }}
                        >
                            <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="19" x2="12" y2="5" />
                                <polyline points="5 12 12 5 19 12" />
                            </svg>
                        </div>
                    </button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                initial={loaderPhase >= 4 ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
            >
                <span className="text-[9px] tracking-[0.3em] text-[var(--text-secondary)] uppercase">Scroll</span>
                <motion.div
                    className="w-5 h-8 border border-[var(--border-color)] rounded-full flex items-start justify-center p-1.5"
                >
                    <motion.div
                        className="w-0.5 h-1.5 bg-[var(--text-secondary)] rounded-full"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            </motion.div>

            {/* Resume Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {showResume && (
                        <motion.div
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div
                                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                                onClick={() => setShowResume(false)}
                            />
                            <motion.div
                                className="relative w-full max-w-4xl h-[85vh] bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl overflow-hidden glass-card flex flex-col"
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            >
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] relative z-10">
                                    <h3 className="text-sm font-semibold tracking-wide text-[var(--text-primary)]">Resume</h3>
                                    <div className="flex items-center gap-2">
                                        {/* Open in New Tab Button */}
                                        <a
                                            href="/Priyank_Resume.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent-1)] hover:bg-[var(--accent-1)]/10 rounded-lg transition-colors border border-[var(--accent-1)]/20 hover:border-[var(--accent-1)]/40 flex items-center gap-1.5"
                                            title="Open in New Tab"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <span className="hidden sm:inline">Open in New Tab</span>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                        </a>
                                        <div className="w-px h-6 bg-[var(--border-color)] mx-1" />
                                        {/* Close Button */}
                                        <button
                                            onClick={() => setShowResume(false)}
                                            className="p-1.5 text-[var(--text-secondary)] hover:text-white hover:bg-red-500/20 hover:border-red-500/50 rounded-lg transition-colors border border-transparent"
                                            title="Close Modal"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Modal Body / PDF Viewer */}
                                <div className="flex-1 w-full bg-[#333] relative">
                                    <object data="/Priyank_Resume.pdf" type="application/pdf" className="w-full h-full absolute inset-0">
                                        <iframe src="/Priyank_Resume.pdf" className="w-full h-full border-none" title="Resume" />
                                    </object>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    )
}
