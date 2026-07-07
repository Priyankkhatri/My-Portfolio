import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import useStore from '../../store/useStore'
import useIsMobile from '../../hooks/useIsMobile'

/**
 * WorkGrid — Split-Screen Hover Showcase.
 * Splits viewport into a fixed media panel (left) and a typographic scroll list (right).
 * Gracefully collapses to an elegant responsive list of cards on mobile/tablets.
 */
export default function WorkGrid({ projects }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const isMobile = useIsMobile(1024) // Switch layout at 1024px (lg breakpoint)

    // Reset active project when filtered list changes to avoid out of bounds
    useEffect(() => {
        setActiveIndex(0)
    }, [projects])

    if (!projects || projects.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center"
            >
                <p className="text-[var(--text-muted)] text-sm tracking-widest uppercase">
                    No projects match this filter
                </p>
            </motion.div>
        )
    }

    const activeProject = projects[activeIndex] || projects[0]

    if (isMobile) {
        // Mobile layout: Elegant vertical list of compact cards
        return (
            <div className="flex flex-col gap-12">
                {projects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: Math.min(idx * 0.08, 0.4) }}
                    >
                        <Link
                            to={`/work/${project.id}`}
                            className="block group border border-[var(--border-color)] bg-[var(--card-bg)] rounded-2xl overflow-hidden shadow-lg"
                        >
                            <div className="aspect-video w-full overflow-hidden relative">
                                <img
                                    src={project.previewImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/20 to-transparent" />
                                <span className="absolute top-4 right-4 text-[10px] font-mono tracking-widest px-2.5 py-1 bg-[var(--bg-primary)]/80 backdrop-blur-md rounded-full border border-white/5 text-[var(--text-secondary)]">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <div className="p-6">
                                <span className="text-[10px] tracking-widest text-[var(--text-muted)] uppercase font-semibold">
                                    {project.year} &bull; {project.role}
                                </span>
                                <h3 className="text-xl font-bold text-white mt-1 mb-2 group-hover:text-[var(--accent-1)] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                                    {project.shortDescription}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.slice(0, 4).map(tech => (
                                        <span key={tech.name} className="px-2.5 py-0.5 text-[9px] tracking-wider uppercase bg-white/5 border border-white/5 text-[var(--text-muted)] rounded">
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        )
    }

    // Desktop split-screen layout
    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start min-h-[550px]">
            {/* Left Column: Fixed Media Panel */}
            <div className="lg:w-[45%] xl:w-[42%] lg:sticky lg:top-40">
                <div className="flex flex-col min-h-[500px] justify-between">
                    {/* Immersive Image Display with Crossfade */}
                    <div className="w-full aspect-[4/3] rounded-2xl border border-[var(--border-color)] overflow-hidden relative shadow-2xl bg-black/40 group">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="absolute inset-0"
                            >
                                <img
                                    src={activeProject.previewImage}
                                    alt={activeProject.title}
                                    className="w-full h-full object-cover brightness-[0.75] saturate-[0.9] group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-black/20" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Custom visual ring accents */}
                        <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
                        <div className="absolute bottom-4 left-4 z-10">
                            <span className="text-[10px] tracking-[0.25em] font-semibold text-white/55 uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                {activeProject.role}
                            </span>
                        </div>
                    </div>

                    {/* Metadata & Description Showcase */}
                    <div className="mt-8 flex-1 flex flex-col justify-between">
                        <div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProject.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                >
                                    <div className="flex items-center gap-3 text-xs text-[var(--accent-1)] font-mono mb-2">
                                        <span>{activeProject.year}</span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span>{activeProject.status}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                                        {activeProject.title}
                                    </h2>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                                        {activeProject.fullDescription || activeProject.shortDescription}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* CTA Link to project detail page */}
                        <div className="mt-8">
                            <Link
                                to={`/work/${activeProject.id}`}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="inline-flex items-center gap-3 text-xs tracking-[0.15em] font-semibold uppercase text-white hover:text-[var(--accent-1)] transition-colors group/cta"
                            >
                                <span>Explore Case Study</span>
                                <span className="w-8 h-px bg-white/20 group-hover/cta:w-12 group-hover/cta:bg-[var(--accent-1)] transition-all duration-300" />
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover/cta:translate-x-1 transition-transform">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Scrollable List of Project Headers */}
            <div className="lg:w-[55%] xl:w-[58%] flex flex-col justify-start">
                <div className="border-t border-[var(--border-color)]">
                    {projects.map((project, idx) => {
                        const isActive = idx === activeIndex
                        const displayIdx = String(idx + 1).padStart(2, '0')

                        return (
                            <div
                                key={project.id}
                                onMouseEnter={() => {
                                    setActiveIndex(idx)
                                    setCursorVariant('hover')
                                }}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="relative border-b border-[var(--border-color)] py-8 px-4 transition-colors duration-300 overflow-hidden"
                            >
                                <Link
                                    to={`/work/${project.id}`}
                                    className="block group/row"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 relative z-10">
                                        <div className="flex items-center gap-6 md:gap-8 flex-1">
                                            {/* Project Number */}
                                            <span className={`font-mono text-xs md:text-sm tracking-wider transition-colors duration-300 ${
                                                isActive ? 'text-[var(--accent-1)] font-semibold' : 'text-[var(--text-muted)] group-hover/row:text-[var(--text-secondary)]'
                                            }`}>
                                                {displayIdx}
                                            </span>

                                            {/* Project Title */}
                                            <h3 className={`text-2xl md:text-3xl font-bold tracking-tight transition-all duration-300 ${
                                                isActive 
                                                    ? 'text-white translate-x-2' 
                                                    : 'text-[var(--text-secondary)] group-hover/row:text-white group-hover/row:translate-x-1'
                                            }`} style={{ fontFamily: "var(--font-display)" }}>
                                                {project.title}
                                            </h3>
                                        </div>

                                        {/* Technology Tags and Year */}
                                        <div className="flex items-center gap-6 shrink-0 md:justify-end">
                                            <span className={`text-[10px] md:text-xs font-mono tracking-wider transition-colors duration-300 ${
                                                isActive ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'
                                            }`}>
                                                {project.role}
                                            </span>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-all duration-300 ${
                                                isActive ? 'text-[var(--accent-1)] translate-x-1' : 'text-[var(--text-muted)] opacity-0 -translate-x-2 group-hover/row:opacity-100 group-hover/row:translate-x-0'
                                            }`}>
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Tech Stack tags visible on hover / active */}
                                    <motion.div 
                                        initial={false}
                                        animate={isActive ? { height: 'auto', opacity: 1, marginTop: 16 } : { height: 0, opacity: 0, marginTop: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        className="overflow-hidden flex flex-wrap gap-1.5 pl-12 relative z-10"
                                    >
                                        {project.techStack.map(tech => (
                                            <span 
                                                key={tech.name}
                                                className="px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase bg-white/5 border border-white/5 text-[var(--text-secondary)] rounded-md"
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                    </motion.div>
                                </Link>

                                {/* Active Background Glow Line */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeRowGlow"
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.03] via-violet-500/[0.02] to-transparent pointer-events-none z-0"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
