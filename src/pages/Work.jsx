<<<<<<< HEAD
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
=======
import { motion } from 'framer-motion'
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
import { Helmet } from 'react-helmet-async'
import WorkGrid from '../components/work/WorkGrid'
import useProjectData from '../hooks/useProjectData'

/**
<<<<<<< HEAD
 * Work page — Reconstructed as an Immersive Technical Archive.
 * Incorporates 'Antigravity' HUD design and dynamic interaction patterns.
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

    const stats = [
        { label: 'Total Projects', value: projects.length, unit: 'Units' },
        { label: 'Archive Status', value: 'Stable', unit: '' },
        { label: 'Render Latency', value: '14', unit: 'ms' },
        { label: 'System Uptime', value: '99.9%', unit: '' },
    ]
=======
 * Work page — Reconstructed as an Industrial Minimalist Gallery.
 * Incorporates high-craft 'Frontend Design' principles and 'Kaizen' unified interactions.
 */
export default function Work() {
    const { projects } = useProjectData()
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa

    return (
        <>
            <Helmet>
<<<<<<< HEAD
                <title>Project Archive | Priyank Khatri</title>
                <meta name="description" content="A high-fidelity archive of selected technical projects by Priyank Khatri." />
            </Helmet>

            <section className="min-h-screen px-6 md:px-12 lg:px-24 pt-32 md:pt-48 pb-32 relative overflow-hidden bg-[var(--bg-primary)]">

                {/* 1. Technical Ambient Layer (Interactive Glyphs) */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent-1)]/20 blur-[150px] rounded-full animate-pulse-slow" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--accent-2)]/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* 2. Technical HUD Hero */}
                    <div className="mb-24 lg:mb-32">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-[var(--border-color)] pb-12">

                            {/* Heading Group */}
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-4 text-[var(--accent-1)] text-sm tracking-widest uppercase font-bold"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[var(--accent-1)] shadow-[0_0_10px_var(--accent-1)]" />
                                    Technical Archive / Core Index
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 1 }}
                                    className="text-7xl md:text-9xl font-bold text-[var(--text-primary)] leading-[0.8] tracking-tighter"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    WORKS <br />
                                    <span className="text-stroke tracking-normal opacity-10">ARCHIVE</span>
                                </motion.h1>
                            </div>

                            {/* HUD Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-8 lg:w-80">
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                        className="group"
                                    >
                                        <div className="text-xs uppercase text-[var(--accent-1)] mb-2 group-hover:text-white transition-colors">
                                            {stat.label}
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-[var(--text-primary)]">
                                                {stat.value}
                                            </span>
                                            {stat.unit && <span className="text-xs text-[var(--text-muted)]">{stat.unit}</span>}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Filter Navigation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap items-center gap-4 md:gap-8 mt-12 overflow-x-auto no-scrollbar pb-4"
                        >
                            <span className="text-sm tracking-widest text-[var(--text-muted)] uppercase hidden md:inline">Sort Gallery:</span>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`relative px-4 py-2 text-sm tracking-wider uppercase transition-all duration-500 ${activeFilter === cat ? 'text-[var(--accent-1)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                                >
                                    {cat}
                                    {activeFilter === cat && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 border border-[var(--accent-1)]/30 bg-[var(--accent-1)]/5 rounded-md -z-10"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* 4. Project Grid with Layout Animation */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <WorkGrid projects={filteredProjects} />
                        </motion.div>
                    </AnimatePresence>

                    {/* 5. Terminal Breadcrumb / Footer */}
                    <motion.div
                        className="flex items-center justify-between mt-32 pt-8 border-t border-[var(--border-color)] text-sm tracking-widest uppercase text-[var(--text-muted)]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <span>Archive Protocol / End Transmission</span>
                        <div className="flex gap-4">
                            <span className="animate-pulse">●</span>
                            <span>PAGE 01 OF 01</span>
                        </div>
                    </motion.div>
                </div>
            </section>
=======
                <title>Selected Projects | Priyank Khatri</title>
                <meta name="description" content="A gallery of selected web development projects by Priyank Khatri, showcasing React, Node.js, and modern UI/UX design." />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/work" />
            </Helmet>
            <section className="min-h-screen px-6 md:px-12 lg:px-24 pt-32 md:pt-48 pb-32 relative overflow-hidden bg-[var(--bg-primary)]">
            
            {/* Professional Film Grain Overlay (Breathing Texture) */}
            <div className="fixed inset-0 pointer-events-none z-[100] transition-opacity duration-1000 opacity-[0.03] contrast-150 brightness-100 mix-blend-overlay overflow-hidden">
                <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain" />
            </div>

            {/* Industrial Section Header */}
            <div className="max-w-7xl mx-auto mb-24 md:mb-32">
                
                {/* Asymmetric Eyebrow */}
                <motion.div
                    className="flex items-center gap-6 mb-8"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-[var(--accent-1)]">
                        Archive / 01
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-color)] to-transparent" />
                </motion.div>

                {/* Industrial Heading */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8 py-4">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-bold text-[var(--text-primary)] leading-[0.9] tracking-tighter"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        SELECTED <br />
                        <span className="text-stroke tracking-normal opacity-10">WORK</span>
                    </motion.h1>

                    <motion.div 
                        className="max-w-xs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed uppercase tracking-widest font-medium border-l-2 border-[var(--accent-1)] pl-4">
                            Exploring the intersection of human-centered design and systematic code architecture.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Project Grid (Masonry) */}
            <div className="max-w-7xl mx-auto">
                <WorkGrid projects={projects} />
            </div>

            {/* Industrial Pagination Hint */}
            <motion.div
                className="flex items-center justify-between mt-32 max-w-7xl mx-auto pt-8 border-t border-[var(--border-color)] text-[10px] tracking-[0.4em] uppercase text-[var(--text-muted)] font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span>End / Page_01</span>
                <span>Scroll to Reveal_∞</span>
            </motion.div>

            {/* Custom Background Ambient Glow (Industrial Blue) */}
            <div 
                className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[var(--accent-1)]/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow"
                style={{ animationDuration: '8s' }}
            />
        </section>
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
        </>
    )
}
