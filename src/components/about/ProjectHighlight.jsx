import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../../store/useStore'

const ease = [0.22, 1, 0.36, 1]

const VESTIGA_LOGO = 'https://res.cloudinary.com/dqvpsorso/image/upload/v1776503687/logo192_ux0ww9.png'
const STOCKPLY_LOGO = 'https://res.cloudinary.com/dqvpsorso/image/upload/v1783334065/5cbb16ec-106b-4020-84b8-c8f798b4417f.png'

const flagshipProjects = [
    {
        id: 'stockply',
        title: 'Stockply',
        subtitle: 'Supply Chain SaaS',
        description: 'A high-fidelity inventory management ecosystem bridging retail shops and suppliers with real-time sync, smart procurement, and data-driven analytics.',
        traits: ['Real-time', 'Multi-tenant', 'Analytics'],
        logo: STOCKPLY_LOGO,
        badge: 'Latest Flagship',
    },
    {
        id: 'vestiga',
        title: 'Vestiga',
        subtitle: 'Password Manager SaaS',
        description: 'A production-level password management platform with secure encryption, scalable architecture, and a premium user experience.',
        traits: ['Secure', 'Scalable', 'Production-Ready'],
        logo: VESTIGA_LOGO,
        badge: 'Current Best Work',
    },
]

function FlagshipCard({ project, inView, delay = 0 }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const [logoFailed, setLogoFailed] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay }}
        >
            <Link
                to={`/work/${project.id}`}
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

                <div className="relative z-10 grid gap-10 p-8 sm:p-12 md:grid-cols-[minmax(0,1fr)_220px] md:items-center md:gap-8 md:p-16 lg:grid-cols-[minmax(0,1fr)_260px]">
                    {/* Badge */}
                    <div className="min-w-0">
                        <div className="mb-10 flex items-center justify-between gap-4">
                            <span className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.25em] uppercase font-bold rounded-full border border-[var(--accent-1)]/15 text-[var(--accent-1)] bg-[var(--accent-1)]/5">
                                <motion.span
                                    className="w-1.5 h-1.5 rounded-full bg-[var(--accent-1)]"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                {project.badge}
                            </span>

                            <svg
                                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                className="shrink-0 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                            </svg>
                        </div>

                        <h3
                            className="text-4xl sm:text-6xl md:text-7xl font-bold text-[var(--text-primary)] tracking-tighter mb-4"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {project.title}
                        </h3>
                        <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-2 font-medium">{project.subtitle}</p>
                        <p className="text-[16px] sm:text-[17px] text-[var(--text-muted)] leading-relaxed max-w-xl mb-10">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {project.traits.map((t) => (
                                <span
                                    key={t}
                                    className="px-4 py-2 text-[11px] tracking-[0.2em] uppercase rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] bg-[var(--bg-highlight)] transition-colors duration-300 group-hover:border-white/[0.08]"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, x: 18 }}
                        animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
                        transition={{ duration: 0.75, ease, delay: delay + 0.2 }}
                        className="relative mx-auto flex w-full max-w-[220px] items-center justify-center self-stretch md:max-w-[260px]"
                    >
                        <div className="absolute inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(96,165,250,0.16),transparent_72%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,18,34,0.82),rgba(8,13,25,0.94))] p-4 shadow-[0_22px_55px_rgba(0,0,0,0.38)]">
                            <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            {logoFailed ? (
                                <div className="flex aspect-square items-center justify-center rounded-[1.4rem] bg-white/[0.03] text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
                                    {project.title}
                                </div>
                            ) : (
                                <img
                                    src={project.logo}
                                    alt={`${project.title} logo`}
                                    loading="lazy"
                                    onError={() => setLogoFailed(true)}
                                    className="aspect-square w-full rounded-[1.4rem] object-cover"
                                />
                            )}
                        </div>
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function ProjectHighlight() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

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
                        FLAGSHIP PROJECTS
                    </p>
                </motion.div>

                {/* Flagship Cards */}
                <div className="flex flex-col gap-8">
                    {flagshipProjects.map((project, i) => (
                        <FlagshipCard
                            key={project.id}
                            project={project}
                            inView={inView}
                            delay={i * 0.15}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
