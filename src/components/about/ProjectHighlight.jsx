import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../../store/useStore'

const ease = [0.22, 1, 0.36, 1]

const traits = ['Secure', 'Scalable', 'Production-Ready']

export default function ProjectHighlight() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    return (
        <section ref={ref} className="py-12 sm:py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease }}
                    className="flex items-center gap-3 mb-10"
                >
                    <div className="w-8 h-px bg-[var(--accent-1)] opacity-40" />
                    <p className="text-[12px] tracking-[0.4em] uppercase text-[var(--text-muted)] font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                        FLAGSHIP PROJECT
                    </p>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease, delay: 0.1 }}
                >
                    <Link
                        to="/work/vestiga"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        className="group block relative rounded-2xl overflow-hidden transition-all duration-500"
                        style={{
                            background: 'linear-gradient(135deg, rgba(96,165,250,0.04) 0%, rgba(167,139,250,0.03) 100%)',
                            border: '1px solid rgba(255,255,255,0.05)',
                        }}
                    >
                        {/* Glow ring — subtle rotating light */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                            <motion.div
                                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(96,165,250,0.06) 40deg, transparent 120deg, rgba(167,139,250,0.04) 200deg, transparent 280deg)',
                                }}
                            />
                        </div>

                        {/* Hover glow lift */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ boxShadow: '0 8px 50px rgba(96,165,250,0.08), 0 0 80px rgba(167,139,250,0.04)' }}
                        />

                        <div className="relative z-10 p-8 sm:p-12 md:p-16">
                            {/* Badge */}
                            <div className="flex items-center justify-between mb-10">
                                <span className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.25em] uppercase font-bold rounded-full border border-[var(--accent-1)]/15 text-[var(--accent-1)] bg-[var(--accent-1)]/5">
                                    <motion.span
                                        className="w-1.5 h-1.5 rounded-full bg-[var(--accent-1)]"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                    Current Best Work
                                </span>

                                <svg
                                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                                </svg>
                            </div>

                            {/* Title */}
                            <h3
                                className="text-4xl sm:text-6xl md:text-7xl font-bold text-[var(--text-primary)] tracking-tighter mb-4"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Vestiga
                            </h3>
                            <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-2 font-medium">Password Manager SaaS</p>
                            <p className="text-[16px] sm:text-[17px] text-[var(--text-muted)] leading-relaxed max-w-xl mb-10">
                                A production-level password management platform with secure encryption, scalable architecture, and a premium user experience.
                            </p>

                            {/* Trait pills */}
                            <div className="flex flex-wrap gap-3">
                                {traits.map((t) => (
                                    <span
                                        key={t}
                                        className="px-4 py-2 text-[11px] tracking-[0.2em] uppercase rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] bg-[var(--bg-highlight)] transition-colors duration-300 group-hover:border-white/[0.08]"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
