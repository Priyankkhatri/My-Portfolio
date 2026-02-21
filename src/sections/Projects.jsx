import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

const miniGamesList = [
    { title: 'Snake Game', desc: 'Classic snake with a modern UI', link: '#' },
    { title: 'Tic Tac Toe', desc: 'Unbeatable AI using Minimax', link: '#' },
    { title: 'Memory Match', desc: 'Find the matching pairs', link: '#' },
    { title: 'Typing Speed Test', desc: 'Measure your WPM', link: '#' },
]

const projects = [
    {
        title: 'API Image Gallery',
        tagline: 'Custom REST API with lazy loading',
        description: 'Image gallery using a custom REST API with search, filters and lazy loading. I learned how to build and consume a custom REST API, lazy load images, and implement basic pagination.',
        tech: ['Node.js', 'Express', 'MongoDB', 'Vanilla JS', 'Netlify'],
        live: 'https://api-image-gallery.netlify.app',
        source: 'https://github.com/Priyankkhatri',
        year: '2024',
        role: 'Frontend & Backend',
    },
    {
        title: 'Movie Explorer',
        tagline: 'Cinematic details & dynamic search',
        description: 'Movie search & details explorer using an external movie API; cinematic details hero. Great experience with dynamic search, API integration, and building clean detail pages with a blurred poster hero.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
        live: 'https://api-movie-explorer.netlify.app',
        source: 'https://github.com/Priyankkhatri',
        year: '2024',
        role: 'Frontend Developer',
    },
    {
        title: 'Weather API',
        tagline: 'Upcoming personal API wrapper',
        description: '[Upcoming Project] Personal API wrapper over a public weather API with caching and a small frontend. Planning to use Redis or Mongo for caching to optimize external API requests.',
        tech: ['Node.js', 'Redis/Mongo', 'Render'],
        live: '#',
        source: 'https://github.com/Priyankkhatri',
        year: 'Planned',
        role: 'Backend Developer',
    },
    {
        title: 'Mini Games',
        tagline: 'Arcade and logic browser games',
        description: 'Small browser games (snake, arcade, etc.) built to practice JS game loops and DOM management. Helps in understanding fundamentals before jumping into heavy game frameworks.',
        tech: ['Vanilla JS', 'HTML', 'CSS'],
        live: '#',
        source: 'https://github.com/Priyankkhatri',
        year: '2024',
        role: 'Frontend',
    },
]

function ProjectCard({ project, index, onClick }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const isEven = index % 2 === 0
    const num = String(index + 1).padStart(2, '0')

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 80, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`glass-card glass-card-hover overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            onClick={onClick}
        >
            <div className={`grid grid-cols-1 lg:grid-cols-5 min-h-[400px]`}>
                {/* Image area — 2 cols */}
                <div
                    className={`relative col-span-2 bg-gradient-to-br from-white/[0.02] to-white/[0.005] overflow-hidden group ${!isEven ? 'lg:order-2' : ''
                        }`}
                >
                    {/* Number watermark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span
                            className="text-[8rem] md:text-[12rem] font-bold text-white/[0.02] select-none group-hover:text-white/[0.04] transition-colors duration-700"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            {num}
                        </span>
                    </div>

                    {/* Decorative grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Corner accent */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <div className="w-3 h-3 border border-white/10 rounded-sm" />
                        <span className="text-[9px] tracking-[0.3em] text-white/15 uppercase">{project.year}</span>
                    </div>

                    {/* Hover shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                </div>

                {/* Content — 3 cols */}
                <div className={`col-span-3 p-8 md:p-12 flex flex-col justify-center ${!isEven ? 'lg:order-1' : ''}`}>
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-white/15">Project {num}</span>
                        <span className="w-8 h-px bg-white/10" />
                        <span className="text-[10px] tracking-[0.2em] text-white/15">{project.role}</span>
                    </div>

                    {/* Title */}
                    <h3
                        className="text-2xl md:text-4xl font-bold text-white/90 mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm text-white/30 italic mb-6">{project.tagline}</p>

                    {/* Description */}
                    <p className="text-sm leading-[1.8] text-white/35 mb-8 max-w-lg">
                        {project.description}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t) => (
                            <span key={t} className="tech-pill">{t}</span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-6 pt-6 border-t border-white/[0.04]">
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => onClick && e.stopPropagation()}
                            className="group inline-flex items-center gap-2.5 text-sm text-white/40 hover:text-white/80 transition-colors link-underline"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform duration-300">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Live Demo
                        </a>
                        <a
                            href={project.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => onClick && e.stopPropagation()}
                            className="group inline-flex items-center gap-2.5 text-sm text-white/40 hover:text-white/80 transition-colors link-underline"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform duration-300">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                            Source Code
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function Projects() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const [showGamesModal, setShowGamesModal] = useState(false)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowGamesModal(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <section id="projects" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 relative">
            {/* Section divider */}
            <div className="section-divider mb-32" />

            <div className="floating-orb w-80 h-80 bg-indigo-900 -top-20 right-0" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                {/* Section header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-white/10" />
                    <p className="text-[11px] tracking-[0.4em] uppercase text-white/20">003 &mdash; Work</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <h2
                            className="text-3xl md:text-5xl font-bold mb-3 text-white/90"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Selected <span className="text-gradient-silver">Projects</span>
                        </h2>
                        <p className="text-sm text-white/25 max-w-md">
                            A curated selection of projects that showcase my approach to solving
                            complex problems with elegant solutions.
                        </p>
                    </div>
                    <span className="text-xs text-white/10 mt-4 md:mt-0">{projects.length} projects</span>
                </div>

                <div className="flex flex-col gap-8">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={i}
                            onClick={project.title === 'Mini Games' ? () => setShowGamesModal(true) : undefined}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <p className="text-xs text-white/15 mb-4">Want to see more?</p>
                    <a
                        href="https://github.com/priyank"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors link-underline"
                    >
                        View all on GitHub
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </motion.div>
            </motion.div>

            {/* Games Modal */}
            <AnimatePresence>
                {showGamesModal && (
                    <motion.div
                        className="fixed inset-0 z-[80] flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowGamesModal(false)}
                    >
                        <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />

                        <motion.div
                            className="relative glass-card max-w-lg w-full z-10 overflow-hidden"
                            initial={{ scale: 0.85, opacity: 0, y: 30, filter: 'blur(10px)' }}
                            animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ scale: 0.9, opacity: 0, y: 20, filter: 'blur(5px)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Top bar */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                            <div className="p-8 md:p-12">
                                <h3
                                    className="text-xl md:text-2xl font-bold text-white/90 mb-6"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    Mini Games Collection
                                </h3>

                                <div className="flex flex-col gap-4 mb-8">
                                    {miniGamesList.map((game, i) => (
                                        <a
                                            key={i}
                                            href={game.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
                                            onMouseEnter={() => setCursorVariant('hover')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{game.title}</span>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 group-hover:text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                                                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                                                </svg>
                                            </div>
                                            <span className="text-xs text-white/40">{game.desc}</span>
                                        </a>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
                                    <button
                                        onClick={() => setShowGamesModal(false)}
                                        className="text-xs tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors flex items-center gap-2"
                                    >
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        Close
                                    </button>
                                    <span className="text-[10px] text-white/10">ESC to dismiss</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
