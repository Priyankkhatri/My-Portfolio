import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useStore from '../../store/useStore'
import useIsMobile from '../../hooks/useIsMobile'

/**
 * WorkGrid — Awwwards-style Split-Screen Showcase.
 *
 * Desktop: Sticky left preview panel + scrollable right project list.
 * The left panel uses `position: sticky` with `top: 0; height: 100vh`
 * and flexbox centering to stay vertically centered in the viewport.
 *
 * Mobile/Tablet: Elegant vertical card list.
 *
 * IMPORTANT: For sticky to work, NO ancestor element may have
 * `overflow: hidden` or `overflow: clip`. The parent Work.jsx section
 * must NOT use overflow-hidden/overflow-clip.
 */
export default function WorkGrid({ projects }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const isMobile = useIsMobile(1024)
    const prefersReducedMotion = useReducedMotion()

    // Reset active project when filtered list changes
    useEffect(() => {
        setActiveIndex(0)
    }, [projects])

    // Preload adjacent project images for instant transitions
    useEffect(() => {
        if (!projects || projects.length === 0) return
        const adjacentIndices = [activeIndex - 1, activeIndex + 1].filter(
            (i) => i >= 0 && i < projects.length
        )
        adjacentIndices.forEach((i) => {
            const img = new Image()
            img.src = projects[i].previewImage
        })
    }, [activeIndex, projects])

    const handleProjectHover = useCallback(
        (idx) => {
            setActiveIndex(idx)
            setCursorVariant('hover')
        },
        [setCursorVariant]
    )

    const handleProjectLeave = useCallback(() => {
        setCursorVariant('default')
    }, [setCursorVariant])

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

    // ── Animation Variants ──
    const duration = prefersReducedMotion ? 0 : undefined

    const imageVariants = {
        initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: prefersReducedMotion ? 1 : 1.02 },
    }

    const textVariants = {
        initial: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: prefersReducedMotion ? 0 : -8 },
    }

    const techBadgeVariants = {
        initial: { opacity: 0, y: prefersReducedMotion ? 0 : 6 },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: duration ?? 0.25,
                delay: prefersReducedMotion ? 0 : i * 0.04,
                ease: 'easeOut',
            },
        }),
        exit: { opacity: 0, transition: { duration: duration ?? 0.15 } },
    }

    // ── Mobile Layout ──
    if (isMobile) {
        return (
            <div className="flex flex-col gap-12">
                {projects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{
                            duration: duration ?? 0.6,
                            delay: Math.min(idx * 0.08, 0.4),
                        }}
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
                                    {project.techStack.slice(0, 4).map((tech) => (
                                        <span
                                            key={tech.name}
                                            className="px-2.5 py-0.5 text-[9px] tracking-wider uppercase bg-white/5 border border-white/5 text-[var(--text-muted)] rounded"
                                        >
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

    // ── Desktop Split-Screen Layout ──
    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/*
             * Left Column: Sticky Preview Panel
             *
             * sticky + top-0 + h-screen + flex items-center =
             * The outer div sticks to the viewport top and spans 100vh.
             * Flexbox centers the inner card vertically within that space.
             * This guarantees the preview is always vertically centered
             * regardless of scroll position or content height.
             */}
            <div className="lg:w-[45%] xl:w-[42%] lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:py-8">
                <div className="w-full">
                    {/* ── Image Display with Crossfade ── */}
                    <Link
                        to={`/work/${activeProject.id}`}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        aria-label={`View details for ${activeProject.title}`}
                        className="block w-full aspect-[4/3] rounded-2xl border border-[var(--border-color)] overflow-hidden relative shadow-2xl bg-black/40 group"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                variants={imageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{
                                    duration: duration ?? 0.35,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="absolute inset-0 will-change-[transform,opacity]"
                            >
                                <img
                                    src={activeProject.previewImage}
                                    alt={activeProject.title}
                                    className="w-full h-full object-cover brightness-[0.75] saturate-[0.9] group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-black/20" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Visual ring accent */}
                        <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
                        <div className="absolute bottom-4 left-4 z-10">
                            <span className="text-[10px] tracking-[0.25em] font-semibold text-white/55 uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                {activeProject.role}
                            </span>
                        </div>
                    </Link>

                    {/* ── Metadata & Description ── */}
                    <div className="mt-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{
                                    duration: duration ?? 0.3,
                                    ease: 'easeOut',
                                }}
                                className="will-change-[transform,opacity]"
                            >
                                {/* Year & Status */}
                                <div className="flex items-center gap-3 text-xs text-[var(--accent-1)] font-mono mb-2">
                                    <span>{activeProject.year}</span>
                                    <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]/30" />
                                    <span>{activeProject.status}</span>
                                </div>

                                {/* Title */}
                                <h2
                                    className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {activeProject.title}
                                </h2>

                                {/* Description */}
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-5">
                                    {activeProject.fullDescription ||
                                        activeProject.shortDescription}
                                </p>

                                {/* Tech Stack Badges — staggered entrance */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    <AnimatePresence>
                                        {activeProject.techStack.map(
                                            (tech, i) => (
                                                <motion.span
                                                    key={`${activeProject.id}-${tech.name}`}
                                                    custom={i}
                                                    variants={
                                                        techBadgeVariants
                                                    }
                                                    initial="initial"
                                                    animate="animate"
                                                    exit="exit"
                                                    className="px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase bg-white/5 border border-white/5 text-[var(--text-secondary)] rounded-md"
                                                >
                                                    {tech.name}
                                                </motion.span>
                                            )
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* CTA — always visible, updates link only */}
                        <Link
                            to={`/work/${activeProject.id}`}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="inline-flex items-center gap-3 text-xs tracking-[0.15em] font-semibold uppercase text-[var(--text-primary)] hover:text-[var(--accent-1)] transition-colors group/cta"
                        >
                            <span>Explore Case Study</span>
                            <span className="w-8 h-px bg-[var(--border-color)] group-hover/cta:w-12 group-hover/cta:bg-[var(--accent-1)] transition-all duration-300" />
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                className="group-hover/cta:translate-x-1 transition-transform"
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Right Column: Scrollable Project List ── */}
            <div className="lg:w-[55%] xl:w-[58%] flex flex-col justify-start">
                <div className="border-t border-[var(--border-color)]">
                    {projects.map((project, idx) => {
                        const isActive = idx === activeIndex
                        const displayIdx = String(idx + 1).padStart(2, '0')

                        return (
                            <div
                                key={project.id}
                                onMouseEnter={() => handleProjectHover(idx)}
                                onMouseLeave={handleProjectLeave}
                                className="relative border-b border-[var(--border-color)] py-10 md:py-12 px-4 transition-colors duration-300 overflow-hidden"
                            >
                                <Link
                                    to={`/work/${project.id}`}
                                    className="block group/row"
                                >
                                    {/* Ambient background watermark (The "static art" for empty space) */}
                                    <div className={`absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-[6rem] md:text-[10rem] font-black leading-none text-white/[0.02] pointer-events-none select-none transition-all duration-700 font-display z-0 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 group-hover/row:translate-x-4 group-hover/row:opacity-50'}`}>
                                        {displayIdx}
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 relative z-10">
                                        <div className="flex items-center gap-6 md:gap-10 flex-1">
                                            {/* Project Number */}
                                            <span
                                                className={`font-mono text-sm md:text-base tracking-widest transition-colors duration-300 ${
                                                    isActive
                                                        ? 'text-[var(--accent-1)] font-semibold'
                                                        : 'text-[var(--text-muted)] group-hover/row:text-[var(--text-secondary)]'
                                                }`}
                                            >
                                                {displayIdx}
                                            </span>

                                            {/* Project Title */}
                                            <h3
                                                className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-500 ${
                                                    isActive
                                                        ? 'text-white translate-x-4'
                                                        : 'text-[var(--text-secondary)] group-hover/row:text-white group-hover/row:translate-x-2'
                                                }`}
                                                style={{
                                                    fontFamily:
                                                        'var(--font-display)',
                                                }}
                                            >
                                                {project.title}
                                            </h3>
                                        </div>

                                        {/* Role & Arrow */}
                                        <div className="flex items-center gap-6 shrink-0 md:justify-end">
                                            <span
                                                className={`text-[11px] md:text-xs tracking-widest uppercase transition-colors duration-300 ${
                                                    isActive
                                                        ? 'text-[var(--text-secondary)]'
                                                        : 'text-[var(--text-muted)]'
                                                }`}
                                            >
                                                {project.role}
                                            </span>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className={`transition-all duration-500 ${
                                                    isActive
                                                        ? 'text-[var(--accent-1)] translate-x-2'
                                                        : 'text-[var(--text-muted)] opacity-0 -translate-x-4 group-hover/row:opacity-100 group-hover/row:translate-x-0'
                                                }`}
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Expandable Tech Stack */}
                                    <motion.div
                                        initial={false}
                                        animate={
                                            isActive
                                                ? {
                                                      height: 'auto',
                                                      opacity: 1,
                                                      marginTop: 16,
                                                  }
                                                : {
                                                      height: 0,
                                                      opacity: 0,
                                                      marginTop: 0,
                                                  }
                                        }
                                        transition={{
                                            duration: duration ?? 0.3,
                                            ease: 'easeOut',
                                        }}
                                        className="overflow-hidden flex flex-wrap gap-1.5 pl-12 relative z-10"
                                    >
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech.name}
                                                className="px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase bg-white/5 border border-white/5 text-[var(--text-secondary)] rounded-md"
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                    </motion.div>
                                </Link>

                                {/* Active Row Background Glow */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.03] via-violet-500/[0.02] to-transparent pointer-events-none z-0"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                duration: duration ?? 0.3,
                                            }}
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
