import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import WorkGrid from '../components/work/WorkGrid'
import useProjectData from '../hooks/useProjectData'

/**
 * Work page — Editorial showcase of selected projects.
 * Studio-quality design with cinematic typography and organic motion.
 */
export default function Work() {
    const { projects } = useProjectData()
    const [activeFilter, setActiveFilter] = useState('ALL')

    const categories = ['ALL', 'SAAS', 'FULL-STACK', 'FRONTEND', 'EXPERIMENTAL']

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'ALL') return projects
        return projects.filter(prj => {
            const tags = [prj.role, ...prj.techStack.map(t => t.category), prj.id === 'clone-websites' || prj.id === 'mini-games' ? 'EXPERIMENTAL' : ''].join(' ').toUpperCase()
            return tags.includes(activeFilter)
        })
    }, [projects, activeFilter])

    return (
        <>
            <Helmet>
                <title>Selected Works | Priyank Khatri — Developer Portfolio</title>
                <meta name="description" content="Explore selected projects by Priyank Khatri — full-stack applications, SaaS platforms, and creative frontend experiments built with React, Node.js, and modern web technologies." />
                <meta name="keywords" content="Priyank Khatri, Projects, React, Node.js, Full-stack developer, SaaS, Portfolio, Web Development" />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/work" />
            </Helmet>
            <section className="min-h-screen px-6 md:px-12 lg:px-24 pt-32 md:pt-44 pb-32 relative bg-[var(--bg-primary)]">
                {/* Ambient background glow — subtle, not overwhelming */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
                        style={{ background: 'radial-gradient(circle, var(--accent-1), transparent 70%)' }} />
                    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
                        style={{ background: 'radial-gradient(circle, var(--accent-2), transparent 70%)' }} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* ── Hero Section ── */}
                    <div className="mb-20 lg:mb-28">

                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-[var(--accent-1)]" />
                            <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] font-medium">
                                Portfolio — {projects.length} Projects
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <div className="relative mb-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] leading-[0.95] tracking-tight"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Selected
                                <br />
                                <span className="text-gradient-silver">Works</span>
                            </motion.h1>

                            {/* Animated underline */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-4 max-w-xs"
                            >
                                <span className="work-heading-line" />
                            </motion.div>
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="text-base md:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed"
                        >
                            A collection of projects that reflect my journey — from full-stack platforms to creative experiments. Each one taught me something new.
                        </motion.p>
                    </div>

                    {/* ── Filter Navigation ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-wrap items-center gap-2 md:gap-3 mb-16 md:mb-24"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase rounded-full border transition-all duration-400 ${
                                    activeFilter === cat
                                        ? 'work-filter-active border-[var(--accent-1)]/30 text-[var(--accent-1)]'
                                        : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]/30 hover:bg-[var(--bg-highlight)]'
                                }`}
                            >
                                {cat.replace('-', ' ')}
                                {activeFilter === cat && (
                                    <motion.div
                                        layoutId="workFilter"
                                        className="absolute inset-0 rounded-full border border-[var(--accent-1)]/20 -z-10"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>

                    {/* ── Project Grid ── */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <WorkGrid projects={filteredProjects} />
                        </motion.div>
                    </AnimatePresence>


                </div>
            </section>
        </>
    )
}
